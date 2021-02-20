import React, { useState, useEffect } from "react";
import "./User.css";
import Post from "./Post";
import db from "../firebase";
import { Button, Avatar, Grid, TextField, Paper} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PropTypes from "prop-types";

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
    update: {
        backgroundColor: "#50b7f5",
        color: "white",
        borderRadius: "20px",
        fontWeight: "600"
    },
    cancel:{
        borderRadius: "20px",
        marginLeft: "5px",
        fontWeight: "600"
    }
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


function User() {
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState({})
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    db.auth().onAuthStateChanged(function (user) {
      if (user) {
          db.firestore().collection("users").doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setuser({
                    fullName : doc.data().fullName,
                    username : doc.data().username,
                    contact : doc.data().contact,
                    avatar : doc.data().avatar,
                    email : doc.data().email,

                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


        db.firestore()
          .collection("posts")
          .where("userId", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            setposts(querySnapshot.docs.map((doc) => doc.data()));
            
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        // User is signed in.
      } else {
        // No user is signed in.
        console.log("no user is signed in");
      }
    });
  }, []);
  return (
    <div className="user">
      <div className="user__head">
        <Avatar
        className="display"
          src={user.avatar}
          style={{ height: '150px', width: '150px' }}
          
        />
        <h3>{user.fullName}</h3>
        <p>{`@ ${user.username}`}</p>
        <Button className="edit" onClick={handleOpen}>Edit Profile</Button>
      </div>
      {posts.length > 0 ? (
        posts.map((post, i) => (
          <Post
            key={i}
            avatar={post.avatar}
            displayName={post.displayName}
            username={post.username}
            image={post.image}
            text={post.text}
            verified={post.verified}
            createdOn={post.createdOn}
          />
        ))
      ) : (
        <div className="none">
          <h1>No Tweets Yet</h1>
          <img
            src="https://www.solidbackgrounds.com/images/851x315/851x315-white-solid-color-background.jpg"
            width="100%"
          />
        </div>
      )}
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
          <h1>Edit Profile</h1>
          <form  noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    name="fulltName"
                    type="text"
                    label="Full Name"
                    value={user.fullName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    name="username"
                    type="text"
                    label="Username"
                    value={user.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    required
                    type="email"
                    label="Email"
                    value={user.email}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="status"
                    multiline
                    label="Status"
                  />
                </Grid>
                
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                  className={classes.update}
                    variant="contained"
                    type="update"
                  >
                    Save Changes
                  </Button>
                  <Button
                  className={classes.cancel}
                    variant="contained"
                    onClick = {handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default User;
