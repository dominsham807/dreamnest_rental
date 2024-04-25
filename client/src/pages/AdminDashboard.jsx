import React from 'react' 
import Widget from '../components/Widget'
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import "../styles/admin-dashboard.scss"

const AdminDashboard = () => {
    const dashboardData = [
        {
            title: "User",
            total: 2,
            link: "See All Users",
            icon: (
                <PersonOutlinedIcon
                    className="icon"
                    style={{
                        color: "crimson",
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                    }}
                />
            ),
            isMoney: false
        },
        {
            title: "Listings",
            total: 6,
            link: "See All Listings",
            icon: (
                <HouseOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }}
                />
            ),
            isMoney: false
        },
        {
            title: "Reservations",
            total: 3,
            link: "Check Bookings",
            icon: (
                <BookOnlineOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }}
                />
            ),
            isMoney: false
        },
        {
            title: "Earnings",
            total: 20000,
            link: "Check Revenue",
            icon: (
                <MonetizationOnOutlinedIcon 
                    className="icon"
                    style={{ 
                        backgroundColor: "rgba(0, 128, 0, 0.2)",
                        color: "green" 
                    }}
                />
            ),
            isMoney: true
        }
    ]

    return ( 
        <>
        <div className="widgets">
            {dashboardData.map((data, index) => (
                <Widget key={index} title={data.title} total={data.total} link={data.link} icon={data.icon} isMoney={data.isMoney} />
            ))}
        </div>
        </>
    )
}

export default AdminDashboard