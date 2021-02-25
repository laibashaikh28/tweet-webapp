import React, { useState, useEffect } from "react";
import "./User.css";
import Post from "./Post";
import db from "../firebase";
import { Button, Avatar, Grid, TextField, Paper } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import Followers from "./Followers";

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
  update: {
    backgroundColor: "#50b7f5",
    color: "white",
    borderRadius: "20px",
    fontWeight: "600",
  },
  cancel: {
    borderRadius: "20px",
    marginLeft: "5px",
    fontWeight: "600",
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

function User({ uname }) {
  const [posts, setposts] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fname, setfname] = useState("");
  const [status, setstatus] = useState("");
  const [avatar, setavatar] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState(0);
  const [username, setusername] = useState(uname);
  const [uid, setuid] = useState("");
  const [loggedInUser, setloggedInUser] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [liked, setliked] = useState([]);
  const [postId, setpostId] = useState([]);
  const [follow, setfollow] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setliked([]);
    db.auth().onAuthStateChanged(function (user) {
      if (user) {

        setloggedInUser(user.uid);
        db.firestore()
      .collection("users")
      .where("username", "==", uname)
      .get()
      .then((onSnapshot) => {
        if (onSnapshot.size > 0) {
          let doc = onSnapshot.docs[0];
          console.log("Document data:", doc.data());
          setfname(doc.data().fullName);
          setusername(doc.data().username);
          setcontact(doc.data().contact);
          setavatar(doc.data().avatar);
          setemail(doc.data().email);
          setcontact(doc.data().contact);
          setstatus(doc.data().status);
          setuid(doc.id);
          console.log(uid);
          if (uid === loggedInUser) {
            setisLoggedIn(true);
            console.log(uid, loggedInUser)
          } else {
            setisLoggedIn(false);
            console.log(uid, loggedInUser)
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    db.firestore()
      .collection("posts")
      .where("createdBy", "==", uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          setposts(querySnapshot.docs.map((doc) => doc.data()));
          console.log(posts);
          setpostId(
            querySnapshot.docs.map((doc) => {
              db.auth().onAuthStateChanged(function (user) {
                if (user) {
                  
                  const ref = db
                    .firestore()
                    .collection("likedPosts")
                    .where("postId", "==", doc.id)
                    .where("likedBy", "==", user.uid);
                  ref
                    .get()
                    .then((onSnapshot) => {
                      if (onSnapshot.size > 0) {
                        setliked((prevArr) => [...prevArr, "liked"]);
                        console.log(liked, doc.data());
                      } else {
                        setliked((prevArr) => [...prevArr, "notLiked"]);
                        console.log("No such document!");
                      }
                    })
                    .catch(function (error) {
                      console.log("Error getting document: ", error);
                    });
                }
              });

              return doc.id;
            })
          );
        } else {
          console.log("no such document");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

      const followRef = db.firestore().collection("follow").where("followedUser", "==", uid).where("followedBy", "==", loggedInUser)

      followRef.get().then(querySnapshot =>{
        if(querySnapshot.size > 0){
          setfollow(true)
        }
        else{
          setfollow(false)
        }
      })
        // User is signed in.
      } else {
        // No user is signed in.
        console.log("no user is signed in");
      }
    });

    
  }, []);

  const onFollow = () => {
    const followRef = db.firestore().collection("follow");

    const data = {
      followedUser: uid,
      followedBy: loggedInUser,
    };
    followRef.add(data);
    setfollow(true);
  };

  const onUnfollow = () => {
    const followRef = db.firestore().collection("follow").where("followedUser", "==", uid).where("followedBy", "==", loggedInUser);

    followRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    setfollow(false);
  };

  const onFileChange = async (e) => {
    const img = e.target.files[0];
    const storageRef = db.storage().ref("avatar/");
    const imgRef = storageRef.child(img.name);
    await imgRef.put(img);
    setavatar(await imgRef.getDownloadURL());
  };

  const onUpdate = (e) => {
    e.preventDefault();

    var data = {
      fullName: fname,
      contact: contact,
      status: status,
      avatar: avatar,
    };

    var database = db.firestore().collection("users").doc(loggedInUser);

    database.update(data);
    handleClose();
  };

  return (
    <div className="user">
      <div className="user__head">
        <Avatar
          className="display"
          src={avatar}
          style={{ height: "150px", width: "150px" }}
        />
        <h3>{fname}</h3>
        <p>{`@ ${username}`}</p>
        <p>{status}</p>
        <Followers userId = {uid} />
        {isLoggedIn ? (
          <Button className="edit" onClick={handleOpen}>
            Edit Profile
          </Button>
        ) : follow ? (
          <Button variant="contained" className="unfollow" onClick={onUnfollow}>
            Unfollow
          </Button>
        ) : (
          <Button className="edit" onClick={onFollow}>
            Follow
          </Button>
        )}
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
            totalLikes={post.likes}
            postId={postId[i]}
            liked={liked[i]}
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
            <div className="avcontainer">
              <Avatar
                className="display"
                src={avatar}
                style={{ height: "150px", width: "150px" }}
              />
              <div className="overlay">
                <label>
                  <EditIcon className="icon" />
                  <input
                    type="file"
                    className="edit__avatar"
                    onChange={onFileChange}
                  />
                </label>
              </div>
            </div>
            <form method="POST" onSubmit={onUpdate}>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="fname"
                      type="text"
                      label="Full Name"
                      value={fname}
                      onChange={(e) => {
                        setfname(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      required
                      name="username"
                      type="text"
                      label="Username"
                      value={username}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="email"
                      fullWidth
                      required
                      type="email"
                      label="Email"
                      value={email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="contact"
                      fullWidth
                      required
                      type="tel"
                      label="Contact"
                      value={contact}
                      onChange={(e) => setcontact(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="status"
                      multiline
                      label="Status"
                      value={status}
                      onChange={(e) => {
                        setstatus(e.target.value);
                      }}
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
                      onClick={handleClose}
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
