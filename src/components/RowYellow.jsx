import React from 'react';
import { useState } from 'react';

const RowYellow = ({number, handle, handleCB, letters}) => {
    const [checkedState, setCheckedState] = useState(new Array(5).fill(false));

    return (
        <div className="row rows-yellows">
            <input type="text" maxLength="1" name="yellow0" className="ivAnOY" position={number} value={letters[number]} onChange={handle}/>
            {[...Array(5).keys()].map(function(i) {
                return <input type="checkbox" className='cb-yellows' key={i} id={`yellows${number}${i}`} onChange={(e) => handleCB(number, i)}/>
            })}
        </div>
    );
};
export default RowYellow;