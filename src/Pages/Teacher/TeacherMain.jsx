
import { Link, Outlet } from 'react-router-dom';
import LeftSideBar from './LeftSidebar';
import { IoChatbubblesSharp } from "react-icons/io5";


const TeacherMain = () => {
    return (
        <div className=' flex gap-10 p-10 min-w-screen min-h-screen rounded-lg'>
            <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
            <div className='w-8/12 bg-slate-50 rounded-xl p-10 h-[38rem]'><Outlet></Outlet></div>
 
        </div>
    );
};

export default TeacherMain;