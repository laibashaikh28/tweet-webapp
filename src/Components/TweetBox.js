import React, { useState } from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@material-ui/core";
import db from "../firebase";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";

function TweetBox() {
  const [tweet, setTweet] = useState("");
  const [tweetImg, setTweetImg] = useState("");
  const [avatar, setavatar] = useState("")
  const [fname, setfname] = useState("")
  const [uname, setuname] = useState("")
  const [verified, setverified] = useState(false)
  const [userId, setuserId] = useState("")

  db.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("signed in");
      // User is signed in.

      var userId = db.auth().currentUser.uid;
      const userRef = db.firestore().collection("users").doc(userId);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            const data = doc.data();
            setfname(data.fullName) ;
            setuname(data.username) ;
            setverified(data.verified) 
            setavatar(data.avatar)
            setuserId(userId)
            // var key = snapshot.key;
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  const onFileChange = async (e) => {
    const img = e.target.files[0];
    const storageRef = db.storage().ref("postImg/");
    const imgRef = storageRef.child(img.name);
    await imgRef.put(img);
    setTweetImg(await imgRef.getDownloadURL());
  };

  const sendTweet = (e) => {
    e.preventDefault();
    console.log("called");

    db.firestore().collection("posts").add({
      displayName: fname,
      username: uname,
      verified: verified,
      text: tweet,
      image: tweetImg,
      createdOn: Date(),
      createdBy: userId,
      avatar: avatar,
    });

    setTweet("");
    setTweetImg("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={avatar} />
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
        <div>
          <label>
            <CropOriginalIcon className="picIcon" />
            <input
              onChange={onFileChange}
              className="tweetBox__imageInput"
              type="file"
            />
          </label>

          <Button onClick={sendTweet} className="tweetBox__tweetButton">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}
export default TweetBox;
