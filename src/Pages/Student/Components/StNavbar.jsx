import { useContext, useState } from 'react'
import png from './../../../assets/logo.png'
import { BsBrowserSafari } from 'react-icons/bs'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md' 
import { RiMessage2Fill } from 'react-icons/ri'
import { Context } from '../../../Context/EduContext'
import { useNavigate } from 'react-router-dom'


const StNavbar = () => {
    const [loading, setLoading] = useState(false);
    const { user, logOut } = useContext(Context);

    const navigate = useNavigate();

    const signOute = () =>
    {
        setLoading(true)
        logOut()
        .then(() => {
            setLoading(false)
            // alert("HK signout")
            navigate('/login')
          }).catch((error) => {
            alert("cann't sign out")
          });
    } 
    return (
        <div className='flex items-center justify-between text-slate-600' >
            <div>
                <img className="w-56" src="https://i.ibb.co/fMd12gB/logo.png" alt="logo" />
            </div>
            <div className='flex items-center gap-5'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className='flex gap-3 bg-teal-50 p-2 rounded-xl'>
                        {/* update user profile here? */}
                        <img  src={user.img} className='w-8 h-6 shadow-2xl rounded-full' alt='not found' />
                        <p className='font-bold text-teal-600 text-sm mr-2'>{user.name}</p>
                        <FaChevronDown className='mt-1'/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                        <li><button className='cursor-pointer font-bold' onClick={signOute}>Logout</button></li>
                        {/* <li><a>Item 2</a></li> */}
                    </ul> 
                </div>

            </div>
        </div>
    );
};

export default StNavbar;