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
    
    const [times, setTimes] = useState([]); // [{name1: [{map:kz_a, time:5...}, {...}, ...]}, {name2: ...}, ...]
    const [mapIDName, setMapIDName] = useState({});

    function convTime(time) {        
        var m = 0;
        var s = (time % 60).toFixed(3);
        if(time > 60) { m = Math.floor(time/60)}
        return m===0 ? time : String(m) + ":" + ('000000'+s).slice(-6);
    }

    async function addTeam(lst) {
        var mapidtoname = {}

        const localTimes = await Promise.all(
            lst.map(async ([id, name], i) => {
                mapidtoname = {...mapidtoname, [id]:name};
                const aTime = await loadTimes(id);
                return {[id]: aTime};
        }));

        setMapIDName({...mapIDName, ...mapidtoname})
        setTimes([...times, ...localTimes])
    }
    
    async function loadTimes(id) {
        var requestURL = 'https://kztimerglobal.com/api/v2/records/top/recent?steam_id='+id+'&has_teleports=false&tickrate=128&stage=0&modes_list_string=kz_timer&limit=1000';
        const response = await fetch(requestURL);
        const json = await response.json();
        var data = json.filter(el => maps.includes(el["map_name"]))
        data = data.map(el => {return {...el, time:convTime(el["time"])}})
        return data;
    }

    return (
        <div>
            <h3>Captain's Clash</h3>
            <div className="row">
                {Object.keys(teams).map((team, i) => {
                    return <button className='btn-secondary btn' onClick={() => addTeam(teams[team])} key={i}>{team}</button>
                })}
            </div>
            <div className='tables_container grid-3'>
                {times.map(player_data => (
                    <div className="table_container">
                        <h5>{mapIDName[Object.keys(player_data)[0]]}</h5>
                        <DataTable data={player_data} doTier={false}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default KZTourney;