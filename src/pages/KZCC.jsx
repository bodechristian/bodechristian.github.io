import React, { useEffect } from 'react';
import { useState } from 'react';
import DataTable from '../components/DataTable';

const KZTourney = () => {
    // Captains Clash
    var maps = ["kz_alt_cargo", "kz_bored", "kz_hyroblock", "kz_igneous", "kz_module", "kzpro_concrete_c02",
                "xc_powerblock_rc1"]

    const teams = {"No Alias": [["STEAM_1:0:18890328", "FFM"], ["STEAM_1:0:122816464", "GiimPy"], ["STEAM_1:1:196861182", "puff."]], //, ["STEAM_1:0:448781326", "Szwagi"]
                "Human Growth Hormones": [["STEAM_1:0:442994897", "kARKo"], ["STEAM_1:1:121779585", "Rumble"], ["STEAM_1:1:117268758", "neon"]],
                "Team nykaN": [["STEAM_1:1:120613467", "makis"], ["STEAM_1:1:151062938", "tony"], ["STEAM_1:1:236646428", "tatska"]],
                "KURBASHI GANG": [["STEAM_1:1:194388317", "sampge"], ["STEAM_1:1:11621314", "Kurbashi"], ["STEAM_1:1:83728056", "shy"]],
                "Cool Boys Team": [["STEAM_1:1:168575119", "Flonnych"], ["STEAM_1:1:65663138", "Blacky"], ["STEAM_1:1:116739970", "M u g e n"]],
                "John Deere Gaming": [["STEAM_1:0:90225250", "sage"], ["STEAM_1:0:73768036", "Kiwijord"], ["STEAM_1:0:52178142", "maeson"]],
                "iBUYPOWER": [["STEAM_1:1:24049284", "Harry_pootha"], ["STEAM_1:0:510052581", "Kebab 101"], ["STEAM_0:0:159882417", "Honza"]],
                "Homies w/ Extra Chromies": [["STEAM_1:1:31653734", "Ebun"], ["STEAM_0:0:120327391", "Larry"], ["STEAM_1:0:165881949", "gosh"]]}
    
    const teamColorsMapping = {"No Alias": "#6E6061",
                                "Human Growth Hormones": "#DC224E",
                                "Team nykaN": "#AF981A",
                                "KURBASHI GANG": "#C57878",
                                "Cool Boys Team": "#e1e388",
                                "John Deere Gaming": "#2CB963",
                                "iBUYPOWER": "#D64345",
                                "Homies w/ Extra Chromies": "#3498DB",}            


    const [times, setTimes] = useState([]); // [{name1: [{map:kz_a, time:5...}, {...}, ...]}, {name2: ...}, ...]
    const [teamNameOrder, setTeamNameOrder] = useState([]);
    const [teamAverages, setTeamAverages] = useState([]);
    const [fastestTeam, setFastestTeam] = useState({"kz_alt_cargo": "", "kz_bored": "", 
                                                "kz_hyroblock": "", "kz_igneous": "", "kz_module": "",
                                                "kzpro_concrete_c02": "", "xc_powerblock_rc1": ""})                      

    function convTime(time) {        
        var m = 0;
        var s = (time % 60).toFixed(3);
        if(time > 60) { m = Math.floor(time/60)}
        return m===0 ? time : String(m) + ":" + ('000000'+s).slice(-6);
    }

    function unconvTime(str) {
        var a = String(str).split(":");
        if(a.length===2) {
            return +a[0]*60 + +a[1];
        } else {
            return +a[0]
        }
    }

    async function addTeam(team) {
        if(teamNameOrder.includes(team)) { // delete team if already in
            const idx = teamNameOrder.indexOf(team);

            // update list of fastest times to highlight
            let data = {};
            let result = {};
            maps.forEach(map => {data[map] = 10000; result[map] = ""});
            Object.keys(data).forEach(mapName => {
                teamAverages.forEach(teamAvg => {
                    if(teamAvg["team"] !== team && teamAvg[mapName] < data[mapName]) {
                        result[mapName] = teamAvg["team"];
                        data[mapName] = teamAvg[mapName];
                    }
                })
            });
            setFastestTeam(result);

            setTimes(temp => temp.filter((el, i) => i !== idx));
            setTeamNameOrder(temp => temp.filter((el, i) => i !== idx));
            setTeamAverages(temp => temp.filter((el, i) => i !== idx));
            return;
        }

        const lst = teams[team];

        const teamTimes = await Promise.all(
            lst.map(async ([id, name], i) => {
                const aTime = await loadTimes(id); // [{map: map, time:time,...}, {...}, ...]
                let avg_points = aTime.reduce((a,b,i) => {if(b["points"]) {
                    return a - (a-b["points"]) / (i+1)
                } return a}, 0) 
                return {"name": name, "id": id, "runs": aTime, "avg_points": Math.round(avg_points)};
        }));

        var teamAvgs = {} // {map1: 37, map2: 98, ...}
        maps.forEach(map => {teamAvgs[map] = 0});
        Object.keys(teamAvgs).forEach((aMap, i) => {
            // get all players times for a map
            let activeTimes = 0;
            let tempTimes = []
            for(var j = 0; j<3; j++) {
                var temp = teamTimes[j].runs;
                var theMap = temp.filter(el => el["map_name"] === aMap)[0]; // can say [0] cause every map is guaranteed to be in
                if (theMap["time"]) {
                    activeTimes += 1;
                    tempTimes.push(unconvTime(theMap["time"]))
                }
            }
            // if no one has a time on that map, set avg very high
            if (activeTimes === 0) {teamAvgs[aMap] = 10000}          
            else { // otherwise calculate avg time
                // top 2 times
                let first, second;
                tempTimes.forEach(el => {
                    if(!first) {
                        first = el;
                    } else if (!second || el < second) {
                        second = el;
                    } else if (el < first) {
                        first = el;
                    }
                })
                teamAvgs[aMap] = (first + second) / 2

                // iterative mean
                // teamAvgs[aMap] = tempTimes.reduce((a,b,i) => a - (a-b) / (i+1)) 
            }
        });
        teamAvgs["team"] = team;

        // create list of fastest times to highlight
        let data = {};
        let result = {};
        maps.forEach(map => {data[map] = 10000; result[map] = ""});
        Object.keys(data).forEach(mapName => {
            [...teamAverages, teamAvgs].forEach(teamAvg => {
                if(teamAvg[mapName] < data[mapName]) {
                    result[mapName] = teamAvg["team"];
                    data[mapName] = teamAvg[mapName];
                }
            })
        });
        setFastestTeam(result);

        setTeamNameOrder([...teamNameOrder, team]);
        setTeamAverages([...teamAverages, teamAvgs]);
        setTimes([...times, teamTimes]);
    }
    
    async function loadTimes(id) {
        var requestURL = 'https://kztimerglobal.com/api/v2/records/top?steam_id='+id+'&has_teleports=false&tickrate=128&stage=0&modes_list_string=kz_timer&limit=1000';
        const response = await fetch(requestURL);
        const json = await response.json();
        var data_temp = json.filter(el => maps.includes(el["map_name"]))
        data_temp = data_temp.map(el => {return {...el, time: convTime(el["time"])}})
        
        // remove possible duplicates (due to api stuff)
        var data = data_temp.reduce((p, c) => {
            if (!p.some((el) => { return el.map_name === c["map_name"]})) {
                p.push(c);
            }
            return p;
        }, []);

        // add unplayed maps
        var unplayedMaps = maps.filter(el => !data.map(x => x["map_name"]).includes(el))
        unplayedMaps = unplayedMaps.map(aMap => {return {"map_name": aMap}})

        data = [...data, ...unplayedMaps]

        return data;
    }

    return (
        <div>
            <h3>Captain's Clash</h3>
            <div className="row-teambuttons">
                {Object.keys(teams).map((team, i) => {
                    return <button className='btn-secondary btn' onClick={() => addTeam(team)} key={i}
                                    style={{backgroundColor: teamColorsMapping[team], opacity: teamNameOrder.includes(team)?1:0.5}}>
                                {team}
                            </button>
                })}
            </div>
            <div className='grid-1'>
                {times.map((teamData, i) => (
                    <div className="row-team grid-3" style={{backgroundColor: teamColorsMapping[teamNameOrder[i]]}} key={i}>               
                    <h3 style={{gridColumnEnd: 'span 3', margin: '0 5px 15px 15px'}}>{teamNameOrder[i]}</h3>
                    {teamData.map((player_data, j) => (
                        <div className="table_container" key={j}>
                            <a href={'https://kzgo.eu/players/' + player_data.id} target="_blank">
                                <h5>{player_data["name"]} ({player_data["avg_points"]})</h5>
                            </a>
                            <DataTable data={player_data} fastestTeams={fastestTeam} team={teamNameOrder[i]} doTier={false}/>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default KZTourney;