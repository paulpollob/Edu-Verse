import { useContext } from 'react'
import png from './../../../assets/logo.png'
import { BsBrowserSafari } from 'react-icons/bs'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md' 
import { RiMessage2Fill } from 'react-icons/ri'
import { Context } from '../../../Context/EduContext'


const StNavbar = () => {
    const {user} = useContext(Context);
    return (
        <div className='flex items-center justify-between text-slate-600 my-5' >
            <div>
                <img src={png} className='w-40' alt='not found' />
            </div>

            <div className='flex gap-5'>
                <BsBrowserSafari />
                <h1>Browse</h1>
                <FaChevronDown />
            </div>

            <div className='flex items-center gap-3 bg-slate-100 rounded-lg py-1 px-2'>
                <FaSearch />
                <input className='bg-transparent border-0 ' placeholder='Search' type='text' />
            </div>

            <div className='flex items-center gap-5'>
                <RiMessage2Fill className='h-6 w-8' />
                <MdNotifications className=' h-6 w-8' />
                <div className='flex items-center gap-2'>
                    <img title='Prokash Paul Pollob' src={user.img} className='w-9 h-9 rounded-lg' />
                    <p title='Prokash Paul Pollob' className='600 font-bold'>{user.name}</p>
                </div>
                <FaChevronDown />

            </div>
        </div>
    );
};

export default StNavbar;