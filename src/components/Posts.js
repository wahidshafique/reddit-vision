import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row } from "antd";

import { fetchPosts } from "../actions/postActions";

import PostCard from "./PostCard";

class Posts extends Component {
  createPostCards() {
    const genPosts = post => {
      const _props = {
        title: post.title,
        thumbnail: post.thumbnail,
        details: {
          title: post.title,
          link: `https://www.reddit.com/${post.permalink}`,
          fullContent: post.fullContent,
          ups: post.ups
        },
        resolvedVision: post.resolvedVision
        //toggleModal: this.toggleModal
      };
      return <PostCard key={post.key} {..._props} />;
    };
    return this.props.filteredPosts.map(genPosts);
  }

  render() {
    return this.props.filteredPosts.length === 0 ? (
      <img src="https://i.imgur.com/ucQrI.gif" />
    ) : (
      <React.Fragment>
        <Row gutter={12} justify="center" type="flex">
          {this.createPostCards()}
        </Row>
      </React.Fragment>
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
