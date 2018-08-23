import React, { Component } from "react";
import "../css/PostCard.css";

class PostCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, thumbnail, details } = this.props;
    const { link } = this.props.details;
    return (
      <div className="post-card-header">
        {(thumbnail !== "" || !thumbnail) && (
          <img
            className="hoverable"
            src={thumbnail}
            onClick={() => this.props.toggleModal(true, details)}
          />
        )}
        {thumbnail === "" || !thumbnail ? (
          <h2 className="post-title">
            <a className="white-text" href={link}>
              {title}
            </a>
          </h2>
        ) : (
          <h4 className="post-title">{title}</h4>
        )}
      </div>
    );
  }
}

export default PostCard;
