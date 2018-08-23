import React, { Component } from "react";
import PostCard from "./components/PostCard";
import logo from "./logo.svg";
import "./App.css";
import "./css/Modal.css";

import { getSubject } from "./util/redditGets";
import { getParsedChildren, getParsedSubreddits } from "./util/parsers";
import Inputs from "./components/Inputs";
import DetailsView from "./components/DetailsView";

const DEFAULT_SUBJECT = "dog";

class App extends Component {
  constructor() {
    super();
    this.state = {
      filteredPosts: [],
      showDetailView: false,
      currentDetails: {},
      staticDetails: {
        subReddits: []
      },
      inputs: { subject: DEFAULT_SUBJECT }
    };
  }

  componentDidMount() {
    getParsedChildren(getSubject.bind(null, this.state.inputs.subject)).then(
      res => {
        this.setState({
          filteredPosts: res
        });
      }
    );

    getParsedSubreddits().then(res => {
      this.setState({
        staticDetails: {
          ...this.state.staticDetails,
          subReddits: res
        }
      });
    });
  }

  createPostCards() {
    const genPosts = post => {
      const props = {
        title: post.title,
        thumbnail: post.thumbnail,
        details: {
          title: post.title,
          link: `https://www.reddit.com/${post.permalink}`,
          fullImg: post.fullImg
        },
        toggleModal: this.toggleModal
      };
      return <PostCard key={post.key} {...props} />;
    };

    return this.state.filteredPosts.map(genPosts);
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

  handleSubmit = () => {
    console.log(this.state);
    getParsedChildren(getSubject.bind(null, this.state.inputs.subject)).then(
      res => {
        console.log(res);
        if (res) {
          this.setState({
            filteredPosts: res
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to r/aww</h1>
        </header>
        <Inputs
          inputs={this.state.inputs}
          subReddits={this.state.staticDetails.subReddits}
          updateInputs={this.updateInputs}
        />
        <button
          className="styled-input"
          type="text"
          onClick={this.handleSubmit}
        >
          <h2 className="black-text">Search!</h2>
        </button>
        <br />
        <div className="grid">{this.createPostCards()}</div>
        <DetailsView
          details={this.state.currentDetails}
          isVisible={this.state.showDetailView}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default App;
