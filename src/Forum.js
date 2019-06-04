import React from "react";
import Navbar from "./StudentNavbar.js";
import ForumPage from "./ForumPage.js";

class Forum extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <ForumPage />
      </div>
    );
  }
}

export default Forum;
