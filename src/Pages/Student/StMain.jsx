
import { Link, Outlet } from 'react-router-dom'; 
import { IoChatbubblesSharp } from "react-icons/io5";
import { useContext } from 'react'; 
import StLeftSideBar from './Components/StLeftSideBar';
import StRightSideBar from './Components/StRightSideBar';
import StNavbar from './Components/StNavbar'
import { Context } from '../../Context/EduContext';
import TcNavbar from '../Teacher/components/TcNavbar';


const StMain = () => {

	const {userLoading} = useContext(Context)

    return (
        <div>
			{userLoading&&<div className='p-5 min-w-screen min-h-screen rounded-lg bg-white'>
			<TcNavbar></TcNavbar>
			<div className='flex gap-5'>
				<div className='w-2/12'><StLeftSideBar></StLeftSideBar></div>
				<div className='bg-teal-200 rounded-xl w-10/12 p-10 h-[36rem]'><Outlet></Outlet></div>
				{/* <div className='w-2/12'><StRightSideBar></StRightSideBar></div> */}
			</div>
		</div>}
		</div>
    );
};

export default StMain;