import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/header'
import Store from '../../store'
import car from '../../images/car-new.png'
import profileImg from '../../images/profile.png'
import rideImg from '../../images/car-sharing.png'
import searchImg from '../../images/search.png'
import summaryImg from '../../images/summary.png'
import './dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate(),
    [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    Store.getItem('userDetails', (err, val) => {
      setUserDetails(val)
    });
  }, [])

  return (
    <div className="dashboard">
      <Header />
      <div className="container">
        <div className='top-section'>
          <div className='street '>
            <div className='footprint'>
              <p>Your contribution towards reduced carbon footprint: <strong>{userDetails.coReduced} KgCo2e</strong></p>
              <p>Green credits gained: <strong>{userDetails.greenCredits}</strong></p>
            </div>
            <img className='car-movement' src={car} width={60} height={60} alt="" />
          </div>
        </div>
        <div className="box">
          <button onClick={() => navigate('/profile')}>
            <img src={profileImg} alt="" />
            <p>My Profile</p>
          </button>
          <button onClick={() => navigate('/offer-ride')}>
            <img src={rideImg} alt="" />
            <p>Offer a Ride</p>
          </button>
          <button onClick={() => navigate('/find-ride')}>
            <img src={searchImg} alt="" />
            <p>Find a Ride</p>
          </button>
          <button onClick={() => navigate('/my-rides')}>
            <img src={summaryImg} alt="" />
            <p>My Ride Summary</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;