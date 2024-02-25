import React, { useContext, useState } from 'react';
import { AiTwotoneHome, AiFillSchedule, AiTwotoneStar, AiTwotoneVideoCamera } from 'react-icons/ai'
import { SiGoogleclassroom } from 'react-icons/si'
import { CgLoadbarDoc } from 'react-icons/cg'
import { FaGamepad, FaSignOutAlt } from 'react-icons/fa'
import { GiPublicSpeaker } from 'react-icons/gi'
import { Context } from '../../../Context/EduContext';
import { Link, useNavigate } from 'react-router-dom';

import student from './../../../assets/images/student.png'
import home from './../../../assets/images/home.png'
import ai from './../../../assets/images/ai.png'
import classroom from './../../../assets/images/classroom.png'


const StLeftSideBar = () => {

    const { leftRoute } = useContext(Context)

    return (
        <div>
            <div className='flex text-slate-600 flex-col items-center'>
                <img className='rounded-xl   mb-2 w-44 h-30' src={student}></img>
            </div>

            <hr className='border-1 mb-3 border-slate-400'></hr>

            <div className='flex  flex-col text-slate-600'>
                <Link to={'/st/'} className={`${leftRoute == 0 && 'bg-slate-50 '} rounded-lg py-2 px-5 hover:bg-slate-200  cursor-pointer	 flex items-center gap-6 font-bold`}>
                <img src={home} className='w-12 h-12' alt='not found' />
                    <h2>Home</h2>
                </Link>

                <Link to={'/st/Classroom'} className={`${leftRoute == 1 && 'bg-slate-50 '} rounded-lg py-2 px-5 hover:bg-slate-200  cursor-pointer	 flex items-center gap-6 font-bold`}>
                <img src={classroom} className='w-12 h-12' alt='not found' />

                    <h2>Classroom</h2>
                </Link >

                <hr className='border-1 mt-5 border-slate-400'></hr>

                <Link className="mt-2" to={'/ask'}><div className={`${leftRoute == 2 && ' bg-slate-50 '} rounded-lg hover:bg-slate-200  cursor-pointer	 flex items-center  font-bold`}>
                    {/* <PiChatCircleBold className='w-7 h-7'/> */}
                    <img src={ai} className='w-28 h-28 mt-[-16px]' alt='not found' />
                    <h2>Query</h2>
                </div>
                </Link>

                {/* <div onClick={logOute} className={`${leftRoute == 8 && 'bg-slate-50 '} rounded-lg py-2 px-5 hover:bg-slate-200  cursor-pointer	 flex items-center gap-6 font-bold`}>
                    <FaSignOutAlt className='w-7 h-7' />
                    <h2>{loading ? <span className="loading loading-ring loading-lg"></span> : "Sign Out"}</h2>
                </div> */}
            </div>
        </div>

    );
};

export default StLeftSideBar;