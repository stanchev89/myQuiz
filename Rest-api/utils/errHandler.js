function errorHandler(err, req, res, next) {
	if (Array.isArray(err)) {
		err = err[0];
	}
	if (err.status === 333) {
		res.status(333).json({ message: "ErrorHandler: not allowed!" });
	} else if (err.msg) {
		res.status(400).json({ message: `${err.msg}` });
	} else {
		console.error(err.stack);
		// console.log(err)
		res.status(500).json({ message: "ErrorHandler: Something went wrong!" });
	}
}

module.exports = errorHandler;
