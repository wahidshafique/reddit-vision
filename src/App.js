import React, { Component } from "react";

import "antd/dist/antd.css";
import { Icon } from "antd";

import { Provider } from "react-redux";

import store from "./store";
import { getParsedSubreddits } from "./util/parsers";

import Posts from "./components/Posts";
import Inputs from "./components/Inputs";
import DetailsView from "./components/DetailsView";

import logo from "./logo.svg";
import "./App.css";
import "./css/Modal.css";
import { getListOfSubreddits } from "./util/redditGets";

class App extends Component {
  constructor() {
    super();
    this.state = {
      validInputs: {},
      staticDetails: {
        subReddits: []
      }
    };
  }

  setValidInputs = vInps => {
    this.setState({ validInputs: vInps });
  };

  componentDidMount() {
    getParsedSubreddits(getListOfSubreddits).then(res => {
      this.setState({
        staticDetails: {
          ...this.state.staticDetails,
          subReddits: res
        }
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <div className="title-logo-container">
              <div className="App-logo" alt="logo">
                <Icon type="eye" theme="outlined" className="central-eye" />
                <img src={logo} className="App-logo-animate" />
              </div>
            </div>
            <h1 className="App-title">
              Welcome to {this.state.validInputs.subreddit}
            </h1>
          </header>
          <Inputs
            setValidInputs={this.setValidInputs}
            subReddits={this.state.staticDetails.subReddits}
          />
          <Posts />
          <DetailsView />
        </div>
      </Provider>
    );
  }
}

export default App;
