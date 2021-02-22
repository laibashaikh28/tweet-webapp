import "./../App.css";
import SideBar from "./SideBar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { Grid, Box } from "@material-ui/core/";
import SearchField from "./SearchField";

function Home() {
  return (
    <div className="app">
      <Grid container>
        <Grid item xs={3} sm={3} md={3}>
          <SideBar />
        </Grid>
        <Grid item xs={9} sm={9} md={6}  >
            <SearchField  />
          <Feed />
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
  );
}

export default Home;
