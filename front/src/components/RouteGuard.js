import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function RouteGuard({ component: Component, ...rest }){
    function hasJWT(){
        let flag = false
        localStorage.getItem("token") ? flag = true : flag = false
        return flag
    }
    return(
        <Route {...rest}
            render={props => (
                hasJWT() ? <Component {...props} /> : <Redirect to={{ pathname: "/"}} />
            )}
        />
    )
}