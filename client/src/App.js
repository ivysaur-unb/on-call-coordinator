import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [userData, setUserData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        // setUserData(data)
      }
    )
  }, [userData])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {(typeof userData === 'undefined' ? (
          <p> Loading </p>
        ) : (
          <p>{userData[0].email}</p>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
