const getJwtToken = require("../helpers/getToken");
const { serialize } = require('cookie'); // Import the 'cookie' package

const cookieToken = (user, res) => {
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    user.password = undefined;

    // Use the 'serialize' function from the 'cookie' package to set the cookie
    res.setHeader('Set-Cookie', serialize('token', token, options));

    res.json({
        success: true,
        token,
    });
};

module.exports = cookieToken;