import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseApp from "./firebaseConfig";
import {
  Container,
  Paper,
  Card,
  Chip,
  Button,
  Typography
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LoginLogo from "./LoginLogo.png";

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      redirect: false,
      student: false,
      company: false
    };
  }

  handleStudent = () => {
    //route to the users page, which handles whether student, admin, or company should be rendered.
    this.setState({
      student: true,
      username: this.props.user.displayName,
      photo: this.props.user.photoURL
    });

    this.setRedirect();
  };

  handleCompany = () => {
    //route to the users page, which handles whether student, admin, or company should be rendered.
    if (this.props.user) {
      this.setState({
        company: true,
        username: this.props.user.displayName,
        photo: this.props.user.photoURL
      });

      this.setRedirect();
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/users", state: this.state }} />;
    }
  };

  // handleValue = (event, value) => {
  //   this.setState({
  //     [value]: event.target.value
  //   });
  // };

  setRedirect = () => {
    this.setState({
      redirect: true
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

    return (
      <Container maxWidth="sm">
        {this.renderRedirect()}
        <img src={LoginLogo} alt="Logo" />
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
            <Button variant="outlined" onClick={this.handleStudent}>
              Student
            </Button>
            <Button variant="outlined" onClick={this.handleCompany}>
              Company
            </Button>
          </Card>
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
