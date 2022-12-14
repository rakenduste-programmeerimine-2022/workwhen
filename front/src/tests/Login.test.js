import { render } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import Login from '../pages/Login'    
import Dashboard from '../pages/Dashboard'



test("Render Login page", async () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  )
})