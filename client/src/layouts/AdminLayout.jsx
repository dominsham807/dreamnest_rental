import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AdminNavbar from '../components/AdminNavbar'

import "../styles/admin-layout.scss" 

const AdminLayout = () => {
    return (
        <div className='home-dashboard'>
            <Sidebar />
            <div className="homeContainer">
                <AdminNavbar />
                <Outlet />
            </div> 
        </div>
    )
}

export default AdminLayout