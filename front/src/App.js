import { Component } from "react";
import Navbar from "./Navbar";
import Bookmarks from "./pages/bookmarks";
import Contacts from "./pages/contacts";
import Dashboard from "./pages/dashboard";
import Schedule from "./pages/schedule";
import Shift_planning from "./pages/shift-planning";
import User_settings from "./pages/user-settings";
import {Route, Routes} from "react-router-dom"

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