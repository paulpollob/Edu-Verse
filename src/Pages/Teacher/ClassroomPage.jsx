import React, { useEffect, useState } from 'react';
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
    const [classInfo, setClassInfo] = useState(null)
    // const location = props 

    const classID = location.state;


    useEffect(() => {
        fetch('http://localhost:5000/getClassInfo',
            {
                method: 'POST',
                body: JSON.stringify({ classID }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => { console.log("HK class info: ", data); setClassInfo(data) })
    }, [])


    return (
        <div className='h-full'>
            <Head classInfo={classInfo} setPage={setPage}></Head>
            <div className='h-5/6'>
                {/* {"class id: " + location.state} */}
                {(page == 1) && <Annoucement classInfo={classInfo} classID={location.state}  ></Annoucement>}
                {(page == 2) && <Task classID={location.state}></Task>}
                {(page == 3) && <People></People>}
            </div>
        </div>
    );
};

const Head = ({ setPage, classInfo }) => {

    return (
        <div className='flex flex-col justify-between shadow  h-3/10 w-full border rounded divide-x'>
            {/* <div className='h-40 w-full'>
                <img className='h-full w-full' src={classInfo?.image} alt='img not found'></img>
            </div> */}
            <h1 className='font-bold'>{classInfo?.title}</h1>
            <div className='flex mb-5s py-5 gap-3 justify-center items-center  top-0'>
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



        </div>
    )
}

export default ClassroomPage;