import React, { Component } from "react";
import PostCard from "./components/PostCard";
import logo from "./logo.svg";
import "./App.css";
import "./css/Modal.css";

import { getSubject } from "./util/redditGets";
import { getParsedChildren, getParsedSubreddits } from "./util/parsers";
import Inputs from "./components/Inputs";
import DetailsView from "./components/DetailsView";

class App extends Component {
  constructor() {
    super();
    this.state = {
      curSubject: "dog",
      filteredPosts: [],
      showDetailView: false,
      currentDetails: {},
      staticDetails: {
        subReddits: []
      }
    };
  }

  componentDidMount() {
    getParsedChildren(getSubject.bind(null, this.state.curSubject)).then(
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to r/aww</h1>
        </header>
        <Inputs subReddits={this.state.staticDetails.subReddits} />
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
