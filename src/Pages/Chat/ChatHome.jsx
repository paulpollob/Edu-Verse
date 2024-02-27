import React, { useContext, useState } from 'react';
import { Context } from '../../Context/EduContext';
import { Link } from 'react-router-dom';
import chatvdo from '../../assets/images/chatvdo.png'
import chatpdf from '../../assets/images/chatpdf.png'
import gchat from '../../assets/images/gchat.png'

const ChatHome = () => {
    const [loading, setLoading] = useState(false);
    const { tcLeftRoute, setTcLeftRoute } = useContext(Context);
    const [insrtScrn, setInsrtScrn] = useState(false)
    setTcLeftRoute(2);
    return (
        <div className='flex gap-5'>
            
            <Link to={"/ask/video"} className="card w-56 bg-white shadow-xl">
                <figure className="">
                    <img src={chatvdo} alt="youtube" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Chat with youtube!</h2>
                </div>
            </Link>

            <Link to={'/ask/pdf'}  className="card w-56 bg-white shadow-xl">
                <figure className="">
                    <img src={chatpdf} alt="youtube" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Chat with pdf!</h2>
                </div>
            </Link>

            <Link to={'/ask/chat'} className="card w-56 bg-white shadow-xl">
                <figure className="">
                    <img src={gchat} alt="youtube" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">general Q&A!</h2>
                </div>
            </Link>

            {/* <Link to={"/ask/video"}>
                <div className='border p-5 flex rounded-lg'>
                    Chat with youtube
                </div>
            </Link>

            <Link to={'/ask/pdf'}>
                <div className='border p-5 flex rounded-lg'>
                    Chat with Pdf
                </div>
            </Link>

            <Link to={'/ask/chat'}>
                <div className='border p-5 flex rounded-lg'>
                    Chat
                </div>
            </Link> */}

        </div>
    );
};

export default ChatHome;