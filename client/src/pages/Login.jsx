import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setLogin } from '../redux/state.js'
import toast from 'react-hot-toast'

import "../styles/login.scss"

const Login = () => {
    const user = useSelector((state) => state.user) 

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    console.log(error)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user])

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const res = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await res.json()
            console.log(data)
            if(!res.ok){
                setError(data.message)
            } else{
                dispatch(
                    setLogin({
                        user: data.user,
                        token: data.token
                    })
                )
                navigate("/")
            }
        } catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='login'>
            <div className="login_content">
                <form className="login_content_form" onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p>{error}</p>}
                    <button type='submit'>LOGIN</button>
                </form>
                <a href="/register">Don't have an account yet? Sign in here</a>
            </div>
        </div>
    )
}

export default Login