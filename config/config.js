require("dotenv").config();
const CONFIG = {};
CONFIG.DATABASE_URL = process.env.MDATABASE_URL;
CONFIG.ACCESS_KEY = process.env.ACCESS_KEY;
CONFIG.SECRET_KEY = process.env.SECRET_KEY;
CONFIG.BUCKET_NAME = process.env.BUCKET_NAME;
CONFIG.REGION = process.env.REGION;
module.exports = CONFIG;
