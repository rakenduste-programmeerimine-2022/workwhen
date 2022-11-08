import Login from './pages/Login';
import "./styles/App.css"
import React from "react"
import Signup from "./pages/Signup";
import UserSettings from './pages/UserSettings';
import Contacts from './pages/Contacts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Login />
          <Signup />
          <UserSettings />
          <Contacts />
          
      </header>
    </div>
  );
}

export default App;
