import React from 'react';
import CardRecording from '../components/CardRecording';

import Crazy from '../assets/recordings/Crazy.mpeg';
import Glueck from '../assets/recordings/Glueck_und_Segen.mpeg';
import Lullaby from '../assets/recordings/Lullaby.mpeg';

const Recordings = () => {
    var data = [Crazy, Glueck, Lullaby];
    var elements = [];
    for(var i =0; i<data.length; i++) {
        elements.push(<CardRecording name={data[i]} key={i}/>)
    }

    return (
        <div className='flex-center'>
            {elements}
        </div>
    );
};
export default Recordings;