
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
	return (
		<div className='p-10 bg-white  min-h-screen'>
			<Outlet></Outlet>
		</div>
	)
}

export default App
