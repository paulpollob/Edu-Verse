import { Textarea } from "flowbite-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../Context/EduContext"

const AiQuiz = () => {

    const ref = useRef(null)
    const doc = useRef(null)
    const [ldng, setLdng] = useState(false)
    const [l, setL] = useState(false);
    const [size, setSize] = useState(0)
    const [question, setQuestion] = useState(null)
    const { user } = useContext(Context)
    const [classes, setClasses] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/getAll',
            {
                method: 'POST',
                body: JSON.stringify({ "teacherID": user._id }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => { setClasses(data) })
    }, [])

    const handle = (event) => {
        event.preventDefault();
        setLdng(true)
        const form = ref.current;
        const text = form.text.value;
        const subject = form.subject.value;
        const number = form.number.value;
        const tone = form.tone.selectedOptions[0].value

        const value = { text, subject, number, tone }

        fetch('http://localhost:5000/AiQuestion', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => { 
                setSize(number);
                setQuestion(data)
                setLdng(false)
            })
            .catch((er) => {
                console.log("HK: ", er);
                setLdng(false)
            }) 
    }


    const select = () => {
        const form = doc.current.children;
        setL(true);
        const topicName = form[0].children[0].children[1].children[0].value
        const selected = [];
        for (let i = 1; i < form.length; i++) {
            const d = form[i].children[1]?.checked
            if (d) selected.push(question?.value?.[i - 1])
        }


        const classID = form[0].children[0].children[0].selectedOptions[0].value
        const value = { classID, topicName, selected }



        fetch('http://localhost:5000/AiQuestionStore', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                console.log("HK response data: ", data)
                setL(false)
            })
            .catch((er) => {
                console.log("HK: ", er);
                setL(false)
            })


    }

    return (
        <div className="flex justify-evenly h-96">


            {/* =========================================================== form start =================================================== */}
            <form onSubmit={handle} ref={ref} className="w-6/12 flex flex-col justify-center max-w-md mx-auto  p-10 rounded">
                <div className="relative z-0 w-full mb-5 group">
                    <Textarea type="text" name="text" id="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Text</label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="subject" id="subject" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="subject" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subject</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="number" id="number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="flex justify-center items-center lative z-0 w-full mb-5 group">
                        <label htmlFor="tone" className="peer-focus:font-medium absolute text-gray-500 ">Choose Dificulty Level</label>
                    </div>
                    <div className="rounded relative z-0 w-full mb-5 group">
                        <select className="rounded-md" name="tone" id="tone">
                            <option disabled value="volvo">Dificulty level</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={ldng}>{ldng ? <span className="loading loading-ring loading-md"></span> : "Generate"}</button>
            </form>
            {/* //============================================================ end ========================================================== */}



            {/* ============================================================ ai question ========================================================= */}
            <div className=" p-5 border rounded h-96 w-6/12">
                <div ref={doc} className="form-control flex justify-center  ">
                    <div className="rounded relative z-0 w-full mb-5 group overflow-auto h-full">
                        <div className="flex gap-3">
                            <select className="rounded-md" name="class" id="tone">
                                <option disabled selected value="volvo">Select Class</option>

                                {
                                    classes?.map((cls) =>
                                        <option value={cls._id}>{cls.title}</option>
                                    )
                                }

                            </select>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="Topic" id="Topic" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="Topic" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Topic Name</label>
                            </div>
                        </div>
                    </div>
                    {
                        question?.value?.map((dt) =>
                            <label key={dt?.no} className="cursor-pointer label border-b-2 border-slate-900">
                                <h1 className="text-bold">{dt?.mcq}</h1>
                                <input name="chck" type="checkbox" className="checkbox checkbox-info" />
                            </label>
                        )
                    }

                </div>
                <button onClick={select} type="button" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={l}>{l ? <span className="loading loading-ring loading-md"></span> : "Select"}</button>

            </div>
            {/* =================================================================== end ============================================================== */}

        </div>
    )
}

export default AiQuiz