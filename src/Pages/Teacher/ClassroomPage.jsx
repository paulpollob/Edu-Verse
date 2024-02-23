import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaRegNewspaper } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { FaNewspaper } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import Annoucement from './Annoucement';
import Task from './Task';
import People from './People';


 


const ClassroomPage = (props) => {
    const [page, setPage] = useState(1);
    const location = useLocation();
    // const location = props 


 
    return (
        <div className='h-full'>
            <Head setPage={setPage}></Head>
            <div className='h-5/6'>
                {/* {"class id: " + location.state} */}
                {(page == 1) && <Annoucement classID={location.state}  ></Annoucement>}
                {(page == 2) && <Task classID={location.state}></Task>}
                {(page == 3) && <People></People>}
            </div>
        </div>
    );
};

const Head = ({ setPage }) => {

    return (
        <div className='shadow flex justify-center items-center h-3/10 w-full mb-5 border rounded py-5 gap-3 divide-x'>
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

export default ClassroomPage;