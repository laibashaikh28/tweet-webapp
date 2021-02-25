import React, {useEffect, useState} from 'react'
import './Widgets.css'
import Post from "./Post";
import db from '../firebase'

 function Widgets() {
     const [posts, setposts] = useState([])
     const [postId, setpostId] = useState([])
     const [liked, setliked] = useState([])

     useEffect(() => {
        setliked([])
        setposts([])
        db.auth().onAuthStateChanged(function user(user) {
            if(user){
                const likeRef = db.firestore().collection("likedPosts").where("likedBy", "==", user.uid).get()
                const postRef = db.firestore().collection("posts")
                setTimeout(() => {
                    likeRef.then((querySnapshot) =>{
                        if(querySnapshot.size > 0){
                            setpostId(querySnapshot.docs.map(doc => doc.data().postId))
                            console.log(postId)
                            postId.forEach(postId => {
                              return postRef.doc(postId).onSnapshot((doc) => setposts(prevArr => [...prevArr, doc.data()] ))
                            }
                            
                            )
                            console.log(posts)
                        }
                        else{
                            console.log("no such document")
                        }
                    })
                },3000)
                
            }
            else{
                console.log("no user is signed in")
            }
        })
         
     }, [])
    return (
        <div className="widgets">
        
        <div className="widgets__widgetContainer">
        <h2>Liked Tweets</h2>
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
        <h3 style={{marginTop: '10px'}}>No Liked Tweets</h3>
      )
      }
        </div>
        </div>
    )
}
export default Widgets;