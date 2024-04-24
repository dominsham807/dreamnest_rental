import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import "../styles/register.scss"

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null 
    })

    const [error, setError] = useState("")
    console.log(error)

    const user = useSelector((state) => state.user) 

    const handleChange = (e) => {
        const { name, value, files } = e.target  
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        }) 
        if(name === "profileImage"){
            console.log(files[0])
        }
    }

    const [passwordMatch, setPasswordMatch] = useState(true) 

    const navigate = useNavigate()

    useEffect(() => {    
        if(user){
            navigate("/")
        } 

        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    }, [user, formData, passwordMatch])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(formData.password === formData.confirmPassword){
            setPasswordMatch(true)
        } else{
            setPasswordMatch(false)
        }

        try{
            const registerForm = new FormData()

            for (var key in formData){
                registerForm.append(key, formData[key])
            }
      
            const res = await fetch("http://localhost:4000/auth/register", {
                method: "POST",
                body: registerForm
            })

            const data = await res.json()
            console.log(data)

            if(!res.ok){
                setError(data.message)
            } else{
                navigate("/login")
                toast.success(data.message)
            }
        } catch(error){
            console.log("Registration failed", error.message)
        }
    }

    return (
        <div className='register'>
            <div className="register_content">
                <form className='register_content_form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='First Name' name='firstName' onChange={handleChange} required />
                    <input type="text" placeholder='Last Name' name='lastName' onChange={handleChange} required />
                    <input type="email" placeholder='Email' name='email' onChange={handleChange} required />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} required />
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} required />
                    {!passwordMatch && (
                        <p style={{ color: 'red' }}>Passwords not matched</p>
                    )}
                    <input id='image' type="file" name='profileImage' style={{ display: 'none' }} onChange={handleChange} accept='image/*' required />
                   
                    {formData.profileImage ? (
                      <label htmlFor='image' >
                        <img htmlFor='image' src={URL.createObjectURL(formData.profileImage)} alt='Profile' />
                      </label>
                     
                    ) : (
                        <label htmlFor='image'>
                            <img className='upload' src="/assets/addImage.png" alt="" />
                            <p>Upload Your Profile</p>
                        </label>
                    )}
                    {error && <p>{error}</p>}
                    <button type='submit' disabled={!passwordMatch}>REGISTER</button>
                </form>
                <a href="/login">Already have an account? Login here</a>
            </div>
        </div>
    )
}

export default Register