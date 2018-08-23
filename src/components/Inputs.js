import React from "react";

export default class Inputs extends React.Component {
  handleChange = e => {
    console.log(e);
  };

  render() {
    return (
      <div className="input-group">
        <h2 className="white-text">subreddit</h2>
        <input
          className="styled-input"
          type="text"
          name="subreddit"
          //   value={this.props.searchOptions.subReddit}
          onChange={this.handleChange}
        />
        <h2 className="white-text">subject</h2>
        <input
          className="styled-input"
          type="text"
          name="subject"
          //   value={this.props.searchOptions.subject}
          onChange={this.handleChange}
        />

        <button
          className="styled-input"
          type="text"
          name="subject"
          //   value={this.props.searchOptions.subject}
          onClick={this.handleSubmit}
        >
          <h2 className="black-text">Search!</h2>
        </button>
      </div>
    );
  }
}
