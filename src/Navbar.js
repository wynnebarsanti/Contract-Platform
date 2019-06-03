import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            path="/"
            render={({ location }) => (
              <Fragment>
                <Tabs value={location.pathname}>
                  <Tab label="Item One" value="/" component={Link} to="/" />
                  <Tab
                    label="Company Contracts"
                    value="/tab2"
                    component={Link}
                    to="/CompanyContract"
                  />
                  <Tab
                    value="/tab3"
                    label="All Students"
                    component={Link}
                    to="/AllStudent"
                  />
                </Tabs>
                <Switch>
                  <Route
                    path="/CompanyContract"
                    render={() => <div>Tab 2</div>}
                  />
                  <Route path="/AllStudents" render={() => <div>Tab 3</div>} />
                  <Route path="/" render={() => <div>Tab 1</div>} />
                </Switch>
              </Fragment>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}
export default Navbar;
