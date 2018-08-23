import React, { Component } from "react";
import "../css/PostCard.css";

class PostCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, thumbnail, details } = this.props;
    return (
      <div className="post-card-header">
        <img
          className="hoverable"
          src={thumbnail}
          onClick={() => this.props.toggleModal(true, details)}
        />
        <h4 className="post-title">{title}</h4>
      </div>
    );
  }
}

export default PostCard;
