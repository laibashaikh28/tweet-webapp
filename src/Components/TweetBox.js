import React, { useState } from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@material-ui/core";
import db from '../firebase'

function TweetBox() {
  const [tweet, setTweet] = useState("");
  const [tweetImg, setTweetImg] = useState("");

  const sendTweet = e =>{
      e.preventDefault();
      console.log("called")

      db.collection('posts').add({
          displayName: "Laiba Ovais",
          username: "laibaovais",
          verified: true,
          text: tweet,
          image: tweetImg,
          createdOn: Date(),
          avatar: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"
      })
      
      setTweet("");
      setTweetImg("");
  }

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <input
            onChange={(e) => {
              setTweet(e.target.value);
            }}
            placeholder="What's happening?"
            value={tweet}
            type="text"
          />
        </div>
        <input
          onChange={(e) => {
            setTweetImg(e.target.value);
          }}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
          value={tweetImg}
        />

        <Button onClick={sendTweet} className="tweetBox__tweetButton">Tweet</Button>
      </form>
    </div>
  );
}
export default TweetBox;
