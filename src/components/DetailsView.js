import React, { Component } from "react";

class DetailsView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, link, fullImg } = this.props.details;
    const { isVisible } = this.props;
    const isVis = isVisible ? "modal-show" : "";
    const modalClasses = `modal ${isVis} `;
    return (
      <div className={modalClasses}>
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close"
              onClick={() => this.props.toggleModal(false, {})}
            >
              &times;
            </span>
            <h2>
              <a className="white-text" href={link}>
                {title}
              </a>
            </h2>
          </div>
          <img className="shown-img" src={fullImg} />
          <h3>
            {fullImg === null && "The image might be a video or a gif :("}
          </h3>
        </div>
      </div>
    );
  }
}

export default DetailsView;
