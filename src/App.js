import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import LandingPage from "./views/LandingPage";
import logo from './assets/images/logo.png';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
          <h1>For the social creative at heart</h1>
        </header>
      </div>
    );
  }
}

export default App;
