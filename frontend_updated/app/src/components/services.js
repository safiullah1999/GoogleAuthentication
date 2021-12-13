import React from "react";
import {
    Link,
} from "react-router-dom";
import "./Form.css";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Switch } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles({
    table: {
        minWidth: "50%",
    },
    head: {
        backgroundColor: "#1d3557",
        // color: "#000000",
    },
});

function Services() {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    Axios.defaults
    const classes = useStyles();
    const handleChange = (event) => {
        console.log(event.target.checked, event.target.name)
        setState({ ...state, [event.target.name]: event.target.checked });
        let type = 0
        let status = ""
        if(event.target.name==="User"){type=8000}
        else if(event.target.name==="Create Post"){type=8001}
        else if(event.target.name==="Get Post"){type=8002}
        else if(event.target.name==="Delete Post"){type=8003}
        else if(event.target.name==="Update Post"){type=8004}
        else if(event.target.name==="Social Login"){type=8005}
        if(event.target.checked===true){status="up"}
        else if (event.target.checked===false){status="down"}

        let data = {
            "status":status
        }
        console.log(status,data)
        Axios.patch(`http://127.0.0.1:8005/service_update/${type}`,data).then((response) => {
        // console.log(response.data.ciphertext);
        var data = response.data
        console.log(data)
        
        })
        // .catch((error)=>{
        //     console.log(error)
        // })
    };
    return (
        <div>
            <Tooltip title="Login page">
                <span>
                <Link to="/"
                > Back to Login Page</Link>
                </span>
              </Tooltip>
        <TableContainer style={{width:"50%"}} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.head}>
                <TableRow>
                    <TableCell style={{color:"#ffffff"}} align="center">Services</TableCell>
                    <TableCell style={{color:"#ffffff"}} align="center">actions</TableCell>
                    {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">User Login/Register</TableCell>
                        <TableCell align="center">
                            <Switch
                                defaultUnChecked
                                name="User"
                                color="default"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                onChange={handleChange}
                            />                
                        </TableCell>
                    </TableRow>
                    <TableRow>    
                    <TableCell align="center">Create Post</TableCell>
                    <TableCell align="center">
                        <Switch
                            defaultUnChecked
                            name="Create Post"
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={handleChange}
                        />                
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell align="center">Get Post</TableCell>
                    <TableCell align="center">
                        <Switch
                            defaultUnChecked
                            name="Get Post"
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={handleChange}
                        />                
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell align="center">Update Post</TableCell>
                    <TableCell align="center">
                        <Switch
                            defaultUnChecked
                            name="Delete Post"
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={handleChange}
                        />                
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell align="center">Delete Post</TableCell>
                    <TableCell align="center">
                        <Switch
                            defaultUnChecked
                            name="Update Post"
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={handleChange}
                        />                
                    </TableCell>
                    </TableRow>
                    {/* <TableRow>
                    <TableCell align="center">Email Sender</TableCell>
                    <TableCell align="center">
                        <Switch
                            defaultUnChecked
                            name="Email Sender"
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={handleChange}
                        />                
                    </TableCell>
                    </TableRow> */}
                    <TableRow>
                    <TableCell align="center">Social Login</TableCell>
                    <TableCell align="center">
                        <Switch
                            defaultUnChecked
                            name="Social Login"
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={handleChange}
                        />                
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}

export default Services;
