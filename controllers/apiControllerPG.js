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
