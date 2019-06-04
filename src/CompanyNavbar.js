import React from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "./firebaseConfig.js";

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class CompanyNavbar extends React.Component {
  state = {
    redirect: false
  };

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
        <Button
          color="primary"
          component={AdapterLink}
          to="/users/company/profile"
        >
          Company Profile
        </Button>
        <Button
          color="primary"
          component={AdapterLink}
          to="/users/company/contracts"
        >
          Company Contracts
        </Button>
        <Button
          color="primary"
          component={AdapterLink}
          to="/users/company/students"
        >
          Students Available
        </Button>
        <Button
          color="primary"
          component={AdapterLink}
          to="/users/company/students"
        >
          Logout
        </Button>
      </div>
    );
  }
}
export default CompanyNavbar;
