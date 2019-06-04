import React from "react";
<<<<<<< HEAD
import Navbar from "./StudentNavbar.js";
import ForumPage from "./ForumPage.js";

=======
import StudentNavbar from "./StudentNavbar.js";
import ForumPage from "./ForumPage.js";
>>>>>>> fb96eee6a726f90c5a35127c99943c5671d4daa5
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
<<<<<<< HEAD
        <Navbar />
        <ForumPage />
=======
        <StudentNavbar />
        {this.props}
>>>>>>> fb96eee6a726f90c5a35127c99943c5671d4daa5
      </div>
    );
  }
}

export default Forum;
