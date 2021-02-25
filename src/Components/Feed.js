import React, { useState, useEffect } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from "../firebase";
import "./Widgets.css";

function Feed() {
  const [posts, setposts] = useState([]);
  const [postId, setpostId] = useState([])
const [liked, setliked] = useState([])
  useEffect(() => {
setliked([])
    
db.auth().onAuthStateChanged(function (user) {
  if (user) {
      db.firestore()
      .collection("posts")
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size > 0) {
            setposts(querySnapshot.docs.map((doc) => doc.data()));
            console.log(posts)
            // Contents of first document
            setpostId(querySnapshot.docs.map((doc) => {
              
                  const ref = db.firestore().collection("likedPosts").where("postId" , "==", doc.id).where("likedBy", "==", user.uid)
                  ref.get().then( (onSnapshot) => {
                    if (onSnapshot.size > 0) {
                      setliked(prevArr => [...prevArr,"liked"])
                      console.log(liked, doc.data())
                    }
                    else{
                      setliked(prevArr => [...prevArr,"notLiked"])
                      console.log("No such document!");
                    }
                  }
                  
                  ) .catch(function (error) {
                      console.log("Error getting document: ", error);
                    });
                  ;
               
              
              return doc.id}));

            
            // ref.get().then((doc) => {
            //   if (doc.exists) {
            //     setliked(true)
                
            //   } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            //   }
            // })
          // .catch(function (error) {
          //   console.log("Error getting document: ", error);
          // });
              
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document: ", error);
        });
      }
      else{
        console.log("no  user is signed in")
      }
    }
    )

  }, []);
  console.log(postId)
  console.log(liked, "liked")

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {
        posts.length > 0 ? (
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
            postId = {postId[i]}
            liked = {liked[i]}
          />
        ))
      ) : (
        <div className="none"><h1>No Tweets Yet</h1><img src="https://www.solidbackgrounds.com/images/851x315/851x315-white-solid-color-background.jpg" width="100%" /></div>
      )
      }
    </div>
  );
}
export default Feed;
