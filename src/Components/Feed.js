import React, { useState, useEffect } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from "../firebase";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Feed() {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        setposts(snapshot.docs.map((doc) => doc.data()));
      })
      console.log(posts);
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {posts.length > 0 ? (
        posts.map((post, i) => (
          <Post
            key={i}
            avatar={post.avatar}
            displayName={post.displayName}
            username={post.username}
            image={post.image}
            text={post.text}
            verified={post.verified}
            createdOn={post.createdOn}
            totalLikes ={post.likes}
          />
        ))
      ) : (
        <div className="none"><h1>No Tweets Yet</h1><img src="https://www.solidbackgrounds.com/images/851x315/851x315-white-solid-color-background.jpg" width="100%" /></div>
      )}
    </div>
  );
}
export default Feed;
