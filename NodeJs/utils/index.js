const CryptoJS = require('crypto-js');
const SECRET = 'APP_SECRET';
module.exports = {
    encrypt: (obj) => {
        return CryptoJS.AES.encrypt(JSON.stringify(obj), SECRET).toString();
    },
    decrypt: (dataString) => {
        return JSON.parse(CryptoJS.AES.decrypt(dataString, SECRET).toString(CryptoJS.enc.Utf8))
    }
}