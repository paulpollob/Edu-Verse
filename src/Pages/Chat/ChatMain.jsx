import React, { useState, useEffect } from 'react';
import LeftSideBar from '../Teacher/LeftSidebar';
import { Link, Outlet } from 'react-router-dom';
import { IoChatbubblesSharp } from "react-icons/io5";
import TcNavbar from '../Teacher/components/TcNavbar';

const ChatMain = () => {
    // const [serverResponse, setServerResponse] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/chatGemini');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             console.log("respoonseeee ",data);
    //             setServerResponse(data.Hello);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setServerResponse("error");
    //         }
    //     };

    //     fetchData();
    // }, []); // Empty dependency array to run the effect only once after the component mounts

    return (
        <div className='p-5 min-w-screen min-h-screen rounded-lg bg-white'>
            <TcNavbar></TcNavbar>
            <div className='flex gap-10'>
                <div className='w-2/12'><LeftSideBar></LeftSideBar></div>
                <div className='w-8/12 h-[85vh] bg-teal-50 rounded-xl p-10'>
                    <Outlet></Outlet>
                    {/* <h1>hi</h1>
                    {serverResponse && (
                        <div>
                            <h1>hi</h1>
                            Server Response: {serverResponse}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default ChatMain;
