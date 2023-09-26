import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/');
    }
  })

  const collectData = async () =>{
    console.log(name,password,email);
    let result = await fetch('http://localhost:5000/register',{
      method:'post',
      body:JSON.stringify({name, password, email}),
      headers:{
        'Content-Type':'application/json'
      }
    })
  
    result = await result.json()
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    navigate('/')
  }

  return (
    <div className='register'>
      <h2>Register</h2>
      <input className='inputbox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
      <input className='inputbox' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
      <input className='inputbox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
      <button onClick={collectData} type='button' className='appbutton'>Sign Up</button>
    </div>
  )
}

export default SignUp
