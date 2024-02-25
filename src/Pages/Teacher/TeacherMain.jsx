
import { Link, Outlet } from 'react-router-dom';
import LeftSideBar from './LeftSidebar';
import { IoChatbubblesSharp } from "react-icons/io5";
import { useContext } from 'react';
import { Context } from '../../Context/EduContext';
import TcNavbar from './components/TcNavbar';


const TeacherMain = () => {

    const { userLoading } = useContext(Context)
    // setTeacherID("LsTJNrf5KPgKXAPZ7ckHLpNMKGa2")

    return (
        <div> 
            {userLoading && <div className='p-5 min-w-screen min-h-screen rounded-lg bg-white'>
            <TcNavbar></TcNavbar>
            <div className=' flex gap-5 '>
                <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
                <div className='w-10/12 bg-teal-200 rounded-xl p-10 h-[38rem]'><Outlet></Outlet></div>
            </div>
        </div>}
        </div>
    );
};

export default TeacherMain;