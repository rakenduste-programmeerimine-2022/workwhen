import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function RouteGuard({ component: Component, ...rest }){
    function hasJWT(){
        let flag = false
        localStorage.getItem("token") ? flag = true : flag = false
        return flag
    }
    return hasJWT ? <Outlet /> : <Navigate to="/" />
}