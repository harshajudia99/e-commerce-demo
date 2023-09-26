import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/');
        }
    })

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ password, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/')
        }
        else {
            alert('Please enter correct detials')
        }
    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <input className='inputbox' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className='inputbox' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button type='button' onClick={handleLogin} className='appbutton'>Sign Up</button>
        </div>
    )
}

export default Login
