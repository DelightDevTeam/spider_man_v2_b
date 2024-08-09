import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
 import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <ToastContainer />
    <RouterProvider router={router} />
    </>
)
