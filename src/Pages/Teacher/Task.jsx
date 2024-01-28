import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";


const Task = ({classID}) => {
    return (
        <div className=''>
            {/* <button className='btn btn-outline flex items-center justify-center shadow-inner'>CREATE<IoMdAddCircleOutline className='text-xl' /></button> */}
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-outline m-1">CREATE<IoMdAddCircleOutline className='text-xl' /></div>
                <ul tabIndex={0} className="border dropdown-content  z-[1] menu p-2 shadow bg-base-900 rounded-box w-52">
                    <li><button className="" onClick={() => document.getElementById('my_modal_5').showModal()}>Create Quiz</button></li>
                    <li><button className="" onClick={() => document.getElementById('assignment').showModal()}>Make Assignment</button></li>
                </ul>
            </div>

            <Modal clsID={classID}></Modal>
            <CreateAssignment></CreateAssignment>
        </div>
    );
};


const Modal = ({clsID}) => {

    const [questions, setQuestions] = useState([])
    const addQuestion = (event) => {
        setQuestions([...questions, Question()])
        console.log(event.target.parentNode.parentNode.children[1])
    }
    const formEvent = (event) => {
        event.preventDefault();
    }
    const submit = (event) =>
    {
        event.preventDefault()
        const classID = clsID
        const quizTitle = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].value
        const quizDescription = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[1].children[0].value

        const questionLength = event.target.parentNode.parentNode.parentNode.children[0].children[1].children.length
        const questions = []

        for(let i = 0; i<questionLength; i++)
        {
            const questionTitle = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[0].children[0].children[0].children[0].value
            const questionType = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[0].children[0].children[1].value
            const optionsLength = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[1].children[0].children.length
            const options = []
            for(let j = 0; j<optionsLength; j++)
            {
                options.push(event.target.parentNode.parentNode.parentNode.children[0].children[1].children[i].children[1].children[0].children[j].children[1].value.toString())
            }
            questions.push({ questionTitle, questionType, options })
        }
        const createTime = []

        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        createTime.push(hours, minutes, seconds, date, month, year)

        const Deadline = []
        const slctdDeadline = event.target.parentNode.parentNode.parentNode.children[0].children[0].children[2].children[0].value
        const selectedDate = new Date(slctdDeadline);
        const ddHours = selectedDate.getHours();
        const ddMinutes = selectedDate.getMinutes();
        const ddSeconds = selectedDate.getSeconds();
        const ddDate = selectedDate.getDate();
        const ddMonth = selectedDate.getMonth(); // Months are zero-indexed
        const ddYear = selectedDate.getFullYear();
        Deadline.push(ddHours, ddMinutes, ddSeconds, ddDate, ddMonth, ddYear)
        
        const formattedTime = `${hours}:${minutes}:${seconds}:${date}:${month}:${year}`;

// Log or use the formatted time
        console.log("Current Time:", Deadline,);


        const value = { classID, quizTitle, quizDescription, questions, currentDate, Deadline }

        fetch('http://localhost:5000/createQuestions', {
                    method: 'POST',
                    body: JSON.stringify(value),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(data => {
                        {
                            console.log("HK response data: ", data)
                        }
                    })
                    .catch((error) => console.log("Error:", error));

    }
    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle bg-slate-50">
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
                            {/* <label for="birthdaytime">Birthday (date and time):</label> */}
                            <input type="datetime-local" id="birthdaytime" name="birthdaytime" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'/>
                            {/* <textarea type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> */}
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
                        <button onClick={submit} className="btn btn-outline">Submit</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

const Question = () => {

    

    const addOption = (event) => { 
        const value = event.target.parentNode.parentNode.children[0].children[0].children[1].value
        const optn = document.createElement("label");
        optn.classList.add("flex", "gap-2")
        const inpt = document.createElement("input")
        const inpt2 = document.createElement("input")
        inpt2.classList.add("rounded", "border-0", "border-b", "bg-slate-50", "p-0", "px-2")
        inpt2.placeholder = "Option..."
        inpt2.type = "text"

        if(value == "Mupltiple Choice")
        {
            inpt.classList.add("radio", "radio-info")
            inpt.name = "options"
            inpt.type = "radio"
        }
        else
        {
            inpt.classList.add("checkbox", "checkbox-sm") 
            inpt.type = "checkbox"
        }
        optn.append(inpt, inpt2) 
        event.target.parentNode.children[0].appendChild(optn) 

    }

    const slct = (event) =>
    {
        event.target.parentNode.parentNode.parentNode.children[1].children[0].innerHTML = ""
    }
    return (
        <div className='border rounded-lg my-3 p-5 bg-slate-400 bg-opacity-20'>
            <div>
                <div className='flex justify-between'>
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



const CreateAssignment = () => {

    const [questions, setQuestions] = useState([])
    const addQuestion = (event) => {
        // setQuestions([...questions, Question()])
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
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Title</label>
                        </div>
                        <div className="relative z-0 my-5 p-2">
                            <textarea type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="default_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-bold">Quiz Description</label>
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

export default Task;