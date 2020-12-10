const { userModel, tokenBlacklistModel } = require("../models");
function authVip() {
    return (req,res,next) => {
        if (req.user?.is_vip) {
            next();
            return;
        }
        ;
        const error = new Error('User is not VIP!');
        next(error);
    }
}

module.exports = authVip;