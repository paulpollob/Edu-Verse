import React, { useContext, useState } from 'react';
import { Context } from '../Context/EduContext';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    
    const navigate = useNavigate(); 

    const {user, userLoading} = useContext(Context)
    if(userLoading && !(user.email==null)) (user.displayName=="Teacher")?navigate("/tc"):navigate("/st")

    const [page, setPage] = useState(0)
    return (
        <div className='bg-gradient-to-r from-purple-200 to-blue-100  min-w-screen min-h-screen'>
            <Header page={page}></Header>
            <div className='flex gap-5 py-10 px-44 text-slate-500 bg-blur-md rounded-lg'>
                <Sidebar page={page} setPage={setPage}></Sidebar>
                <Disp page={page} setPage={setPage}></Disp>
            </div>
        </div>
    );
};






const Header = ({ page }) => {
    return (
        <div className='bg-slate-100 px-20 py-5 text-gray-600'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Eduverse</h1>
                <small>Need help</small>
            </div>
            <hr className='my-5 border border-slate-400'></hr>
        </div>
    )
}



const Sidebar = ({ page, setPage }) => {
    return (
        <div className='w-4/12'>
            <h1 className='text-3xl font-bold'>Log In</h1>
            <small>"Online classrooms bring together minds from around the world, creating a global learning community." - Anonymous</small>
            <hr className='border-slate-400 border-1 m-5'></hr>
            <div className='flex my-5'>
                <div className='bg-slate-600 h-100 rounded-lg'>
                    <div className='rounded-lg bg-red-500 w-1' Style={`height:${4}%`}></div>
                </div>
            </div>
        </div>
    )
}


const Disp = ({ page, setPage }) => {
    return (
        <div className='w-8/12 mx-10 bg-slate-100 p-10 rounded-xl'>
            <UserProfile page={page} setPage={setPage}></UserProfile>
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
                    .then(async(data) => { setTeacherID(data._id);setUser(data); setLError(""); setLoading(false); (displayName=="Teacher")?navigate("/tc"):navigate("/st") })
                    .catch((error) => { console.log("Error:", error); setLoading(false); setLError(error); alert(error) });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("HK error: ", errorMessage)
                setLError(errorMessage)
                setLoading(false)
                alert(error.toString())
            });
    }
    return (
        <div>
            <form onSubmit={Login} className={`flex flex-col`}>
                <h1 className='text-3xl font-bold'>User Profile</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-1 gap-10'>
                    <div>
                        <p>Email</p>
                        <input type='text' name="email" placeholder='Email' className="rounded-lg bg-transparent w-full" ></input>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type='password' name="password" placeholder='Your Password' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                </div>
                <button type={"submit"} className={` hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`} disabled={loading} >{loading ? <span className="loading loading-ring loading-md"></span> : "LogIn"}</button>
            </form>
            <small className='text-red-600 font-bold'>{lError}</small>
        </div>
    )
}


export default LogIn;