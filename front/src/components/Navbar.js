import { Children } from "react"
import { Link, resolvePath, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {

    const path = window.location.pathname
    return (
    <nav className="nav">
        <Link to="/dashboard" className="logo">Logo</Link>
        <ul>     
            <ActiveLink to="/dashboard">Dashboard</ActiveLink>
            <ActiveLink to="/shift-planning">Shift planning</ActiveLink>
            <ActiveLink to="/schedule">Schedule</ActiveLink>
            <ActiveLink to="/bookmarks">Bookmarks</ActiveLink>
            <ActiveLink to="/contacts">Contacts</ActiveLink>
            <ActiveLink to="/user-settings">User settings</ActiveLink>
        </ul>
    </nav>
)}

function ActiveLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch( {path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}