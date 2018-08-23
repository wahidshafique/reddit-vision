import React from "react";

export default class Inputs extends React.Component {
  handleChange = e => {
    this.props.updateInputs(e.currentTarget.name, e.currentTarget.value);
  };

  render() {
    const { subReddits, inputs } = this.props;
    return (
      <div className="input-group">
        <h2 className="white-text">subreddit</h2>
        <select
          className="styled-input"
          type="text"
          name="subreddit"
          value={inputs.subreddit}
          onChange={this.handleChange}
        >
          {" "}
          {subReddits.map(s => (
            <option key={s.key} value={s.prefixedName}>
              {s.prefixedName}
            </option>
          ))}
        </select>
        <h2 className="white-text">subject</h2>
        <input
          className="styled-input"
          type="text"
          name="subject"
          value={inputs.subject}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
