
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
// <<<<<<< HEAD
        <div>
            {userLoading ? <Load></Load> : <div className='p-5 min-w-screen min-h-screen rounded-lg bg-white'>
                <TcNavbar></TcNavbar>
                <div className=' flex gap-5 '>
                    <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
                    <div className='w-10/12 bg-slate-100 rounded-xl p-10 h-[38rem]'><Outlet></Outlet></div>

                </div>
            </div>}
{/* =======
        <div> 
            {userLoading && <div className='p-5 min-w-screen min-h-screen rounded-lg bg-white'>
            <TcNavbar></TcNavbar>
            <div className=' flex gap-5 '>
                <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
                <div className='w-10/12 bg-teal-200 rounded-xl p-10 h-[38rem]'><Outlet></Outlet></div>
            </div>
        </div>}
>>>>>>> 1020f37ac971441f5328541b337416c457d4c516 */}
        </div>
    );
};

export default TeacherMain;