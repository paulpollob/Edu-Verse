import React, { useState } from 'react';

const Register = () => {

    const [page, setPage] = useState(0)
    return (
        <>
            <Header page = {page}></Header>
            <div className='text-slate-500 flex gap-5 py-10 px-44 min-w-screen min-h-screen bg-blur-md bg-gradient-to-r from-purple-200 to-blue-100 rounded-lg'>
                <Sidebar page={page} setPage = {setPage}></Sidebar>
                <Disp page = {page} setPage={setPage}></Disp>
            </div>
        </>
    );
};






const Header = ({page}) =>
{
    return (
        <div className='bg-slate-100 px-20 py-5 text-gray-600'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Eduverse</h1>
                <small>Need help</small>
            </div>
            <hr className='my-5 border border-slate-400'></hr>

            <div className='bg-slate-700 h-2 rounded-lg my-6s mx-20'>
                <div className='h-full bg-green-500 rounded-lg' Style={`width: ${(((page+1)/5)*100)}%;`}></div>
            </div>
        </div>
    )
}



const Sidebar = ({page, setPage}) => {
    return (
        <div className='w-4/12'>
            <h1 className='text-3xl font-bold'>Registration Form</h1>
            <small>"Online classrooms bring together minds from around the world, creating a global learning community." - Anonymous</small>
            <hr className='border-slate-400 border-1 m-5'></hr>
            <div className='flex my-5'>
                <div className='bg-slate-600 h-100 rounded-lg'>
                    <div className='rounded-lg bg-red-500 w-1' Style={`height:${4}%`}></div>
                </div>
                <div className=' flex flex-col gap-10 items-start h-100 mx-5'>
                    <div onClick={()=>setPage(0)} className={`cursor-pointer hover:border-l-4 ${page==0 && (' border-slate-600 border-r-4 border-l-4 ')} hover:border-slate-600 rounded-xl hover:border-r-4 px-2`}>User Profile</div>
                    <div onClick={()=>setPage(1)} className={`cursor-pointer hover:border-l-4 ${page==1 && (' border-slate-600 border-r-4 border-l-4 ')} hover:border-slate-600 rounded-xl hover:border-r-4 px-2`}>Address</div>
                    <div onClick={()=>setPage(2)} className={`cursor-pointer hover:border-l-4 ${page==2 && (' border-slate-600 border-r-4 border-l-4 ')} hover:border-slate-600 rounded-xl hover:border-r-4 px-2`}>Job Description</div>
                    <div onClick={()=>setPage(3)} className={`cursor-pointer hover:border-l-4 ${page==3 && (' border-slate-600 border-r-4 border-l-4 ')} hover:border-slate-600 rounded-xl hover:border-r-4 px-2`}>Bank Informations & Others</div>
                    <div onClick={()=>setPage(4)} className={`cursor-pointer hover:border-l-4 ${page==4 && (' border-slate-600 border-r-4 border-l-4 ')} hover:border-slate-600 rounded-xl hover:border-r-4 px-2`}>Upload documents</div>
                </div>
            </div>
        </div>
    )
}


const Disp = ({page, setPage}) => {
    return (
        <div className='w-8/12 mx-10 bg-slate-100 p-10 rounded-xl'>
            <UserProfile page={page} setPage={setPage}></UserProfile>
            <Address page={page} setPage={setPage}></Address>
            <JobDescription page={page} setPage={setPage}></JobDescription>
            <BankInformations page={page} setPage={setPage}></BankInformations>
            <UploadDocuments page={page} setPage={setPage}></UploadDocuments>


            
            <div className='flex items-end justify-between h-full w-full' >
                {page>0 ? <button onClick={()=>setPage(page-1)} className={`${page<1 && 'cursor-not-allowed '} hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`} >Prev</button>
                :
                <button className={`cursor-not-allowed bg-green-200 px-5 py-2 text-white rounded-full my-5`} disabled>Prev</button>
                }
                {page<4 ? <button onClick={()=>setPage(page+1)} className={`hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`}>Next</button>
                :
                <button onClick={()=>setPage(page)} className={`hover:bg-green-500 bg-green-400 px-5 py-2 text-white rounded-full my-5`}>Submit</button>}
            </div>

        </div>
    )
}






const UserProfile = ({page, setPage}) => {


    return (
        <div className={`absolute  ${(page==0)? ' z-40 ' : ' -z-40 '}`}>
                <h1 className='text-3xl font-bold'>User Profile</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <p>Full Name</p>
                        <input type='text' name="name" placeholder='Your Full Name' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Email</p>
                        <input type='text' name="name" placeholder='Email' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <input type='text' name="name" placeholder='Phone Number' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Education Label</p>
                        <input type='text' name="name" placeholder='Education Label' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type='text' name="password" placeholder='Password' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input type='text' name="ConfirmPassword" placeholder='Confirm Password' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                </div>
            </div>
    )
}



const Address = ({page, setPage}) => {


    return (
        <div className={`absolute - ${(page==1)? ' z-40 ' : ' -z-40 '}`}>
                <h1 className='text-3xl font-bold'>Address</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <p>Village</p>
                        <input type='text' name="name" placeholder='Your Full Name' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>District</p>
                        <input type='text' name="name" placeholder='Email' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Division</p>
                        <input type='text' name="name" placeholder='Phone Number' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Country</p>
                        <input type='text' name="name" placeholder='Education Label' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Plannet</p>
                        <input type='text' name="name" placeholder='Name' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                    <div>
                        <p>Galaxy</p>
                        <input type='text' name="name" placeholder='Name' className="rounded-lg bg-transparent w-full"></input>
                    </div>
                </div>

        </div>
    )
}



const JobDescription = ({page}) => {
    return (
        <div className={`absolute - ${(page==2)? ' z-40 ' : ' -z-40 '}`}>
                <h1 className='text-3xl font-bold'>Job Description</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-2 gap-10'>
                    <h1>From Job description... it will update later</h1>
                </div>
            </div>
    )
}


const BankInformations = ({page}) => {
    return (
        <div className={`absolute - ${(page==3)? ' z-40 ' : ' -z-40 '}`}>
                <h1 className='text-3xl font-bold'>Job Bank Informations & Others</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-2 gap-10'>
                    <h1>From Job description... it will update later</h1>
                </div>
            </div>
    )
}


const UploadDocuments = ({page}) => {
    return (
        <div className={`absolute - ${(page==4)? ' z-40 ' : ' -z-40 '}`}>
                <h1 className='text-3xl font-bold'>Job Upload documents</h1>
                <hr className='border-slate-400 border-1 my-5'></hr>
                <div className='grid grid-cols-2 gap-10'>
                    <h1>From Job description... it will update later</h1>
                </div>
            </div>
    )
}

export default Register;