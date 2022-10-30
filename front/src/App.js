import Navbar from "./components/Navbar";
import Bookmarks from "./pages/Bookmarks";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Shift_planning from "./pages/Shift-planning";
import User_settings from "./pages/User-settings";
import { Route, Routes } from "react-router-dom"
import React from "react"

function App() {

  return (
  <>
    <Navbar />
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shift-planning" element={<Shift_planning />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/user-settings" element={<User_settings />} />
    </Routes>
  </>
  )
}

export default App