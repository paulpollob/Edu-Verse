import React, { useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaRegNewspaper } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { FaNewspaper } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import StAnnoucement from './StAnnoucement';
import StTask from './StTask';
import StPeople from './StPeople';


 


const StClassroomPage = (props) => {
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    let pathname = location.pathname;
    pathname = pathname.replace("Home", "")
    if(location.state === null) return <Navigate to={pathname} ></Navigate> 


    
    return (
        <div className='h-full'>
            <Head setPage={setPage}></Head>
            <div className='h-5/6'>
                {"class id: " + location.state}
                {(page == 1) && <StAnnoucement classID={location.state}  ></StAnnoucement>}
                {(page == 2) && <StTask classID={location.state}></StTask>}
                {(page == 3) && <StPeople></StPeople>}
            </div>
        </div>
    );
};

const Head = ({ setPage }) => {

    return (
        <div className='flex justify-center items-center h-3/10 w-full mb-5 border rounded py-5 gap-3 divide-x'>
            <div className='cursor-pointer' onClick={() => setPage(1)} >
                <div className='flex gap-3 items-center  '>
                    <FaRegNewspaper />
                    <h1>Annoucement</h1>
                </div>
            </div>
            <div className='cursor-pointer' onClick={() => setPage(2)} >
                <div className='flex gap-3 items-center  ms-3'>
                    <FaTasks />
                    <h1>Task</h1>
                </div>
            </div>
            <div className='cursor-pointer' onClick={() => setPage(3)} >
                <div className='flex gap-3 items-center ms-3'>
                    <FaTasks />
                    <h1>Task</h1>
                </div>
            </div>



        </div>
    )
}

export default StClassroomPage;