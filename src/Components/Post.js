import React, {useState, useEffect} from "react";
import { Button, Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import "./Post.css";
import db from '../firebase'

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      liked: "",
      userId: db.auth().currentUser.uid,
      postId: "",
      ref: {},
      refLike: {}, //db.firestore().collection("likedPosts").where("postId" , "==", this.state.postId).where("likedBy", "==", this.state.uid),
      postRef: {},//db.firestore().collection("posts").doc(this.state.postId),
      totalLikes: 0,
      icon: true
    }
this.onLike = this.onLike.bind(this);
  }
  static getDerivedStateFromProps(props, state) {

    return ({
      postId: props.postId,
      liked: props.liked,
      totalLikes: props.totalLikes,
      
    });
   }
  // componentDidUpdate(prevProps, prevState) {
  //   if ((this.props.selected !== prevProps.selected)) {
  //     this.selectNew();
  //   }
  // }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ref: db.firestore().collection("likedPosts"),
        postRef: db.firestore().collection("posts").doc(this.state.postId),
     refLike: db.firestore().collection("likedPosts").where("postId" , "==",this.state.postId).where("likedBy", "==", this.state.userId),
      
      })
      if(this.state.liked === "liked"){
        this.setState({icon: false})
      }
      
      console.log(this.state.ref, this.state.refLike)
      
    }, 3000)
    
  }


   onLike = e =>{
  const { liked, postId, noOfLikes, userId, ref, refLike, postRef, totalLikes} = this.state;

console.log("called" , liked)
this.setState({icon: false})
   if(liked === "notLiked"){
    this.setState({
      liked: "liked",
    totalLikes: totalLikes+1
    }, () =>{
      console.log(this.state.liked, this.state.totalLikes)
    })
    let data = {
      postId : postId,
      likedBy : userId
    }
  refLike.get().then((querySnapshot) => {
    if (querySnapshot.size <= 0) {
      ref.add(data)
      postRef.update({likes: totalLikes+1})
    }
    else if(querySnapshot.size > 0) {alert("post already liked")}
  })
  console.log(data)
  
  console.log(noOfLikes)
      
    
    }
   }

  render(){
    const { displayName, username, text, image, avatar, createdOn, verified, liked } = this.props;
    
    

    return(
      <div className="post">
      <div className="post__avatar">
        <Avatar src={avatar} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              <span className="post__headerSpecial">
                {" "}
                { verified && <VerifiedUserIcon className="post__badge" />}@{username}
              </span>
            </h3>
          </div>
        </div>
        <div className="post__headerDescription">
          <p>{text}</p>
        </div>
        <img src={image} width="100%" height="100%" />

        <div className="post__footer">
        <div>
        <i className="material-icons" onClick={this.onLike}>{this.state.icon ? <FavoriteBorderIcon className="like" fontSize="small" /> : <FavoriteIcon fontSize="small" style={{color: 'rgb(224, 36, 94'}} />}</i>{this.state.totalLikes}
        </div>
          <span className="time">{createdOn}</span>
        </div>
      </div>
    </div>
  );
    
  }
}
export default Post;
