import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import * as firebase from "firebase";
import firebaseConfig from "./firebase";

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);
function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
  
  
    return (
        <div className="App">
          <h1>Hello World</h1>
        </div>
      );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
  