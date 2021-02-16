import React from 'react'
import {TwitterIcon, CreateIcon, HomeIcon, ExitToAppIcon, AccountCircleIcon} from '@material-ui/icons/';
import "./Sidebar.css";
import SidebarOption from './SidebarOption';
 function SideBar() {
    return (
        <div className="Sidebar">
            <TwitterIcon /> 
            
            <SidebarOption Icon={CreateIcon} text="Tweet"/>
            <SidebarOption Icon ={HomeIcon} text="Home"/>
            <SidebarOption Icon={AccountCircleIcon} text="Profile"/>
            <SidebarOption Icon={ExitToAppIcon} text="Logout"/>
        </div>
    )
}
export default SideBar;