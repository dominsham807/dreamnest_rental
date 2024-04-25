import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HouseIcon from '@mui/icons-material/House';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { DarkModeContext } from '../context/darkModeContext.js'
import { useDispatch, useSelector } from 'react-redux';

import "../styles/sidebar.scss"
import { setLogout } from '../redux/state.js';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const dispatch = useDispatch()
    const { darkModeDispatch } = useContext(DarkModeContext)
    const user = useSelector((state) => state.user)
    console.log(user)
    
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <img src='/favicon.ico' className='logo-img' /> 
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <div className="center-items">
                        <p className="title">MAIN</p>
                        <li>
                            <DashboardIcon className='icon' />
                            <span>Dashboard</span>
                        </li>
                    </div>
                    <div className="center-items">
                        <p className="title">ITEMS</p>
                        <Link to="/dashboard/users" style={{ textDecoration: "none" }}>
                            <li>
                                <PersonOutlineIcon className="icon" />
                                <span>Users</span>
                            </li>
                        </Link> 
                        <Link to="/dashboard/listings" style={{ textDecoration: "none" }}>
                            <li>
                                <HouseIcon className="icon" />
                                <span>Listings</span>
                            </li>
                        </Link>
                        <Link to="/dashboard/bookings" style={{ textDecoration: "none" }}>
                            <li>
                                <BookOnlineIcon className="icon" />
                                <span>Bookings</span>
                            </li>
                        </Link>
                    </div> 
                    <div className="center-items">
                        <p className="title">USER</p>
                        <li>
                            <AccountCircleOutlinedIcon className="icon" />
                            <span>Profile</span>
                        </li>
                        <li onClick={() => {
                            dispatch(setLogout())
                            toast.success("Logout success")
                        }}>
                            <ExitToAppIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="bottom">
                <p className="title">THEME</p>
                <div className="color-options">
                    <div className="colorOption" onClick={() => darkModeDispatch({ type: "LIGHT" })}></div>
                    <div className="colorOption" onClick={() => darkModeDispatch({ type: "DARK" })}></div>
                </div> 
            </div>
        </div>
    )
}

export default Sidebar