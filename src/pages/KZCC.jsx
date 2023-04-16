import React, { useEffect } from 'react';
import { useState } from 'react';
import DataTable from '../components/DataTable';

const KZTourney = () => {
    // Captains Clash
    var maps = ["kz_alt_cargo", "kz_bored", "kz_hyroblock", "kz_igneous", "kz_module", "kzpro_concrete_c02",
                "xc_powerblock_rc1"]

    const teams = {"No Alias": [["STEAM_1:0:18890328", "FFM"],["STEAM_1:0:448781326", "Szwagi"], ["STEAM_1:1:196861182", "puff."]],
                "Human Growth Hormones": [["STEAM_1:0:178573631", "AyayaBoy"], ["STEAM_1:1:121779585", "Rumble"], ["STEAM_1:1:117268758", "neon"]],
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
        if(teamNameOrder.includes(team)) {
            const idx = teamNameOrder.indexOf(team);
            setTimes(temp => temp.filter((el, i) => i !== idx));
            setTeamNameOrder(temp => temp.filter((el, i) => i !== idx));
            setTeamAverages(temp => temp.filter((el, i) => i !== idx));
            return;
        }

        const lst = teams[team];

        const teamTimes = await Promise.all(
            lst.map(async ([id, name], i) => {
                const aTime = await loadTimes(id);
                return {"name": name, "id": id, "runs": aTime};
        }));

        var teamAvgs = {"kz_alt_cargo": 0, "kz_bored": 0, "kz_hyroblock": 0, "kz_igneous": 0, "kz_module": 0,
                         "kzpro_concrete_c02": 0, "xc_powerblock_rc1": 0}
        Object.keys(teamAvgs).forEach((aMap, i) => {
            for(var j = 1; j<=3; j++) {
                var temp = teamTimes[j-1].runs;
                var theMap = temp.filter(el => el["map_name"] === aMap)[0]; // can say [0] cause every map is guaranteed to be in
                let thisTime = 0;
                if (theMap["time"]) {
                    thisTime = unconvTime(theMap["time"]);
                } else {
                    thisTime = teamAvgs[aMap];
                }
                let prevTime = teamAvgs[aMap];
                teamAvgs[aMap] = prevTime - (prevTime-thisTime)/j;
            }
        });
        teamAvgs["team"] = team;

        // create list of fastest times to highlight
        let data = {"kz_alt_cargo": 10000, "kz_bored": 10000, "kz_hyroblock": 10000, "kz_igneous": 10000, 
                "kz_module": 10000, "kzpro_concrete_c02": 10000, "xc_powerblock_rc1": 10000};
        let result = {"kz_alt_cargo": "", "kz_bored": "", 
                        "kz_hyroblock": "", "kz_igneous": "", "kz_module": "",
                        "kzpro_concrete_c02": "", "xc_powerblock_rc1": ""}
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
        var requestURL = 'https://kztimerglobal.com/api/v2/records/top/recent?steam_id='+id+'&has_teleports=false&tickrate=128&stage=0&modes_list_string=kz_timer&limit=1000';
        const response = await fetch(requestURL);
        const json = await response.json();
        var data = json.filter(el => maps.includes(el["map_name"]))
        data = data.map(el => {return {...el, time: convTime(el["time"])}})

        // add unplayed maps
        var unplayedMaps = maps.filter(el => !data.map(x => x["map_name"]).includes(el))
        unplayedMaps = unplayedMaps.map(aMap => {return {"map_name": aMap}})
        data = [...data, ...unplayedMaps]

        return data;
    }

    return (
        <div>
            <h3>Captain's Clash</h3>
            <div className="row">
                {Object.keys(teams).map((team, i) => {
                    return <button className='btn-secondary btn' onClick={() => addTeam(team)} key={i}
                                    style={{backgroundColor: teamColorsMapping[team]}}>
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
                                <h5>{player_data["name"]}</h5>
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