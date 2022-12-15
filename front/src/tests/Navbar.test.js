import { render, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from '../components/Navbar'

test("Renders Navbar and checks if it can find proper text values on the page", async () => {
    render(
      <Router>
        <Navbar />
      </Router>
    )
  
    const Dashboard = screen.getByText("Dashboard")
    const ShiftPlanning = screen.getByText("Shift Planning")
    const Schedule = screen.getByText("Schedule")
    const Bookmarks = screen.getByText("Bookmarks")
    const Contacts = screen.getByText("Contacts")
    const UserSettings = screen.getByText("User Settings")
    expect(Dashboard).toBeInTheDocument()
    expect(ShiftPlanning).toBeInTheDocument()
    expect(Schedule).toBeInTheDocument()
    expect(Bookmarks).toBeInTheDocument()
    expect(Contacts).toBeInTheDocument()
    expect(UserSettings).toBeInTheDocument()
  })