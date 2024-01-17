import React from 'react';
import LeftSideBar from '../Teacher/LeftSidebar';
import { Link, Outlet } from 'react-router-dom';
import { IoChatbubblesSharp } from "react-icons/io5";


const ChatMain = () => {
    return (
        <div className=' flex gap-10 p-10 min-w-screen min-h-screen rounded-lg'>
            <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
            <div className='w-8/12 h-[85vh]  bg-slate-50 rounded-xl p-10'><Outlet></Outlet></div>
        </div>
    );
};

export default ChatMain;