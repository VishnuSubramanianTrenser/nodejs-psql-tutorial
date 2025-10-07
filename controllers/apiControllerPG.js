// Calling DB connection pool using PG
const dbConnectionPool = require('./../db');

// Home API for testing
exports.home = async (req, res) => {
  res.status(200).json({
        "message": "WELCOME TO NODE-PSQL APIs!",
        "success": true
    });
};

// Get all users API
exports.getAllUsers = async (req, res) => {
    const users = await dbConnectionPool.query('SELECT * FROM users');
    res.status(200).json({
        "status": "success",
        "data": users
    });
};

// Get user by ID API
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await dbConnectionPool.query(`SELECT * FROM users WHERE id = ${userId}`);
    res.status(200).json({
        "status": "success",
        "data": user
    });
};

// Create user API
exports.createUser = async (req, res) => {
    const query = `
        INSERT INTO users (name, address, contact, occupation)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [
        req.body.name,
        req.body.address,
        req.body.contact,
        req.body.occupation
    ];
    const newUser = await dbConnectionPool.query(query, values);
    res.status(200).json({
        "status":  "success",
        "data": newUser
    });
};

// Update user API
exports.updateUser = async (req, res) => {
    const query = `
        UPDATE users SET address=$1 
        WHERE id=$2;
    `;
    const values = [
        req.body.address,
        req.body.id,
    ];
    const updateUser = await dbConnectionPool.query(query, values);
    res.status(200).json({
        "status":  "success",
        "data": updateUser
    });
};

// Delete user API
exports.deleteUser = async (req, res) => {
    const query = `
        DELETE FROM users WHERE id=$1;
    `;
    const values = [
        req.params.id
    ];
    const deleteUser = await dbConnectionPool.query(query, values);
    res.status(200).json({
        "status":  "success",
        "message": "deleted"
    });
};
