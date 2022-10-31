import Login from './pages/Login';
import "./styles/App.css"
import React from "react"
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Login />
          <Signup />
      </header>
    </div>
  );
}

export default App;
