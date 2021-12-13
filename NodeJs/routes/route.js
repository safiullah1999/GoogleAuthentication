const express = require('express');
const router = express.Router();
const serviceController = require('../services/serviceController');
const middleware = require('../middleware/middleware');
const utils = require('../utils');
var user_id;
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store, {
    freeRetries: 5,            // only allow 5 incorrect requests
    minWait: 5 * 1000,         // min wait time of 5 seconds
    maxWait: 60 * 1000,    // max wait time of 5 minutes

    // use default callback function if all retries are used
    failCallback: function (req, res, next, nextValidRequestDate) {
        console.log('error', "You've made too many failed attempts in a short period of time, please try again "+nextValidRequestDate.toString())
        res.send({ ciphertext: utils.encrypt({'error': "You've made too many failed attempts in a short period of time, please try again "+nextValidRequestDate.toString()}) });
        // res.send(utils.encrypt('error', "You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow()));
    }
});

router.post('/registerGoogle', async (req, res) => {
    let result;
    let error_response;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let registerinfo = utils.decrypt(body.ciphertext)
        console.log("register body:", registerinfo)
        let response = await serviceController.registerSocial(registerinfo);
        console.log("register response:", response.data.status)
        error_response = {error: response.data.error}
        result = { data: response.data.status, code: 200 };
    } catch (err) {
        console.log(err.toString())
        result = { error: "Registeration Unsuccessful", code: 500 };
    }
    res.json({result})
});

router.post('/registerGithub', async (req, res) => {
    let result;
    let error_response;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let registerinfo = utils.decrypt(body.ciphertext)
        console.log("register body:", registerinfo)
        let response = await serviceController.registerSocial(registerinfo);
        console.log("register response:", response.data.status)
        error_response = {error: response.data.error}
        result = { data: response.data.status, code: 200 };
    } catch (err) {
        console.log(err.toString())
        result = { error: "Registeration Unsuccessful", code: 500 };
    }
    res.json({result})
});

router.post('/register', async (req, res) => {
    let result;
    let error_response;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let registerinfo = utils.decrypt(body.ciphertext)
        console.log("register body:", registerinfo)
        let response = await serviceController.register(registerinfo);
        console.log("register response:", response.data.status)
        error_response = {error: response.data.error}
        result = { data: response.data.status, code: 200 };
    } catch (err) {
        console.log(err.toString())
        result = { error: "Registeration Unsuccessful", code: 500 };
    }
    res.json({result})
});


router.post('/login',bruteforce.prevent, async (req, res) => {
    let result;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let logininfo = utils.decrypt(body.ciphertext)
        console.log("login body:", logininfo)
        let response = await serviceController.login(logininfo);
        req.session.user = response.data;
        req.brute && req.brute.reset()
        console.log("login response:", response.data)
        user_id = response.data.user_id
        // console.log("id:", user_id)
        req.session.save();
        result = { success: "User is logged in", code: 200 };
    } catch (error) {
        // console.log(error)
        result = { error: "unauthorized user", code: 500 };
    }
    // console.log(req.body)
    // res.json({ ciphertext: utils.encrypt(result) });
    res.json({result})
});

router.post('/logingoogle',bruteforce.prevent, async (req, res) => {
    let result;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let logininfo = utils.decrypt(body.ciphertext)
        console.log("login body:", logininfo)
        // logininfo = utils.encrypt(body.ciphertext)
        let response = await serviceController.loginGoogle(logininfo);
        req.session.user = response.data;
        req.brute && req.brute.reset()
        console.log("login response:", response.data)
        user_id = response.data.user_id
        // console.log("id:", user_id)
        req.session.save();
        result = { success: "User is logged in", code: 200 };
    } catch (error) {
        // console.log(error)
        result = { error: "unauthorized user", code: 500 };
    }
    // console.log(req.body)
    // res.json({ ciphertext: utils.encrypt(result) });
    res.json({result})
});

router.post('/logingithub',bruteforce.prevent, async (req, res) => {
    let result;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let logininfo = utils.decrypt(body.ciphertext)
        console.log("login body:", logininfo)
        // logininfo = utils.encrypt(body.ciphertext)
        let response = await serviceController.loginGoogle(logininfo);
        req.session.user = response.data;
        req.brute && req.brute.reset()
        console.log("login response:", response.data)
        user_id = response.data.user_id
        // console.log("id:", user_id)
        req.session.save();
        result = { success: "User is logged in", code: 200 };
    } catch (error) {
        // console.log(error)
        result = { error: "unauthorized user", code: 500 };
    }
    // console.log(req.body)
    // res.json({ ciphertext: utils.encrypt(result) });
    res.json({result})
});


router.get('/logout', middleware, async (req, res) => {
    let result;
    try {
        let response = await serviceController.logout(req.session.user.token);
        req.session.destroy();
        res.clearCookie('user_sid');
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: error, code: 500 };
    }
    // res.json({ ciphertext: utils.encrypt(result) });
    console.log(result)
    res.json(result)
});

router.get('/servicecheck', async (req, res) => {
    let result;
    try {
        let response = await serviceController.service_check()
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: "service unavailable", code: 500 };
    }
    // res.json({ ciphertext: utils.encrypt(result) });
    console.log(result)
    res.json(result)
});


router.post('/createPost', middleware, async (req, res) => {
    let result;
    try {
        let body = req.body;
        console.log("body:", body.ciphertext)
        // let logininfo = body
        let postinfo = utils.decrypt(body.ciphertext)
        console.log("post info:",postinfo)
        console.log("token:",req.session.user.token)
        let response = await serviceController.createPost(postinfo, req.session.user.token);
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: error, code: 500 };
    }
    // res.json({ ciphertext: utils.encrypt(result) });
    res.json(result.data)
});
router.get('/getUserPosts', middleware, async (req, res) => {
    let result;
    try {
        console.log("user_id:",req.session.user.user_id)
        let response = await serviceController.getUserPosts(req.session.user.token, req.session.user.user_id);
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: error, code: 500 };
    }
    console.log(result.data)
    res.json({ ciphertext: utils.encrypt(result) });
    // res.json(result.data)
});

router.delete('/deleteUserPost/:post_id', middleware, async (req, res) => {
    let result;
    try {
        console.log("post_id from ui:", req.params.post_id)
        let response = await serviceController.deleteUserPost(req.params.post_id, req.session.user.token);
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: "Invalid post id", code: 500 };
    }
    res.json({ ciphertext: utils.encrypt(result) });
});

router.put('/updateUserPost/:post_id', middleware, async (req, res) => {
    let result;
    try {
        console.log("post_id from ui:", req.params.post_id)
        console.log("body from ui:", req.body)
        let response = await serviceController.updateUserPost(req.params.post_id, req.body,req.session.user.token);
        result = { data: "post is updated", code: 200 };
    } catch (error) {
        result = { error: "Invalid post id", code: 500 };
    }
    res.json({result});
});


router.get('/getThirdPartyData', middleware, async (req, res) => {
    let result;
    try {
        let response = await serviceController.getThirdPartyData(req.session.user.token);
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: "Server error", code: 500 };
    }
    res.json({ ciphertext: utils.encrypt(result) });
});

router.get('/get_status', async (req, res) => {
    let result;
    try {
        // console.log("post_id from ui:", req.params.post_id)
        let response = await serviceController.getServiceStatus();
        console.log(response.data)
        result = { data: response.data, code: 200 };
    } catch (error) {
        result = { error: "Invalid service", code: 500 };
    }
    res.json({result});
});


module.exports = router;