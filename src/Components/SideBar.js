import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import TweetBox from "./TweetBox";
import db from '../firebase'
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

const SideBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onLogout = () =>{
    db.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logged out")
    }).catch((error) => {
      // An error happened.
    });
    
  }
  return (
    <div className="Sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      {/* <SidebarOption Icon={CreateIcon} text="Tweet"/> */}
      <Link className="link" to="/home">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </Link>
      <Link className="link" to="/profile">
        <SidebarOption Icon={PersonOutlineIcon} text="Profile" />
      </Link>
      <Link className="link" onClick={onLogout} to="/signin">
        <SidebarOption Icon={ExitToAppIcon} text="Logout"/>
      </Link>
      <Button
        variant="outlined"
        className="sidebar__tweet"
        onClick={handleOpen}
        fullWidth
      >
        Tweet
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
            <TweetBox />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default SideBar;
