import React, { useContext, useState } from 'react';
import { Context } from '../../Context/EduContext';
import { Link } from 'react-router-dom';

const ChatHome = () => {
    const [loading, setLoading] = useState(false);
    const { tcLeftRoute, setTcLeftRoute } = useContext(Context);
    const [insrtScrn, setInsrtScrn] = useState(false)
    setTcLeftRoute(2);
    return (
        <div className='flex gap-5 justify-center items-center w-full h-full'>
            <Link to={"/ask/video"}>
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
            </Link>
        </div>
    );
};

export default ChatHome;