import React from "react";
import { Button, Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PublishIcon from "@material-ui/icons/Publish";
import RepeatIcon from "@material-ui/icons/Repeat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./Post.css";
function Post({ displayName, username, text, image, avatar, createdOn, verified }) {
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
          <FavoriteBorderIcon fontSize="small" /><span className="post__headerSpecial">{createdOn}</span>
        </div>
      </div>
    </div>
  );
}
export default Post;
