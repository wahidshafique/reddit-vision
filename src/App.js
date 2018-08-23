import React, { Component } from "react";
import PostCard from "./components/PostCard";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  createPostCards() {
    return <PostCard />;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to r/aww</h1>
        </header>
        <div className="grid">{this.createPostCards()}</div>
      </div>
    );
  }
}

export default App;
