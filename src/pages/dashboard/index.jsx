import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/header'
import Store from '../../store'
import car from '../../images/car-new.png'
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
              <p>Your contribution towards reduced carbon footprint: <strong>{userDetails.coReduced} tons</strong></p>
              <p>Green credits gained: <strong>{userDetails.greenCredits}</strong></p>
            </div>
            <img className='car-movement' src={car} width={60} height={60} alt="" />
          </div>
        </div>
        <div className="box">
          <button onClick={() => navigate('/profile')}>My Profile</button>
          <button onClick={() => navigate('/offer-ride')}>Offer Ride</button>
          <button onClick={() => navigate('/find-ride')}>Find a Ride</button>
          <button onClick={() => navigate('/my-rides')}>My Rides</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;