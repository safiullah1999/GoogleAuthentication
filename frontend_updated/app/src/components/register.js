import React, {useState} from 'react';
import { Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Axios from "axios";
import Alert from '@material-ui/lab/Alert';
import { Tooltip } from "@material-ui/core";
var CryptoJS = require("crypto-js");

// {
//     "username":"username4",
//     "pass": "password4",
//     "fName": "user",
//     "lName": "4",
//     "email": "user4@gmail.com",
//     "gender": "M",
//     "phone": "010101010"
// }

function register() {
    const [alerton, setAlert]=useState(false)
    const [ErroOn, setError]=useState(false)
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [phone, setphone] = useState("");
    const [emailerror, setemailerror] = useState(true)
    const [validated, setValidated] = useState(false);
    const [submit, setsubmit] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setgender('M')
        console.log("check",username !== "",password!== "",fName!== "",lName!== "",email!== "",phone!== "",gender!== "")
        if (username !== "" &&password !== ""&& fName !== ""&& lName !== "" && email !== "" && phone !== "" && gender !== "")
        {
            setsubmit(true)
        }
        
        setValidated(true);
        console.log("handlsubmit():",submit)
        if(submit)
        {
            
            empRegister()
        }
        else{
            
            console.log("complete the form")
        }    
    };
    const regExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    // const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // const regExp = /\S+@\S+\.\S+/

    const HandleGender=(e)=>{
        setgender(e)
        console.log(e.toString())
    }

    const empRegister = () => {
        var body = {
            "username":username,
            "pass": password,
            "fName": fName,
            "lName": lName,
            "email": email,
            "gender": gender,
            "phone": phone
        }
        console.log("body:",body)
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), 'APP_SECRET').toString();
        
        var cipher = {"ciphertext":ciphertext}
        console.log("ciphertext",cipher)
        Axios.post("http://localhost:4000/register", cipher).then((res) => {
            // console.log("username:",username,"password:",password)
            // if(res)
            console.log("response:",res)    
            if(res.data.result.data)
            {
                setAlert(true)
                // alert("Successful submission")
            }
            else if (res.data.result.error)
            {
                setError(true)
                // alert(res.data.result)
            }
            // var response = CryptoJS.AES.decrypt(res, 'APP_SECRET').toString(CryptoJS.enc.Utf8)
            // console.log("decrypted response:",response)
        });
    };
    return (
        <div className="Register">
            {/* <h1>Register</h1> */}
            {alerton ?
            <Alert onClose={() => {setAlert(false)}} severity="success">User has been registered!!</Alert>
            :null}
            {ErroOn ? 
            <Alert onClose={() => {setError(false)}} severity="error">Error!! Registration Unsuccessfull</Alert>
            : null}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <Form.Group controlId="formGroupusername">
                        <Form.Label>User name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter User name"
                                onChange={(event) => {
                                    setusername(event.target.value);
                                }}
                            />
                        <Form.Control.Feedback type="invalid">
                            Please provide username
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupUserid">
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter password"
                                onChange={(event) => {
                                    setpassword(event.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide password
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupFname">
                        <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter first name"
                                onChange={(event) => {
                                    setfName(event.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide first name
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupLname">
                        <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter last name"
                                onChange={(event) => {
                                    setlName(event.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide last name
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupemail">
                        <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter Email"
                                onChange={(event) => {
                                    // console.log("regex:",regExp.test(event.target.value), event.target.value)
                                    if(regExp.test(event.target.value)){
                                        setemailerror(false)
                                        setemail(event.target.value)
                                        // console.log("handlemail():",emailerror)
                                    }
                                    else {
                                        setemailerror(true)
                                    }
                                }}
                        />
                        {!emailerror ? <Form.Control.Feedback type="invalid">
                            Please provide email
                        </Form.Control.Feedback>: null}
                </Form.Group>
                <Form.Group controlId="formGroupgender">
                        {/* <Form.Label>Gender</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter gender"
                                onChange={(event) => {
                                    setgender(event.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide Gender
                            </Form.Control.Feedback> */}
                    {/* <select required className="form-control" name="Gender" placeholder="Select Gender" onSelect={(event) => {
                                // if(event.target.value==='M'||event.target.value==='F'){   
                                    setgender(event.target.value);
                                    console.log("gender:",gender);
                                // }
                                }}>
                                    <label>Select Gender</label>
                        <option selected>Select Gender</option>
                        <option value="1">M</option>
                        <option value="2">F</option>
                    </select>         */}
                    {/* <DropdownButton
                    required
                    alignRight
                    title="Dropdown right"
                    value={gender}
                    onSelect={HandleGender}
                        >
                            <Dropdown.Item eventKey="M">M</Dropdown.Item>
                            <Dropdown.Item eventKey="F">F</Dropdown.Item>
                    </DropdownButton> */}
                    <DropdownButton
                        title="Dropdown"
                        id="values"
                        onSelect={HandleGender}
                    >
                        <Dropdown.Item eventKey="M">M</Dropdown.Item>
                        <Dropdown.Item eventKey="F">F</Dropdown.Item>
                        <Dropdown.Divider />
                    </DropdownButton>
                    <Form.Control.Feedback type="invalid">
                                Please provide Gender
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupphone">
                        <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter phone nunber"
                                onChange={(event) => {
                                    setphone(event.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide Phone number
                            </Form.Control.Feedback>
                </Form.Group>
                <Tooltip title="Register User" arrow>
                    <Button className="btn btn-primary btn-block" onClick={handleSubmit}>
                        Sign up
                    </Button>
                </Tooltip>    
                {/* <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div> */}
{/* 
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button> */}

            </Form>
        </div>
    );
}

export default register;