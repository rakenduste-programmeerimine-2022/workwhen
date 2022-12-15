import Navbar from "./components/Navbar"
import Bookmarks from "./pages/Bookmarks"
import Contacts from "./pages/Contacts"
import Dashboard from "./pages/Dashboard"
import Schedule from "./pages/Schedule"
import ShiftPlanning from "./pages/ShiftPlanning"
import UserSettings from "./pages/UserSettings"
import { Route, Routes } from "react-router-dom"
import React, { useState, useEffect } from "react"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import RouteGuard from "./components/RouteGuard"
import NotFound from "./pages/NotFound"
import "./styles/App.css";
import globalTheme from "./styles/globalTheme"

function App() {
    const [user, setUser] = useState(false)

    // this is scuffed
    const ProtectedNavbar = () => {
        if(localStorage.getItem("token") && localStorage.getItem("user")){
            console.log("AAA")
            return <Navbar />
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }

    window.addEventListener("login", () => {
        setUser(true)
    })

    window.addEventListener("logout", () => {
        setUser(false)
    })

    useEffect(() => {
        ProtectedNavbar()
    }, [user])

    return (
    <>
        <ProtectedNavbar />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<RouteGuard />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shift-planning" element={<ShiftPlanning />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/user-settings" element={<UserSettings />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </>
    )
}

export default App