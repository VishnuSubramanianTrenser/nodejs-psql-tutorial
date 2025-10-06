// Calling DB connection pool using PG
const dbConnectionPool = require('./../db');

// APIs
exports.home = async (req, res) => {
  res.status(200).json({
        "message": "WELCOME TO NODE-PSQL APIs!",
        "success": true
    });
};

exports.getAllUsers = async (req, res) => {
    const users = await dbConnectionPool.query('SELECT * FROM users');
    res.status(200).json({
        "status": "success",
        "data": users
    });
};
