import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

const customStyles = {
    content: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

const ConnectionsComponent = () => {
    const categories = {
        "wrest": ["jerk", "tug", "wrench", "yank"],
        "buster": ["bub", "bud", "jack", "man"],
        "yoga accessories": ["block", "bolster", "mat", "strap"],
        "___cap": ["hub", "knee", "mad", "night"],
    }
    const colorMap = {
        "wrest": "green",
        "buster": "red",
        "yoga accessories": "purple",
        "___cap": "blue",
    }
    var open_words = Object.values(categories)
    open_words = open_words.flat()
    shuffle(open_words);

    const [selectedCells, setSelectedCells] = useState([])
    const [openWords, setOpenWords] = useState(open_words)
    const [solvedWords, setSolvedWords] = useState([])
    const [showWinModal, setShowWinModal] = useState(false)

    useEffect(() => {
        // highlight all the solved cells with color from colorMap[k]
        var conItems = Array.from(document.querySelectorAll('.con-item')).filter(el => solvedWords.includes(el.textContent));

        for (var conNode of conItems) {
            var _text = conNode.innerHTML;

            var color = 'blue' // default color
            for (const [cat, words] of Object.entries(categories)) {
                if (words.includes(_text)) {
                    color = colorMap[cat]
                }
            }

            conNode.parentNode.style.backgroundColor = color
        }
    }, [solvedWords])

    function selectCell(event) {
        var clickedNumber = event.currentTarget.getAttribute('number')
        if (clickedNumber >= openWords.length) {
            // non-open word was clicked
            return
        }
        var clickedWord = openWords[clickedNumber]

        if (selectedCells.includes(clickedWord)) {
            // item is being unselected
            var _selectedCells = selectedCells.filter(item => item !== clickedWord)
            setSelectedCells(_selectedCells)
        } else if (selectedCells.length < 4) {
            // item is being selected
            _selectedCells = [...selectedCells, clickedWord]
            setSelectedCells(_selectedCells)

            // check if full category
            for (const [k, v] of Object.entries(categories)) {
                if (v.toSorted().join(',') === _selectedCells.toSorted().join(',')) {
                    // SOLVED CATEGORY
                    // remove all " selected" from classNames
                    setSelectedCells([])
                    // remove selected cells from open words
                    setOpenWords(openWords.filter(item => !(_selectedCells.includes(item))))
                    setSolvedWords([..._selectedCells, ...solvedWords])

                    // check if all solved
                    if (openWords.length === 4) {
                        // whole puzzle solved
                        setShowWinModal(true)
                    }
                }
            }
        }
        console.log([...openWords, ...solvedWords][3]);
        console.log(selectedCells);
        console.log(selectedCells.includes([...openWords, ...solvedWords][3]));

    }

    function closeModal() {
        setShowWinModal(false)
    }

    return (
        <div className='container connections-container d-flex flex-column justify-content-center align-items-center mt-3 mb-3'>
            <Modal className="modalWin" isOpen={showWinModal} onRequestClose={closeModal} style={customStyles}>
                <div className="modal-content">
                    <h2>YOU WON</h2>
                    Congratuliations you're amazing.
                    <div>
                        <button className='btn btn-secondary mt-3 mb-2 px-5'>Share</button>
                    </div>
                </div>
            </Modal>
            <div className="row">
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][0]) ? 'selected' : '')} number="0" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][0]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][1]) ? 'selected' : '')} number="1" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][1]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][2]) ? 'selected' : '')} number="2" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][2]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][3]) ? 'selected' : '')} number="3" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][3]}</div>
                </div>
            </div>
            <div className="row">
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][4]) ? 'selected' : '')} number="4" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][4]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][5]) ? 'selected' : '')} number="5" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][5]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][6]) ? 'selected' : '')} number="6" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][6]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][7]) ? 'selected' : '')} number="7" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][7]}</div>
                </div>
            </div>
            <div className="row">
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][8]) ? 'selected' : '')} number="8" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][8]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][9]) ? 'selected' : '')} number="9" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][9]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][10]) ? 'selected' : '')} number="10" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][10]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][11]) ? 'selected' : '')} number="11" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][11]}</div>
                </div>
            </div>
            <div className="row">
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][12]) ? 'selected' : '')} number="12" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][12]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][13]) ? 'selected' : '')} number="13" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][13]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][14]) ? 'selected' : '')} number="14" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][14]}</div>
                </div>
                <div className={"col d-flex justify-content-center " + (selectedCells.includes([...openWords, ...solvedWords][15]) ? 'selected' : '')} number="15" onClick={(e) => selectCell(e)}>
                    <div className="con-item">{[...openWords, ...solvedWords][15]}</div>
                </div>
            </div>

        </div>
    );
};
export default ConnectionsComponent;