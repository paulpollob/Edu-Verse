import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { MdOutlineAssignment } from 'react-icons/md';
import { Context } from '../../../Context/EduContext';



const StQuiz = ({ task, d }) => {
    const crntDt = currentDate();
    const ddln = task.Deadline;
    const df = calculateDateDifference(ddln, crntDt)
    // console.log("HK date: ",  df)
    const dfml = dateToMilliseconds(df)
    console.log("HK mili: ", dfml)
    const [remainingMs, setRemainingMs] = useState(dfml);

    // useEffect(() => {
    //     while(true)
    //     {
    //         let intervalId;

    //     setRemainingMs(dfml);

    //     intervalId = setInterval(() => {
    //         if(remainingMs>0)  setRemainingMs(remainingMs - 1000); // Ensure non-negati  ve time

    //         console.log("HK time to block: ", remainingMs)
    //         if (remainingMs <= 0) {
    //             clearInterval(intervalId);
    //         }
    //     }, 1000);
    //     }

    //     // Clean up interval on unmount
    //     return () => clearInterval(intervalId);
    // }, [dfml]);

    // Calculate individual time units from remaining milliseconds
    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    // Render the countdown
    // return (
    //     <div className="countdown-container">
    //         {days > 0 && (
    //             <span className="countdown-unit">
    //                 {days} {days === 1 ? 'day' : 'days'}
    //             </span>
    //         )}
    //         {hours > 0 && (
    //             <span className="countdown-unit">
    //                 {hours.toString().padStart(2, '0')}:{' '}
    //             </span>
    //         )}
    //         <span className="countdown-unit">
    //             {minutes.toString().padStart(2, '0')}:{' '}
    //         </span>
    //         <span className="countdown-unit">
    //             {seconds.toString().padStart(2, '0')}
    //         </span>
    //     </div>
    // );
    // return (
    //     <div className='shadow-md cursor-pointer border rounded-lg p-5 flex items-center gap-4'>
    //         <div className='text-slate-50 bg-blue-400 rounded-full p-2 text-3xl '><MdOutlineAssignment /></div>
    //         <div className='w-full flex flex-col gap-2'>
    //             <h1 className='font-bold my-0'>{task.quizTitle}</h1>
    //             <div className='flex justify-between'>
    //                 <small>Assigned on: {`${task.createTime[0]}:${task.createTime[1]} ${task.createTime[3]}/${task.createTime[4]}/${task.createTime[5]}`}</small>
    //                 <small>Dead Line: {`${task.Deadline[0]}:${task.Deadline[1]} ${task.Deadline[3]}/${task.Deadline[4]}/${task.Deadline[5]}`}</small>
    //             </div>
    //         </div>
    //     </div>
    // ); 
    return (
        <div className={`${(d || (remainingMs <= 0)) ? "cursor-not-allowed" : "cursor-pointer"} shadow-md border rounded-lg p-5 flex items-center gap-4`}>
            <div className={` ${d ? 'bg-slate-300 text-slate-600' : 'bg-blue-400 text-slate-50'}  rounded-full p-2 text-3xl  `}><MdOutlineAssignment /></div>
            <div className='w-full flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <h1 className='font-bold my-3'>{task.quizTitle}</h1>
                    {d && <small className='font-bold'>Point:{d.solved}</small>}
                    {(remainingMs <= 0) && <small className='font-bold text-red-600'>Deadline ended</small>}
                    {(remainingMs > 0 && !d) && <small className='font-bold text-red-600'>left: {days} {days === 1 ? 'day' : 'days'}, {hours.toString().padStart(2, '0')}:{' '}:{minutes.toString().padStart(2, '0')}:{' '}:{seconds.toString().padStart(2, '0')}</small>}
                </div>
                <div className='flex justify-between'>
                    <small>Assigned on: {`${task.createTime[0]}:${task.createTime[1]} ${task.createTime[3]}/${task.createTime[4]}/${task.createTime[5]}`}</small>
                    <small>Dead Line: {`${task.Deadline[0]}:${task.Deadline[1]} ${task.Deadline[3]}/${task.Deadline[4]}/${task.Deadline[5]}`}</small>
                </div>
            </div>
        </div>
    );
};

