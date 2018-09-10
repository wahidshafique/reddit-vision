import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleModal, setModalDetails } from "../actions/modalActions";

import { Card, Col } from "antd";
import { areEqualShallow } from "../util/helperFunctions";

const { Meta } = Card;
class PostCard extends Component {
  render() {
    const { title, thumbnail, details } = this.props;
    const { link } = this.props.details;
    return (
      <Col span={6} xs={17} sm={10} md={8} lg={6} xl={4} gutter={4}>
        <Card
          hoverable
          style={{ minWidth: "240px" }}
          cover={<img alt="example" src={thumbnail} />}
          onClick={() => {
            this.props.toggleModal(this.props.currentModalVisible);
            if (!areEqualShallow(details, this.props.currentModalDetails)) {
              this.props.setModalDetails(details);
            } else {
              console.log("you opened the same post");
            }
          }}
        >
          <Meta
            title={
              thumbnail === "" || !thumbnail ? (
                <a href={link}>{title}</a>
              ) : (
                <h5>{title}</h5>
              )
            }
          />
        </Card>
      </Col>
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
