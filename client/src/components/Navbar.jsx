import React, { useEffect, useRef, useState } from 'react'
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import variables from "../styles/variables.scss";

import "../styles/navbar.scss"
import { setLogout } from '../redux/state';

const Navbar = () => {
    const user = useSelector((state) => state.user) 
    console.log(user)
    
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")
    const [dropdownMenu, setDropdownMenu] = useState(false)

    const dropdownRef = useRef()
    
    const dropdownHandler = (e) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target) && e.target !== dropdownRef.current){
            setDropdownMenu(false)
        }
    }

    useEffect(() => {   
        document.addEventListener("click", dropdownHandler) 

        return() =>{
            document.removeEventListener("click", dropdownHandler) 
        }
    }, [dropdownMenu])

    return (
        <div className='navbar'>
            <a href="/">
                <img src="/assets/logo.png" alt="LOGO" />
            </a>

            <div className="navbar_search">
                <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <IconButton disabled={search === ""}>
                    <Search sx={{ color: variables.pinkred }} />
                </IconButton>
            </div>

            <div className="navbar_right">
                {user && (
                    <a href='/create-listing' className='host'>
                        Become A Host 
                    </a>
                )}
                <div ref={dropdownRef}>
                    <button className="navbar_right_account" onClick={() => setDropdownMenu(!dropdownMenu)}>
                        <Menu sx={{ color: variables.darkgrey }} />
                        {!user ? (
                            <Person sx={{ color: variables.darkgrey }} />
                        ) : (
                            <img src={`http://localhost:4000/${user.profileImagePath.replace("public", "")}`} alt='Profile'
                            style={{ objectFit: 'cover', borderRadius: '50%' }} />
                        )}
                    </button>
  
                    <div className={`navbar_right_accountmenu ${dropdownMenu && !user ? 'active' : ''}`}>
                        <Link to={"/login"} onClick={() => setDropdownMenu(false)}>Login</Link>
                        <Link to={"/register"} onClick={() => setDropdownMenu(false)}>Sign up</Link>
                    </div> 

                    <div className={`navbar_right_accountmenu ${dropdownMenu && user ? 'active' : ''}`}>
                        <Link to={`/${user?._id}/trips`} onClick={() => setDropdownMenu(false)}>Trip</Link>
                        <Link to={`/${user?._id}/wishlist`} onClick={() => setDropdownMenu(false)}>Wishlist</Link>
                        <Link to={`/${user?._id}/properties`} onClick={() => setDropdownMenu(false)}>Properties</Link>
                        <Link to={`/${user?._id}/reservations`} onClick={() => setDropdownMenu(false)}>Make Reservations</Link> 
                        <Link to={"/login"} onClick={() => {
                            dispatch(setLogout()) 
                            setDropdownMenu(false)
                        }}>
                            Logout
                        </Link>
                    </div> 
                </div> 
            </div>
        </div>
    )
}

export default Navbar