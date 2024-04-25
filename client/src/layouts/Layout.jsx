import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader'
import Footer from '../components/Footer'

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