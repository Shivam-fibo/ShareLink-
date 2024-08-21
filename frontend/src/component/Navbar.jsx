import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>
      <div className="logo">
            <img src="/filelogo.png" alt="logo" />
      </div>
      <div className="info">
        <ul>
          <li> <Link to={"/"}>Home </Link> </li>
        <li> <Link to={"/howitwork"}> How it work</Link> </li>
            <li><Link to={"https://github.com/Shivam-fibo/ShareLink-"} target='_blank'>Github</Link></li>
            <li><Link to={"https://www.linkedin.com/in/shivamgupta6418/"} target='_blank'> Connect with me!</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
