import React, { useEffect, useState } from 'react';
import { MdOutlineAssignment } from "react-icons/md";
import { pdfjs } from 'react-pdf';




const Quiz = ({ task }) => {
    // console.log("HK time ", task.createTime)
    return (
        <div className='bg-white shadow-md cursor-pointer border rounded-lg p-5 flex items-center gap-4'>
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
            .then(data => { setAns(data); console.log("HK: ", data, " for: ", asgnmnt.title) })
    }, [])



    return (
        <div className='flex flex-col'>
            <div onClick={() => setExpand(!expand)} className='bg-white shadow-md cursor-pointer border rounded-lg p-5 flex items-center gap-4'>
                <div className='text-slate-50 bg-blue-400 rounded-full p-2 text-3xl '><MdOutlineAssignment /></div>
                <div className='w-full flex flex-col gap-2'>
                    <h1 className='font-bold my-0'>{asgnmnt.title}</h1>
                    <div className='flex justify-between'>
                        <small>Assigned on: {`${asgnmnt?.createTime?.[0]}:${asgnmnt?.createTime?.[1]} ${asgnmnt?.createTime?.[3]}/${asgnmnt?.createTime?.[4]}/${asgnmnt?.createTime?.[5]}`}</small>
                        <small>Dead Line: {`${asgnmnt?.deadline?.[0]}:${asgnmnt?.deadline?.[1]} ${asgnmnt?.deadline?.[3]}/${asgnmnt?.deadline?.[4]}/${asgnmnt?.deadline?.[5]}`}</small>
                    </div>
                </div>
            </div>
            <div className={` bg-white flex shadow-md ${expand ? 'p-5 h-auto' : 'h-0 p-0'} overflow-hidden`}>
                <div className='w-8/12'>
                    <h1 className='text-sm font-bold border-b-2 py-3'>Description</h1>
                    <small className='text-justify'>{asgnmnt.description}</small>
                </div>
                <div>
                    <div className='w-full flex flex-col mx-5'>
                        <h1 className='border-b-2 my-5'>Total Submit:{ans?.response?.length}</h1>
                        <button onClick={() => document.getElementById('Submission').showModal()} className='btn btn-outline px-0 py-0'>View Submission</button>
                    </div>
                </div>
            </div>
            <Submission ans={ans?.response}></Submission>
        </div>
    );
};



const Submission = ({ ans }) => {

    const [l, setL] = useState(false)
    const [file, setFile] = useState(null)
    const [id, setId] = useState(null)
    const [data, setData] = useState({})

    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handle = (event) => { 
        const k = event.target.selectedOptions[0]
        setId(k.dataset.value);
        const d = (k.value).replace('\\', '/')
        setFile(d) 
    }

    const submit = (event) => {
        event.preventDefault(); 
        setL(true)
        const form = event.target;
        const points = form.points.value; 

        const file =  fetch('http://localhost:5000/provideAssignmentsPoints',
        {
            method: 'POST',
            body: JSON.stringify({id, points}),
            headers: { 'Content-Type': 'application/json' },
        },
        )
        .then(res => res.json())
        .then(data => { console.log("HK: ", data, " for: "); setL(false)})

    }



    return (
        <dialog id="Submission" className="modal modal-bottom  ">
            <div className="modal-box bg-slate-50 ">

                <div className="modal-action flex flex-col gap-5">
                    <form method="dialog" className='w-full flex justify-between'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline">Close</button>
                        <button className="btn btn-outline" >Submit</button>
                    </form>
                    <div className='flex gap-5'>
                        <iframe width="70%" height="600" className='flex rounded-lg' src={`http://localhost:5000/${file}`}></iframe>
                        <div className='flex flex-col gap-5'>
                            <select onChange={handle} className="select select-success w-full max-w-xs bg-slate-50">
                                <option disabled selected>Submitted Students</option>

                                {
                                    ans?.map((a) =>
                                    <option data-value={a._id}  value={a.fileName} >{a.authorName}</option>
                                    )
                                }


                            </select>
                            <form onSubmit={submit}>
                                <label className="bg-slate-50 input input-bordered flex items-center gap-2">
                                    Points
                                    <input name='points' type="text" className="grow bg-opacity-0 rounded" placeholder="point" />
                                    <button disabled={!file} type='submit'>{l?<span className="loading loading-spinner loading-lg"></span>:'Submit'}</button>
                                </label>
                            </form>
                        </div>


                    </div>


                </div>
            </div>

        </dialog>
    )
}



export default Quiz;