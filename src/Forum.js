import React from "react";
import StudentNavbar from "./StudentNavbar.js";
import ForumPage from "./ForumPage.js"
class Forum extends React.Component {
  render() {
    console.log('in forum')
    console.log(this.props)
    return (
      <div>
        <StudentNavbar />
        Forum!

      </div>
    );
  }
}

export default Forum;
