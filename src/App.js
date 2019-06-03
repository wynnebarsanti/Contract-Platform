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

import AllContracts from "./AllContracts";

import Users from "./Users.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={LogIn} />
<<<<<<< HEAD
          <Route exact path="/Users" component={Users} />
=======
          <Route exact path="/users" component={Users} />
>>>>>>> 872c34248fb51c75006857ecdf255325e27ba6f0
          <Route exact path="/Company" component={CompanyProfile} />
          <Route exact path="/CompanyContract" component={CompanyContract} />
          <Route exact path="/AllStudents" component={AllStudents} />
          <Route exact path="/Student" component={StudentProfile} />
          <Route exact path="/StudentContract" component={StudentContract} />
          <Route exact path="/Forum" component={Forum} />
<<<<<<< HEAD
      </Router> 

=======
        </Router>
>>>>>>> 872c34248fb51c75006857ecdf255325e27ba6f0
      </div>
    );
  }
}

export default App;
