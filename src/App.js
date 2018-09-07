import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";
import { getParsedSubreddits } from "./util/parsers";

import Posts from "./components/Posts";
import Inputs from "./components/Inputs";
import DetailsView from "./components/DetailsView";

import logo from "./logo.svg";
import "./App.css";
import "./css/Modal.css";

const DEFAULT_SUBJECT = "dog";
const DEFAULT_REDDIT = "r/funny";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //filteredPosts: [],
      showDetailView: false,
      currentDetails: {},
      staticDetails: {
        subReddits: []
      },
      inputs: { subreddit: DEFAULT_REDDIT, subject: DEFAULT_SUBJECT },
      inputsErrored: {
        areThey: false,
        reason: ""
      }
    };
  }

  componentDidMount() {
    getParsedSubreddits().then(res => {
      this.setState({
        staticDetails: {
          ...this.state.staticDetails,
          subReddits: res
        }
      });
    });
  }

  toggleModal = (onOrOff, deets) => {
    this.setState({
      showDetailView: onOrOff,
      currentDetails: deets
    });
  };

  updateInputs = (whichInput, toWhat) => {
    this.setState(
      {
        inputs: {
          ...this.state.inputs,
          [whichInput]: toWhat
        }
      },
      () => {
        console.log("imps are ", this.state.inputs);
      }
    );
  };

  checkIfValid(inputVal) {
    if (inputVal.length > 0) {
      this.setState({
        inputsErrored: {
          areThey: false,
          reason: ""
        }
      });
      return true;
    }
    this.setState({
      inputsErrored: {
        areThey: true,
        reason: "You must not enter a blank"
      }
    });
    return false;
  }

  handleSubmit = () => {
    return this.checkIfValid(this.state.inputs.subject);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              Welcome to {this.state.inputs.subreddit}
            </h1>
          </header>
          <Inputs
            inputs={this.state.inputs}
            subReddits={this.state.staticDetails.subReddits}
            updateInputs={this.updateInputs}
            handleSubmit={this.handleSubmit}
          />
          {this.state.inputsErrored.areThey && (
            <h3 className="error-text">{this.state.inputsErrored.reason}</h3>
          )}
          <br />
          <Posts inputs={this.state.inputs} />
          <DetailsView
            details={this.state.currentDetails}
            isVisible={this.state.showDetailView}
            toggleModal={this.toggleModal}
          />
        </div>
      </Provider>
    );
  }
}

export default App;
