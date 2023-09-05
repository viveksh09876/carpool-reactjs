import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Header from '../../components/header'
import Modal from "../../components/Modal";
import Store from '../../store'
import { offices, seatsArr, generateId } from '../../constants'

const OfferRide = () => {
  const [userDetails, setUserDetails] = useState({}),
    navigate = useNavigate(),
    [startAddress, setStartAddress] = useState(''),
    [destination, setDestination] = useState(''),
    [dateTime, setDateTime] = useState(''),
    [availableSeats, setAvailableSeats] = useState(4),
    [popupOpened, setPopupOpened] = useState(false),
    offerRide = () => {
      const rides = userDetails.scheduledRides || [],
        newRide = {
          id: generateId(),
          offeredBy: userDetails.name,
          shiftTiming: userDetails.shiftTime,
          username: userDetails.username,
          rideRequests: [],
          riders: [],
          startAddress,
          destination,
          dateTime,
          availableSeats,
          greenCredits: 0,
          coReduced: 0,
          vehicleBrand: userDetails.vehicleBrand,
          vehicleModel: userDetails.vehicleModel,
          fuelType: userDetails.fuelType,
          status: 'scheduled' 
        }
      rides.push(newRide);
      let newUserDetails = { ...userDetails, scheduledRides: rides }

      Store.getItem('allUsers', (err, val) => {
        let updatedUsers = val.map(item => {
          if (item.username == userDetails.username) {
            item = newUserDetails
          }
          return item
        });
        Store.setItem('allUsers', updatedUsers) ;
      });

      Store.setItem('userDetails', newUserDetails).then(() => {
        Store.getItem('allRides', (err, val) => {
          let allRides = val || []
          allRides.push({ ...newRide })

          Store.setItem('allRides', allRides)
        });
        toast.success('Ride scheduled successfully!')
        navigate('/dashboard')
      })
    },
    toggleModal = () => {
      setPopupOpened(prev => !prev)
    }

  useEffect(() => {
    Store.getItem('userDetails', (err, val) => {
      setUserDetails(val)
      setStartAddress(val.homeAddress)
      setDestination(val.officeAddress || '')
      setAvailableSeats(Number(val.seats) || 4)
    })
  }, [])

  return (
    <div className="profile offer-ride">
      <Header />
      <div className="container">
        <div className='main-content'>
          <div className="content">
            <div className="box">
              <label>Start Address</label>
              <input type="text" className="input no-mgb" name="startAddress" placeholder="Start Address" value={startAddress} onChange={(e) => setStartAddress(e.target.value)} />
              <a onClick={toggleModal}>Locate on map</a>
            </div>
            <div className="box">
              <label>Destination Address</label>
              <select name="destination" onChange={(e) => setDestination(e.target.value)}>
                {offices.map(item => {
                  return <option key={item.id} selected={item.id == destination} value={item.address}>{item.address}</option>
                })}
              </select>
            </div>
            <div className="box">
              <label>Ride start date/time</label>
              <input type="datetime-local" className="input" name="dateTime" placeholder="Select date/time" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </div>
            <div className="box">
              <label>Number of seats available</label>
              <select name="availableSeats" onChange={(e) => setAvailableSeats(e.target.value)}>
                {seatsArr.map((item, index) => {
                  return <option key={index} selected={item === availableSeats} value={item}>{item}</option>
                })}
              </select>
            </div>
          </div>
          <div className="action">
            <button type="button" onClick={offerRide}>Offer Ride</button>
            <button className="secondary" type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
          </div>
        </div>
      </div>
      <Modal show={popupOpened} onClose={toggleModal} />
    </div>
  )
}

export default OfferRide;