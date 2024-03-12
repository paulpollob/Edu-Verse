import { Button } from 'flowbite-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import Quiz, { Assignment } from './components/Quiz';
import { Context } from '../../Context/EduContext';


const Task = ({ classID, aiQuestions }) => {
    console.log("HK q ", aiQuestions)
    const [tasks, setTasks] = useState([])
    const [update, setUpdated] = useState(false)
    const [assignemnts, setAssignments] = useState([])
    const [updt, setUpdt] = useState(false)
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
        fetch('http://localhost:5000/getQuiz',
            {
                method: 'POST',
                body: JSON.stringify({ "classID": classID, "type":"Asignments" }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => setAssignments(data))
    }, [updt])
    return (
        <div className='h-96'>
            {/* <button className='btn btn-outline flex items-center justify-center shadow-inner'>CREATE<IoMdAddCircleOutline className='text-xl' /></button> */}
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-outline m-1">CREATE<IoMdAddCircleOutline className='text-xl' /></div>
                <ul tabIndex={0} className="border dropdown-content  z-[1] menu p-2 shadow bg-blue-200 focus:bg-slate-50 text-slate-950 rounded-box w-52">
                    <li><button className="" onClick={() => document.getElementById('quiz').showModal()}>Create Quiz</button></li>
                    <li><button className="" onClick={() => document.getElementById('automatedQuiz').showModal()}>Create Quiz (Automatic)</button></li>
                    <li><button className="" onClick={() => document.getElementById('assignment').showModal()}>Make Assignment</button></li>
                </ul>
            </div>

            <div className=' flex flex-col gap-16 mt-2 mb-16 h-full overflow-auto scroll-m-6'>
                <div className='h-full mb-10'>
                    <h1 className=' border-b-2 py-2 font-bold sticky top-0'>Quiz</h1>
                    <div className=" h-full flex flex-col gap-3 p-5  ">
                        {tasks?.length}

                        {
                            tasks?.map((task) =>
                                <Quiz key={task._id} task={task}></Quiz>
                            )
                        }
                    </div>
                </div>


                {/* <div className='h-10'></div> */}

                <div className='h-full mb-10'>
                    <h1 className=' border-b-2 py-2 font-bold sticky top-0'>Assignments</h1>
                    <div className=" h-full flex flex-col gap-3 p-5  ">
                        {assignemnts?.length}

                        {
                            assignemnts?.map((asgnmnt) =>
                                <Assignment key={asgnmnt?._id} asgnmnt={asgnmnt}></Assignment>
                            )
                        }
                    </div>
                </div>

            </div>



            <Modal clsID={classID} setUpdated={setUpdated} update={update}></Modal>
            <CreateAutomaticQuiz clsID={classID} aiQuestions={aiQuestions} setUpdated={setUpdated} update={update}></CreateAutomaticQuiz>
            <CreateAssignment classID={classID} setUpdt={setUpdt} updt={updt} ></CreateAssignment>
        </div>
    );
};

const getCurrentTime = (currentDate) => {
    const createTime = []
    // const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    createTime.push(hours, minutes, seconds, date, month, year)
    return createTime
}


