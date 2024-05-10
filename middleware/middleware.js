var jwt = require('jsonwebtoken');

module.exports = {
    isAuth: function(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
			return res.jsend.fail({"statusCode": 400, "result": "JWT token not provided!"});
		}
		let decodedToken;
		try {
			decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		}
		catch(err) {
			return res.jsend.fail({"result": err});
		}
		next();
    }
};