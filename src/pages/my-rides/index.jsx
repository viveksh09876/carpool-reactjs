import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Moment from 'react-moment';
import Header from '../../components/header'
import Store from '../../store'
import './my-rides.css'

const MyRides = () => {
  const [myRides, setMyRides] = useState([]),
    [userDetails, setUserDetails] = useState({}),
    navigate = useNavigate(),
    viewRideDetails = (rideId) => {
      navigate(`/ride-details/${rideId}`);
    }

  useEffect(() => {
    Store.getItem('userDetails', (err, user) => {
      setUserDetails(user);
      Store.getItem('allRides', (err, val) => {
        let ridesArr = [];
        if (val) {
          ridesArr = val.filter(ride => {
            if (ride.username == user.username) {
              return true;
            } else {
              const isRideRequested = ride.rideRequests.find(x => x.username == user.username)
              if (isRideRequested) {
                return true
              }

              const isRideAccepted = ride.riders.find(x => x.username = user.username)
              if (isRideAccepted) {
                return true
              }
            }
            return false
          })
        }
        setMyRides(ridesArr)
      })
    });
  }, [])

  return (
    <div className='profile my-rides'>
      <Header />
      <div className='container'>
        <div className='back-btn-section'>
          <button type='button' onClick={() => navigate('/dashboard')}>Back to dashboard</button>
        </div>
        <div className='rides'>
          <h4>My Rides : <span>{myRides.length}</span></h4>
          <div className='rides-list'>
            {myRides.map(ride => {
              const isRideAlreadyRequested = ride.rideRequests.find(data => data.username == userDetails.username);
              return (
                <div className='ride' key={ride.id}>
                  <div className='ride-details'>
                    <div className='left-section'>
                      <div>Start Time: <Moment format="DD/MM/YYYY HH:MM">{ride.dateTime}</Moment></div>
                      <div>Vehicle: {`${ride.vehicleBrand} ${ride.vehicleModel} (${ride.fuelType})`}</div>
                      <div>Available Seats: {ride.availableSeats}</div>
                      <div>Ride Offered by: {ride.offeredBy || ride.username} (Shift Time: {ride.shiftTiming})</div>
                    </div>
                    <div className='right-section'>
                      <div className='ride-status'>Ride Status: <strong>{ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</strong></div>
                      {ride.status == 'completed' && 
                        <div className='ride-footprint'>Carbon footprint reduced: <span className='footprint'>{ride.coReduced} tons</span></div>
                      }
                      {isRideAlreadyRequested && 
                        <div className={`request-status ${isRideAlreadyRequested.status}`}>Request Status: <span className={isRideAlreadyRequested.status}>{isRideAlreadyRequested.status.charAt(0).toUpperCase() + isRideAlreadyRequested.status.slice(1)}</span></div>
                      }
                      <button type='button' className='view-details' onClick={() => viewRideDetails(ride.id)}>View Details</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRides;