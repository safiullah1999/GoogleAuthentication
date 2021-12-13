import React, {useState} from 'react';
import { Button, Form} from "react-bootstrap";
import Axios from "axios";
var CryptoJS = require("crypto-js");
Axios.defaults.withCredentials = true

// class login extends Component {
    function Login() {
        const [username, setusername] = useState("");
        const [password, setpassword] = useState("");

        const empLogin = () => {
            var body = {"username":username,"password":password}
            console.log("body:",body)
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), 'APP_SECRET').toString();
            
            var cipher = {"ciphertext":ciphertext}
            // console.log("ciphertext",cipher)
            Axios.post("http://localhost:4000/login", cipher).then((res) => {
                // console.log("username:",username,"password:",password)
                // console.log("response:",res)
                // var data = JSON.parse(CryptoJS.AES.decrypt(response.data.ciphertext, 'APP_SECRET').toString(CryptoJS.enc.Utf8))
                console.log(CryptoJS.AES.decrypt(res.data.ciphertext, 'APP_SECRET').toString(CryptoJS.enc.Utf8))
            }).catch((err)=>{
                console.log("error:",err)
                // alert("error:",err)
            });
        };
    
        return (
            // <div>
            //     <h1>Login</h1>
            // </div>
            <div className="Login">
                <Form>
                    <h3>Sign In</h3>

                    <Form.Group controlId="formGroupUserid">
                        <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                onChange={(event) => {
                                    setusername(event.target.value);
                                }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupUserid">
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                onChange={(event) => {
                                    setpassword(event.target.value);
                                }}
                        />
                    </Form.Group>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    {/* <button className="btn btn-primary btn-block" onClick={empLogin}>Login</button> */}
                    <Button className="btn btn-primary btn-block" onClick={empLogin}>
                    Login
                    </Button>
                    
                </Form>
            </div>
        );
    }


export default Login;