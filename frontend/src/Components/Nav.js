import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user')

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signup')
  }

  return (
    <div>
      <img src="data:image/png;base64,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"
        alt="logo"
        className='img-logo' />
      {
        auth ?
          <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            <li><Link to="/update">Update Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
          :
          <ul className='nav-ul nav-right'>
            <li><Link to="/SignUp">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
      }
    </div>
  )
}

export default Nav
