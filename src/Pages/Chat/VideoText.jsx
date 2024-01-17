import React from 'react';

const VideoText = () => {
    return (
        <div>
            <LoadVideo/>
        </div>
    );
};


const LoadVideo = ()=>{
    const saveEvent = (e)=>
    {
        e.preventDefault();
    }
    return (
        <div className='border rounded-lg px-2 py-2 w-full'>
            <h1>Load your Video first.</h1>
            <div className='w-full'>
                <form onSubmit={(e)=>saveEvent(e)} className='w-full flex justify-center items-center'>
                    <input className='rounded-lg my-5' type='text' placeholder='youtube video link...'/>
                    <button type='submit' className="border-lg px-5 py-2  items-center m-0 ">Info</button>
                    <h1></h1>
                </form>
            </div>
        </div>
    )
}

export default VideoText;