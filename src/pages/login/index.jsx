import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Store from '../../store'
import { userProfile } from '../../constants'
import headerImg1 from '../../images/carpool-header-2.png'
import headerImg2 from '../../images/header-img.png'
import './login.css'

const Login = () => {
  const [username, setUsername] = useState(''),
    navigate = useNavigate(),
    loginUser = () => {
      if (username) {
        let obj = {}
        Store.getItem('allUsers', (err, val) => {
          if (val) {
            let exist = val.find(user => user.username == username);
            if (exist) {
              obj = { ...exist, isLoggedIn: true }
            } else {
              obj = {
                ...userProfile,
                username: username,
                isLoggedIn: true
              }

              val.push(obj)
              Store.setItem('allUsers', val)
            }
          } else {
            obj = {
              ...userProfile,
              username: username,
              isLoggedIn: true
            }
            Store.setItem('allUsers', [obj])
          }
          

          Store.setItem('userDetails', obj).then(() => {
            navigate('/dashboard')
          });
        });
 
      }
    }
  return (
    <div className="login">
      <div className="login-header">
        <img className='img-left' src={headerImg1} />
        <div className='center'>
          <h1>SEHYOG</h1>
          <p>Collaborating for a greener ride!!</p>
        </div>
        <img className='img-right' src={headerImg2} />
      </div>
      <div className="login-container">
        <div className='content'>
          <div className="box">
            <input type="text" className="input" name="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="box">
            <button type="button" onClick={loginUser}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;