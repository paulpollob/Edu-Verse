import React, { useContext, useEffect, useState } from 'react';
import stopCam from './../../assets/images/stopCam.png';
import OpenCam from './../../assets/images/OpenCam.png';

const Attendence = () => {

    const start = async () => {
        await fetch('/start_video');
        var video = document.getElementById('video');
        video.src = "{{ url_for('video_feed') }}";
    }
    const stop = async () => {
        await fetch('/stop_video');
        document.getElementById('video').src = ""
    }
    return (
        // <div className='flex  justify-around h-full w-full items-center'>
        //     <div onClick={() => start()} className='border rounded flex flex-col items-center'>
        //         <img className='h-40' src={OpenCam} />
        //         <h1>Open Camera</h1>
        //     </div>
        //     <div onClick={ stop } className='border rounded flex flex-col items-center'>
        //         <img className='h-40' src={stopCam} />
        //         <h1>Close Camera</h1>
        //     </div>
        // </div>
        <div className='w-full h-full'>
            <iframe className='w-full h-full' src='http://localhost:8001/initialize'></iframe>
        </div>
    )
}


export default Attendence;


 