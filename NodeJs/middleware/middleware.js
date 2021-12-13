const utils = require('../utils');
const authUser = (req, res, next) => {
    if (req.session.user && req.session.user.token) {
        next();
    }
    else {
        req.session.destroy();
        res.clearCookie('user_sid');
        return res.json({ ciphertext: utils.encrypt({ error: "user not login", code: 500 }) });
    }
}

module.exports = authUser