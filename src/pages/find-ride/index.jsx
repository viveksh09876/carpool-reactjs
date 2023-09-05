import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import Header from '../../components/header'
import Modal from "../../components/Modal";
import Store from '../../store'
import { offices, nearByAddresses } from '../../constants'
import { getAvailableRides } from '../../functions';
import './find-ride.css'

const FindRide = () => {
  const [userDetails, setUserDetails] = useState({}),
    navigate = useNavigate(),
    [pickupLocation, setPickupLocation] = useState(''),
    [destination, setDestination] = useState(''),
    [dateTime, setDateTime] = useState(''),
    [popupOpened, setPopupOpened] = useState(false),
    [showRides, setShowRides] = useState(false),
    [availableRides, setAvailableRides] = useState([]),
    toggleModal = () => {
      setPopupOpened(prev => !prev)
    },
    search = () => {
      Store.getItem('allRides', (err, allRides) => {
        const availableRides = getAvailableRides(destination, pickupLocation, dateTime, nearByAddresses, allRides);
        setShowRides(true);
        setAvailableRides(availableRides);
      });
    },
    requestRide = (rideId) => {
      const reqObj = {
        name: userDetails.name,
        username: userDetails.username,
        pickupLocation,
        dateTime,
        phone: userDetails.phone,
        email: userDetails.email,
        status: 'pending'
      }
      Store.getItem('allRides', (err, val) => {
        let updatedRides = val.map(item => {
          if (item.id == rideId) {
            if (!item.rideRequests.includes(userDetails.username)) {
              item.rideRequests.push(reqObj)
            }
          }
          return item;
        })
        Store.setItem('allRides', updatedRides).then(() => {
          toast.success('Request sent successfully!');

          let updatedAvailableRides = availableRides.map(x => {
            if (x.id == rideId) {
              x.rideRequests.push(reqObj)
            }
            return x;
          });
          setAvailableRides(updatedAvailableRides);
        });
      })
    }

  useEffect(() => {
    Store.getItem('userDetails', (err, val) => {
      setUserDetails(val)
      setDestination(val.officeAddress || '')
      setPickupLocation(val.homeAddress || '')
    })
  }, [])

  return (
    <div className="profile find-ride">
      <Header />
      <div className='container'>
        <div className='main-content'>
          <div className='content'>
            <div className="box">
              <label>Drop location</label>
              <select name="destination" onChange={(e) => setDestination(e.target.value)}>
                {offices.map(item => {
                  return <option key={item.id} selected={item.id == destination} value={item.address}>{item.address}</option>
                })}
              </select>
            </div>
            <div className="box">
              <label>Pickup location</label>
              <input type="text" className="input no-mgb" name="pickupLocation" placeholder="Pickup location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
              <a onClick={toggleModal}>Locate on map</a>
            </div>
            <div className="box">
              <label>Ride date/time</label>
              <input type="datetime-local" className="input" name="dateTime" placeholder="Select date/time" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </div>
            <div className="box"></div>
          </div>
          <div className="action">
            <button type="button" onClick={search}>Search</button>
            <button className="secondary" type="button" onClick={() => navigate('/dashboard')}>Back</button>
          </div>
          {showRides &&
          <div className='search-results'>
              <h4>Available Rides : <span>{availableRides.length}</span></h4>
              <div className='rides-list'>
                {availableRides.map(ride => {
                  const isRideAlreadyRequested = ride.rideRequests.find(data => data.username == userDetails.username);
                  return (
                    <div className='ride' key={ride.id}>
                      <div className='ride-details'>
                        <div className='left-section'>
                          <div>Start Time: <Moment format="DD/MM/YYYY hh:mm">{ride.dateTime}</Moment></div>
                          <div>Vehicle: {`${ride.vehicleBrand} ${ride.vehicleModel} (${ride.fuelType})`}</div>
                          <div>Available Seats: {ride.availableSeats}</div>
                          <div>Ride Offered by: {ride.offeredBy || ride.username} (Shift Time: {ride.shiftTiming})</div>
                        </div>
                        <div className='right-section'>
                          {/* <div className='status'>Status: <span>{ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</span></div> */}
                          {!isRideAlreadyRequested &&
                            <button type='button' onClick={() => requestRide(ride.id)}>Request for ride</button>
                          }
                          {isRideAlreadyRequested &&
                            <button type='button' className='grey-color' onClick={() => {}}>Request {isRideAlreadyRequested.status}</button>
                          }
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
          </div>}
        </div>
      </div>

      <Modal show={popupOpened} onClose={toggleModal} />
    </div>
  )
}

export default FindRide;