import Constants from '../consts';

function updateWordlist(greens, yellows, reds) {
    var newList = [];

    for (var word of Constants.ALL_WORDS) {
        var keep = true;

        // greens
        for(let i = 0; i < 5; i++) {
            if(greens[i] !== "" && greens[i] !== word[i]) {
                keep = false;
            }
        }

        // yellows
        for(let [letter, idx] of yellows) {
            if(!word.includes(letter) || word[idx] === letter) {
                keep = false;
            }
        }

        // reds
        for(let el of reds) {
            for(let i = 0; i < 5; i++) {
                if(word[i] === el && greens[i] !== el) {
                    keep = false;
                }
            }
        }

        if(keep) {
            newList.push(word)
        }
    }
    return newList;

}

function rankWords(words, greens, yellows) {
    let solution = [];
    let yellows_flat = yellows.map(a => a[0]).flat(1);

    for(let word1 of words) {
        let score = 0;
        for(let word2 of words) {
            for(let let1 of word1) {
                if(word2.includes(let1) && !greens.includes(let1) && !yellows_flat.includes(let1)) {
                    score += 1;
                    break;
                }
            }
        }
        solution.push([word1, score]);
    }

    solution.sort(function(a,b) {
        return b[1] - a[1];
    })

    return solution;
}

function lst2string(lst) {
    let newText = "";
    for(var [word, value] of lst) {
        newText += "(" + word + ", " + value + ") ";
    }
    return newText;
}

export function solve(greens, yellows, reds) {
    let newList = updateWordlist(greens, yellows, reds);
    let rankedList = rankWords(newList, greens, yellows);
    return lst2string(rankedList);
}