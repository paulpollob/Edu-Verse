import React, { useEffect, useState } from 'react';
import { MdOutlineAssignment } from "react-icons/md";




const Quiz = ({ task }) => {
    // console.log("HK time ", task.createTime)
    return (
        <div className='shadow-md cursor-pointer border rounded-lg p-5 flex items-center gap-4'>
            <div className='text-slate-50 bg-blue-400 rounded-full p-2 text-3xl '><MdOutlineAssignment /></div>
            <div className='w-full flex flex-col gap-2'>
                <h1 className='font-bold my-0'>{task.quizTitle}</h1>
                <div className='flex justify-between'>
                    <small>Assigned on: {`${task.createTime[0]}:${task.createTime[1]} ${task.createTime[3]}/${task.createTime[4]}/${task.createTime[5]}`}</small>
                    <small>Dead Line: {`${task.Deadline[0]}:${task.Deadline[1]} ${task.Deadline[3]}/${task.Deadline[4]}/${task.Deadline[5]}`}</small>
                </div>
            </div>
        </div>
    );
};


export const Assignment = ({ asgnmnt }) => {
    // console.log("HK time ", task.createTime)
    const [expand, setExpand] = useState(false);
    const [ans, setAns] = useState(null)


    useEffect(() => {
        fetch('http://localhost:5000/getAssignmentAns',
            {
                method: 'POST',
                body: JSON.stringify({ "classID": asgnmnt.classID, "assignmentID": asgnmnt._id }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => {setAns(data);console.log("HK: ", data, " for: ", asgnmnt.title)})
    }, [])



    return (
        <div className='flex flex-col'>
            <div onClick={() => setExpand(!expand)} className='shadow-md cursor-pointer border rounded-lg p-5 flex items-center gap-4'>
                <div className='text-slate-50 bg-blue-400 rounded-full p-2 text-3xl '><MdOutlineAssignment /></div>
                <div className='w-full flex flex-col gap-2'>
                    <h1 className='font-bold my-0'>{asgnmnt.title}</h1>
                    <div className='flex justify-between'>
                        <small>Assigned on: {`${asgnmnt?.createTime?.[0]}:${asgnmnt?.createTime?.[1]} ${asgnmnt?.createTime?.[3]}/${asgnmnt?.createTime?.[4]}/${asgnmnt?.createTime?.[5]}`}</small>
                        <small>Dead Line: {`${asgnmnt?.deadline?.[0]}:${asgnmnt?.deadline?.[1]} ${asgnmnt?.deadline?.[3]}/${asgnmnt?.deadline?.[4]}/${asgnmnt?.deadline?.[5]}`}</small>
                    </div>
                </div>
            </div>
            <div className={`flex shadow-md ${expand ? 'p-5 h-auto' : 'h-0 p-0'} overflow-hidden`}>
                <div className='w-8/12'>
                    <h1 className='text-sm font-bold border-b-2 py-3'>Description</h1>
                    <small className='text-justify'>{asgnmnt.description}</small>
                </div>
                <div>
                    <div className='w-full flex flex-col mx-5'>
                        <h1 className='border-b-2 my-5'>Total Submit:{ans?.response?.length}</h1>
                        <button onClick={()=>document.getElementById('Submission').showModal()} className='btn btn-outline px-0 py-0'>View Submission</button>
                    </div>
                </div>
            </div>
            <Submission></Submission>
        </div>
    );
};



const Submission = () => {

   
    return (
        <dialog id="Submission" className="modal modal-bottom  ">
            <div className="modal-box bg-slate-50 ">
                
                <div className="modal-action">
                    <form method="dialog" className='w-full flex justify-between'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline">Close</button>
                        <button o  className="btn btn-outline" >Submit</button>
                    </form>
                </div>
            </div>
            
        </dialog>
    )
}



export default Quiz;