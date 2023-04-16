import React from 'react';
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
                "John Deer Gaming": [["STEAM_1:0:90225250", "sage"], ["STEAM_1:0:73768036", "Kiwijord"], ["STEAM_1:0:52178142", "maeson"]],
                "iBUYPOWER": [["STEAM_1:1:24049284", "Harry_pootha"], ["STEAM_1:0:510052581", "Kebab 101"], ["STEAM_0:0:159882417", "Honza"]],
                "Homies w/ Extra Cromies": [["STEAM_1:1:31653734", "Ebun"], ["STEAM_0:0:120327391", "Larry"], ["STEAM_1:0:165881949", "gosh"]]}
    
    const teamColorsMapping = {"No Alias": "#6E6061",
                                "Human Growth Hormones": "#DC224E",
                                "Team nykaN": "#AF981A",
                                "KURBASHI GANG": "#C57878",
                                "Cool Boys Team": "#e1e388",
                                "John Deer Gaming": "#2CB963",
                                "iBUYPOWER": "#D64345",
                                "Homies w/ Extra Cromies": "#3498DB",}            


    const [times, setTimes] = useState([]); // [{name1: [{map:kz_a, time:5...}, {...}, ...]}, {name2: ...}, ...]
    const [mapIDName, setMapIDName] = useState({});
    const [teamNameOrder, setTeamColors] = useState([]);

    function convTime(time) {        
        var m = 0;
        var s = (time % 60).toFixed(3);
        if(time > 60) { m = Math.floor(time/60)}
        return m===0 ? time : String(m) + ":" + ('000000'+s).slice(-6);
    }

    async function addTeam(team) {
        const lst = teams[team];
        var mapidtoname = {}

        const teamTimes = await Promise.all(
            lst.map(async ([id, name], i) => {
                mapidtoname = {...mapidtoname, [id]:name};
                const aTime = await loadTimes(id);
                return {[id]: aTime};
        }));

        setMapIDName({...mapIDName, ...mapidtoname});
        setTimes([...times, teamTimes]);
        setTeamColors([...teamNameOrder, team]);
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
                            <h5>{mapIDName[Object.keys(player_data)[0]]}</h5>
                            <DataTable data={player_data} doTier={false}/>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default KZTourney;