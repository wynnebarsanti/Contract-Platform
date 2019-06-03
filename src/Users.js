import React from "react";
import { Redirect } from "react-router-dom";
import firebaseApp from "./firebaseConfig";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const usersRef = firebaseApp.database().ref("users");

    usersRef.on("value", snap => {
      let update = snap.val() || [];
      this.updateSnap(update);
    });
  }

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
    console.log(this.props.location.state);

    return <div>{this.renderRedirect()}</div>;
  }
}

export default Users;
