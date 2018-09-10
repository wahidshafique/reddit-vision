import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleModal } from "../actions/modalActions";
import { Modal } from "antd";

class DetailsView extends Component {
  render() {
    const { title, fullImg } = this.props.currentModalDetails;
    return (
      <Modal
        width="50%"
        onCancel={() => this.props.toggleModal(this.props.currentModalVisible)}
        title={title}
        visible={this.props.currentModalVisible}
        key={title}
      >
        {(fullImg !== "" || !fullImg) && (
          <img className="shown-img" src={fullImg} />
        )}
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
