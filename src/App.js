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
          <Route exact path="/Users" component={Users} />

          <Route exact path="/company/profile" component={CompanyProfile} />
          <Route exact path="/company/contracts" component={CompanyContract} />
          <Route exact path="/company/students" component={AllStudents} />

          <Route exact path="/student/profile" component={StudentProfile} />
          <Route exact path="/student/contracts" component={StudentContract} />
          <Route exact path="/student/forum" component={Forum} />
        </Router>
      </div>
    );
  }
}

export default App;
