import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Store from '../../store'
import { userProfile } from '../../constants'
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
        <h1>Carpool App</h1>
      </div>
      <div className="login-container">
        <div className="box">
          <input type="text" className="input" name="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="box">
          <button type="button" onClick={loginUser}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;