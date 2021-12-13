import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard";
import "./components/Form.css";
import "./App.css";
import GoogleLoginComponent from "./components/GoogleLogin";
import SocialRegister from "./components/SocialRegister";
import Services from "./components/services";

// class App extends Component {
function App() {
  // const history = useHistory();
  // render() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={GoogleLoginComponent} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/register" exact component={SocialRegister} />
          <Route path="/services" exact component={Services} />
          
        </Switch>
      </Router>
      {/* <GoogleLoginComponent /> */}
      {/* <Router>
          {login ? 
          <Redirect to="/dashboard" component={Dashboard}/> 
          :
          <Redirect to="/"/>
        }
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/" />
        </Router>
        <div>
          <button onClick={handleClick}>Dashboard</button>
          <GoogleLogin
            clientId="299787769152-mfd5elh884sdp5ht8ms0s53sndk044jc.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={SuccessresponseGoogle}
            onFailure={FailresponseGoogle}
            cookiePolicy={'single_host_origin'}
          />,
          <GoogleLogout
            clientId="299787769152-mfd5elh884sdp5ht8ms0s53sndk044jc.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={Logout}
          >
          </GoogleLogout>
        </div>   */}
    </div>
  );
  // }
}

export default App;
