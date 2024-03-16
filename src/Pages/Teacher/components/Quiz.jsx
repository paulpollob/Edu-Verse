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
            .then(data => { setAns(data);  })
    }, [])


    const [similar, setSimilar] = useState(null)

    useEffect(() => {
        const value = []; 
        // console.log("HK answer is: ", ans)
        for (let i = 0; i < ans?.response?.length; i++) {
            const key = ans?.response[i]?._id
            const answer = ans?.response[i]?.jsonData;
            // answer.replace('"', "");
            // answer.replace(',', " ");
            
            value.push({ "key": key.toString(), "answer": answer.toString() })
        }
        const rData = { "scripts": value, "thress": 0.8 }
        console.log("HK r: ", rData)
        const d = {
            "scripts": [
                {"key": "65e946a3fd49c7244804e79d", "answer": "The meaning of life is a deeply personal and subjective concept, varying from person to person. For \r\nsome, it may be rooted in finding purpose through meaningful relationships, pursuing passi\tons, or \t\r\ncontributing to the greater good of society. Others may find meaning in spiritual beliefs, connecting with \r\na higher power, or seeking enlightenment. Ultimately, it's about discovering what brings fulfillment and \r\ncontentment to our individual existe\tnce. Life's meaning often evolves as we grow, learn, and experience \t\r\nnew things, reflecting our changing priorities and perspectives. It's a journey of self\t-discovery and \t\r\nexploration, where each person crafts their own narrative of purpose and significance \tin the vast \t\r\ntapestry of existence.\t  "
                },
                {"key": "65e946c2fd49c7244804e79e", "answer": "The meaning of life is a multifaceted concept that encompasses various dimensions of human \r\nexperience. From a philosophical perspective, it revolves around questions of existence, consciousness, \r\nand the pursuit of signific\tance. Some believe that life's meaning is to seek knowledge, understanding, \t\r\nand self\t-awareness, striving to unlock the mysteries of the universe and our place within it. Others find \t\r\npurpose in creating, nurturing relationships, and leaving a positive impac\tt on the world. Spiritual \t\r\ninterpretations suggest that life's meaning lies in aligning with a higher purpose or divine plan, \r\ntranscending earthly concerns to attain enlightenment or salvation. Ultimately, the quest for meaning is \r\nan ongoing journey of intr\tospection, discovery, and growth, shaped by our values, beliefs, and \t\r\nexperiences.\t  "
                },
                {"key": "65e946ddfd49c7244804e79f", "answer": "The essence of a good friend lies in their unwavering support empathy and reliability. They are the \r\nones who stand by you through thick and thin offering a listening ear a shoulder to \tlean on, and a hand \t\r\nto hold. A good friend embodies qualities of honesty and authenticity, fostering a relationship based on \r\ntrust and mutual respect. They accept you for who you are, flaws and all, embracing your strengths and \r\nweaknesses without judgment.\t A good friend uplifts you, encourages you to pursue your dreams, and \t\r\ncelebrates your successes as if they were their own. They are a constant presence in your life, enriching \r\nit with laughter, shared memories, and heartfelt conversations. In essence, a go\tod friend is a precious \t\r\ngift, a companion who enriches your journey through life with their unwavering love and support\t  "
                },
                {"key": "65e946fdfd49c7244804e7a0", "answer": "A good friend is someone who embodies trust, loyalty, and compassion in their interactions. They are a \r\nsource of support and encouragement, always ready to lend a listening e\tar or a helping hand when \t\r\nneeded. A good friend celebrates your successes and stands by you during challenging times, offering \r\ngenuine empathy and understanding. They respect your boundaries, values, and individuality, fostering \r\na relationship built on mut\tual respect and acceptance. Importantly, a good friend is someone you can be \t\r\nyourself around without fear of judgment, allowing you to share your thoughts, feelings, and \r\nexperiences openly. They inspire you to be the best version of yourself, challenging y\tou to grow and \t\r\nevolve while cherishing the unique bond you share.\t  "
                }
            ],
            "thress": 0.8
        }
        // fetch('http://localhost:8000/pair_similarity',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(rData),
        //         headers: { 'Content-Type': 'application/json' },
        //     })
        //     .then(res => res.json())
        //     .then(rsdt => { console.log("HK similarity: ", rsdt); setSimilar(rsdt) })
    }, [ans])



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
            <Submission ans={ans?.response} similar={similar}></Submission>
        </div>
    );
};



const Submission = ({ ans, similar }) => {


    console.log("check: ", ans)

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

        const file = fetch('http://localhost:5000/provideAssignmentsPoints',
            {
                method: 'POST',
                body: JSON.stringify({ id, points }),
                headers: { 'Content-Type': 'application/json' },
            },
        )
            .then(res => res.json())
            .then(data => {  setL(false) })

    }

    const copy = [
        {"65e946a3fd49c7244804e79d":"Utsho"}, 
        {"65e946c2fd49c7244804e79e":"Eimon"}, 
        "Rajib",
        "Pollob"
    ]



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
                                        <option data-value={a._id} value={a.fileName} >{a.authorName}</option>
                                    )
                                }


                            </select>
                            <form onSubmit={submit}>
                                <label className="bg-slate-50 input input-bordered flex items-center gap-2">
                                    Points
                                    <input name='points' type="text" className="grow bg-opacity-0 rounded" placeholder="point" />
                                    <button disabled={!file} type='submit'>{l ? <span className="loading loading-spinner loading-lg"></span> : 'Submit'}</button>
                                </label>
                            </form>

                            {/* <div className='border rounded'>
                                <h1 className='font-bold text-lg'>Similar Scripts founded from:</h1>
                                <div>
                                    {
                                        // console.log("HK: similar: ", similar)
                                        copy.map((s)=><h1>{s}</h1>)
                                    }
                                </div>
                            </div> */}
                        </div>


                    </div>


                </div>
            </div>

        </dialog>
    )
}



export default Quiz;