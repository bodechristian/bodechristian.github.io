import React, { useEffect } from 'react';
import { useState } from 'react';
import DataTable from '../components/DataTable';

const KZTourney = () => {
    // Final Act
    var maps = ["kz_twiivo", "kz_antiquity", "kz_village", "kz_woodstock_v2", "kz_terablock",
                "kz_bacho", "kz_dam", "kz_summercliff2_go", "kz_cdr_myst", "kz_hellinashop",
                "kz_arrebol", "kz_megalodon", "kz_camembert", "kz_module", "kz_forchi",
                "kz_dzy_reach_v2", "kz_haste", "kz_shark_gc", "kz_lume", "kz_mandelbrot",
                "kz_okaychamp", "kzpro_gull_pidr_reborn", "kz_hitech", "kz_techtonic_v2_ldr", "bkz_apricity_v3"];
    
    const [times, setTimes] = useState([]); // [{name1: [{map:kz_a, time:5...}, {...}, ...]}, {name2: ...}, ...]
    const [playername, setPlayername] = useState("STEAM_1:0:18890328");
    const [mapIDName, setMapIDName] = useState({});
    const [fastestPlayer, setFastestPlayer] = useState({})

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

    function addPlayer() {
        if(playername.startsWith("STEAM") && !Object.keys(mapIDName).includes(playername)) {
            fetch("https://kztimerglobal.com/api/v2/players?steam_id=" + playername)
                .then(response => response.json())
                .then(data => setMapIDName({...mapIDName, [playername]:data[0]["name"]}))
                .then(() => loadTimes(playername));
        } else if(!Object.values(mapIDName).includes(playername) && playername) {
            // DOESNT WORK WELL... USE STEAM ID
            return ;
            var requestURL = "https://kztimerglobal.com/api/v2/players?name=" + playername
            fetch(requestURL)
                .then(response => response.json())
                .then(data => {setMapIDName({...mapIDName, [data[0]["steam_id"]]:data[0]["name"]}); return data;})     
                .then(data => loadTimes(data[0]["steam_id"]));   
        } else {
            return ;
        }
    }
    
    function loadTimes(id) {
        var requestURL = 'https://kztimerglobal.com/api/v2/records/top?steam_id='+id+'&has_teleports=false&tickrate=128&stage=0&modes_list_string=kz_timer&limit=1000';
        fetch(requestURL)
            .then(response => response.json())
            .then(data => data.filter(el => maps.includes(el["map_name"])))
            .then(data => data.map(el => {
                var tier = Math.floor(maps.indexOf(el["map_name"])/5)+1;
                var time = convTime(el["time"]);
                return {...el, tier:tier, time:time}})) 
                // add unplayed maps
            .then(data => {
                var unplayedMaps = maps.filter(el => !data.map(x => x["map_name"]).includes(el))
                unplayedMaps = unplayedMaps.map(aMap => {return {"map_name": aMap}})
                data = [...data, ...unplayedMaps];
                return data})
            .then(res => {
                // create list of fastest times to highlight
                let data = {};
                let result = {};
                maps.forEach(map => {data[map] = 10000; result[map] = ""});
                res = [...times, {"id": id, "runs": res}];

                res.forEach(player => {
                    player["runs"].forEach(run => {
                        if(unconvTime(run["time"]) < data[run["map_name"]]) {
                            result[run["map_name"]] = run["player_name"];
                            data[run["map_name"]] = unconvTime(run["time"]);
                        }
                    
                    })   
                })
                setFastestPlayer(result);
                return res;})
            .then(data => setTimes(data));
        return requestURL;
    }

    return (
        <div>
            <h3>Final Act</h3>
            <div className='row_addplayer form-inline'>
                <input className='form-control' type="text" value={playername}
                        onChange={(a) => setPlayername(a.target.value)} placeholder="STEAM_1:0:18890328"/>
                <button className='btn-primary btn' onClick={() => addPlayer()}>Add</button>
            </div>
            <div className='tables_container'>
                {times.map((player_data, i) => (
                    <div className="table_container" key={i}>
                        <h5>{mapIDName[player_data.id]}</h5>
                        <DataTable data={player_data} team={mapIDName[player_data.id]} 
                                fastestTeams={fastestPlayer} doTier={true} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default KZTourney;