import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
//import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import { Actions,Actions2 } from '../Component/Redux/Index'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [state, setstate] = useState({ email: "", password: "" });
  //  const [stateToken, setToken] = useState(false);
  const [open, setOpen] = useState(false);
  //const [error, setError] = useState();
  const [user, setUser] = useState();
  let history = useHistory();

  useEffect(() => {
 



    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  if (user) {
    history.push("/home");
  }
  //let myData = JSON.parse(localStorage.getItem("myData"));
  const handleClose = () => {
    setOpen(false)
  }
 
  const HandleSubmit = (event) => {
    event.preventDefault();

    axios.get(`http://localhost:3001/users`)
      .then(res => {
        let fullData = res.data;
        console.log("fulldata", fullData)

        fullData.map((a) => {
          if (a.email === state.email && a.password === state.password) {
            console.log("login")
            const token = "abcd";
            try {
              localStorage.setItem("token", JSON.stringify(token));
            } catch (error) {
              console.log(" error: " + error);
            }
            props.Actions(token)
            history.push("/home")
          }
          else {
            // console.log("error");
            setOpen(true);
          }
        })

      }
      )
      .catch(error => { console.log(error) })




    //   const sendGetRequest = async () => {
    //     try {
    //         const resp = await axios.get('http://localhost:3001/users');
    //         console.log("resp",resp.data);
    //         setdata(resp.data)

    //     } catch (err) {
    //         // Handle Error Here
    //         console.error(err);
    //     }
    // };

    // sendGetRequest();


    // console.log("state", statedata)



    // async function myFetch() {
    //   await fetch('http://localhost:3001/users')
    //     .then(response => response.json())
    //     .then(data => setdata(data));

    //   console.log("state", statedata)

    // }
    // myFetch();



    //   myData.map((a) => {
    //     if (state.email === a.email) {
    //       if (state.password === a.password) {




    //         const token = "abcd";

    //         try {
    //           localStorage.setItem("token", JSON.stringify(token));
    //         } catch (error) {
    //           console.log(" error: " + error);
    //         }
    //         //  return setToken(true)
    //         return (history.push("/home"), window.location.reload(true))
    //       }
    //     } else {
    //       // console.log("error");
    //       setError("User not found ");
    //     }

    //     return null;
    //   });
  };

  // if (stateToken) {
  //   return  <Route
  //   path={props.path}
  //   exact={props.exact}
  //   component={props.component}
  // />;
  // }

  //   for (let i = 0; i < myData.length; i++) {
  //     if (state.email == result[i] && state.password == resultpw[i]) {
  //       console.log("login ");
  //       history.push("/home");
  //     } else {
  //       console.log("wrong email or password");
  //     }
  //   }import Snackbar from '@material-ui/core/Snackbar';

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <Typography component="h1" variant="h5" style={{ color: "red" }}>
            {open ? (<> <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                email and password not match !
            </Alert>
            </Snackbar></>) : null}
          </Typography>
          <form onSubmit={HandleSubmit} className={classes.form} noValidate>
            <TextField
              value={state.email}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={state.password}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item>
                <Link to="/Sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    token: state.token,
    //edit:state.edit
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Actions: function (statepayload) {
      dispatch(Actions(statepayload));
    },
   
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);