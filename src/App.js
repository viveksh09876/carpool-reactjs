import React, { useState, useEffect } from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App" id="App">
      <RouterProvider router={router} />
      <ToastContainer 
        position="bottom-right"
        theme="colored"
      />
    </div>
  );
}

export default App;
