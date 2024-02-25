
import home from './../../assets/images/home.png'
import classroom from './../../assets/images/classroom.png'
import teacherr from './../../assets/images/teacherr.png'
import ai from './../../assets/images/ai.png'
import { useContext, useState } from 'react';
import { Context } from '../../Context/EduContext';
import { Link, useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
    const { tcLeftRoute} = useContext(Context)
    return (
        <div>
            <div className='flex gap-3 text-slate-600 flex-col items-center'>
                <img className='rounded-xl   w-36 h-36' src={teacherr}></img>
            </div>

            <hr className='border-1 mb-3 border-slate-400'></hr>

            <div className='flex  flex-col text-slate-600 '>
                <Link to={'/tc/'}><div className={`${tcLeftRoute == 0 && 'bg-slate-50 '} rounded-lg py-2 px-5 hover:bg-slate-200  cursor-pointer	 flex items-center gap-6 font-bold`}>
                    {/* <AiTwotoneHome className='w-7 h-7' /> */}
                    <img src={home} className='w-12 h-12' alt='not found' />
                    <h2>Home</h2>
                </div>
                </Link>

                <Link to={'/tc/classroom/'}><div className={`${tcLeftRoute == 1 && 'bg-slate-50 '} rounded-lg py-2 px-5 hover:bg-slate-200  cursor-pointer	 flex items-center gap-6 font-bold`}>
                    {/* <SiGoogleclassroom className='w-7 h-7' /> */}
                    <img src={classroom} className='w-12 h-12' alt='not found' />
                    <h2>Classroom</h2>
                </div>
                </Link>

                <hr className='border-1 mt-5 border-slate-400'></hr>

                <Link to={'/ask'}><div className={`${tcLeftRoute == 2 && 'mt-2 bg-slate-50 '} rounded-lg hover:bg-slate-200  cursor-pointer	 flex items-center  font-bold`}>
                    {/* <PiChatCircleBold className='w-7 h-7'/> */}
                    <img src={ai} className='w-28 h-28 mt-[-16px]' alt='not found' />
                    <h2>Query</h2>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default LeftSideBar;