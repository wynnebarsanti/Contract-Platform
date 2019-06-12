import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React from "react";
import firebaseApp from "./firebaseConfig";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export default class ForumComment extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    postId: this.props.postId
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    
    const commentsRef = firebaseApp
    .database()
    .ref("posts/" + this.props.postId + "/comments");
    let currentTime = new Date().toLocaleString();
    const comment = {
       author: this.props.currentUser.displayName,
       avatar: this.props.currentUser.photoURL,
       details: this.state.value,
       timestamp: currentTime,
       postId: this.props.postId
    };
    commentsRef.push(comment);

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: this.props.currentUser.displayName,
            avatar: this.props.currentUser.photoURL,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
            postId: this.props.postId
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          style={{width:"550px"}}
          avatar={
            <Avatar
              src={this.props.currentUser.photoURL}
              alt={this.props.currentUser.displayName}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              rows={2}
            />
          }
        />
      </div>
    );
  }
}

