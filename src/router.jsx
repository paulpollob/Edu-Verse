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
        element: <TeacherMain></TeacherMain>,
        children: [
            {
                path: '/tc',
                element: <TeacherHome></TeacherHome>
            },
            {
                path: '/tc/classroom',
                element: <Classroom></Classroom>
            },
            {
                path: '/tc/Home',
                element: <ClassroomPage></ClassroomPage>
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