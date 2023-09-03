import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Profile from './pages/profile'
import OfferRide from './pages/offer-ride'
import FindRide from './pages/find-ride'
import MyRides from "./pages/my-rides";
import RideDetails from "./pages/ride-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/offer-ride",
    element: <OfferRide />,
  },
  {
    path: "/find-ride",
    element: <FindRide />,
  },
  {
    path: "/my-rides",
    element: <MyRides />,
  },
  {
    path: "/ride-details/:rideId",
    element: <RideDetails />,
  }

]);

export { router };