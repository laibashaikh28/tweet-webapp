import React from 'react'
import {Button, Avatar} from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import PublishIcon from '@material-ui/icons/Publish';
import RepeatIcon from '@material-ui/icons/Repeat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Post.css'
 function Post({displayName, username, text, image, avatar}) {
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                    <h3>Laiba Ovais {" "}
                    <span className="post__headerSpecial"> <VerifiedUserIcon className="post__badge"/>@laibaovais
                    </span>       
                    </h3>       
                    </div>       
                </div>      
                <div className="post__headerDescription">
                <p>I challenge you to build Twitter clone</p>       
                </div>   
                <img src="https://i.pinimg.com/originals/01/fb/2c/01fb2cb2cf0855514cf1df69f46acda8.gif"/>
                
                <div className="post__footer">
                <FavoriteBorderIcon fontSize="small"/>
                </div>
                     
            </div>       
        </div>
    )
}
export default Post;