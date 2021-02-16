import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import "./Sidebar.css";
import SidebarOption from './SidebarOption';
import {Button} from '@material-ui/core'

 const SideBar = () => {
    return (
        <div className="Sidebar">
            <TwitterIcon className="sidebar__twitterIcon"/> 
            
            {/* <SidebarOption Icon={CreateIcon} text="Tweet"/> */}
            <SidebarOption active Icon ={HomeIcon} text="Home"/>
            <SidebarOption Icon={PersonOutlineIcon} text="Profile"/>
            <SidebarOption Icon={ExitToAppIcon} text="Logout"/>
            <Button variant="outlined" className="sidebar__tweet" fullWidth>Tweet</Button>
        </div>
    )
}
export default SideBar;