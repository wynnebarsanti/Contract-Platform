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
    var ref = firebase.database().ref("users");
    ref.once("value").then(function(snapshot) {
      console.log(
        snapshot.val()["LN8zU6jfhKgiTyasE0RAPFLzoF02"]["-LgY79g1z8YjsWAETl3H"]
          .student
      );
      for (var key in snapshot.val()) {
        console.log(key);
        for (var item of snapshot.val()[key]) {
          console.log(item.student);
        }
      }
    });

    return (
      <div>
        <Button
          color="inherit"
          component={AdapterLink}
          to="/users/company/profile"
        >
          Company Profile
        </Button>
        <Button
          color="inherit"
          component={AdapterLink}
          to="/users/company/contracts"
        >
          Company Contracts
        </Button>
        <Button
          color="inherit"
          component={AdapterLink}
          to="/users/company/students"
        >
          Students Available
        </Button>
        <Button
          color="inherit"
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
