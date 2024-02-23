import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/EduContext';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';


const StClassroom = () => {

    const { leftRoute, setLeftRoute, teacherID, user } = useContext(Context);
    const [insrtScrn, setInsrtScrn] = useState(false)
    const [classes, setClasses] = useState([])
    const [updated, setUpdated] = useState(false)
    setLeftRoute(1);


 

    useEffect(() => {
        fetch('http://localhost:5000/getStClasses',
            {
                method: 'POST',
                body: JSON.stringify({ "email": user?.email }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => {setClasses(data)})
    }, [])

    return (
        <div className='select-none relative flex flex-col  w-full  h-full bg-slate-50     text-slate-600 p-3  rounded-xl'>
            <div className='w-full grid grid-cols-3 gap-5 h-full  overflow-auto scroll-m-6'>
                {
                    
                    classes.map((cls) =>
                        <Class key={cls._id} _id={(cls._id).toString()} image={cls.image} title={cls.title} code={cls.code} section={cls.section} room={cls.room}></Class>
                    )
                }

            </div>
            <div>{!classes.length && <img className='w-full h-full' src='https://i.ibb.co/bF3sYFd/noClass.png'></img>}</div>
            {/* <Form insrtScrn={insrtScrn} setInsrtScrn={setInsrtScrn} updated={updated} setUpdated={setUpdated}></Form> */}
        </div>
    );
};




const Class = ({ _id, image, title, code, section, room }) => {
    const navigate = useNavigate();
    const pathName = '/st/classroom/Home'
    const location = useLocation();
    const handleClick = (event) => {

        navigate(pathName, { state: _id }) ///

    };
    return (
        <div onClick={handleClick} >
            <div className='cursor-pointer select-none bg-slate-500 h-64 text-slate-50 rounded-xl border'>
                <img className='rounded-xl h-40 w-full' src={image}></img>
                <div className='-translate-y-5 text-center flex flex-col items-center justify-center'>
                    <h1 className='font-bold bg-slate-400 rounded-full p-2 text-center inline -translated-y-10'>{title}</h1>
                    <small className=''>course code: {code}</small>
                    <small className=''>course credit: 5</small>
                </div>
                <hr className='border-1'></hr>
                <div className='px-2 float-right'><small>10 people</small></div>
            </div>
        </div>
    );
}


   

export default StClassroom;




// bishujana swami maharaj kirtan ?