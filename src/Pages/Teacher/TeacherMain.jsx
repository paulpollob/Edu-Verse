
import { Link, Outlet } from 'react-router-dom';
import LeftSideBar from './LeftSidebar';
import { IoChatbubblesSharp } from "react-icons/io5";


const TeacherMain = () => {
    return (
        <div className=' flex gap-10 p-10 min-w-screen min-h-screen rounded-lg'>
            <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
            <div className='w-8/12 bg-slate-50 rounded-xl p-10'><Outlet></Outlet></div>
            <Link to={'/ask'}>
                <div className='text-blue-400 hover:text-blue-500 text-5xl fixed bottom-20 right-28'>
                    <IoChatbubblesSharp />
                </div>
            </Link>
        </div>
    );
};

export default TeacherMain;