import React from 'react';
import { useState } from 'react';
import DataTable from '../components/DataTable';

const KZTourney = () => {
    var maps = ["kz_twiivo", "kz_antiquity", "kz_village", "kz_woodstock_v2", "kz_terablock",
                "kz_bacho", "kz_dam", "kz_summercliff2_go", "kz_cdr_myst", "kz_hellinashop",
                "kz_arrebol", "kz_megalodon", "kz_camembert", "kz_module", "kz_forchi",
                "kz_dzy_reach_v2", "kz_haste", "kz_shark_gc", "kz_lume", "kz_mandelbrot",
                "kz_okaychamp", "kzpro_gull_pidr_reborn", "kz_hitech", "kz_techtonic_v2_ldr", "bkz_apricity_v3"]
    const [times, setTimes] = useState([]); // [{name1: [{map:kz_a, time:5...}, {...}, ...]}, {name2: ...}, ...]

    function convTime(time) {        
        var m = 0;
        var s = (time % 60).toFixed(3);
        if(time > 60) { m = Math.floor(time/60)}
        return m===0 ? time : String(m) + ":" + ('000000'+s).slice(-6);
    }

    function loadTimes() {
        var player_id = "STEAM_1:0:18890328"
        var requestURL = 'https://kztimerglobal.com/api/v2/records/top/recent?steam_id='+player_id+'&has_teleports=false&tickrate=128&stage=0&modes_list_string=kz_timer&limit=1000';
        fetch(requestURL)
            .then(response => response.json())
            .then(data => data.filter(el => maps.includes(el["map_name"])))
            .then(data => data.map(el => {
                var tier = Math.floor(maps.indexOf(el["map_name"])/5)+1;
                var time = convTime(el["time"]);
                return {...el, tier:tier, time:time}}))
            .then(data => setTimes([...times, {[player_id]: data}]));
        return requestURL;
    }

    return (
        <div>
            <h3>KZ Tourney</h3>
            <button onClick={() => loadTimes()}>Load</button>
            {times.map(player_data => (
                <div className="table_container">
                    <h5>{Object.keys(player_data)[0]}</h5>
                    <DataTable data={player_data}/>
                </div>
            ))}
        </div>
    );
};
export default KZTourney;