const calculateDateDifference = (date1, date2) => {
    // Ensure valid date/time formats
    date1 = date1.map(Number); // Convert elements to numbers
    date2 = date2.map(Number);

    // Create Date objects
    // const d1 = new Date(...date1);
    const d1 = new Date(
        date1[5], // Year
        date1[4], // Month (January is 0)
        date1[3], // Day
        date1[0], // Hour
        date1[1], // Minute
        date1[2] // Second
    );
    const d2 = new Date(
        date2[5], // Year
        date2[4] - 1, // Month (January is 0)
        date2[3], // Day
        date2[0], // Hour
        date2[1], // Minute
        date2[2] // Second
    );
    const difference = d1.getTime() - d2.getTime();

    // Convert to appropriate units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const date = [days, hours, minutes, seconds]
    return { date };
}

const currentDate = () => {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 0-indexed, so we add 1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return [hours, minutes, seconds, day, month, year];

}


const dateToMilliseconds = ({ date }) => {
    // Ensure valid date elements and format
    // const [hour, minutes, seconds, day, month, year] = dateArray;
    // const validDate = moment({ day:dateArray[0], hour:dateArray[1], minute:dateArray[2], second:dateArray[3] });
    const validDate = (date[0] * 24 * 60 * 60 * 1000) +
        (date[1] * 60 * 60 * 1000) +
        (date[2] * 60 * 1000) +
        (date[3] * 1000);

    return validDate; // Milliseconds since epoch
}



export const Assignment = ({ asgnmnt, classID }) => { 
    const [clps, setClps] = useState(false)
    const { user } = useContext(Context);
    const [file, setFile] = useState(null);
    const [txt, setText] = useState("");
    const [flg, setFlg] = useState(0); 
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    let jsondata;

    const submit = async(event) => {
        event.preventDefault()
        const url = 'https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert';
        const data = new FormData();
        data.append('file', file);
        data.append('page', '1');
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': '4316d255c0msh10b17f4968dbd30p1fc510jsn3ec5d0970a67',
                'X-RapidAPI-Host': 'pdf-to-text-converter.p.rapidapi.com'
            },
            body: data
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            jsondata = result;
            console.log("HK: result: ", result);
        } catch (error) {
            console.error(error);
        }
 
        const dataS = new FormData();
        dataS.append("file", file)
        dataS.append("classID", classID)
        dataS.append("authorID", user._id)
        dataS.append("assignmentID", asgnmnt._id)
        dataS.append("authorName", user.name)
        dataS.append("jsonData", jsondata)
        fetch('http://localhost:5000/storeFile', {
            method: 'POST',
            body: dataS,
        })
            .then(res => res.json())
            .then(data => {
                {
                    console.log("HK response data: ", data)
                    alert("submitted!!!") 
                }
            })
            .catch((error) => {console.log("Error:", error);alert("Unsuccessfull!!!")});
    }


 



    return (
        <div>
            <div onClick={() => setClps(!clps)} className='shadow-md cursor-pointer border rounded-lg p-5 flex items-center gap-4'>
                <div className='text-slate-50 bg-blue-400 rounded-full p-2 text-3xl '><MdOutlineAssignment /></div>
                <div className='w-full flex flex-col gap-2'>
                    <h1 className='font-bold my-0'>{asgnmnt.title}</h1>
                    <div className='flex justify-between'>
                        <small>Assigned on: {`${asgnmnt?.createTime?.[0]}:${asgnmnt?.createTime?.[1]} ${asgnmnt?.createTime?.[3]}/${asgnmnt?.createTime?.[4]}/${asgnmnt?.createTime?.[5]}`}</small>
                        <small>Dead Line: {`${asgnmnt?.deadline?.[0]}:${asgnmnt?.deadline?.[1]} ${asgnmnt?.deadline?.[3]}/${asgnmnt?.deadline?.[4]}/${asgnmnt?.deadline?.[5]}`}</small>
                    </div>
                </div>
            </div>
            <div className={`flex gap-6 flex-col md:flex-row border shadow-md ${clps ? " p-5 h-auto" : "p-0 h-0"} overflow-hidden `}>
                <div className='w-10/12'>
                    <h1 className='font-bold border-b-2 py-3'>Description</h1>
                    <small className='text-justify'>{asgnmnt.description}</small>
                </div>
                <div className='flex flex-col items-end'>
                    <small className='float-right'>Points: {asgnmnt.points}</small>
                    <form onSubmit={submit} className='flex flex-col'>
                        <input name='pdf' onChange={handleFileChange} className='rounded bg-slate-300' type='file'></input>
                        <button className='btn-outline bg-blue-500 text-slate-50' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default StQuiz;