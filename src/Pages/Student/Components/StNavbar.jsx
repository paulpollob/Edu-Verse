import { useContext } from 'react'
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
                {/* <RiMessage2Fill className='h-6 w-8' /> */}
                {/* <MdNotifications className=' h-6 w-8' /> */}
                <div className='mr-5'>
                    {/* <img title='Prokash Paul Pollob' src={user.img} className='w-9 h-9 rounded-lg' /> */}
                    <p className='font-bold text-teal-600 text-xl'>Koushik</p>
                </div>
            </div>
        </div>
    );
};

export default StNavbar;