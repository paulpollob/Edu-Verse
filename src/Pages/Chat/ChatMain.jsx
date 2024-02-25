import React from 'react';
import LeftSideBar from '../Teacher/LeftSidebar';
import { Link, Outlet } from 'react-router-dom';
import { IoChatbubblesSharp } from "react-icons/io5";
import TcNavbar from '../Teacher/components/TcNavbar';


const ChatMain = () => {
    return (
        <div className='p-5 min-w-screen min-h-screen rounded-lg bg-white'>
            <TcNavbar></TcNavbar>
            <div className=' flex gap-10'>
                <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
                <div className='w-8/12 h-[85vh]  bg-slate-50 rounded-xl p-10'><Outlet></Outlet></div>
            </div>
        </div>
    );
};

export default ChatMain;