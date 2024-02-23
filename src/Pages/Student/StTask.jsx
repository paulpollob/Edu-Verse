import { Button } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import StQuiz, { Assignment } from './Components/StQuiz';
import { Context } from '../../Context/EduContext';


const StTask = ({ classID }) => {
    const { user } = useContext(Context)
    const [tasks, setTasks] = useState([])
    const [tsk, setTsk] = useState({})
    const [update, setUpdated] = useState(false)
    const [updt, setupdt] = useState(false)
    const [assignmnts, setAssignments] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/getQuiz',
            {
                method: 'POST',
                body: JSON.stringify({ "classID": classID, "type": "Questions" }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [update])
    useEffect(() => {
        console.log("HK id: ", classID)
        fetch('http://localhost:5000/getQuiz',
            {
                method: 'POST',
                body: JSON.stringify({ "classID": classID, "type": "Asignments" }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => setAssignments(data))
    }, [updt])
    return (
        <div className='h-96'>


            <div className=' flex flex-col gap-4 mt-2  h-full overflow-auto scroll-m-6'>
                <div className=''>
                    <h1 className='bg-slate-50 border-b-2 py-2 font-bold sticky top-0'>Quiz</h1>
                    <div className="flex flex-col gap-3 p-5 ">
                        {/* {tasks.length} */}

                        {
                            tasks?.map((task, index) => {
                                const d = user.quizRslt.find(obj => obj._id == task._id);
                                return (
                                    <div key={index}>
                                        <div onClick={() => { setTsk(task); if (!d) document.getElementById('stquiz').showModal() }} disabled><StQuiz key={task._id} task={task} d={d}></StQuiz></div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>


                <div className='h-10'></div>


                <div className='h-full mb-10'>
                    <h1 className='bg-slate-50 border-b-2 py-2 font-bold sticky top-0'>Assignments</h1>
                    <div className=" h-full flex flex-col gap-3 p-5  ">
                        {/* {assignmnts?.length} */}

                        {
                            assignmnts?.map((asgnmnt) =>
                                <Assignment key={asgnmnt?._id} asgnmnt={asgnmnt} classID={classID}></Assignment>
                            )
                        }
                    </div>
                </div>
            </div>
            <Modal task={tsk}></Modal>

            <CreateAssignment></CreateAssignment>
        </div>
    );
};


const Modal = ({ clsID, task }) => {

    const { user, update, setUpdate } = useContext(Context)
    // console.log("hk user: ", user)
    const [loading, setLoading] = useState(false)

    // const [questions, setQuestions] = useState([])
    // const addQuestion = (event) => {
    //     setQuestions([...questions, Question()])
    // }
    const formEvent = (event) => {
        event.preventDefault();
    }
    const submit = (event) => {
        event.preventDefault()
        setLoading(true)
        console.log("HK task: ", task)

        const questionLength = task.questions.length
        let solved = 0;
        for (let i = 0; i < questionLength; i++) {
            const optionsLength = task.questions[i].options.length
            const options = []
            const answer = task?.questions[i].answer;
            let sans = 0;
            for (let j = 0; j < optionsLength; j++) {
                const op = event.target.parentNode.parentNode.parentNode.children[1].children[1].children[i].children[1].children[0].children[j]
                if (op.children[0].checked && answer.includes(op.children[1].value.toString())) sans++;
            }
            solved += sans / answer.length
        }
        const _id = task._id.toString();
        const value = { _id, solved }

        const v = { _id: user._id, occupation: user.occupation, value }
        alert("You gained points: ", solved)
        // const createTime = []

        // const currentDate = new Date();
        // const hours = currentDate.getHours();
        // const minutes = currentDate.getMinutes();
        // const seconds = currentDate.getSeconds();
        // const date = currentDate.getDate();
        // const month = currentDate.getMonth();
        // const year = currentDate.getFullYear();
        // createTime.push(hours, minutes, seconds, date, month, year)

        // const Deadline = []
        // const slctdDeadline = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[2].children[0].value
        // const selectedDate = new Date(slctdDeadline);
        // const ddHours = selectedDate.getHours();
        // const ddMinutes = selectedDate.getMinutes();
        // const ddSeconds = selectedDate.getSeconds();
        // const ddDate = selectedDate.getDate();
        // const ddMonth = selectedDate.getMonth(); // Months are zero-indexed
        // const ddYear = selectedDate.getFullYear();
        // Deadline.push(ddHours, ddMinutes, ddSeconds, ddDate, ddMonth, ddYear)




        // const value = { classID, quizTitle, quizDescription, questions, createTime, Deadline }

        fetch('http://localhost:5000/addQuizPoints', {
            method: 'POST',
            body: JSON.stringify(v),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                {
                    console.log("HK response data: ", data)
                    setLoading(false)
                    setUpdate(!update)
                    alert("DOne!!!")
                    window.stquiz.close()
                }
            })
            .catch((error) => console.log("Error:", error));

    }
    return (
        <dialog id="stquiz" className="modal modal-bottom sm:modal-middle bg-slate-50">
            <div className="modal-box bg-slate-50 gap-3">
                <small className='float-right my-2 mx-5'>{`Deadline: ${task?.Deadline?.[0]}:${task?.Deadline?.[1]}, ${task?.Deadline?.[3]}/${task?.Deadline?.[4]}/${task?.Deadline?.[5]}`}</small>
                <form onSubmit={formEvent}>
                    <div className='border p-5 rounded-lg bg-slate-400 bg-opacity-20'>
                        <div className="relative z-0">
                            <input type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" disabled value={task?.quizTitle} placeholder=" " />
                            <label name="title" htmlFor="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Title</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <textarea type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled value={task?.quizDescription} />
                            <label htmlFor="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Description</label>
                        </div>
                    </div>


                    <div name={"questions"} >
                        {
                            task?.questions?.map((tsk, index) =>
                                <Question key={index} tsk={tsk}></Question>
                            )
                        }
                    </div>


                </form>
                <div className="modal-action">
                    <form method="dialog" className='w-full flex justify-between'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline">Close</button>
                        <button onClick={submit} className="btn btn-outline" disabled={loading}>{loading ? <span className="loading loading-spinner text-info"></span> : "Submit"}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}




const Question = ({ tsk }) => {
    let tp;
    (tsk.questionType == "Mupltiple Choice") ? tp = true : tp = false


    return (
        <div className='border rounded-lg my-3 p-5 bg-slate-400 bg-opacity-20'>
            <div>
                <div className='flex justify-between'>
                    <div className="rounded-lg relative z-0">
                        <input type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " disabled value={tsk?.questionTitle} />
                        <label htmlFor="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Question Title</label>
                    </div>
                </div>
            </div>
            <div className="relative z-0 my-5 flex flex-col gap-3 items-start">
                <div id='options' name={'options'} className='flex flex-col gap-3 items-start'>
                    {
                        tsk?.options?.map((optn, index) =>
                            tp ? <Mupltiple key={index} optn={optn}></Mupltiple> : <ChckBox key={index} optn={optn}></ChckBox>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


const Mupltiple = ({ optn }) => {
    return (<label className='flex gap-2'>
        <input type={"radio"} name='options' className='radio radio-info'></input>
        <input type='text' className='rounded border-0 border-b bg-slate-50 p-0 px-2' placeholder='Option...' disabled value={optn}></input>
    </label>)
}

const ChckBox = ({ optn }) => {
    return (<label className='flex gap-2'>
        <input type={"checkbox"} className='checkbox checkbox-sm'></input>
        <input type='text' className='rounded border-0 border-b bg-slate-50 p-0 px-2' placeholder='Option...' disabled value={optn}></input>
    </label>)
}



const CreateAssignment = () => {

    const addQuestion = (event) => {
        console.log(event.target.parentNode.parentNode.children[1])
        event.target.parentNode.parentNode.children[1].appendChild(Question())
    }
    const formEvent = (event) => {
        event.preventDefault();
    }
    return (
        <dialog id="assignment" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-slate-50 ">
                <form onSubmit={formEvent}>
                    <div className='border p-5 rounded-lg bg-slate-400 bg-opacity-20'>
                        <div className="relative z-0">
                            <input type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " />
                            <label htmlFor="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Title</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <textarea type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Description</label>
                        </div>
                    </div>




                    <div>
                        <button onClick={addQuestion} type='button' className='btn btn-outline'>Add question.</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog" className='w-full flex justify-between'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline">Close</button>
                        <button className="btn btn-outline">Submit</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}





export default StTask;