import React, {useState, useEffect} from "react";
import { Button, Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import "./Post.css";
import db from '../firebase'
import { AddAlertRounded } from "@material-ui/icons";

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      liked: "",
      uid: db.auth().currentUser.uid,
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
    // refLike: db.firestore().collection("likedPosts").where("postId" , "==",this.state.postId).where("likedBy", "==", this.state.uid),
      
      })
      if(this.state.liked === "liked"){
        this.setState({icon: false})
      }
      
      console.log(this.state.ref, this.state.refLike)
      
    //   this.state.refLike.get().then((doc) => {
    //     if (doc.exists) {
    //       this.setState({liked: true})
          
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   })
    // .catch(function (error) {
    //   console.log("Error getting document: ", error);
    // });
    }, 3000)
    
  }


   onLike = async e =>{
  const { liked, postId, noOfLikes, uid, ref, postRef, totalLikes} = this.state;

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
      likedBy : uid
    }
  ref.get().then((querySnapshot) => {
    if (querySnapshot.size <= 0) {
      ref.add(data)
      postRef.update({likes: totalLikes+1})
    }
    else {alert("post already liked")}
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

// function Post({ displayName, username, text, image, avatar, createdOn, verified, totalLikes, postId }) {

//   const [liked, setliked] = useState(false)
//   const [noOfLikes, setnoOfLikes] = useState(0)
//   const [uid, setuid] = useState("")

//   db.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       setuid(user.uid);
//       console.log(uid, "user loggedin");
//       console.log(postId, "post")
//     }
//         })
//         useEffect(() => {
//           const ref = db.firestore().collection("likedPosts");
//           const rmLike = db.firestore().collection("likedPosts").where("postId" , "==", postId).where("likedBy", "==", uid);
//           const postRef = db.firestore().collection("posts").doc(postId);
         
          
//           ref.where("likedBy", "==", uid).where("postId","==",postId).get()
//           .then((doc) => {
//             if (doc.exists) {
//               //console.log("Document data:", doc.data());
//               setliked(true)
//               // var key = snapshot.key;
              
//             } else {
//               // doc.data() will be undefined in this case
//               console.log("No such document!");
//               setliked(false)
//             }
//           })
//           .catch((error) => {
//             console.log("Error getting document:", error);
//           });
//           console.log(uid)        
//           }
//         , [])
  

//  const onLike = e =>{
  

//   //  if(liked === false){
//   //   setliked(true)
//   //   setnoOfLikes(totalLikes+1)
    
//   //   let data = {
//   //     postId : postId,
//   //     likedBy : uid
//   //   }
//   // ref.add(data)
//   // console.log(data)
//   // postRef.update({likes: noOfLikes})
//   //  }

    
//   //   else{
//   //     setliked(false)
//   //     setnoOfLikes(totalLikes-1)
//   //     postRef.update({likes: noOfLikes})
//     //   rmLike.delete().then(() => {
//     //     console.log("Document successfully deleted!");
//     // }).catch((error) => {
//     //     console.error("Error removing document: ", error);
//     // });
    
//   //   }
//    }
//   return (
//     <div className="post">
//       <div className="post__avatar">
//         <Avatar src={avatar} />
//       </div>
//       <div className="post__body">
//         <div className="post__header">
//           <div className="post__headerText">
//             <h3>
//               {displayName}{" "}
//               <span className="post__headerSpecial">
//                 {" "}
//                 { verified && <VerifiedUserIcon className="post__badge" />}@{username}
//               </span>
//             </h3>
//           </div>
//         </div>
//         <div className="post__headerDescription">
//           <p>{text}</p>
//         </div>
//         <img src={image} width="100%" height="100%" />

//         <div className="post__footer">
//         <div>
//         <Button onClick={onLike}>{liked ? <FavoriteIcon fontSize="small" style={{color: 'rgb(224, 36, 94'}} /> :<FavoriteBorderIcon fontSize="small" />}{totalLikes}</Button>
//         </div>
//           <span className="time">{createdOn}</span>
//         </div>
//       </div>
//     </div>
//   );
// }
export default Post;
