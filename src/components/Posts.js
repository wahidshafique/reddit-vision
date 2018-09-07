import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchPosts } from "../actions/postActions";

import PostCard from "./PostCard";

class Posts extends Component {
  componentDidMount = () => {
    this.props.fetchPosts(
      this.props.inputs.subreddit,
      this.props.inputs.subject
    );
  };

  createPostCards() {
    const genPosts = post => {
      const _props = {
        title: post.title,
        thumbnail: post.thumbnail,
        details: {
          title: post.title,
          link: `https://www.reddit.com/${post.permalink}`,
          fullImg: post.fullImg,
          ups: post.ups
        }
        //toggleModal: this.toggleModal
      };
      return <PostCard key={post.key} {..._props} />;
    };
    console.log(this.props.filteredPosts);
    return this.props.filteredPosts.map(genPosts);
  }

  render() {
    return this.props.filteredPosts.length === 0 ? (
      <img src="https://i.imgur.com/ucQrI.gif" />
    ) : (
      <div className="grid">{this.createPostCards()}</div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  filteredPosts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({ filteredPosts: state.posts.filteredPosts });

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);
