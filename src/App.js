import React, { Component } from "react";
import PostCard from "./components/PostCard";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to r/</h1>
        </header>
        <p className="App-intro">
          <PostCard />
        </p>
      </div>
    );
  }
}

export default App;
