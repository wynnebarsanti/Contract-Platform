import React from "react";
import ForumComment from "./ForumComment.js";
import ForumPost from "./ForumPost.js";
import { Button, Input } from "antd";
import "./ForumPage.css";
import { FormHelperText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import firebaseApp from "./firebaseConfig";
import StudentNavbar from "./StudentNavbar.js";
import HeaderLogo from "./HeaderLogo.png";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const { TextArea } = Input;
export default class ForumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      posts: [],
      oldPosts: [],
      oldComments: [],
      currentUser: null,
      postId: ""
    };

    this.createInDatabase = this.createInDatabase.bind(this);
  }

  createPost = event => {
    this.createInDatabase().then(() => {
      console.log("it worked");
      var newArray = this.state.posts.slice();
      newArray.unshift({
        post: (
          <ForumPost
            title={this.state.title}
            details={this.state.details}
            currentUser={firebaseApp.auth().currentUser}
            postId={this.state.postId}
          />
        ),
        // Pass postId as a prop to ForumComment
        comments: (
          <ForumComment
            currentUser={firebaseApp.auth().currentUser}
            postId={this.state.postId}
          />
        )
      });
      this.setState({
        posts: newArray
        // postId: this.state.postId + 1
      });
    }); // retrieve unique postId here by calling Object.keys()
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // to render existing posts/comments
  mapOldPosts = () => {
    let oldPosts = this.state.oldPosts;
    console.log(oldPosts);
    return oldPosts.map(item => {
      return (
        <div
          style={{
            borderStyle: "solid"
          }}
        >
          <Grid item xs={6}>
            {item.post}
            {item.comments}
          </Grid>
        </div>
      );
    });
  };

  // to render posts/comments made in real-time
  mapPosts = () => {
    let posts = this.state.posts;
    console.log(posts);
    return posts.map(item => {
      return (
        <div
          style={{
            borderStyle: "solid"
          }}
        >
          <Grid item xs={6}>
            {item.post}
            {item.comments}
          </Grid>
        </div>
      );
    });
  };

  componentDidMount() {
    const usersRef = firebaseApp.database().ref("students");

    usersRef.on("value", snap => {
      let update = snap.val() || [];
      this.updateSnap(update);
    });

    const postsRef = firebaseApp.database().ref("posts");

    postsRef.on("value", snap => {
      let posts = snap.val() || [];
      this.updatePosts(posts);

      // to render old posts/comments
      let oldPostsState = [];
      for (let post in posts) {
        // console.log(posts[post].title)
        // console.log(post);
        let oldComments = [];
        for (let comment in posts[post].comments) {
          const oldComment = {
            author: posts[post].comments[comment].author,
            avatar: posts[post].comments[comment].avatar,
            content: posts[post].comments[comment].details,
            dateTime: moment().fromNow(),
            postId: posts[post].comments[comment].postId
          };
          oldComments.unshift(oldComment);
        }
        oldPostsState.unshift({
          post: (
            <ForumPost
              title={posts[post].title}
              details={posts[post].details}
              currentUser={posts[post].author}
              postId={post}
            />
          ),
          comments: <ForumComment postId={post} oldComments={oldComments} />
        });
      }
      this.setState({
        oldPosts: oldPostsState
      });
    });
  }
  updatePosts = value => {
    // console.log(value);
    return new Promise(resolve => {
      const { uid } = firebaseApp.auth().currentUser;
      let arr = Object.keys(value).map(k => value[k]);
      this.setState(
        {
          postsNew: value
        },
        () => {
          resolve();
        }
      );
    });
  };

  // updateSnap = value => {
  //   return new Promise(resolve => {
  //     const { uid } = firebaseApp.auth().currentUser;
  //     this.setState(
  //       {
  //         users: value,
  //         currentUser: Object.keys(value[uid]).map(key => value[uid][key])
  //       },
  //       () => {
  //         resolve();
  //       }
  //     );
  //   });
  // };

  updateSnap = value => {
    return new Promise(resolve => {
      const { uid } = firebaseApp.auth().currentUser;

      let currentUser = "";
      for (let user in value) {
        //  console.log(value[user].uid);
        if (value[user].uid === uid) {
          currentUser = value[user];
        }
      }

      this.setState(
        {
          users: value,
          currentUser: currentUser,
          uid: uid
        },
        () => {
          resolve();
        }
      );
    });
  };
  async createInDatabase() {
    let currentTime = new Date().toLocaleString();
    const postsRef = firebaseApp.database().ref("posts");
    const post = {
      author: firebaseApp.auth().currentUser.displayName,
      title: this.state.title,
      details: this.state.details,
      timestamp: currentTime,
      // postId: this.state.postId,
      comments: []
    };

    console.log(post.author);
    let postId = await postsRef.push(post).key;
    console.log(postId);
    this.setState({
      postId: postId
    });
  }

  render() {
    //   const classes = useStyles();
    return (
      <div className="container">
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <img src={HeaderLogo} height="80" alt="Logo" />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                float: "right",
                textAlign: "right",
                display: "inline - block",
                width: "98%",
                padding: "10px",
                justifyContent: "space-between"
              }}
            >
              <StudentNavbar />
            </div>
          </Toolbar>
        </AppBar>
        {/* <Grid item xs ={12}> */}
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Developer Forum
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Learn, share, and build with other developers in the RevTek community!
          Give back some knowledge to others and share a post today.
        </Typography>
        {/* </Grid> */}
        <div className="postBar">
          <div>
            <Input
              name="title"
              placeholder="Title of Post"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <TextArea
              name="details"
              placeholder="Post details..."
              value={this.state.details}
              onChange={this.handleChange}
              rows={4}
            />
          </div>
        </div>
        <div>
          <Button onClick={this.createPost}>Create Post</Button>
        </div>
        <br />
        <br />
        <div className="postHistory">
          {/* <Grid 
        alignContent={"space between"}
        container spacing={3}> */}
          {this.state.oldPosts.length > 0 && this.mapOldPosts()}
          {this.state.posts.length > 0 && this.mapPosts()}
          {/* </Grid> */}
        </div>
      </div>
    );
  }
}
