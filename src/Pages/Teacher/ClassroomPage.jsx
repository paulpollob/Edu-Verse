import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegNewspaper } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { FaNewspaper } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";





const ClassroomPage = () => {
    return (
        <div>
            <Head></Head>
        </div>
    );
};

const Head = () => {
    return (
        <div className='flex justify-center items-center h-full w-full border rounded py-5 gap-3 divide-x'>
            <Link>
                <div className='flex gap-3 items-center  '>
                    <FaRegNewspaper />
                    <h1>Annoucement</h1>
                </div>
            </Link> 
            <Link>
                <div className='flex gap-3 items-center  ms-3'>
                    <FaTasks />
                    <h1>Task</h1>
                </div>
            </Link>
            <Link>
                <div className='flex gap-3 items-center ms-3'>
                    <FaTasks />
                    <h1>Task</h1>
                </div>
            </Link>

 
            
        </div>
    )
}

export default ClassroomPage;