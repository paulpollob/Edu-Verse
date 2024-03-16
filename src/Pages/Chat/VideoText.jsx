import React, { useContext, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { Context } from '../../Context/EduContext';
import botlogo from '../../assets/images/gchat.png'

const VideoText = () => {
    const { tcLeftRoute, setTcLeftRoute } = useContext(Context);
    setTcLeftRoute(2);
    const [loading, setLoading] = useState(false);
    const [msges, setMsges] = useState([])
    const [connected, setConnected] = useState(false);

    return (
        <div className='h-full relative rounded'>
            <div className='absolute w-full h-full'>
                <LoadVideo loading={loading} setLoading={setLoading} connected={connected} setConnected={setConnected} msges={msges} setMsges={setMsges}></LoadVideo>

                <div className='w-full border my-3'></div>

                <div className='relative'>
                    <Chat msges={msges} setMsges={setMsges}></Chat>
                    {!connected && <div className='absolute rounded-lg opacity-80 top-0 bg-slate-600 w-full h-full'></div>}
                </div>
            </div>

            {
                loading && 
                <div className='absulate rounded-lg opacity-90 top-0 bg-slate-50 w-full h-full flex justify-center items-center'>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            }

            
        </div>
    );
};


const LoadVideo = ({ connected, setConnected, loading, setLoading, msges, setMsges }) => {

    const [url, setUrl] = useState()
    const [upload, setUpload] = useState(true)
    const [flg, setFlg] = useState(0);

    useEffect(() => {



        const load = () => {
            fetch('http://localhost:8000/load_YoutubeText',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "url": url })
                })
                .then(res => res.json())
                .then((data) => { 
                    if (data.error){
                        alert("Server Error:", data.error);
                        setLoading(false); 
                        return;
                    }
                    setConnected(data.success);
                    setLoading(false); 
                    setMsges([]); 
                })
                .catch((error) => {alert("Server Error:", error); setLoading(false);});
        }
        if (flg != 0) load()




    }, [flg])


    const saveEvent = (event) => {
        event.preventDefault();
        setLoading(true)
        const url = event.target.input.value;
        setUrl(url);
        setUpload(!upload);
        setFlg(flg + 1)


    }

    const editEvent = (event) => {
        event.preventDefault();
        setUpload(!upload);
        setConnected(false);
    }
    return (
        <div className='bordder rounded-lg px-2 py-2 w-full'>
            <div className='w-full'>
                <form className='w-full flex ' onSubmit={upload ? saveEvent : editEvent}>
                    <input name='input' type='text' placeholder='youtube video link...' className='border-none rounded-s-lg bg-blue-50 text-slate-900' disabled={upload ? false : true} />
                    <button type='submit' className='border rounded-none rounded-e-lg bg-blue-50 text-slate-900 px-5 '>{upload ? "Upload Video Link" : "Edit Link"}</button>
                </form>
            </div>

        </div>
    )
}


const Chat = ({msges, setMsges}) => {


    const [loading, setLoading] = useState(false);
    const [flg, setFlg] = useState(0);
    const send = (event) => {
        event.preventDefault();
        const msg = event.target.msg;
        setLoading(true);
        setMsges([...msges, { "type": "question", "details": msg.value }])
        setFlg(flg+1)
        msg.value = ""
    }
    useEffect(() => {
        const msg = () => {
            fetch('http://localhost:8000/chat_Youtubegemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'user': msges[msges.length - 1]?.details })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.error){
                        alert("Server Error:", data.error);
                        setLoading(false); 
                        return;
                    }
                    setMsges([...msges, { 'type': 'answer', 'details': data.output_text }]); 
                    setLoading(false) 
                })
                .catch((error) => {alert("Server Error:", error); setLoading(false);});

        }

        if (flg != 0) msg();



    }, [flg]);



    return (
        <div className='flex flex-col items-center justify-end border h-96 rounded-lg'>
            <div id='chat' className=' flex flex-col w-full h-full overflow-auto scroll-m-6 p-6 '>

                <CreateMsg msges={msges} loading={loading}></CreateMsg>

            </div>
            <form onSubmit={send} className=' p-5 flex justify-between items-center gap-3 w-full'>
                <img className='rounded-full h-10 w-10' src='https://i.ibb.co/KzC49TW/good-Education.png'></img>
                <input name='msg' type='text' placeholder='Write Your Message...' className='border rounded-lg w-full' />
                <button type='submit' className='focus:border-0 border-1 text-3xl'><IoSend /></button>
            </form>
        </div>
    );
};

const CreateMsg = ({ msges, loading }) => {
    return (
        <div className='flex flex-col gap-4 h-full'>
            {
                msges.map((msg) => {
                    if (msg.type == "question")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-end gap-3'>
                                <div className='rounded-lg text-white flex justify-end  text-justify bg-blue-500 text-balance max-w-lg    p-2'>
                                    {msg.details}
                                </div>
                                <img className='h-10 w-10 rounded-full' src='https://i.ibb.co/KzC49TW/good-Education.png' />
                            </div>
                        )
                    else if (msg.type == "answer")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-start'>
                                <img className='h-10 w-10 rounded-full' src={botlogo} alt='no img' />

                                <div className='rounded-lg text-white flex justify-start  text-justify text-balance p-2 bg-blue-500 max-w-lg'>
                                    {msg.details}
                                </div>
                            </div>
                        )

                })
            }
            {
               loading && <div className='w-full flex justify-start py-5 gap-3'>
                    <img className='h-10 w-10 rounded-full' src={botlogo} alt='no img' />

                    <span className="loading loading-dots loading-md"></span>
                </div>
            }
        </div>
    )
}


export default VideoText;