import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "C:/Users/Test/env/microservices03/frontend_updated/app/src/App.css";
import "./Form.css";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
import { Tooltip } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {
  Link,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import firebase from "firebase";
import "../App.css";
import "F:/RapidComputeWorkspace/03. SEG-Departmental03/env/microservices03/frontend_updated/app/node_modules/bootstrap/dist/css/bootstrap.min.css"

var CryptoJS = require("crypto-js");
Axios.defaults.withCredentials = true;


const signInSchema = Yup.object().shape({
  username: Yup.string()
    .email('Must be a valid email')
    .required("Username is required")
    .min(4, "username is too short - should be 4 chars min"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars min"),
});

const initialValues = {
  username: "",
  password: "",
};

const GoogleLoginComponent = () => {
  const history = useHistory();
  const [alerton, setAlert] = useState(false);
  const [ErroOn, setError] = useState(false);
  const [ServiceAlert, setServiceAlert] = useState(false);
  const [ServiceOff, setServiceOff] = useState(true)
  useEffect(() => {
    
  }, []);

  // const success = () => {
  //   <div>Sign in completed!!</div>;
  // };
  const [open, setOpen] = React.useState(false);

  const [login, setLogin] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const service_status=()=>{
    Axios.get(`http://127.0.0.1:8005/service_get/8005`).then((response) => {
        // console.log(response.data.ciphertext);
        var data = response.data
        console.log(data)
        if(data[0] === "down"){
          setServiceOff(true)
          setServiceAlert(true)
        }
        else if(data[0] === "up"){
          setServiceOff(false)
          setServiceAlert(false)
        }
        });
  }

  const empLogin = (values) => {
    Axios.get("http://localhost:4000/servicecheck")
      .then((res) => {
        console.log(res.data,res.data.error)
        if (!res.data.data) {
          console.log(res.data.error);
          setServiceAlert(true)

        } else if (!res.data.error) {
          console.log(res.data.data);
          setServiceAlert(false)
        }
      })
      .catch((err) => {
        console.log("error:",err);
        setServiceAlert(true)
        // alert("error:",err)
      });
      service_status()
    var body = { username: values.username, password: values.password };
    // console.log("body:", body);
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(body),
      "APP_SECRET"
    ).toString();

    var cipher = { ciphertext: ciphertext };
    console.log("ciphertext",cipher)
    Axios.post("http://localhost:4000/login", cipher)
      .then((res) => {
        // console.log("username:",username,"password:",password)
        console.log("response:", res);
        console.log("response:", res.data.data);
        console.log("success:", res.data.result.success);
        console.log("error:", res.data.result.error);
        console.log("check:", !res.data.result.success);
        if (!res.data.result.success) {
          console.log(!res.data.result.error);
          // alert(res.data.result.error)
          setError(true);
          setLogin(false);
          handleClick();
          // setsubmit(false)
        } else if (!res.data.result.error) {
          console.log(!res.data.result.success);
          setAlert(true);
          // userHasAuthenticated(true);
          setLogin(true);
          // history.push("/post_search2");
          handleClick();
          history.push("/dashboard");
          // history.replace('/post_search2')
          // alert(res.data.result.success)
          // setsubmit(true)
        }
      })
      .catch((err) => {
        console.log("error:", err);
        // alert("error:",err)
      });
  };

  const service_check = () => {
    Axios.get("http://localhost:4000/servicecheck")
      .then((res) => {
        console.log(res.data)
        if (!res.data.data) {
          console.log(res.data.error);
          setServiceOff(true)
          setServiceAlert(true)

        } else if (!res.data.error) {
          console.log(res.data.data);
          setServiceOff(false)
          setServiceAlert(false)
        }
      })
      .catch((err) => {
        console.log("error:",err);
        setServiceAlert(true)
        // alert("error:",err)
      });
      service_status()
  }
  const empGoogleLogin = (values) => {
    var body = { username: values.username, password: values.password };
    // console.log("body:", body);
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(body),
      "APP_SECRET"
    ).toString();

    var cipher = { ciphertext: ciphertext };
    console.log("ciphertext",cipher)
    Axios.post("http://localhost:4000/logingoogle", cipher)
      .then((res) => {
        // console.log("username:",username,"password:",password)
        console.log("response:", res);
        console.log("response:", res.data.data);
        console.log("success:", res.data.result.success);
        console.log("error:", res.data.result.error);
        console.log("check:", !res.data.result.success);
        if (!res.data.result.success) {
          console.log(!res.data.result.error);
          // alert(res.data.result.error)
          setError(true);
          setLogin(false);
          handleClick();
          // setsubmit(false)
        } else if (!res.data.result.error) {
          console.log(!res.data.result.success);
          setAlert(true);
          // userHasAuthenticated(true);
          setLogin(true);
          // history.push("/post_search2");
          handleClick();
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log("error:", err);
        // alert("error:",err)
      });
  };

  const empGithubLogin = (values) => {
    var body = { username: values.username, password: values.password };
    // console.log("body:", body);
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(body),
      "APP_SECRET"
    ).toString();

    var cipher = { ciphertext: ciphertext };
    console.log("ciphertext",cipher)
    Axios.post("http://localhost:4000/logingithub", cipher)
      .then((res) => {
        // console.log("username:",username,"password:",password)
        console.log("response:", res);
        console.log("response:", res.data.data);
        console.log("success:", res.data.result.success);
        console.log("error:", res.data.result.error);
        console.log("check:", !res.data.result.success);
        if (!res.data.result.success) {
          console.log(!res.data.result.error);
          // alert(res.data.result.error)
          setError(true);
          setLogin(false);
          handleClick();
          // setsubmit(false)
        } else if (!res.data.result.error) {
          console.log(!res.data.result.success);
          setAlert(true);
          // userHasAuthenticated(true);
          setLogin(true);
          // history.push("/post_search2");
          handleClick();
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log("error:", err);
        // alert("error:",err)
      });
  };

  // const google_login=()=>{
  //   return(
  //     <GoogleLogin
  //       icon={false}
  //       clientId="299787769152-mfd5elh884sdp5ht8ms0s53sndk044jc.apps.googleusercontent.com"
  //       // buttonText="Login"
  //       onSuccess={SuccessresponseGoogle}
  //       onFailure={FailresponseGoogle}
  //       cookiePolicy={"single_host_origin"}
  //     />
  //   );
  // } 

  const SuccessresponseGoogle = (response) => {
    var body = {
      username: response.profileObj.email,
      password: response.profileObj.email,
    };
    setOpen(true);
    // setShow(false)
    // setLogin(true)
    empGoogleLogin(body);
    console.log(response);
    console.log(response.profileObj.email);

    // <Redirect to="/dashboad" component={Dashboard}/>
    // history.push('/dashboard');
  };
  const FailresponseGoogle = (response) => {
    setLogin(false);
    console.log(response);
  };

  // const handleSocialLogin = (response) => {
  //   console.log("success github");
  //   console.log(response);
  // };
  // const handleSocialLoginFailure = (response) => {
  //   console.log("failure github");
  //   console.log(response);
  // };

  var provider = new firebase.auth.GithubAuthProvider();

  const githubSignin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)

      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var body = { username: user.bc.email, password: user.bc.email };
        setOpen(true);
        // setShow(false)
        // setLogin(true)
        empGithubLogin(body);

        console.log(token);
        console.log(user.bc.email);
      })
      .catch(function (error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;

        console.log(error.code);
        console.log(error.message);
      });
  };

  // const githubSignout = () => {
  //   firebase
  //     .auth()
  //     .signOut()

  //     .then(
  //       function () {
  //         console.log("Signout successful!");
  //       },
  //       function (error) {
  //         console.log("Signout failed");
  //       }
  //     );
  // };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={empLogin}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="Login">
            {alerton ? (
              <div>
                <Alert
                  onClose={() => {
                    setAlert(false);
                  }}
                  severity="success"
                >
                  User is Logged in!!
                </Alert>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Login Successfull!
                  </Alert>
                  {/* history.replace('/post_search') */}
                </Snackbar>
              </div>
            ) : null}
            {ErroOn ? (
              <div>
                <Alert
                  onClose={() => {
                    setError(false);
                  }}
                  severity="error"
                >
                  Error!! Login Unsuccessfull, unauthorized user
                </Alert>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    Login Unsuccessfull!
                  </Alert>
                </Snackbar>
              </div>
            ) : null}

            <div style={{textAlign:"center"}}><h1>Sign in to continue</h1></div>
            <div>
              <button className="button" style={{alignItems:"center"}} onClick={()=>{
                history.push('/services')
              }}>
                Services
              </button>
            </div>
            {ServiceAlert ? <Alert onClose={handleClose} severity="error">
              Service unavailable!
            </Alert>:null}
            <Form className="container">
              <div className="form-row">
                <label htmlFor="email">Username</label>
                <Field
                  type="username"
                  name="username"
                  id="username"
                  className={
                    errors.username && touched.username ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="username"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <Tooltip title="Login User">
                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid)}
                >
                  Sign In
                </button>
              </Tooltip>
              <div style={{textAlign:"center"}}><h4>OR</h4></div>
              {/* <GithubLoginButton
              onClick={githubSignin}
              // disabled
            ></GithubLoginButton> */}
            
            {ServiceOff ? 
              <div>
                <GithubLoginButton
                onClick={()=>{
                  service_check();
                  // if(!ServiceAlert){google_login();}
                }}
                // disabled
                ></GithubLoginButton>
                <GoogleLoginButton
                onClick={()=>{
                  service_check();
                  // if(!ServiceAlert){google_login();}
                }}
                ></GoogleLoginButton>
              </div>  
              :
              <div>
                <GithubLoginButton
                onClick={githubSignin}
                // disabled
                ></GithubLoginButton>
                <GoogleLogin
                // icon={false}
                clientId="299787769152-mfd5elh884sdp5ht8ms0s53sndk044jc.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={SuccessresponseGoogle}
                onFailure={FailresponseGoogle}
                cookiePolicy={"single_host_origin"}
                />
              </div>  
            }
            
            {/* <GoogleLoginButton
              onClick={()=>{
                service_check();
                if(!ServiceAlert){google_login();}
              }}
            >
              {!ServiceAlert ? 
                <GoogleLogin
                icon={false}
                clientId="299787769152-mfd5elh884sdp5ht8ms0s53sndk044jc.apps.googleusercontent.com"
                // buttonText="Login"
                onSuccess={SuccessresponseGoogle}
                onFailure={FailresponseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              :null}
            </GoogleLoginButton> */}
              <p>Don’t have an account?
              <Tooltip title="Register User">
                <span>
                <Link to="/register"
                > Sign up</Link>
                </span>
              </Tooltip>
              </p>
              
            </Form>
            ,
            {/* <div><SocialButton
              provider='github'
              // gatekeeper='http://localhost:3000'
              appId='97de7e26f4397cd0ad7f'
              // redirect='http://localhost:3000'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with GitHub OAuth
            </SocialButton>
            </div> */}
            {/* <GithubLoginButton>
              <LoginGithub clientId="97de7e26f4397cd0ad7f"
                onSuccess={handleSocialLogin}
                onFailure={handleSocialLoginFailure}/>
            </GithubLoginButton> */}
            {/* <GitHubLogin
              clientId="97de7e26f4397cd0ad7f"
              redirectUri="http://localhost:3000"
              onSuccess={handleSocialLogin}
              onFailure={handleSocialLoginFailure}
              className="github-button"
            />   */}
            {/* <GoogleLogout
                clientId="299787769152-mfd5elh884sdp5ht8ms0s53sndk044jc.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={FailresponseGoogle}
            >
            </GoogleLogout> */}
          </div>
        );
      }}
    </Formik>
  );
};

export default GoogleLoginComponent;
