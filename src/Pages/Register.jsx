import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context/EduContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Register = () => {

    const [page, setPage] = useState(0)
    const [rError, setRError] = useState("")

    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState();
    return (
        <div className='bg-white min-w-screen min-h-screen'>
            <Header></Header>
            <div className='flex gap-10 py-10 px-44'>
                <Sidebar></Sidebar>
                {/* <Disp page={page} setPage={setPage} imageUrl={imageUrl} setImageUrl={setImageUrl} image={image} setImage={setImage} rError={rError} setRError={setRError}></Disp> */}
                <Formdisp></Formdisp>

            </div>
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
        <div className='p-5 lg:p-0 lg:w-6/12'>
            <small className='font-bold'>"Online classrooms bring together minds from around the world, creating a global learning community." - Anonymous</small>
            <img className="" src="https://i.ibb.co/vmPBwdK/login-side.png" alt="log side" />

        </div>
    )
}

const Disp = ({ page, setPage, imageUrl, setImageUrl, image, setImage, rError, setRError }) => {

    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { signUp, uploadImg, updateProfile } = useContext(Context);


    const handleSubmit = () => {
        setPage(page)
        setLoading(true);
        setRError("")
        const formData = new FormData(formRef.current);
        const name = formRef.current.name.value;
        const email = formRef.current.email.value;
        const password = formRef.current.password.value;
        const phone = formRef.current.phone.value;
        const occupation = formRef.current.occupation.value;
        const cfpassword = formRef.current.cfpassword.value;


        if (password === cfpassword)
            console.log("HK page")

        uploadImg(image)
            .then(res => res.json())
            .then(data => {
                console.log("HK data: ", data)
                const img = data.data.display_url
                signUp(email, password)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        await updateProfile(user, {
                            displayName: occupation
                        }).then(() => {
                            console.log('Username set successfully:', user.displayName);
                            setRError("");
                        }).catch((error) => {
                            console.error('Error setting username:', error);
                            setRError(error)
                        });
                        const { uid } = user
                        console.log("HK user: ", user, uid)

                        fetch('http://localhost:5000/addUser',
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(
                                    {
                                        "_id": uid,
                                        "name": name,
                                        "email": email,
                                        "password": password,
                                        "phone": phone,
                                        "occupation": occupation,
                                        "img": img
                                    }
                                )
                            })
                            .then(res => res.json())
                            .then((data) => { console.log("HK dta: ", data); setLoading(false); setRError(""); alert("Registered successfully!!!  You can Login Now.") })
                            .catch((error) => { console.log("Error:", error); setLoading(false); setRError(error); alert(error); });


                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage)
                        setLoading(false)
                        setRError(error.message)
                        alert(errorMessage)
                    });
            })
    };

    return (
        <div className='w-8/12 mx-10 bg-slate-100 p-10 rounded-xl'>
            <UserProfile page={page} setPage={setPage} formRef={formRef} imageUrl={imageUrl} setImageUrl={setImageUrl} image={image} setImage={setImage} rError={rError}></UserProfile>
            <div className='flex items-end justify-between ' >
                {page > 0 ? <button onClick={() => setPage(page - 1)} className={`${page < 1 && 'cursor-not-allowed '} hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`} >Prev</button>
                    :
                    <button className={`cursor-not-allowed bg-green-200 px-5 py-2 text-white rounded-full my-5`} disabled>Prev</button>
                }
                {page < 0 ? <button onClick={() => setPage(page + 1)} className={`hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`}>Next</button>
                    :
                    <button onClick={handleSubmit} className={` ${loading ? "bg-green-200 cursor-not-allowed" : "bg-green-400 hover:bg-green-500"} px-5 py-2 text-white rounded-full my-5`} disabled={loading}>{loading ? <span className="loading loading-spinner text-neutral"></span> : "Submit"}</button>}
            </div>

        </div>
    )
}


const UserProfile = ({ page, setPage, formRef, imageUrl, setImageUrl, image, setImage, rError }) => {

    const evnt = (event) => {
        const src = event.target.files[0];
        setImage(src)
        const url = URL.createObjectURL(src)
        setImageUrl(url)
    }


    return (
        <div className={`  ${(page == 0) ? ' z-40 ' : ' -z-40 '}`}>
            <h1 className='text-3xl font-bold'>User Profile</h1>
            <hr className='border-slate-400 border-1 my-5'></hr>
            <form ref={formRef} className='grid grid-cols-2 gap-10'>
                <div>
                    <p>Full Name</p>
                    <input type='text' name="name" placeholder='Your Full Name' className="rounded-lg bg-transparent w-full" required></input>
                </div>
                <div>
                    <p>Email</p>
                    <input type='text' name="email" placeholder='Email' className="rounded-lg bg-transparent w-full" required></input>
                </div>
                <div>
                    <p>Phone Number</p>
                    <input type='text' name="phone" placeholder='Phone Number' className="rounded-lg bg-transparent w-full" required></input>
                </div>

                <div className='flex flex-col'>
                    <label>Occupation</label>
                    <select name="occupation"
                        className=" rounded-lg bg-transparent w-full"
                    >
                        <option value="">Select an option</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                </div>

                <div>
                    <p>Password</p>
                    <input type='text' name="password" placeholder='Password' className="rounded-lg bg-transparent w-full" required></input>
                </div>
                <div>
                    <p>Confirm Password</p>
                    <input type='text' name="cfpassword" placeholder='Confirm Password' className="rounded-lg bg-transparent w-full" required></input>
                </div>
                <div className='w-full'>
                    <p>Upload image</p>
                    <input onChange={evnt} type='file' name="cfpassword" accept="image/png, image/gif, image/jpeg" placeholder='Image' className="rounded-lg bg-transparent w-full" required></input>
                </div>
                <div>
                    <p>Image Preview</p>
                    <img className='w-full h-52' src={imageUrl} alt='Image Preview'></img>
                </div>
            </form>

            <small className='text-red-600 font-bold'>{rError}</small>
        </div>
    )
}


