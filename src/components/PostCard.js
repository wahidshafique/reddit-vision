import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleModal, setModalDetails } from "../actions/modalActions";

import { Card, Col, Tag } from "antd";
import { areEqualShallow } from "../util/helperFunctions";

const { Meta } = Card;
class PostCard extends Component {
  tagContent(resolvedVision) {
    const matchColors = ["green", "yellow", "orange", "red"];

    if (resolvedVision) {
      if (resolvedVision.labelAnnotations) {
        if (resolvedVision.labelAnnotations.length > 1) {
          return resolvedVision.labelAnnotations.map((label, index) => {
            return (
              <Tag color={matchColors[index % matchColors.length]}>
                {label.description}
              </Tag>
            );
          });
        } else if (resolvedVision.labelAnnotations[0].description) {
          return (
            <Tag color="green">
              {resolvedVision.labelAnnotations[0].description}
            </Tag>
          );
        }
      } else if (resolvedVision.error) {
        return <Tag color="red">{resolvedVision.error.message}</Tag>;
      } else {
        return <Tag color="blue">Video</Tag>;
      }
    }
  }

  render() {
    const { title, thumbnail, details, resolvedVision } = this.props;
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
                [<h5>{title}</h5>, this.tagContent(resolvedVision)]
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
