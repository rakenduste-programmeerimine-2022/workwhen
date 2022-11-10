import React from "react"
import { Outlet, Navigate } from "react-router-dom"

function hasJWT(){
    let flag = false
    localStorage.getItem("token") && localStorage.getItem("user") ? flag = true : flag = false
    return flag
}

export default function RouteGuard(){
    return hasJWT() ? <Outlet /> : <Navigate to="/" />
}