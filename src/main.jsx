import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import EduContext from './Context/EduContext.jsx'
import App from './App.jsx'
import Check from './Check.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<EduContext>
			<Check></Check>
		</EduContext>
	</React.StrictMode>
)