const Modal = ({ clsID, setUpdated, update }) => {
    const [loading, setLoading] = useState(false)

    const [questions, setQuestions] = useState([])
    const addQuestion = (event) => {
        setQuestions([...questions, Question(questions.length)])
        console.log(event.target.parentNode.parentNode.children[1])
    }
    const formEvent = (event) => {
        event.preventDefault();
    }
    const submit = (event) => {
        event.preventDefault()
        setLoading(true)
        const classID = clsID
        const quizTitle = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].value
        const quizDescription = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[1].children[0].value

        const questionLength = event.target.parentNode.parentNode.parentNode.children[0].children[1].children.length
        const questions = []
        for (let i = 0; i < questionLength; i++) {
            const questionTitle = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[0].children[0].children[0].children[0].value
            const questionType = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[0].children[0].children[1].value
            const optionsLength = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[1].children[0].children.length
            const options = []
            const answer = [];
            for (let j = 0; j < optionsLength; j++) {
                const op = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[1].children[0].children[j];
                options.push(op.children[1].value.toString())
                if (op.children[0].checked) answer.push(op.children[1].value.toString());

            }
            questions.push({ questionTitle, questionType, options, answer })
        }
        const createTime = getCurrentTime(new Date())

        const slctdDeadline = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[2].children[0].value
        const Deadline = getCurrentTime(new Date(slctdDeadline));
 

        const value = { classID, quizTitle, quizDescription, questions, createTime, Deadline }


        fetch('http://localhost:5000/createQuestions', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                {
                    console.log("HK response data: ", data)
                    window.quiz.close()
                    setLoading(false)
                    setUpdated(!update)
                }
            })
            .catch((error) => console.log("Error:", error));

    }
    return (
        <dialog id="quiz" className="modal modal-bottom sm:modal-middle bg-slate-50">
            <div className="modal-box bg-slate-50 gap-3">
                <form onSubmit={formEvent}>
                    <div className='border p-5 rounded-lg bg-slate-400 bg-opacity-20'>
                        <div className="relative z-0">
                            <input type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " />
                            <label name="title" for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Title</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <textarea type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Description</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <input type="datetime-local" id="birthdaytime" name="birthdaytime" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
                            <label for="birthdaytime" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Deadline (date and time):</label>
                        </div>
                    </div>


                    <div name={"questions"} >
                        {questions}
                    </div>

                    <div>
                        <button onClick={addQuestion} type='button' className='btn btn-outline'>Add question.</button>
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

const Question = (len) => {
    

    const addOption = (event) => {
        const value = event.target.parentNode.parentNode.children[0].children[0].children[1].value
        const optn = document.createElement("label");
        optn.classList.add("flex", "gap-2")
        const inpt = document.createElement("input")
        const inpt2 = document.createElement("input")
        inpt2.classList.add("rounded", "border-0", "border-b", "bg-slate-50", "p-0", "px-2")
        inpt2.placeholder = "Option..."
        inpt2.type = "text"

        if (value == "Mupltiple Choice") {
            inpt.classList.add("radio", "radio-info")
            inpt.name = len+"options"
            inpt.type = "radio"
        }
        else {
            inpt.classList.add("checkbox", "checkbox-sm")
            inpt.type = "checkbox"
        }
        optn.append(inpt, inpt2)
        event.target.parentNode.children[0].appendChild(optn)

    }

    const slct = (event) => {
        event.target.parentNode.parentNode.parentNode.children[1].children[0].innerHTML = ""
    }
    return (
        <div className='border rounded-lg my-3 p-5 bg-slate-400 bg-opacity-20'>
            <div>
                <div className='flex justify-between shadow-xl'>
                    <div className="rounded-lg relative z-0">
                        <input type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " />
                        <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Question Title</label>
                    </div>
                    <select onChange={slct} className="select select-info  max-w-xs bg-slate-50">
                        <option>Mupltiple Choice</option>
                        <option>CheckBox</option>
                    </select>
                </div>
            </div>
            <div className="relative z-0 my-5 flex flex-col gap-3 items-start">
                <div id='options' name={'options'} className='flex flex-col gap-3 items-start'>
                    {/* options here */}
                </div>
                <button onClick={addOption} type='button' className='px-2 border'>add option</button>
            </div>
        </div>
    )
}



const AIQuestion = ({data}) => {
 



    const addOption = (event) => {
        const value = event.target.parentNode.parentNode.children[0].children[0].children[1].value
        const optn = document.createElement("label");
        optn.classList.add("flex", "gap-2")
        const inpt = document.createElement("input")
        const inpt2 = document.createElement("input")
        inpt2.classList.add("rounded", "border-0", "border-b", "bg-slate-50", "p-0", "px-2")
        inpt2.placeholder = "Option..."
        inpt2.type = "text"

        if (value == "Mupltiple Choice") {
            inpt.classList.add("radio", "radio-info")
            inpt.name = "options"
            inpt.type = "radio"
        }
        else {
            inpt.classList.add("checkbox", "checkbox-sm")
            inpt.type = "checkbox"
        }
        optn.append(inpt, inpt2)
        event.target.parentNode.children[0].appendChild(optn)

    }

    const slct = (event) => {
        event.target.parentNode.parentNode.parentNode.children[1].children[0].innerHTML = ""
    }
    return (
        <div className='border rounded-lg my-3 p-5 bg-slate-400 bg-opacity-20'>
            <div>
                <div className='flex justify-between shadow-xl'>
                    <div className="rounded-lg relative z-0">
                        <input name='questionTitle' type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" defaultValue={data.mcq} placeholder=" " />
                        <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Question Title</label>
                    </div>
                    <select name='questionType' onChange={slct} className="select select-info  max-w-xs bg-slate-50">
                        <option selected>Mupltiple Choice</option>
                        <option>CheckBox</option>
                    </select>
                </div>
            </div>
            <div className="relative z-0 my-5 flex flex-col gap-3 items-start">
                <div id='options' name={'options'+data?.no} className='flex flex-col gap-3 items-start'>
                    {/* options heref */}
                    <label className='flex gap-2'>
                        <input defaultChecked={(data.correct=='a')} name={'options'+data?.no} type='radio' className='radio radio-info' />
                        <input type='text' className='rounded border-0 border-b bg-slate-50 p-0 px-2' defaultValue={data?.options?.a} placeholder = "Option..."/>
                    </label>
                    <label className='flex gap-2'>
                        <input defaultChecked={(data?.correct=='b')} name={'options'+data?.no} type='radio' className='radio radio-info' />
                        <input type='text' className='rounded border-0 border-b bg-slate-50 p-0 px-2' defaultValue={data?.options?.b} placeholder = "Option..."/>
                    </label>
                    <label className='flex gap-2'>
                        <input defaultChecked={(data?.correct=='c')} name={'options'+data?.no} type='radio' className='radio radio-info' />
                        <input type='text' className='rounded border-0 border-b bg-slate-50 p-0 px-2' defaultValue={data?.options?.c} placeholder = "Option..."/>
                    </label>
                    <label className='flex gap-2'>
                        <input defaultChecked={(data?.correct=='d')} name={'options'+data?.no} type='radio' className='radio radio-info' />
                        <input type='text' className='rounded border-0 border-b bg-slate-50 p-0 px-2' defaultValue={data?.options?.d} placeholder = "Option..."/>
                    </label>
                </div>
                <button onClick={addOption} type='button' className='px-2 border'>add option</button>
            </div>
        </div>
    )
}




const CreateAutomaticQuiz = ({ clsID, setUpdated, update, aiQuestions }) => {
    const [loading, setLoading] = useState(false)
    const ref = useRef();
    const [ slctdDta, setSlctdDta] = useState(null)

    const [questions, setQuestions] = useState([])
    const addQuestion = (event) => {
        setQuestions([...questions, Question(questions.length)])
        // console.log(event.target.parentNode.parentNode.children[1])
    }
    const formEvent = (event) => {
        event.preventDefault();
    }
    const submit = (event) => {
        event.preventDefault()
        setLoading(true)
        const classID = clsID
        const form = ref.current
        const quizTitle = form.title.value
        const quizDescription = form.description.value

        const questionsDiv = form.children[2]
        const questions = []
        console.log("HK: ", questionsDiv.children.length )
        for (let i = 0; i < questionsDiv.children.length; i++) {
            const questionTitle = questionsDiv.children[i].children[0].children[0].children[0].children[0].value
            const questionType = questionsDiv.children[i].children[0].children[0].children[1].selectedOptions[0].value
            const optionsDiv = questionsDiv.children[i].children[1].children[0]
            const options = []
            const answer = [];
            for (let j = 0; j < optionsDiv.children.length; j++) {
                const op = optionsDiv.children[j]
                options.push(op.children[1].value.toString())
                if (op.children[0].checked) answer.push(op.children[1].value.toString()); 

            }
            questions.push({ questionTitle, questionType, options, answer })
        } 
        const createTime = getCurrentTime(new Date())

 
        const slctdDeadline = form.deadline.value  
        const Deadline = getCurrentTime(new Date(slctdDeadline));
 
 


        const value = { classID, quizTitle, quizDescription, questions, createTime, Deadline }
        console.log("HK: ", value)


        fetch('http://localhost:5000/createQuestions', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                { 
                    window.quiz.close()
                    setLoading(false)
                    setUpdated(!update)
                }
            })
            .catch((error) => console.log("Error:", error));

    }



    const slctQ = (event) =>
    {
        const id = event.target.selectedOptions[0].value
        const data = aiQuestions.find((qn)=>qn._id==id)
        console.log("HK seleccted : ", data)
        setSlctdDta(data)
    }


    return (
        <dialog id="automatedQuiz" className="modal modal-bottom sm:modal-middle bg-slate-50">
            <div className="modal-box bg-slate-50 gap-3">
                <form onSubmit={formEvent} ref={ref} className='flex flex-col gap-3'>
                    <div className='border p-5 rounded-lg bg-slate-400 bg-opacity-20'>
                        <div className="relative z-0">
                            <input name='title' type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " />
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Title</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <textarea name='description' type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Description</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <input type="datetime-local" id="deadline" name="deadline" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
                            <label for="deadline" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Deadline (date and time):</label>
                        </div>
                    </div>

                    <div className='border p-5 rounded-lg bg-slate-400 bg-opacity-20'>
                    <select onChange={slctQ} className="rounded-md" name="tone" id="tone">
                            <option disabled selected value="volvo">Select Questions</option>

                            {
                                aiQuestions.map((q)=>
                                    <option value={q._id} >{q.topicName}</option>
                                )
                            } 
                        </select>
                    </div>


                    <div name={"questions"} >
                        {
                            slctdDta?.selected.map((qn)=>
                                <AIQuestion key={qn.no} data = {qn} />
                            )
                        }
                        {questions}
                    </div>

                    <div>
                        <button onClick={addQuestion} type='button' className='btn btn-outline'>Add question.</button>
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



const CreateAssignment = ({classID, setUpdt, updt}) => {

    const data = useRef({})
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)

    const submit = (event) => {
        event.preventDefault();
        setLoading(true)
        const form = data.current;
        const title = data.current.title.value
        const description = data.current.description.value
        const points = data.current.points.value
        const ddln = data.current.deadline.value
        const deadline = getCurrentTime(new Date(ddln));
        const createTime = getCurrentTime(new Date())
        const authorId = user._id
        



        const value = { title, description, deadline, createTime, points, authorId, classID }

        fetch('http://localhost:5000/CreateAssignment', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                console.log("HK response data: ", data)
                    window.assignment.close()
                    setLoading(false)
                    setUpdt(!updt)
            })
        console.log("hk: ", value)

    }
    return (
        <dialog id="assignment" className="modal modal-bottom  ">
            <div className="modal-box bg-slate-50 ">
                <form ref={data} className='flex gap-2 justify-between flex-col md:flex-row'   >
                    <div className='border p-5 rounded-lg w-full md:w-8/12 bg-slate-400 bg-opacity-20'>
                        <div className="relative z-0">
                            <input name='title' type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " />
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Assignment Title</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <textarea name='description' type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Assignment Description</label>
                        </div>
                    </div>

                    <div className='w-full md:w-2/12'>
                        <div className="relative z-0 my-5 p-2 text-slate-900">
                            <input type="datetime-local" id="deadline" name="deadline" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
                            <label for="deadline" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Deadline (date and time):</label>
                        </div>

                        <div className="relative z-0">
                            <input name="points" type="text" id="points" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer font-bold" placeholder=" " />
                            <label for="points" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Points:</label>
                        </div>
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





export default Task;