const Formdisp = () => {
    return (
        <div className='lg:w-8/12 lg:h-[511px] p-8 bg-teal-100  rounded-xl font-semibold '>
            <UserProfilee></UserProfilee>
        </div>
    )
}

import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserProfilee = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signUpError, setSignUpError] = useState('');
    const password = watch("password", "");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { signUp, uploadImg, updateProfile } = useContext(Context);
    const [loading, setLoading] = useState(false);


    const handleSignUp = async (userData) => {
        setSignUpError('')
        setLoading(true)
        console.log("just touch", userData);

        try {
            signUp(userData.email, userData.password)
                .then(userCredential => {

                    console.log("userCredential", userCredential);
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: userData.occupation
                    }).then(() => {
                        console.log('Username set successfully:', user.displayName);
                        console.log('User:', user);
                        const { uid } = user
                        saveUser(uid);
                        setLoading(false)

                    }).catch(err => console.log(err))
                    alert('User Created successfully.')
                    setLoading(false)
                })
                .catch(error => {
                    setSignUpError(error.message)
                    console.log(error)
                    alert(error.message)
                    setLoading(false)

                })


            const saveUser = (uid) => {
                console.log("touch uid", uid);

                fetch('http://localhost:5000/addUser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "_id": uid,
                        "name": userData.name,
                        "email": userData.email,
                        "password": userData.password,
                        "phone": userData.phone,
                        "occupation": userData.occupation,
                        "img": "nulll"
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        alert('User save in backend.', data)
                        navigate('/login')
                        setLoading(false)

                    })
                    .catch(err => { console.log("backend error", err.message); setLoading(false) })
            }

        } catch (error) {
            console.log("error", error.message);
            setSignUpError(error.message)
            alert(error.message)
            setLoading(false)

        }
    }

    return (
        <div>
            <h1 className='text-3xl font-bold'>Registration</h1>
            <hr className='border-slate-400 border-1 my-2'></hr>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className='grid grid-cols-2 gap-2'>

                    <div className='form-control'>
                        <label>Full Name</label>
                        <input type='text' className="rounded-lg bg-transparent w-full"
                            placeholder='Your Full Name'
                            {...register("name", {
                                required: "Name is required",
                                pattern: { value: /^[A-Z][A-Za-z .]{3,20}$/, message: 'must be 4 letters or longer with the initial letter capitalized.' }
                            })} />
                        {errors.name && <p role="alert"><span className="label-text-alt text-red-500">{errors.name.message}</span></p>}

                    </div>

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
                        <label>Phone</label>
                        <input type='number' className="rounded-lg bg-transparent w-full"
                            placeholder='Phone Number'
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: { value: /(\+88)?-?01[3-9]\d{8}/, message: 'Number must be eleven-digit.' }
                            })} />
                        {errors.phone && <p role="alert"><span className="label-text-alt text-red-500">{errors.phone.message}</span></p>}
                    </div>

                    <div className='form-control'>
                        <label>Occupation</label>
                        <select
                            className="rounded-lg bg-transparent w-full"
                            {...register("occupation", {
                                required: "Occupation Label is required",
                            })}
                        >
                            <option value="">Select an option</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                        {errors.occupation && (
                            <p role="alert">
                                <span className="label-text-alt text-red-500">
                                    {errors.occupation.message}
                                </span>
                            </p>
                        )}
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

                    <div className='form-control'>
                        <label>Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="rounded-lg bg-transparent w-full"
                            placeholder='Confirm Password'
                            {...register("cfpassword", {
                                required: "Confirm Password is required",
                                validate: value => value === password || "Passwords do not match"
                            })}
                        />
                        <span className='cursor-pointer' onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</span>
                        {errors.cfpassword && <p role="alert"><span className="absolate label-text-alt text-red-500">{errors.cfpassword.message}</span></p>}
                    </div>


                    <small className='mt-2 font-bold'>Already have an account? <Link to={"/login"} className='text-blue-500'>Login !</Link></small>
                    <br />
                    <button type='submit' className="btn btn-dark rounded-lg bg-transparent w-full">{loading ? <span className="loading loading-ball loading-md"></span> : "Sign Up"}</button>
                    {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}
                </div>
            </form>
        </div>
    )
}

export default Register;