import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <img className="absolute w-[420px] h-[590px] opacity-25 right-0  my-[-310px]" src="https://i.ibb.co/51QD95F/banner-shape02.png" alt="side photo" />
            <div className='flex justify-between'>
                <img className=" my-[-30px]" src="https://i.ibb.co/fMd12gB/logo.png" alt="logo" />
                <div className='flex gap-8 mr-40'>
                    <Link className='font-bold text-lg'>About</Link>
                    <Link className='font-bold text-lg'>Contact</Link>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                <div className='lg:my-16 lg:p-12 lg:ml-16 sm:my-8'>
                    <h1 className='lg:text-7xl sm:text-4xl text-4xl'>VIRTUAL</h1>
                    <h1 className='lg:text-7xl sm:text-4xl text-4xl text-teal-700'>CLASSROOM</h1>
                    <h3 className='my-2 font-semibold'>Unlock Your Potential Today with Interactive Learning. Join Us Online for an Enlightening Educational Journey.</h3>
                    <Link className="btn btn-primary bg-teal-400  lg:my-10 lg:w-64 font-bold lg:text-lg " to="/login">GET STARTED</Link>
                </div>
                <div>
                    <img className="my-[-16px] w-[800px] h-[600px] " src="https://i.ibb.co/vXCWk9x/frontImg.png" alt="Current profile photo" />
                </div>
            </div>

        </div>
    );
};

export default Home;
