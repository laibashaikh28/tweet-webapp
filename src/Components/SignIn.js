import React, { useState } from "react";
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
import db from "../firebase";
import { useHistory } from "react-router-dom";

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
    borderRadius: "30px",
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [uname, setuname] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  const onSignIn = (e) => {
    var atpos = uname.indexOf("@");
    var dotpos = uname.lastIndexOf(".");

    e.preventDefault();

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= uname.length) {
      const userRef = db
        .firestore()
        .collection("users")
        .where("username", "==", uname);
      console.log(userRef);
      userRef
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size > 0) {
            // Contents of first document
            console.log(querySnapshot.docs[0].id);
            
            const dbemail = querySnapshot.docs[0].data().email;
            db.auth()
              .signInWithEmailAndPassword(dbemail, password)
              .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                history.replace("/home");
                // ...
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document: ", error);
        });
    } else {
      db.auth()
        .signInWithEmailAndPassword(uname, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          history.replace("/home");
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

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
            Sign in
          </Typography>
          <form className={classes.form} method="POST" onSubmit={onSignIn}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="uname"
              label="Username/Email"
              name="uname"
              type="text"
              onChange={(e) => {
                setuname(e.target.value);
              }}
              autoFocus
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
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
