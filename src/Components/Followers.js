import React, { useState, useEffect } from "react";
import "./Followers.css";
import { Link } from "react-router-dom";
import {
  Button,
  Tab,
  Tabs,
  Paper,
  Avatar,
  Box,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PropTypes from "prop-types";
import db from "../firebase";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

function Followers({ userId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [followerId, setfollowerId] = useState([]);
  const [followingId, setfollowingId] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);

  useEffect(() => {
    setfollowingId([])
    setfollowerId([])
    setfollowers([])
    setfollowing([])
    const followersRef = db
      .firestore()
      .collection("follow")
      .where("followedUser", "==", userId)
      .get();
    const followingRef = db
      .firestore()
      .collection("follow")
      .where("followedBy", "==", userId)
      .get();
    const userRef = db.firestore().collection("users");

    followersRef.then((onSnapshot) => {
      if (onSnapshot.size > 0) {
        setfollowerId(onSnapshot.docs.map((doc) => doc.data().followedBy));

        followerId.forEach((followerId) => {
          userRef
            .doc(followerId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setfollowers((prevArr) => [...prevArr, doc.data()]);
              } else {
                console.log("no follower");
              }
            });
        });
        console.log(followers);
      } else {
        console.log("no such document");
      }
    });

    followingRef.then((onSnapshot) => {
      if (onSnapshot.size > 0) {
        setfollowingId(onSnapshot.docs.map((doc) => doc.data().followedUser));
        console.log(followingId);
        followingId.forEach((followingId) => {
          userRef
            .doc(followingId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setfollowing((prevArr) => [...prevArr, doc.data()]);
                console.log(doc.data());
              } else {
                console.log("no following");
              }
            });
        });
        console.log(following);
      } else {
        console.log("no such document");
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="follow" variant="contained" onClick={handleOpen}>
        Followers
      </Button>
      <Button className="follow" variant="contained" onClick={handleOpen}>
        Following
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="fullWidth"
              >
                <Tab label="Followers" {...a11yProps(0)} />

                <Tab label="Following" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                {followers.length > 0 ? (
                  followers.map((follower) => {
                    <div>
                      <Avatar src={follower.avatar} />
                      <h4>{follower.fullName}</h4>
                    </div>;
                  })
                ) : (
                  <h2>No Followers</h2>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {following.length > 0 ? (
                  following.map((follow) => {
                    <>
                      <Avatar src={follow.avatar} />
                      <h4>{follow.fullName}</h4>
                    </>
                  })
                ) : (
                  <h2>No Following</h2>
                )}
              </TabPanel>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Followers;
