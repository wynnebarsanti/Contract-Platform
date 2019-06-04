import React from "react";
import { Redirect } from "react-router-dom";
import firebaseApp from "./firebaseConfig";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
  }

  createInDatabase = () => {
    const usersRef = firebaseApp
      .database()
      .ref(`users/${this.state.currentUser}`);
    const user = {
      student: this.state.student,
      company: this.state.company,
      linkedIn: "",
      github: "",
      currentContracts: [
        {
          title: "first contract",
          description: "hello ther",
          interested: "q3wr81023984asfd, 23098qskjflasdfj"
        }
      ],
      pastContracts: [
        {
          title: "old contract",
          description: "GOD BLESS YOU",
          interested: "q3wr81023984asfd, 23098qskjflasdfj"
        }
      ],
      username: this.state.username,
      photo: this.state.photo
    };
    usersRef.push(user);
  };

  componentDidMount() {
    const usersRef = firebaseApp.database().ref("users");

    usersRef.on("value", snap => {
      let update = snap.val() || [];
      this.updateSnap(update).then(() => {
        if (this.state.users[this.state.currentUser]) {
          Promise.resolve();
        } else {
          this.createInDatabase();
        }
      });

      //I don't know why its not redirecting..
    });

    console.log(this.state.users);
  }

  updateSnap = value => {
    return new Promise(resolve => {
      this.setState(
        {
          users: value
        },
        () => resolve()
      );
    });
  };

  changeParent = value => {
    this.setState({
      users: value
    });
    console.log(value);
  };

  renderRedirect = () => {
    console.log("attempting to redirect");

    if (this.state.company === true) {
      return (
        <Redirect
          to={{
            pathname: "/users/company/profile",
            parentState: this.state,
            changeParent: this.changeParent
          }}
        />
      );
    } else if (this.state.student === true) {
      return (
        <Redirect
          to={{
            pathname: "/users/student/profile",
            parentState: this.state,
            changeParent: this.changeParent
          }}
        />
      );
    }
  };

  render() {
    return <div> {this.state.users ? this.renderRedirect() : null} </div>;
  }
}

export default Users;
