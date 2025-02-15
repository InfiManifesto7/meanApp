const joi = require('joi');

const signupvalidation = (req, res, next) => {
    const schema = joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(7).max(21).required(),
        role: joi.string().valid("user", "admin").required() // Add role validation
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details.map(detail => detail.message)
        });
    }

    next();
};

const loginvalidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(7).max(21).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details.map(detail => detail.message),
        });
    }

    next();
};

module.exports = {
    signupvalidation,
    loginvalidation
};
