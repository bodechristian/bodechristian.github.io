import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const CardRecording = ({name}) => { 
    // Get last entry in path (filename) and then get the name (the string before the 1st .)
    var rec_name = name.split("/")[3].split(".")[0];
    return (
        <div className='flex-center card-audio'>
            <label>{rec_name}</label>
            <ReactAudioPlayer src={name} controls/>
        </div>
    );
};
export default CardRecording;