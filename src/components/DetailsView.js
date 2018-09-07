import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleModal } from "../actions/modalActions";

class DetailsView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, link, fullImg, ups } = this.props.currentModalDetails;
    const { currentModalVisible } = this.props;
    const isVis = currentModalVisible ? "modal-show" : "";
    const modalClasses = `modal ${isVis} `;
    return (
      <div className={modalClasses}>
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close"
              onClick={() =>
                this.props.toggleModal(this.props.currentModalVisible)
              }
            >
              &times;
            </span>
            <h2>
              <a className="white-text" href={link}>
                {title}
              </a>
            </h2>
            <p>{ups} Upvotes!</p>
          </div>
          {(fullImg !== "" || !fullImg) && (
            <img className="shown-img" src={fullImg} />
          )}
          <h3>
            {fullImg === null && "The image might be a video or a gif :("}
          </h3>
        </div>
      </div>
    );
  }
}

DetailsView.propTypes = {
  currentModalDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentModalVisible: state.modal.currentModalVisible,
  currentModalDetails: state.modal.currentModalDetails
});

export default connect(
  mapStateToProps,
  { toggleModal }
)(DetailsView);
