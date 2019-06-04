import React from "react";
import StudentNavbar from "./StudentNavbar.js";
import ForumPage from "./ForumPage.js";
class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("in forum");
    console.log(this.props);
    return (
      <div>
        <StudentNavbar />
        {this.props}
      </div>
    );
  }
}

export default Forum;
