const { userModel, tokenBlacklistModel } = require("../models");
function authVip() {
    return (req,res,next) => {
        if (req.user?.subscription === 'vip') {
            next();
        }
        ;
        const error = new Error('User is not VIP!');
        next(error);
    }
}

module.exports = authVip;