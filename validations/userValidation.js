const { check, validationResult } = require("express-validator");

const userValidation = [
	check("role").notEmpty().withMessage("role is required"),
	check("username").notEmpty().withMessage("username is required"),
	check("email").notEmpty().isEmail().withMessage("email is required and should be in proper format"),
	check("password").notEmpty().withMessage("password is required"),
    check("mobileNo").notEmpty().withMessage("mobileNo is required"),

	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, msg: errors[0].msg });
		}
		return next();
	},
];
module.exports = { userValidation}