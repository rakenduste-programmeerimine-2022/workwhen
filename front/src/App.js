import Navbar from "./components/Navbar";
import Bookmarks from "./pages/Bookmarks";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import ShiftPlanning from "./pages/ShiftPlanning";
import UserSettings from "./pages/UserSettings";
import { Route, Routes } from "react-router-dom"
import React from "react"
import Signup from "./pages/Signup";
import UserSettings from './pages/UserSettings';
import Contacts from './pages/Contacts';
import Login from "./pages/Login"

function App() {

  return (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />  
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shift planning" element={<ShiftPlanning />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/user settings" element={<UserSettings />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </>
  )
}

export default App