import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";

import { Input } from "antd";
import { Form, Select, Collapse } from "antd";

const { Panel } = Collapse;
const { Option } = Select;
const FormItem = Form.Item;
const Search = Input.Search;

const DEFAULT_SUBJECT = "dog";
const DEFAULT_REDDIT = "r/funny";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 }
  }
};

class Inputs extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: { subreddit: DEFAULT_REDDIT, subject: DEFAULT_SUBJECT },

      inputsErrored: {
        areThey: false,
        reason: ""
      }
    };
  }

  hydratePosts() {
    console.log(this.state);
    this.props.setValidInputs(this.state.inputs);
    this.props.fetchPosts(
      this.state.inputs.subreddit,
      this.state.inputs.subject
    );
  }

  componentDidMount() {
    this.hydratePosts();
  }

  updateInputs = (whichInput, toWhat) => {
    this.setState(
      {
        inputs: {
          ...this.state.inputs,
          [whichInput]: toWhat
        }
      },
      () => {
        console.log("imps are ", this.state.inputs);
      }
    );
  };

  checkIfValid(inputVal) {
    console.log(inputVal);
    if (inputVal.length > 0) {
      this.setState({
        inputsErrored: {
          areThey: false,
          reason: ""
        }
      });
      return true;
    }
    this.setState({
      inputsErrored: {
        areThey: true,
        reason: "You must not enter a blank"
      }
    });
    return false;
  }

  handleSubmit = e => {
    if (this.checkIfValid(e)) {
      this.hydratePosts();
    }
  };

  render() {
    const { subReddits } = this.props;
    return (
      <Collapse bordered={false} defaultActiveKey="1">
        <Panel key="1">
          <Form style={{ padding: "30px" }}>
            <FormItem {...formItemLayout} label="Subreddits">
              <Select
                // mode="multiple"
                name="subreddit"
                placeholder="None selected"
                allowClear
                value={this.state.inputs.subreddit}
                onChange={val => this.updateInputs("subreddit", val)}
              >
                {subReddits.map(s => (
                  <Option key={s.key} value={s.prefixedName}>
                    {s.prefixedName}
                  </Option>
                ))}
              </Select>
            </FormItem>

            <FormItem {...formItemLayout} label="Subject">
              <Search
                name="subject"
                defaultValue={this.state.inputs.subject}
                onChange={event =>
                  this.updateInputs("subject", event.currentTarget.value)
                }
                onSearch={this.handleSubmit}
                enterButton
                size="large"
              />
            </FormItem>
            {this.state.inputsErrored.areThey && (
              <h3 className="error-text">{this.state.inputsErrored.reason}</h3>
            )}
          </Form>
        </Panel>
      </Collapse>
    );
  }
}

const mapStateToProps = state => ({ filteredPosts: state.posts.filteredPosts });

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Inputs);
