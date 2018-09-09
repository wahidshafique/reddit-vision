import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleModal, setModalDetails } from "../actions/modalActions";

import "../css/PostCard.css";
import { areEqualShallow } from "../util/helperFunctions";

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
            alt="foo"
            className="hoverable"
            src={thumbnail}
            onClick={() => {
              this.props.toggleModal(this.props.currentModalVisible);
              if (!areEqualShallow(details, this.props.currentModalDetails)) {
                this.props.setModalDetails(details);
              } else {
                console.log("you opened the same post");
              }
            }}
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

PostCard.propTypes = {
  currentModalState: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  currentModalVisible: state.modal.currentModalVisible,
  currentModalDetails: state.modal.currentModalDetails
});

export default connect(
  mapStateToProps,
  { toggleModal, setModalDetails }
)(PostCard);
