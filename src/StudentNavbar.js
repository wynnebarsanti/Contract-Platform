import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "./firebaseConfig.js";
import { Redirect } from "react-router-dom";

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class StudentNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  setRedirect = () => {
    firebase.auth().signOut();
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Button
          color="inherit"
          component={AdapterLink}
          to="/users/student/profile"
        >
          Student Profile
        </Button>
        <Button
          color="inherit"
          component={AdapterLink}
          to="/users/student/contracts"
        >
          Contracts
        </Button>
        <Button
          color="inherit"
          component={AdapterLink}
          to="/users/student/forum"
        >
          Forum
        </Button>
        <Button
          color="inherit"
          component={AdapterLink}
          onClick={this.setRedirect}
        >
          Logout
        </Button>
      </div>
    );
  }
}
export default StudentNavbar;
