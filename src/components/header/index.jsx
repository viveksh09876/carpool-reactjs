import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Store from '../../store'
import ModalContainer from "../ModalContainer";
import logo from '../../images/natwest-logo.svg'
import headerImg1 from '../../images/carpool-header-2.png'
import carbonAccount from '../../images/my-carbon-account.jpeg'
import profileIcon from '../../images/profile.png'
import './header.css'

const Header = () => {
  const [user, setUser] = useState(''),
    [userDetails, setUserDetails] = useState({}),
    [popupOpened, setPopupOpened] = useState(false),
    toggleModal = () => {
      setPopupOpened(prev => !prev)
    },
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
          <a onClick={toggleModal} className='user-name'>
            <img className='profile-img' src={profileIcon} alt=""/>
            <span>{ user }</span>
          </a>
          <a onClick={logout}>Logout</a>
        </div>
        <ModalContainer show={popupOpened} onClose={toggleModal}>
          <img height={500} src={carbonAccount} alt="" />
        </ModalContainer>
      </div>)}
    </>
  )
}

export default Header;