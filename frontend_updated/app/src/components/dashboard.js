import React from 'react';
import { useHistory,Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Posts from './Posts';
import Post_search from './Post_Search';
import Post_search2 from './Post_Search2';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Alert from '@material-ui/lab/Alert';
import { Tooltip } from "@material-ui/core";
import { Button } from "react-bootstrap";
import Snackbar from '@material-ui/core/Snackbar';
import firebase from "firebase";
import {app} from "../firebase/firebase";
import '../App.css';
import './Form.css';

// class App extends Component {
  function Dashboard(){
    const history  = useHistory();
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
  const Logout = () => {
    Axios.get("http://localhost:4000/logout").then((response) => {
        console.log(response.data)
        handleClick()
        githubSignout()
        history.replace('/')
        window.location.reload(false);
        // var data = JSON.parse(CryptoJS.AES.decrypt(response.data.ciphertext, 'APP_SECRET').toString(CryptoJS.enc.Utf8))
        // console.log("enc data:",data.data)
        // setPostList(data.data);
        // console.log(response.data);
        // setPostList(data);
    });
  };
  const githubSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signout successful!");
        },
        function (error) {
          console.log("Signout failed");
        }
      );
      // const user = firebase.auth().currentUser;

      // // TODO(you): prompt the user to re-provide their sign-in credentials
      // const credential = promptForCredentials();

      // user.reauthenticateWithCredential(credential).then(() => {
      //   // User re-authenticated.
      // }).catch((error) => {
      //   // An error ocurred
      //   // ...
      // });
      try{
        firebase.auth().currentUser.delete().then(function () {
          console.log('delete successful?')
          console.log(app.auth().currentUser)
        }).catch(function (error) {
          console.error({error})
        }) 
      }
      catch(error){
        console.log("error in signing out")
      } 
  };
  
  // render() {
    return (
      <div className="App">
        
        <Router>
          <div className="container">
            <ul className="nav">
              
            <Tooltip title="Add Post" arrow>
              <li><NavLink to="/Posts">Add Posts</NavLink></li>
            </Tooltip>  
            <Tooltip title="Post Search" arrow>
              <li><NavLink to="/post_search2">Post Search</NavLink></li>
            </Tooltip>  
            <Tooltip title="Post Search" arrow>
              <li><NavLink to="/post_search">Post Search new </NavLink></li>
            </Tooltip>  
              
              <div>
                <Tooltip title="Logout" arrow>
                  <Button className="btn btn-primary btn-block" onClick={Logout}>
                      Logout
                  </Button>
                </Tooltip>  
                </div>
            </ul>
            {open ? 
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              Logout Successfull!
            </Alert>
            </Snackbar>
            :null}

            <div className="pages">
              <Route path="/Posts" component={Posts}/>
              <Route path="/post_search" component={Post_search}/>
              <Route path="/post_search2" component={Post_search2}/>
              
            </div>
          </div>
        </Router>
      </div>
    );
  // }
}

export default Dashboard;