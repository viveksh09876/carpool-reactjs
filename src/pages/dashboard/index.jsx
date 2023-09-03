import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/header'
import './dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="dashboard">
      <Header />
      <div className="container">
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