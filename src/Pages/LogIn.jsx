import React, { useContext, useState } from 'react';
import { Context } from '../Context/EduContext';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();
    const { user, userLoading } = useContext(Context)
    if (userLoading && !(user.email == null)) (user.displayName == "Teacher") ? navigate("/tc") : navigate("/st")
    const [page, setPage] = useState(0)

    return (
        <div className='bg-white min-w-screen min-h-screen'>
            <Header page={page}></Header>
            <div className='lg:flex lg:gap-5 lg:py-10 lg:px-44  rounded-lg'>
                <Sidebar page={page} setPage={setPage}></Sidebar>
                <Disp page={page} setPage={setPage}></Disp>
            </div>
            <div className='p-5 lg:p-0'></div>
        </div>
    );
};


const Header = ({ page }) => {
    return (
        <div className='bg-teal-100 p-5'>
            <img className=" my-[-30px]" src="https://i.ibb.co/fMd12gB/logo.png" alt="logo" />
            <hr className='my-3 border border-slate-400'></hr>
        </div>
    )
}


const Sidebar = ({ page, setPage }) => {
    return (
        <div className='p-5 lg:p-0 lg:w-8/12 '>
            <small className='font-bold'>"Online classrooms bring together minds from around the world, creating a global learning community." - Anonymous</small>
            <img className="" src="https://i.ibb.co/vmPBwdK/login-side.png" alt="log side" />

        </div>
    )
}

const Disp = ({ page, setPage }) => {
    return (
        <div className='lg:w-6/12 mx-10 bg-teal-100 p-10 rounded-xl font-semibold'>
            {/* <UserProfile page={page} setPage={setPage}></UserProfile> */}
            <UserProfilee></UserProfilee>

        </div>
    )
}

const UserProfile = () => {

    const { logIn, setTeacherID, user, setUser } = useContext(Context);

    const [lError, setLError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // if(user.email!=null) (user.displayName=="Teacher")?navigate("/tc"):navigate("/st")

    const Login = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoading(true);
        setLError("")

        logIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const { uid, displayName } = user

                fetch('http://localhost:5000/getUserInfo',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            {
                                "_id": uid,
                                "cllctn": displayName
                            }
                        )
                    })
                    .then(res => res.json())
                    .then(async (data) => { setTeacherID(data._id); setUser(data); setLError(""); setLoading(false); (displayName == "Teacher") ? navigate("/tc") : navigate("/st") })
                    .catch((error) => { console.log("Error:", error); setLoading(false); setLError(error); alert(error) });
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log("HK error: ", errorMessage)
                setLError(errorMessage)
                setLoading(false)
                // alert(error.toString())
            });

    }

    return (
        <div>
            <form onSubmit={Login} className={`flex flex-col `}>
                <h1 className='text-3xl font-bold text-black'>Login</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-1 gap-5'>
                    <div>
                        <p>Email</p>
                        <input type='text' name="email" placeholder='Email' className="rounded-lg bg-transparent w-full required:" ></input>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type='password' name="password" placeholder='Your Password' className="required rounded-lg bg-transparent w-full"></input>
                    </div>
                </div>
                <small className='mt-2 font-bold'>New Here? Click here to  <Link to={"/register"} className='text-blue-500'>registration !</Link></small>
                <button type={"submit"} className={` hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`} disabled={loading} >{loading ? <span className="loading loading-ring loading-md"></span> : "LogIn"}</button>
            </form>
            <small className='text-red-600 font-bold'>{lError}</small>
        </div>
    )
}

import { useForm } from 'react-hook-form';

const UserProfilee = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setloginError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { logIn, setTeacherID, user, setUser } = useContext(Context);

    const handleLogin =(userData) => {
        setloginError('')
        
        try {
            logIn(userData.email, userData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const { uid, displayName } = user

                fetch('http://localhost:5000/getUserInfo',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            {
                                "_id": uid,
                                "cllctn": displayName
                            }
                        )
                    })
                    .then(res => res.json())
                    .then(async (data) => { 
                        setTeacherID(data._id); 
                        setUser(data); 
                        (displayName == "Teacher") ? navigate("/tc") : navigate("/st") })

                    .catch((error) => { 
                        alert(error) 
                    });
            })


            console.log(userData);
        } catch (error) {
            console.log("error", error.message);
            alert(error)
        }
    }


    return (
        <div className={`flex flex-col`}>
            <h1 className='text-3xl font-bold'>Login</h1>
            <hr className='border-slate-400 border-1 my-5'></hr>

            <form onSubmit={handleSubmit(handleLogin)}>
                <div className='grid grid-cols-1 gap-5'>
                    <div className='form-control'>
                        <label>Email</label>
                        <input type='text' className="rounded-lg bg-transparent w-full"
                            placeholder='Email'
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /(cse|eee|law)_\d{10}@lus\.ac\.bd/, message: 'only dept_id@lus.ac.bd allow.' }
                            })} />
                        {errors.email && <p role="alert"><span className="label-text-alt text-red-500">{errors.email.message}</span></p>}
                    </div>

                    <div className='form-control'>
                        <label>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="rounded-lg bg-transparent w-full"
                            placeholder='Password'
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
                                    message: 'Password must be 8+ characters include uppercase, lowercase, digit, special.'
                                }
                            })}
                        />
                        <span className='cursor-pointer' onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</span>
                        {errors.password && <p role="alert"><span className="label-text-alt text-red-500">{errors.password.message}</span></p>}
                    </div>

                </div>
                <div className='mt-5'>
                    <small className='my-8 font-bold'>New Here? Click here to  <Link to={"/register"} className='text-blue-500'>registration !</Link></small>
                    <input type='submit' value='Login' className="mt-3 btn btn-dark rounded-lg bg-transparent w-6/12"></input>
                    {loginError && <p className='text-red-600'>{loginError}</p>}
                </div>

            </form>
            {/* <button onClick={""} className={` hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`} >LogIn</button> */}
        </div>
    )
}

export default LogIn;