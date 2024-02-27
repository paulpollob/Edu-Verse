import { Collapse } from 'flowbite';
import React, { createElement, useContext, useEffect, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { Context } from '../../Context/EduContext';
import logoo from '../../assets/images/gchat.png'
// const [msges, setMsges] = useState([{}])


const send = (event, msges, setMsges, flg, setFlg, setLoading) => {
    event.preventDefault();
    const i = event.target.children[1]
    const question = i.value;
    i.value = ''
    setLoading(true)

    setMsges([...msges, { 'type': 'question', 'details': `${question}` }])
    setFlg(flg + 1)
    // const section = document.getElementById("hk");
    //     section.scrollIntoView({ behavior: 'smooth' });
}



const Chat = () => {

    const [loading, setLoading] = useState(false);
    const { tcLeftRoute, setTcLeftRoute } = useContext(Context);
    const [insrtScrn, setInsrtScrn] = useState(false)
    setTcLeftRoute(2);

    const [flg, setFlg] = useState(0);
    const [msges, setMsges] = useState([])
    useEffect(() => {
        const msg = () => {
            fetch('http://localhost:8000/chatGemini', {
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
                    setMsges([...msges, { 'type': 'answer', 'details': data }]); setLoading(false) 
                })
                .catch((error) => {alert("Server Error:", error); setLoading(false);});
        }
        if (flg != 0) msg();
    }, [flg]);

    return (
        <div className='flex flex-col items-center justify-end border h-full'>
            <div id='chat' className=' flex flex-col w-full h-full overflow-auto scroll-m-6 p-6 '>
                <From msges={msges} loading={loading}></From>
            </div>
            <form onSubmit={(e) => send(e, msges, setMsges, flg, setFlg, setLoading)} className=' p-5 flex justify-between items-center gap-3 w-full'>
                <img className='rounded-full h-10 w-10' src={logoo}></img>
                <input type='text' placeholder='Write Your Message...' className='border rounded-lg w-full' disabled={loading}/>
                <button type='submit' className='focus:border-0 border-1 text-3xl'><IoSend /></button>
            </form>
        </div>
    );
};

const From = ({ msges, loading }) => {
    return (
        <div className='w-full'>
            {
                msges.map(msg => {
                    if (msg.type == "question")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-end gap-3'>

                                <div className='rounded-lg text-white flex justify-end  text-justify bg-blue-500 text-balance max-w-lg    p-5'>
                                    {msg.details}
                                </div>
                                <img className='h-10 w-10 rounded-full' src='https://i.imgur.com/asLPUCK.jpg' />
                            </div>
                        )
                    else if (msg.type == "answer")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-start py-5 gap-3'>
                                <img className='h-10 w-10 rounded-full' src={logoo} alt='no img' />

                                <div className='rounded-lg text-white flex justify-start  p-5 text-justify bg-blue-500 max-w-lg'>
                                    {msg.details}
                                </div>
                            </div>
                        )
                })
            }
            {
               loading && <div className='w-full flex justify-start py-5 gap-3'>
                    <img className='h-10 w-10 rounded-full' src={logoo} alt='no img' />

                    <span className="loading loading-dots loading-md"></span>
                </div>
            }
        </div>
    )
}

export default Chat;


// Collapse
// history
// 