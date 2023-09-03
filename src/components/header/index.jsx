import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Store from '../../store'
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
        <div className="logo">Sehyog</div>
        <div className="user">
          <span>{ user }</span>
          <a onClick={logout}>Logout</a>
        </div>
      </div>)}
    </>
  )
}

export default Header;