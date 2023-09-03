import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Header from '../../components/header'
import Store from '../../store'
import { userProfile, shiftTimes, vehicleBrands, vehicleModels, fuelTypes, seatsArr, offices } from '../../constants'
import './profile.css'

const Profile = () => {
  const [profile, setProfile] = useState(userProfile),
    navigate = useNavigate(),
    profileFieldChange = (key, val) => {
      setProfile(prev => ({ ...prev, [key]: val, }))
    },
    updateProfile = () => {
      const obj = { ...profile, user: profile.username }
      Store.getItem('allUsers', (err, val) => {
        let updatedUsers = val.map(item => {
          if (item.username == profile.username) {
            item = obj
          }
          return item
        });
        Store.setItem('allUsers', updatedUsers) ;

        Store.setItem('userDetails', obj).then(() => {
          toast.success('Profile updated successfully!')
          navigate('/dashboard')
        });
      });
    }

  useEffect(() => {
    Store.getItem('userDetails', (err, val) => {
      setProfile(val)
    })
  }, []);

  return (
    <div className="profile">
      <Header />
      <div className="container">
        <div className="content">
          <div className="box">
            <label>Name</label>
            <input type="text" className="input" name="name" placeholder="Full Name" value={profile.name} onChange={(e) => profileFieldChange('name', e.target.value)} />
          </div>
          <div className="box">
            <label>Username</label>
            <input type="text" className="input" name="username" placeholder="username" value={profile.username} disabled onChange={(e) => profileFieldChange('username', e.target.value)} />
          </div>
          <div className="box">
            <label>Employee ID</label>
            <input type="text" className="input" name="employeeId" placeholder="Employee ID" value={profile.employeeId} onChange={(e) => profileFieldChange('employeeId', e.target.value)} />
          </div>
          <div className="box">
            <label>Email</label>
            <input type="email" className="input" name="email" placeholder="Email" value={profile.email} onChange={(e) => profileFieldChange('email', e.target.value)} />
          </div>
          <div className="box">
            <label>Contact Number</label>
            <input type="tel" className="input" name="phone" placeholder="Mobile Number" value={profile.phone} onChange={(e) => profileFieldChange('phone', e.target.value)} />
          </div>
          <div className="box">
            <label>Shift Time</label>
            <select name="ShiftTime" onChange={(e) => profileFieldChange('shiftTime', e.target.value)}>
              <option key={0} value="">Select shift time</option>
              {shiftTimes.map((item, index) => {
                return <option key={index} selected={item === profile.shiftTime} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div className="box">
            <label>Vehicle Brand</label>
            <select name="vehicleBrand" onChange={(e) => profileFieldChange('vehicleBrand', e.target.value)}>
              <option key={0} value="">Select vehicle brand</option>
              {vehicleBrands.map((item, index) => {
                return <option key={index} selected={item === profile.vehicleBrand} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div className="box">
            <label>Vehicle Model</label>
            <select name="vehicleModel" onChange={(e) => profileFieldChange('vehicleModel', e.target.value)}>
              <option key={0} value="">Select vehicle model</option>
              {vehicleModels.map((item, index) => {
                return <option key={index} selected={item === profile.vehicleModel} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div className="box">
            <label>Vehicle Fuel Type</label>
            <select name="fuelType" onChange={(e) => profileFieldChange('fuelType', e.target.value)}>
              <option key={0} value="">Select fuel type</option>
              {fuelTypes.map((item, index) => {
                return <option key={index} selected={item === profile.fuelType} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div className="box">
            <label>Number of Seats</label>
            <select name="seats" onChange={(e) => profileFieldChange('seats', e.target.value)}>
              {seatsArr.map((item, index) => {
                return <option key={index} selected={item === Number(profile.seats)} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div className="box">
            <label>Home Address</label>
            <input type="text" className="input" name="homeAddress" placeholder="Home Address" value={profile.homeAddress} onChange={(e) => profileFieldChange('homeAddress', e.target.value)} />
          </div>
          <div className="box">
            <label>Office Address</label>
            <select name="officeAddress" onChange={(e) => { profileFieldChange('officeAddress', e.target.value)}}>
              <option key={0} value="">Select Office Address</option>
              {offices.map(item => {
                return <option key={item.id} selected={item.id == profile.officeAddress} value={item.id}>{item.address}</option>
              })}
            </select>
          </div>
        </div>
        <div className="action">
          <button type="button" onClick={updateProfile}>Update</button>
          <button className="secondary" type="button" onClick={() => navigate('/dashboard')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;