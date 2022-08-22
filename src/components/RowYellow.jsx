import React from 'react';
import { useState } from 'react';

const RowYellow = ({number}) => {
    const [checkedState, setCheckedState] = useState(new Array(5).fill(false));

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );  
        setCheckedState(updatedCheckedState);
    }

    return (
        <div className="row rows-yellows">
            <input type="text" maxLength="1" name="yellow0" className="ivAnOY"/>
            {[...Array(5).keys()].map(function(i) {
                return <input type="checkbox" className='cb-yellows' key={i} id={`yellows${number}${i}`}/>
            })}
        </div>
    );
};
export default RowYellow;