import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import db from '../firebase'
import {Redirect , useHistory} from 'react-router-dom'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Twitter webapp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1611605698335-8b1569810432?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#50b7f5",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#50b7f5",
    color: "white",
    fontWeight: "600",
    borderRadius: "30px"
  },
  upload: {
    borderRadius: "30px"
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setemail] = useState("")
  const [fname, setfname] = useState("")
  const [contact, setcontact] = useState(0)
  const [avatar, setavatar] = useState("")
  const [password, setpassword] = useState("")
  const [uname, setuname] = useState("")
  const history = useHistory()

const onUploadAvatar = async e =>{
  e.preventDefault();
  const img = e.target.files[0]
    const storageRef = db.storage().ref('avatar/')
    const imgRef = storageRef.child(img.name)
    await imgRef.put(img)
    setavatar(await imgRef.getDownloadURL())
}
const onSignUp = e =>{
  e.preventDefault();

    db.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log("logged in: ", user.user.uid);
        var data = {
          fullName: fname,
          contact: contact,
          username: uname,
          email: email,
          avatar: avatar,
          verified: false 
      }
  
      var database = db.firestore().collection("users").doc(user.user.uid);
  
      database.set(data);
  
      localStorage.setItem("user", JSON.stringify(email)); 
      localStorage.setItem("loggedIn", JSON.stringify(true));
  
      // Signed in 
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      alert(errorMessage)

    });

  
    history.replace('/home') 
    
  
  
}

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <TwitterIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} method="POST" onSubmit={onSignUp}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={e =>{
                setemail(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="uname"
              autoComplete="uname"
              autoFocus
              onChange={e =>{
                setuname(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fname"
              label="Full Name"
              name="fname"
              autoComplete="fname"
              autoFocus
              onChange={e =>{
                setfname(e.target.value)
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e =>{
                setpassword(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="contact"
              label="Contact No."
              name="contact"
              type="tel"
              autoComplete="contact"
              autoFocus
              onChange={e =>{
                setcontact(e.target.value)
              }}
            />
            <Button variant="contained" className={classes.upload} component="label" fullWidth>
              Upload Profile Pic
              <input type="file" name="avatar" id="avatar" hidden onChange={onUploadAvatar} />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
