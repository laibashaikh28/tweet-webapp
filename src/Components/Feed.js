import React, { useState, useEffect } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from "../firebase";
import './Widgets.css'
import {TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed} from 'react-twitter-embed'
import SearchIcon from '@material-ui/icons/Search';
function Feed() {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setposts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="feed">
    
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {posts.map((post, i) => (
        <Post
        key={i}
          avatar={post.avatar}
          displayName={post.displayName}
          username={post.username}
          image={post.image}
          text={post.text}
          verified={post.verified}
          createdOn={post.createdOn}
        />
      ))}
    </div>
  );
}
export default Feed;
