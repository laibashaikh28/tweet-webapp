import React, {useState} from "react";
import { Button, Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import "./Post.css";

function Post({ displayName, username, text, image, avatar, createdOn, verified, totalLikes }) {

  const [liked, setliked] = useState(false)
  const [noOfLikes, setnoOfLikes] = useState(0)

 const onLike = e =>{
   if(liked === false){
    setliked(true)
    setnoOfLikes(totalLikes+1)
   }
    
    else{
      setliked(false)
      setnoOfLikes(totalLikes-1)
    }
  }
  return (
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
        <Button onClick={onLike}>{liked ? <FavoriteIcon fontSize="small" style={{color: 'rgb(224, 36, 94'}} /> :<FavoriteBorderIcon fontSize="small" />}{totalLikes}</Button>
        </div>
          <span className="time">{createdOn}</span>
        </div>
      </div>
    </div>
  );
}
export default Post;
