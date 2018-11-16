import React, { Component } from "react";
import PostData from "../src/state.json";

class PostList extends Component {
  render() {
    return (
      <div>
        Hello there
        {PostData.map((postdetails, index) => {
          return <h1>{postdetails.title}</h1>;
        })}
      </div>
    );
  }
}
export default PostList;
