
exports = {};
const jwt = require("jsonwebtoken");

exports.getToken = async(email, user) => {
    const token = jwt.sign({_id : user._id},"AB12");
    return token;
};

module.exports = exports;

