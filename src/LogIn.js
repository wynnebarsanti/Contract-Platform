import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import ForumPage from "./ForumPage"
import firebaseApp from "./firebaseConfig";
import {
  Container,
  Paper,
  Card,
  Chip,
  Button,
  Typography,
  TextField
} from "@material-ui/core";

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      linkedIn: "",
      website: ""
    };
  }

  updateSnap = value => {
    this.setState({
      users: value
    });
  };

  handleclick = () => {
    //route to the users page, which handles whether student, admin, or company should be rendered.
  };

  handleValue = (event, value) => {
    this.setState({
      [value]: event.target.value
    });
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.uid
        });
      } else {
        this.setState({
          currentUser: "no_login"
        });
      }
    });
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    console.log(this.state.currentUser);
    return (
      <Container maxWidth="sm">
        <Typography variant="h6">Login</Typography>

        <Paper>
          <Card>
            <p>{"\n"}</p>
            <Chip
              label={
                user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>
              }
            />
            <p>{"\n"}</p>

            {user ? (
              <Button variant="outlined" onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <Button variant="outlined" onClick={signInWithGoogle}>
                Sign in with Google
              </Button>
            )}
          </Card>

          <Card>
            <TextField
              placeholder="LinkedIn Link"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              rows={1}
              rowsMax={1}
              value={this.state.linkedIn}
              onChange={e => this.handleValue(e, "linkedIn")}
            />
          </Card>
          <Card>
            <TextField
              placeholder="Website Link"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              rows={1}
              rowsMax={1}
              value={this.state.linkedIn}
              onChange={e => this.handleValue(e, "website")}
            />
          </Card>
          <Button variant="outlined" onClick={() => this.handleClick}>
            Move Forth
          </Button>
        </Paper>
        <br />
        <br />
      </Container>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Login);