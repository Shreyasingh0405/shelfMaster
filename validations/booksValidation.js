const { check, validationResult } = require("express-validator");

const bookValidation = [
	check("bookName").notEmpty().withMessage("bookName is required"),
	check("userId").notEmpty().withMessage("userId is required"),
	check("description").notEmpty().withMessage(" description is required"),
	check("summary").notEmpty().withMessage("summary is required"),

	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, msg: errors[0].msg });
		}
		return next();
	},
];
module.exports = { bookValidation}