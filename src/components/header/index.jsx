import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Store from '../../store'
import logo from '../../images/natwest-logo.svg'
import headerImg1 from '../../images/carpool-header-2.png'
import './header.css'

const Header = () => {
  const [user, setUser] = useState(''),
    [userDetails, setUserDetails] = useState({}),
    navigate = useNavigate(),
    logout = () => {
      Store.getItem('userDetails', (err, val) => {
        const obj = { ...val, isLoggedIn: false }
        Store.setItem('userDetails', obj);
        navigate('/')
      })
    }

    useEffect(() => {
     Store.getItem('userDetails', (err, val) => {
      setUserDetails(val)
      setUser(val.username)
     })
    }, [])

  return (
    <>
      {user !== '' && userDetails && userDetails.isLoggedIn && (
      <div className="header">
        <div className="logo">
          <img src={headerImg1} />
        </div>
        <div className='app-name'><strong>SEHYOG</strong><br/><span>Collaborating for a greener ride!!</span></div>
        <div className="user">
          <span>{ user }</span>
          <a onClick={logout}>Logout</a>
        </div>
      </div>)}
    </>
  )
}

export default Header;