import React from 'react'
import "./../App.css";
import SideBar from "./SideBar";
import Widgets from "./Widgets";
import { Grid, Box } from "@material-ui/core/";
import "./Widgets.css";
import SearchField from "./SearchField";
import User from "./User";
function Profile() {
    return (
        <div className="app">
        <Grid container>
        <Grid item xs={3} sm={3} md={3}>
          <SideBar />
        </Grid>
        <Grid item xs={9} sm={9} md={6}  >
          <SearchField />
          <User />
           </Grid>
        <Box
          component={Grid}
          item
          md={3}
          display={{ xs: "none", sm: "none", md: "inline-block" }}
        >
          <Widgets />
        </Box>
      </Grid>
           
        </div>
    )
}

export default Profile
