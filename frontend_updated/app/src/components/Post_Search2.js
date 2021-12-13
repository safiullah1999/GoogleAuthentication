// App.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
// import './App.css';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import Modal from "react-bootstrap/Modal";
import { Tooltip } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

var CryptoJS = require("crypto-js");

function Post_search2() {
  var d = new Date();
  const [PID, setPID] = useState("");
  const [user_id, setUser_id] = useState(0);
  const [tit, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [date_, setdate] = useState(d.toString());
  const [alerton, setAlert]=useState(false)
  const [Delalert, setDelAlert]=useState(false)
  const [ErroOn, setError]=useState(false)
  const [NoPost, setNoPost]=useState(false)
  const [ServiceAlert, setServiceAlert] = useState(false)

  // const [name, set]=useState("")
  const [postList, setPostList] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const service_status=(type)=>{
    Axios.get(`http://127.0.0.1:8005/service_get/${type}`).then((response) => {
        // console.log(response.data.ciphertext);
        var data = response.data
        console.log("service data:",data)
        if(data[0]==="down"){
        //   setServiceOff(true)
          setServiceAlert(true)
        }
        else if(data[0]==="up"){
        //   setServiceOff(false)
          setServiceAlert(false)
        }
        });
  }

  // const handleSubmit = (event) => {
  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     }

  //     setValidated(true);
  //     console.log("inside handle submit...")
  //     updatePost()
  // };
  useEffect(() => {
    // Update the document title using the browser API
    getPosts()
  });

  const updatePost = (cell, row) => {
    // getPosts()
    service_status(8003)
    console.log("inside update posts...")
    
    console.log("updated row",row.post_id,row.user_id,row.title,row.description)
    if(PID !== row.post_id || user_id !== row.user_id )
    {
        setError(true)
        return
    }
    var body = {"user_id":row.user_id,"title":row.title,"description":row.description, "date":row.date}
        // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), 'APP_SECRET').toString();
        // console.log("body:",body)
        // console.log("ciphertext",ciphertext)
        // var cipher = {"ciphertext":ciphertext}
        
        if(!ServiceAlert){Axios.put(`http://localhost:4000/updateUserPost/${row.post_id}`,body).then((res) => {
            console.log("response from server after update:", res)
            if (res.data)
            {
                setAlert(true)
            }else{
                setError(true)
            }
            
        });}
  }

  const getPosts = () => {
    // Posts = []
    service_status(8002)
    console.log("postlist:", postList);
    if(!ServiceAlert){Axios.get("http://localhost:4000/getUserPosts").then((response) => {
      console.log(response.data.ciphertext);
      var data = JSON.parse(
        CryptoJS.AES.decrypt(response.data.ciphertext, "APP_SECRET").toString(
          CryptoJS.enc.Utf8
        )
      );
      console.log("enc data:", data.data);
      // Posts = data.data
      Array.prototype.push.apply(Posts, data.data);
      Array.prototype.push.apply(Posts_temp, data.data);
      console.log("postlist:", postList);
      console.log(Posts.length);
      console.log("check:", postList.length !== 0, Posts.length === 0);
      if (Posts.length === 0){
          setNoPost(true)
      }
      // setPostList([data.data]);
      console.log("posts:", Posts);
      console.log("posts_temp:", Posts_temp);
      if (!postList) {
        alert(data.error);
      }
      // console.log(response.data);
      // setPostList(data);
    });}
  };
  var Posts = [];
  var Posts_temp = [];

  var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}
  const handleDelete = (post_id) => {
    service_status(8004)
    console.log(post_id);
    if (!ServiceAlert){Axios.delete(`http://localhost:4000/deleteUserPost/${post_id}`).then((response) => {
      // console.log(response.data.ciphertext);
      var data = JSON.parse(
        CryptoJS.AES.decrypt(response.data.ciphertext, "APP_SECRET").toString(
          CryptoJS.enc.Utf8
        )
      )
      console.log(data)
      if (data.data){
        setDelAlert(true)
      }

    //   alert(data.data)
      removeByAttr(Posts, 'post_id', post_id);
      console.log("posts after delete",Posts)
    })}
    //1 YourCellName
};

  const columns = [
    { dataField: "post_id", text: "Post_Id", sort: true, hidden: true},
    { dataField: "user_id", text: "User_Id", sort: true, hidden: true },
    { dataField: "title", text: "Title", sort: true },
    { dataField: "description", text: "Description", sort: true },
    { dataField: "date", text: "Date", sort: true },
    {
      dataField: "remove",
      text: "Delete",
      formatter: (cellContent, row) => {
        return (
          <Tooltip title="Delete Post" arrow>
            <button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.post_id)}
            >
              Delete
            </button>
          </Tooltip>  
        );
      },
      editable: false
    },
    {
      dataField: "update",
      text: "Update",
      formatter: (cellContent, row) => {
        return (
          <Tooltip title="Update Post" arrow>
          <button
            className="btn btn-update btn-xs"
            onClick={() => {
                setPID(row.post_id)
                setUser_id(row.user_id)
                updatePost(cellContent,row)}}
          >
            Update
          </button>
          </Tooltip>
        );
      },
      editable: false
    },
    {
      dataField: "Details",
      text: "Details",
      formatter: (cellContent, row) => {
        return (
          <div>
          <Tooltip title="Open Details" arrow>
            <button type="btn btn-update btn-xs" onClick={()=>{
              handleOpen();
              setdesc(row.description);
              settitle(row.title);
              setdate(row.date);}}>
              details
            </button>
          </Tooltip>
          {/* <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="Modal"
            style={{
              // display: 'flex',
              backgroundColor: 'white',
              align: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="paper" style={{
                backgroundColor: transparent,
                border: '2px solid #000',
                // boxShadow: theme.shadows[2],
                // padding: theme.spacing(2, 4, 3),
              }}>
                <h2 id="transition-modal-title">Description</h2>
                <p id="transition-modal-description">{row.description}</p>
              </div>
            </Fade>
          </Modal> */}
          </div>
        );
      },
      editable: false
    },
  ];

  const defaultSorted = [
    {
      dataField: "post_id",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("check:", postList.length !== 0, Posts.length !== 0);
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <div className="post">
        {ServiceAlert ? <Alert onClose={()=>{setServiceAlert(false)}} severity="error">
              Service unavailable!
            </Alert>:null}
        {alerton ?
         <Alert onClose={() => {setAlert(false)}} severity="success">Post updated</Alert>
         :null}
         {ErroOn ? 
         <Alert onClose={() => {setError(false)}} severity="error">Error!! Post not updated</Alert>
         : null}
         {Delalert ? 
         <Alert onClose={() => {setDelAlert(false)}} severity="error">Post is Deleted</Alert>
         : null}
         {NoPost ? 
         <Alert onClose={() => {setNoPost(false)}} severity="info">No Post Available</Alert>
         : null}
      <h5>Post Table</h5>

      {/* {typeof (postList !== "undefined" || postList.length !== 0) ?  */}
      {typeof (Posts.length !== 0) ? 
      (
        
        <div>
          <ToolkitProvider
            bootstrap4
            keyField="post_id"
            data={Posts}
            columns={columns}
            search
          >
            {(props) => (
              <div className="row">
                <div class="col">
                </div>
                <div className="col-sm-auto">
                  <h6>Input keyword:</h6>
                </div>
                <div className="col-sm-auto">
                  <SearchBar {...props.searchProps} />
                </div>
                {/* <ClearSearchButton {...props.searchProps} /> */}
                <hr />
                <BootstrapTable
                  defaultSorted={defaultSorted}
                  pagination={pagination}
                  {...props.baseProps}
                  cellEdit={ cellEditFactory({ mode: 'click',
                                 blurToSave: true }) }
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      ) : (
        <div>
          <h3>No post available!</h3>
        </div>
      )}
      <div>
        {/* {
          Posts.length === 0 ? 
          <div>
            <h3>No post available!</h3>
          </div>
          :null
        } */}
        <Tooltip title="Show Posts" arrow>
        <Button
          className="btn btn-primary btn-block"
          onClick={(event) => {
            getPosts(event.target.value);
            // postid=event.target.value;
          }}
        >
          Show Posts
        </Button>
        </Tooltip>
      </div>
      <Modal show={open} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{tit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {desc}
          <p style={{alignContent:"left"}}>{date_}</p>
        </Modal.Body>
        <Modal.Footer>   
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Post_search2;
