
import { Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router'
import { useContext } from 'react'
import { Context } from './Context/EduContext'
import Load from './Load'

function App() {
	const { user, userLoading } = useContext(Context);
	return (
		<div className='p-10 bg-white  min-h-screen'>
			 
				<Outlet></Outlet> 
		</div>
	)
}

export default App
