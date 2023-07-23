
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Header/Navbar'


function App() {


  return (
    <div className='p-10 w-screen h-screen bg-blur-md bg-gradient-to-r from-purple-200 to-blue-100 rounded-lg'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
