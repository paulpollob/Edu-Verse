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
 
    console.log("HK location from: ", location)
    return (
        <div>
            <Head setPage={setPage}></Head>
            {"class id: "+location.state}  
            {(page==1) && <Annoucement></Annoucement>}
            {(page==2) && <Task classID={location.state}></Task>}
            {(page==3) && <People></People>}
        </div>
    );
};

const Head = ({ setPage }) => {

    return (
        <div className='flex justify-center items-center h-full w-full border rounded py-5 gap-3 divide-x'>
            <div className='cursor-pointer' onClick={ ()=>setPage(1) } >
                <div className='flex gap-3 items-center  '>
                    <FaRegNewspaper />
                    <h1>Annoucement</h1>
                </div>
            </div> 
            <div className='cursor-pointer' onClick={ ()=>setPage(2) } >
                <div className='flex gap-3 items-center  ms-3'>
                    <FaTasks />
                    <h1>Task</h1>
                </div>
            </div>
            <div className='cursor-pointer' onClick={ ()=>setPage(3) } >
                <div className='flex gap-3 items-center ms-3'>
                    <FaTasks />
                    <h1>Task</h1>
                </div>
            </div>

 
            
        </div>
    )
}

export default ClassroomPage;