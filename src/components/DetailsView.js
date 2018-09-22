import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleModal } from "../actions/modalActions";
import { Modal } from "antd";

class DetailsView extends Component {
  renderMedia(mediaContent) {
    if (mediaContent && mediaContent.url !== "") {
      switch (mediaContent.type) {
        case "jpg":
        case "png":
          return <img className="shown-img" src={mediaContent.url} />;
        case "gifv":
          return (
            <video autoPlay src={mediaContent.url.replace(".gifv", ".mp4")} />
          );
        default:
          break;
      }
    }
  }

  render() {
    const { fullContent = {}, title, link } = this.props.currentModalDetails;
    return (
      <Modal
        width="50%"
        okText="Link"
        onOk={() => window.open(link, "_blank")}
        onCancel={() => this.props.toggleModal(this.props.currentModalVisible)}
        title={title}
        visible={this.props.currentModalVisible}
        key={title}
      >
        {/* {(fullContent.url !== "" || !fullContent) && (
          <img className="shown-img" src={fullContent.url} />
        )} */}
        {this.renderMedia(fullContent)}
      </Modal>
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
