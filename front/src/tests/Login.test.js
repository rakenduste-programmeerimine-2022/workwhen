import { render, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import Login from '../pages/Login'    




test("Renders Login page, checks if login form has labels: Username, Password and if button has text value Login", async () => {
  render(
    <Router>
      <Login />
    </Router>
  )

  const Username = screen.getByText("Username")
  const Password = screen.getByText("Password")
  const LoginButton = screen.getByText("Login")
  expect(Username).toBeInTheDocument()
  expect(Password).toBeInTheDocument()
  expect(LoginButton).toBeInTheDocument()
})