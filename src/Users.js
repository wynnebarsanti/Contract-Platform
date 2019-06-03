import React from "react";
import { Redirect } from "react-router-dom";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRedirect = () => {
    if (this.props.location.state.company === true) {
      return (
        <Redirect
          to={{
            pathname: "/users/company/profile",
            state: this.props.location.state
          }}
        />
      );
    } else if (this.props.location.state.student == true) {
      return (
        <Redirect
          to={{
            pathname: "/users/student/profile",
            state: this.props.location.state
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
