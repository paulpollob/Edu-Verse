import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/EduContext';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';


const Classroom = () => {

    const { tcLeftRoute, setTcLeftRoute, teacherID } = useContext(Context);
    const [insrtScrn, setInsrtScrn] = useState(false)
    const [classes, setClasses] = useState([])
    const [updated, setUpdated] = useState(false)
    setTcLeftRoute(1);



    useEffect(() => {
        fetch('http://localhost:5000/getAll',
            {
                method: 'POST',
                body: JSON.stringify({ "teacherID": teacherID }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => {setClasses(data)})
    }, [updated, teacherID])

    return (
        <div className='select-none relative flex flex-col    h-full bg-slate-50     text-slate-600 p-3  rounded-xl'>
            <div className='grid grid-cols-3 gap-5 h-full  overflow-auto scroll-m-6'>
                {/* Hk{teacherID}d */}
                {
                    
                    classes.map((cls) =>
                        <Class key={cls._id} _id={(cls._id).toString()} teacherID={teacherID} image={cls.image} title={cls.title} code={cls.code} section={cls.section} room={cls.room}></Class>
                    )
                }

                <Insert insrtScrn={insrtScrn} setInsrtScrn={setInsrtScrn}></Insert>
            </div>
            <Form insrtScrn={insrtScrn} setInsrtScrn={setInsrtScrn} updated={updated} setUpdated={setUpdated}></Form>
        </div>
    );
};




const Class = ({ _id, image, title, code, section, room }) => {
    const navigate = useNavigate();
    const pathName = '/tc/classroom/Home'
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


const Insert = ({ insrtScrn, setInsrtScrn }) => {
    return (
        <div onClick={() => window.my_modal_1.showModal()} className='cursor-pointer flex flex-col justify-center gap-5 items-center select-none h-64 bg-slate-500 text-slate-50 rounded-xl border'>
            <h1 className='text-4xl font-bold border w-20 h-20 text-centerf flex items-center justify-center rounded-full'>+</h1>
            <h1>Create Classroom</h1>
        </div>
    )
}


const Form = ({ insrtScrn, setInsrtScrn, updated, setUpdated }) => {



    const [img, setImg] = useState()
    const [imgUrl, setImgUrl] = useState("")
    const [imgBb, setImgBb] = useState("")
    const [loading, setLoading] = useState(false)
    const { teacherID } = useContext(Context)

    const set = (event) => {
        const src = event.target.files[0];
        const url = URL.createObjectURL(src)
        setImg(src)
        setImgUrl(url);
    }



    const close = (event) => {
        event.preventDefault();
        window.my_modal_1.close()
    }


    const btnEvnt = (event) => {
        event.preventDefault();
        const form = event.target
        setLoading(true)


        const formData = new FormData();
        formData.append('image', img);


        fetch("https://api.imgbb.com/1/upload?key=e1908c42ce047aa360fb1935d07ff103",
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {


                const formData = new FormData();

                
                const image = data.data.display_url
                formData.append("image", image)
                const title = form.title.value
                formData.append("title", title)
                const code = form.code.value
                formData.append("code", code)
                const section = form.section.value
                formData.append("section", section)
                const room = form.room.value
                formData.append("room", room) 
                formData.append("teacherID", teacherID)
                const studentList = form.excel.files[0]
                formData.append("file", studentList)


                const value = { image, title, code, section, room, teacherID, studentList }

 


                fetch('http://localhost:5000/insert', {
                    method: 'POST',
                    body: formData,  
                })
                    .then(res => res.json())
                    .then(data => {
                        {
                            setLoading(false);
                            window.my_modal_1.close();
                            setUpdated(!updated)
                            form.reset()
                        }
                    })
                    .catch((error) => console.log("Error:", error));
            })



    }


    return (






        <div className=''>
            {/* Open the modal using ID.showModal() method */}
            <dialog id="my_modal_1" className=" modal bg-slate-50 bg-opacity-40">
                <div className='relative'>
                    <form onSubmit={btnEvnt} method="dialog" className="modal-box w-full bg-slate-50">
                        <h3 className="font-bold text-lg">Edu-verse!</h3>
                        <div className="py-4 grid grid-cols-2 gap-5">

                            <div className="form-control">
                                <label className="label">
                                    {/* <span className="label-text">Your Email</span> */}
                                </label>
                                <label className="input-group input-group-vertical">
                                    <span className=''>Course Title: </span>
                                    <input name='title' type="text" placeholder="Course Title" className=" bg-slate-100 input input-bordered" required />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    {/* <span className="label-text">Your Email</span> */}
                                </label>
                                <label className="input-group input-group-vertical">
                                    <span className=''>Course Code: </span>
                                    <input name='code' type="text" placeholder="Course Code" className=" bg-slate-100 input input-bordered" required />
                                </label>
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    {/* <span className="label-text">Your Email</span> */}
                                </label>
                                <label className="input-group input-group-vertical">
                                    <span className=''>Section</span>
                                    <input name='section' type="text" placeholder="Section" className=" bg-slate-100 input input-bordered" required />
                                </label>
                            </div>



                            <div className="form-control">
                                <label className="label">
                                    {/* <span className="label-text">Your Email</span> */}
                                </label>
                                <label className="input-group input-group-vertical">
                                    <span className=''>Room</span>
                                    <input name='room' type="text" placeholder="Room No." className=" bg-slate-100 input input-bordered" required />
                                </label>
                            </div>


                            <div className="form-control">
                                <label className="label">
                                </label>
                                <label className="input-group input-group-vertical">
                                    <span className=''>Banner</span>
                                    <input name='image' onChange={set} type="file" placeholder="photo" accept="image/png, image/gif, image/jpeg" className=" w-full bg-slate-100 input input-bordered" required />
                                </label>


                                <label className="label">
                                </label>
                                <label className="input-group input-group-vertical">
                                    <span className=''>Student List(Accept as excel doc.)</span>
                                    <input name='excel' type="file" placeholder="Student List"  className=" w-full bg-slate-100 input input-bordered" required />
                                </label>
                            </div>




                            <div className="form-control">
                                <img className='w-full h-full' src={`${imgUrl || 'https://as2.ftcdn.net/v2/jpg/04/75/81/33/1000_F_475813394_0WixuXzrBayNkMfPTeJ3YkJPTN8uzRqg.jpg'}`}></img>

                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className="modal-action m-0 flex items-center justify-center">
                                <button onClick={close} className="btn bg-slate-50 text-slate-700 hover:bg-slate-400">Close</button>
                            </div>
                            <button type='submit' className="btn bg-slate-50 text-slate-700 hover:bg-slate-400">Submit</button>
                        </div>
                    </form>
                    {loading && <div className='absolute flex items-center justify-center w-full h-full opacity-25 rounded-xl bg-slate-900 top-0'>
                        <span className="loading loading-bars loading-lg text-slate-50"></span>
                    </div>}

                </div>

            </dialog>
        </div>
    )
}

export default Classroom;




// bishujana swami maharaj kirtan ?