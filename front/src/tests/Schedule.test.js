import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import CalendarLegends from '../components/CalendarLegends'

test("Renders Schedule page and sees if it can find correct Legend values", () => {
    
    render(
        <Router>
            <CalendarLegends />
        </Router>
    )
    const DayShift = screen.getByText("Day-Shift")
    const NightShift = screen.getByText("Night-Shift")
    const Booked = screen.getByText("Booked")
    const Vacation = screen.getByText("Leave")
    
    expect(DayShift).toBeInTheDocument()
    expect(NightShift).toBeInTheDocument()  
    expect(Booked).toBeInTheDocument()  
    expect(Vacation).toBeInTheDocument()    
  })