import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import Header from '../../components/header'
import Store from '../../store'
import { offices } from '../../constants'
import './ride-details.css'

const RideDetails = () => {
  const [userDetails, setUserDetails] = useState({}),
    [rideDetails, setRideDetails] = useState({}),
    [destination, setDestination] = useState(''),
    [isMyRide, setIsMyRide] = useState(false),
    params = useParams(),
    navigate = useNavigate(),
    startRide = () => {
      const updated = { ...rideDetails, status: 'started' }
      setRideDetails(updated);
      updateRideData(updated, params.rideId, `Ride ${updated.status} successfully!`)
    },
    endRide = () => {
      const totalRiders = rideDetails.riders.length + 1;
      const updated = { ...rideDetails, status: 'completed', coReduced: totalRiders*0.05, greenCredits: totalRiders*5 }
      setRideDetails(updated);
      updateRideData(updated, params.rideId, `Ride ${updated.status} successfully!`)

      //give green credits
      Store.getItem('allUsers', (err, val) => {
        const allRiders = rideDetails.riders.map(rider => rider.username);
        allRiders.push(rideDetails.username);
        const updatedUsers = val.map(user => {
          if (allRiders.includes(user.username)) {
            user.greenCredits += 5;
            user.coReduced += totalRiders*0.05
          }

          if (user.username == rideDetails.username) {
            Store.setItem('userDetails', user);
          }
          return user;
        });

        Store.setItem('allUsers', updatedUsers).then(() => {
          toast.success(`You've earned 5 green credits!`)
        });
      });
    },
    cancelRide = () => {
      const updated = { ...rideDetails, status: 'cancelled' }
      setRideDetails(updated);
      updateRideData(updated, params.rideId, `Ride ${updated.status} successfully!`)
    },
    updateRideData = (data, id, msg) => {
      Store.getItem('allRides', (err, val) => { 
        let updated = val.map(item => {
          if(item.id == id) {
            item = data
          }
          return item;
        });

        Store.setItem('allRides', updated).then(() => {
          toast.success(msg)
        });
      })
    },
    acceptRequest = (username) => {
      let request = rideDetails.rideRequests.find(x => x.username == username)
      request.status = 'accepted';

      let updatedRequests = rideDetails.rideRequests.filter(x => x.username != username);
      let allRiders = rideDetails.riders;
      allRiders.push(request);

      const updated = { 
        ...rideDetails,
        availableSeats: (rideDetails.availableSeats - 1),
        riders: allRiders,
        rideRequests: updatedRequests
      }
      setRideDetails(updated);
      updateRideData(updated, params.rideId, `Rider request accepted!`)
    },
    rejectRequest = (username) => {
      let request = rideDetails.rideRequests.find(x => x.username == username)
      request.status = 'rejected';
      let updatedRequests = rideDetails.rideRequests.filter(x => x.username != username);
      const updated = { 
        ...rideDetails,
        rideRequests: updatedRequests
      }
      setRideDetails(updated);
      updateRideData(updated, params.rideId, `Rider request rejected!`)
    }

  useEffect(() => {
    Store.getItem('userDetails', (err, user) => {
      setUserDetails(user);
      
      Store.getItem('allRides', (err, val) => { 
        const res = val.find(ride => ride.id == params.rideId)
        const office = offices.find(x => x.id == res.destination)
        const isMine = (res.username == user.username) || (res.riders.find(rider => rider.username == user.username))
        setRideDetails(res)
        setDestination(office.address)
        setIsMyRide(!!isMine)
      })
    });
  }, [])

  return (
    <div className='profile ride-details'>
      <Header />
      <div className='container'>
        <div className='main-content'>
          <div className='back-btn-section'>
            <button type='button' onClick={() => navigate('/dashboard')}>Back to dashboard</button>
          </div>
          <div className='rides'>
            <h4>Ride Details</h4>
            {rideDetails && rideDetails.destination &&
            <div className='content'>
              <div className='details'>
                <div className='box'>
                  <label>Destination: </label>
                  <span>{destination}</span>
                </div>
                <div className='box'>
                  <label>Start Address: </label>
                  <span>{rideDetails.startAddress}</span>
                </div>
                <div className='box'>
                  <label>Start Time: </label>
                  <span><Moment format="DD/MM/YYYY hh:mm">{rideDetails.dateTime}</Moment></span>
                </div>
                <div className='box'>
                  <label>Vehicle: </label>
                  <span>{`${rideDetails.vehicleBrand} ${rideDetails.vehicleModel} (${rideDetails.fuelType})`}</span>
                </div>
                <div className='box'>
                  <label>Available Seats: </label>
                  <span>{rideDetails.availableSeats}</span>
                </div>
                <div className='box'>
                  <label>Ride Offered by: </label>
                  <span>{rideDetails.offeredBy || rideDetails.username} (Shift Time: {rideDetails.shiftTiming})</span>
                </div>
                <div className='box'>
                  <label>Status: </label>
                  <span>{rideDetails.status.charAt(0).toUpperCase() + rideDetails.status.slice(1)}</span>
                </div>
                {rideDetails.status == 'completed' &&
                  <div className='box'>
                    <label>Carbon Footprint Reduced: </label>
                    <span className='footprint fade'>{rideDetails.coReduced} KgCo2e</span>
                  </div>
                }
              </div>
              {isMyRide &&
                <>
                  <div className='actions'>
                    {rideDetails.status == 'scheduled' &&
                      <>
                        <button type='button' onClick={startRide}>Start Ride</button>
                        <button type='button' onClick={cancelRide}>Cancel Ride</button>
                      </>
                    }
                    {rideDetails.status == 'started' &&
                      <button type='button' onClick={endRide}>End Ride</button>
                    }

                  </div>
                  <div className='rider-section'>
                    <h4>Riders</h4>
                    <div className='content'>
                      {rideDetails.riders.length > 0 && rideDetails.riders.map(member => {
                        return (
                          <>
                            <div className='box'>
                              <label>Name: </label>
                              <span>{member.name}</span>
                            </div>
                            <div className='box'>
                              <label>Pickup location: </label>
                              <span>{member.pickupLocation}</span>
                            </div>
                            <div className='box'>
                              <label>Pickup time: </label>
                              <span><Moment format="DD/MM/YYYY hh:mm">{member.dateTime}</Moment></span>
                            </div>
                          </>
                        )
                      })}
                      {rideDetails.riders.length == 0 && 
                        <p>No accepted riders</p>
                      }
                    </div>
                  </div>
                  <div className='request-section'>
                    <h4>Ride Requests</h4>
                    <div className='content'>
                      {rideDetails.rideRequests.length > 0 && rideDetails.rideRequests.map(request => {
                          return (
                            <>
                              <div className='left-section'>
                                <div className='box'>
                                  <label>Name: </label>
                                  <span>{request.name}</span>
                                </div>
                                <div className='box'>
                                  <label>Pickup location: </label>
                                  <span>{request.pickupLocation}</span>
                                </div>
                                <div className='box'>
                                  <label>Pickup time: </label>
                                  <span><Moment format="DD/MM/YYYY hh:mm">{request.dateTime}</Moment></span>
                                </div>
                              </div>
                              <div className='actions'>
                                <button type='button' onClick={() => acceptRequest(request.username)}>Accept</button>
                                <button type='button' onClick={() => rejectRequest(request.username)}>Reject</button>
                              </div>
                              
                            </>
                          )
                        })}
                        {rideDetails.rideRequests.length == 0 && 
                        <p>No requests found</p>
                        }
                    </div>
                  </div>
                  <div className='msg-section'>
                    <h4>Messages</h4>
                    <div className='content'>
                      <div className='msg-content'>&nbsp;</div>
                      <div className='actions'>
                        <button type='button'>Send</button>
                      </div>
                    </div>
                    
                  </div>
                </>}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideDetails;
