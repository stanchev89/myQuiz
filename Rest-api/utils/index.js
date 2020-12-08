const jwt = require('./jwt');
const auth = require('./auth')
const authVip = require('./authVip')

const errorHandler = require('./errHandler');


module.exports = {
    jwt,
    auth,
    authVip,
    errorHandler
}