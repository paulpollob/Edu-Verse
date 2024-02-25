import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import App from "./App";
import Register from "./Pages/Register";
import LogIn from "./Pages/LogIn";
import TeacherMain from "./Pages/Teacher/TeacherMain";
import TeacherHome from "./Pages/Teacher/TeacherHome";
import Temp from "./Pages/Temp";
import Classroom from "./Pages/Teacher/Classroom";
import ClassroomPage from "./Pages/Teacher/ClassroomPage";
import Chat from "./Pages/Chat/Chat";
import ChatMain from "./Pages/Chat/ChatMain";
import ChatHome from "./Pages/Chat/ChatHome";
import VideoText from "./Pages/Chat/VideoText";
import PDFChat from "./Pages/Chat/PDFChat";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute"; 
import StMain from "./Pages/Student/StMain";
import StHome from "./Pages/Student/StHome";
import StClassroom from "./Pages/Student/StClassroom";
import StClassroomPage from "./Pages/Student/StClassroomPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },

    {
        path: '/tc',
        element: <PrivateRoute><TeacherMain></TeacherMain></PrivateRoute>,
        children: [
            {
                path: '/tc',
                element: <PrivateRoute><TeacherHome></TeacherHome></PrivateRoute>
            },
            {
                path: '/tc/classroom',
                element: <PrivateRoute><Classroom></Classroom></PrivateRoute>
            },
            {
                path: '/tc/classroom/Home',
                element: <PrivateRoute><ClassroomPage></ClassroomPage></PrivateRoute>  
            }
        ]
    },

    
    {
        path: '/st',
        element : <StMain></StMain>,
        children: [
            {
                path: '/st',
                element: <PrivateRoute><StHome></StHome></PrivateRoute>
            },
            {
                path: '/st/classroom',
                element: <PrivateRoute><StClassroom></StClassroom></PrivateRoute>
            },
            {
                path: '/st/classroom/Home',
                element: <PrivateRoute><StClassroomPage></StClassroomPage></PrivateRoute>
            }
        ]
    },


    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/temp',
        element: <Temp></Temp>
    },
    {
        path: '/login',
        element: <LogIn></LogIn>
    },
    {
        path: '/ask',
        element: <ChatMain></ChatMain>,
        children: [
            {
                path: '/ask',
                element: <ChatHome></ChatHome>
            },
            {
                path: '/ask/video',
                element: <VideoText></VideoText>
            },
            {
                path: '/ask/chat',
                element: <Chat></Chat>
            },
            {
                path: '/ask/pdf',
                element: <PDFChat></PDFChat>
            }
        ]
    }
])