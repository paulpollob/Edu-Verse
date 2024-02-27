
import { Link, Outlet } from 'react-router-dom';
import LeftSideBar from './LeftSidebar';
import { IoChatbubblesSharp } from "react-icons/io5";
import { useContext } from 'react';
import { Context } from '../../Context/EduContext';
import TcNavbar from './components/TcNavbar';
import Load from '../../Load';


const TeacherMain = () => {

    const { userLoading } = useContext(Context)
    // setTeacherID("LsTJNrf5KPgKXAPZ7ckHLpNMKGa2")

    return (
        <div>
            {userLoading ? <Load></Load> : <div className='min-w-screen p-10  min-h-screen rounded-lg'>
                <TcNavbar></TcNavbar>
                <div className=' flex gap-10 '>
                    <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
                    <div className='w-8/12 bg-slate-50 rounded-xl p-10 h-[38rem]'><Outlet></Outlet></div>

                </div>
            </div>}
        </div>
    );
};

export default TeacherMain;