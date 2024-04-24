import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Loader from './Loader'
import Footer from './Footer'

const Layout = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadDataFetch = () => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }

        loadDataFetch()
    }, [])

    return (
        isLoading ? (
            <Loader />
        ) : (
            <>
            <Navbar />
            <Outlet />
            <Footer />
            </>
        )
    )
}

export default Layout