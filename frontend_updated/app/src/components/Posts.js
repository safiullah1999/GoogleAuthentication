import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Tooltip } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import Post_search2 from "./Post_Search2";

var CryptoJS = require("crypto-js");

// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//     },
//   });

function Posts() {
  var d = new Date();
  const [user_id, setUser_id] = useState(0);
  const [title, settitle] = useState();
  const [description, setdesc] = useState("");
  const [date, setdate] = useState(d.toString());
  const [postList, setPostList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [alerton, setAlert] = useState(false);
  const [Dailogon, setDailog] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [Disagree, setDisAgree] = useState(false);
  const [ServiceAlert, setServiceAlert] = useState(false);

  // const handleClickOpen = () => {
  // setDailog(true)
  // };

  const handleClose = () => {
    setDailog(false);
  };

  const handleAgree = () => {
    console.log("I agree!");
    setSubmit(true);
    addPost();
    handleClose();
  };
  const handleDisagree = () => {
    console.log("I do not agree.");
    setSubmit(false);
    setDisAgree(true);
    handleClose();
  };

  const handleSubmit = (event) => {
    service_status(8001);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setDailog(true);
    setValidated(true);
    console.log("submit status", submit);
    if (submit) {
      addPost();
    } else {
      setAlert(false);
    }
  };
  const addPost = () => {
    var body = {
      user_id: user_id,
      title: title,
      description: description,
      date: date,
    };
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(body),
      "APP_SECRET"
    ).toString();
    // console.log("body:",body)
    // console.log("ciphertext",ciphertext)
    var cipher = { ciphertext: ciphertext };
    service_status(8001);
    if (!ServiceAlert) {
      Axios.post("http://localhost:4000/createPost", cipher).then((res) => {
        console.log("user_id:", user_id);
        // if (res.code === 200)
        // {
        //     setAlert(true)
        // }

        setPostList([
          ...postList,
          {
            user_id: user_id,
            title: title,
            description: description,
            date: date,
          },
        ]);
        console.log("postlist:", postList);
        if (typeof postList !== "undefined") {
          setAlert(true);
        }
      });
    }
  };

  const getPosts = () => {
    service_status(8002);
    if (!ServiceAlert) {
      Axios.get("http://localhost:4000/getUserPosts").then((response) => {
        console.log(response.data.ciphertext);
        var data = JSON.parse(
          CryptoJS.AES.decrypt(response.data.ciphertext, "APP_SECRET").toString(
            CryptoJS.enc.Utf8
          )
        );
        console.log("enc data:", data);
        setPostList(data.data);
        if (!postList) {
          alert(data.error);
        }
        // console.log(response.data);
        // setPostList(data);
      });
    }
  };
  const service_status = (type) => {
    Axios.get(`http://127.0.0.1:8005/service_get/${type}`).then((response) => {
      // console.log(response.data.ciphertext);
      var data = response.data;
      console.log("service data:", data);
      if (data[0] === "down") {
        //   setServiceOff(true)
        setServiceAlert(true);
      } else if (data[0] === "up") {
        //   setServiceOff(false)
        setServiceAlert(false);
      }
    });
  };
  useEffect(() => {
    // Do mount stuff here such as executing your request.
  }, []);

  return (
    <div className="Post">
      {/* <h1>Post Details</h1> */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {ServiceAlert ? (
          <Alert
            onClose={() => {
              setServiceAlert(false);
            }}
            severity="error"
          >
            Service unavailable!
          </Alert>
        ) : null}

        <h3>Posts</h3>

        {alerton && submit ? (
          <Alert
            onClose={() => {
              setAlert(false);
            }}
            severity="success"
          >
            Post Added
          </Alert>
        ) : null}
        {Disagree ? (
          <Alert
            onClose={() => {
              setAlert(false);
              setDisAgree(false);
            }}
            severity="warning"
          >
            Post Not Added!!
          </Alert>
        ) : null}
        <Dialog
          open={Dailogon}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Successful Alert"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Want to add this Post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree} color="primary">
              Disagree
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Form.Group controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Title"
            onChange={(event) => {
              settitle(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide title
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGroupDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter description"
            onChange={(event) => {
              setdesc(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide description
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGroupDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Select date"
            min={moment().format("YYYY-MM-DD")}
            onChange={(event) => {
              setdate(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please select date
          </Form.Control.Feedback>
        </Form.Group>
        <div>
          <Tooltip title="Add Post" arrow>
            <Button
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Add Post
            </Button>
          </Tooltip>
        </div>
        <div>
          <p></p>
        </div>
      </Form>
      <TableContainer component={Paper}>
        <Post_search2 func={getPosts} />
      </TableContainer>
    </div>
  );
}

export default Posts;
