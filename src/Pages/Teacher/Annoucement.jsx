import React, { useContext, useEffect, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { Context } from '../../Context/EduContext';
import { data } from 'autoprefixer';


const Annoucement = ({ classInfo, classID }) => {

    const { teacherID, user } = useContext(Context)

    const [updated, setUpdated] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/getPost',
            {
                method: 'POST',
                body: JSON.stringify({ classID }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [updated])

    return (
        <div className='flex flex-col gap-5 h-full rounded-lg p-5 overflow-auto scroll-m-6'>
            <MakePost userID={user._id} userName={user.name} userImg={user.img} classID={classID} updated={updated} setUpdated={setUpdated}></MakePost>

            <div className='flex flex-col-reverse gap-5'>
                {
                    posts.map((post) =>
                        <Post key={post._id} _id={post._id} msg={post.msg} time={post.time} userID={post.teacherID} userName={post.name} userImg={post.img} comment={post.comment} updated={updated} setUpdated={setUpdated}  ></Post>
                    )
                }
            </div>
        </div>
    );
};

const currentTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = { year, month, day, hours, minutes, seconds }
    return time;
}


const MakePost = ({ userID, userName, userImg, classID, updated, setUpdated }) => {
    const {user} = useContext(Context)
    const btnEvent = (event) => {
        event.preventDefault()
        const time = currentTime();
        const form = event.target.form
        const msg = form.annoucementText.value
        const value = { "teacherID":userID, userName, userImg, msg, classID, time }

        console.log("HK data: ", value)

        fetch('http://localhost:5000/makePost', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                console.log("data: ", data)
                form.reset()
                setUpdated(!updated)
            })
            .catch((error) => console.log("Error:", error));
    }
    return (
        <div className='border p-5 shadow-md bg-slate-50 rounded'>
            <form className=' flex flex-col items-end gap-5'>
                <textarea name='annoucementText' className="shadow w-full textarea textarea-ghost focus:bg-slate-50" placeholder="Annoucement..."></textarea>
                <button onClick={btnEvent} className='float btn btn-primary text-slate-50'>Post</button>
            </form>
        </div>
    )
}

const Post = ({ _id, msg, time, userID, userName, userImg, comment, updated, setUpdated }) => {
    const { day, month, year } = time;
    console.log("HK my cmnt is: ", comment)
    
        const { user } = useContext(Context);


    const cmnt = (event) => {
        event.preventDefault();
        const cmnt = event.target.comment?.value
        const occupation = "Teacher"
        const time = currentTime();
        const value = { _id, cmnt, userID:user._id, userName:user.name, userImg:user.img, occupation, time }



        fetch('http://localhost:5000/makeComment', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                // console.log("cmnt ", data, " ", _id, ", ", userID)
                event.target.reset()    
                setUpdated(!updated)
            })
            .catch((error) => console.log("Error:", error));
    }
    return (
        <div className='border rounded-lg flex flex-col bg-slate-50 shadow'>
            <div className=' m-3 p-2 flex gap-3 border-b'>
                <img className='circle rounded-full h-12 w-12' src={userImg||'https://www.creativefabrica.com/wp-content/uploads/2022/12/05/Man-vector-art-Graphics-50461110-1-1-580x386.jpg'} />
                <div className='flex flex-col justify-center'>
                    <h1>{userName||"Pollob"}</h1>
                    <small>{day}/{month}/{year}</small>
                </div>
            </div>

            <div className='p-5'>
                {msg}
            </div>

            <form onSubmit={cmnt} className='border-t flex items-center gap-5 w-full px-5 py-2'>
                <img className='circle rounded-full h-8 w-8' src={user} />
                <input name='comment' type="text" placeholder="Comments..." className=" focus:bg-slate-50 input input-ghost w-full " />
                <button type='submit' className='btn btn-outline '><IoSend className='text-3xl cursor-pointer' /></button>
            </form>
            <div className='max-h-56 p-2 flex flex-col-reverse gap-2 overflow-auto'>
                {
                    comment?.map((cmnt, index) =>
                        <Comment key={index} comnt={cmnt}></Comment>
                    )
                }
            </div>
        </div>
    )
}

const Comment = ({ comnt }) => {
 
    const { _id, cmnt, userID, occupation, time } = comnt
    return (
        <div>
            <div className='flex flex-col border rounded-lg p-2 mx-5'>
                <div className=' flex justify-between  '>
                    <small className='font-bold text-slate-700'>{"Prokash Paul Pollob"}</small>
                    <div>
                    <small>{time.hours}:{time.minutes} </small>
                    <small>{time.day}/{time.month}/{time.year}</small>
                    </div>
                </div>
                <small>{cmnt}</small> 
            </div>
        </div>
    )
}

export default Annoucement;