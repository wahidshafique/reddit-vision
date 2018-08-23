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
const DEFAULT_REDDIT = "r/funny";

//higher level stuff-> originally I was thinking of using context or HOC's to create variations of components. I definately could have used pure functional components more (force of habit), but I chose to make it fairly straightforward w/ minimal deps (functional libraries also stand out as I noticed some repeating, for a bigger application I would def consider those strategies)

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
      inputs: { subreddit: DEFAULT_REDDIT, subject: DEFAULT_SUBJECT },
      inputsErrored: {
        areThey: false,
        reason: ""
      }
    };
  }

  componentDidMount() {
    getParsedChildren(
      getSubject.bind(null, {
        subreddit: this.state.inputs.subreddit,
        subjectTitle: this.state.inputs.subject
      })
    ).then(res => {
      this.setState({
        filteredPosts: res
      });
    });

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
          fullImg: post.fullImg,
          ups: post.ups
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
    if (!this.checkIfValid(this.state.inputs.subject)) {
      return;
    }
    getParsedChildren(
      getSubject.bind(null, {
        subreddit: this.state.inputs.subreddit,
        subjectTitle: this.state.inputs.subject
      })
    ).then(res => {
      console.log(res);
      if (res) {
        this.setState({
          filteredPosts: res
        });
      }
    });
  };

  render() {
    return (
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
        />
        {this.state.inputsErrored.areThey && (
          <h3 className="error-text">{this.state.inputsErrored.reason}</h3>
        )}
        <button
          className="styled-input"
          type="text"
          onClick={this.handleSubmit}
        >
          <h2 className="black-text">Search!</h2>
        </button>
        <br />
        {this.state.filteredPosts.length === 0 && (
          <img src="https://i.imgur.com/ucQrI.gif" />
        )}
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
