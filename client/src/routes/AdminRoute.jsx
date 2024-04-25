import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const user = useSelector((state) => state.user)

    return (
        <>
        {user.type === 'admin' ? (
            <Outlet />
        ) : (
            <Navigate to={'/'} />
        )}
        </>
       
    )
}

export default AdminRoute