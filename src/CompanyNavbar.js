import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { Menu, Icon } from "antd";
import firebase from "./firebaseConfig.js";

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
        {this.renderRedirect()}
        <Menu
          style={{ background: "transparent", border: "none" }}
          mode="horizontal"
        >
          <Menu.Item>
            <NavLink
              style={{ color: "white" }}
              to="/users/company/profile"
              activeStyle={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              <Icon type="home" />
              Company Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              style={{ color: "white" }}
              to="/users/company/contracts"
              activeStyle={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              <Icon type="container" />
              Contracts
            </NavLink>
          </Menu.Item>
          <Menu.Item style={{ color: "white" }}>
            <NavLink
              style={{ color: "white" }}
              to="/users/company/students"
              activeStyle={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              <Icon type="idcard" />
              Students
            </NavLink>
          </Menu.Item>
          <Menu.Item style={{ color: "white" }}>
            <NavLink style={{ color: "white" }} onClick={this.setRedirect}>
              <Icon type="poweroff" />
              Logout
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default CompanyNavbar;
