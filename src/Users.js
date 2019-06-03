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
      this.updateSnap(update);
    });

    this.createInDatabase();
  }

  checkExists = () => {};

  updateSnap = value => {
    this.setState({
      users: value
    });
  };

  changeParent = value => {
    this.setState({
      users: value
    });
    console.log(value);
  };

  renderRedirect = () => {
    if (this.props.location.state.company === true) {
      return (
        <Redirect
          to={{
            pathname: "/users/company/profile",
            state: this.props.location.state,
            changeParent: this.changeParent
          }}
        />
      );
    } else if (this.props.location.state.student == true) {
      return (
        <Redirect
          to={{
            pathname: "/users/student/profile",
            state: this.props.location.state,
            changeParent: this.changeParent
          }}
        />
      );
    }
  };

  render() {
    console.log(this.state);

    return <div>{JSON.stringify(this.state.users)} </div>;
  }
}

export default Users;
