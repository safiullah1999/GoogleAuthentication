import React ,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Form.css";
import Alert from '@material-ui/lab/Alert';
import Axios from "axios";
import { Tooltip } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
// import { useHistory } from 'react-router-dom';

var CryptoJS = require("crypto-js");
Axios.defaults.withCredentials = true


const signInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required")
  .min(4, "username is too short - should be 4 chars min"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars min")
});

const initialValues = {
  username: "",
  password: ""
};

const SignInForm = () => {
    // const [submit_button, setsubmit] = useState(true);
    // const history = useHistory();
    const [alerton, setAlert]=useState(false)
    const [ErroOn, setError]=useState(false)
    // const success = () => {
    //         <div>Sign in completed!!</div>
    // };
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
    // const Redirect_Post = () =>{
    //   history.replace('/post_search2')
    //   return(<div>Login Successful</div>)
    // }
    const empLogin = (values) => {
        var body = {"username":values.username,"password":values.password}
        console.log("body:",body)
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), 'APP_SECRET').toString();
        
        var cipher = {"ciphertext":ciphertext}
        // console.log("ciphertext",cipher)
        Axios.post("http://localhost:4000/login", cipher).then((res) => {
            // console.log("username:",username,"password:",password)
            console.log("response:",res)
            console.log("response:",res.data.data)
            console.log("success:",res.data.result.success)
            console.log("error:",res.data.result.error)
            console.log("check:",!res.data.result.success)
            // var data = JSON.parse(CryptoJS.AES.decrypt(response.data.ciphertext, 'APP_SECRET').toString(CryptoJS.enc.Utf8))
            // console.log("response:",CryptoJS.AES.decrypt(res.data.ciphertext, 'APP_SECRET').toString(CryptoJS.enc.Utf8))
            if (!res.data.result.success){
                console.log(!res.data.result.error)
                // alert(res.data.result.error)
                setError(true)
                
                handleClick()
                // setsubmit(false)
            }
            else if (!res.data.result.error){
                console.log(!res.data.result.success)
                setAlert(true)
                // userHasAuthenticated(true);
                
                // history.push("/post_search2");
                handleClick()
                // history.replace('/post_search2')
                // alert(res.data.result.success)
                // setsubmit(true)
            }
        }).catch((err)=>{
            console.log("error:",err)
            // alert("error:",err)
        });
    };
    
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
            {alerton ?
            <div>
              <Alert onClose={() => {setAlert(false)}} severity="success">User is Logged in!!</Alert>
              <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Login Successfull!
                
              </Alert>
              {/* history.replace('/post_search') */}
              </Snackbar>
              {/* <Router>
              <Redirect to="/post_search2" component={Post_search2}/>
              </Router> */}
              
              {/* <Route path="/post_search2" component={Post_search2}/> */}
              {/* {Redirect_Post()}
               */}
               {/* <Router>
                <div className="container">
                  <ul className="nav">
                    
                  <Tooltip title="Login" arrow>  
                    <li><NavLink exact to="/Posts">Login</NavLink></li>
                  </Tooltip>
                  </ul>
                  <div className="pages">
              <Route exact path="/login" component={Login}/>
                  <Route path="/Posts" component={Posts}/>
                  </div>
                </div>
              </Router> */}
            </div>
            :null}
             {ErroOn ? 
             <div>
              <Alert onClose={() => {setError(false)}} severity="error">Error!! Login Unsuccessfull, unauthorized user</Alert>
              <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                Login Unsuccessfull!
              </Alert>
              </Snackbar>
              </div> 
            : null}

            <h1>Sign in to continue</h1>
            <Form>
               
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
                <ErrorMessage name="username" component="span" className="error" />
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
            </Form>
            
          </div>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
