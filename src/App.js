import React from "react";
import "./App.css";
import LogIn from "./LogIn";

import { Route, BrowserRouter as Router } from "react-router-dom";
import CompanyProfile from "./CompanyProfile.js";
import CompanyContract from "./CompanyContract.js";
import AllStudents from "./AllStudents.js";
import StudentProfile from "./StudentProfile.js";
import StudentContract from "./StudentContract.js";
import Forum from "./Forum.js";
import Users from "./Users.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/users" component={Users} />
          <Route
            exact
            path="/users/company/profile"
            component={CompanyProfile}
          />
          <Route
            exact
            path="/users/company/contracts"
            component={CompanyContract}
          />
          <Route exact path="/users/company/students" component={AllStudents} />
          <Route
            exact
            path="/users/student/profile"
            component={StudentProfile}
          />
          <Route
            exact
            path="/users/student/contracts"
            component={StudentContract}
          />
          <Route exact path="/users/student/forum" component={Forum} />
        </Router>
      </div>
    );
  }
}

export default App;
