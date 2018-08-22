import React, { Component } from "react";
import "../css/PostCard.css";

class App extends Component {
  render() {
    return (
      <div className="post-card">
        <header className="App-header">
          <h1 className="App-title">Title</h1>
          <img
            src="https://via.placeholder.com/350x150"
            width="350"
            height="150"
          />
        </header>
      </div>
    );
  }
}

export default App;
