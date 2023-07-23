import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import App from "./App";

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
    }
])