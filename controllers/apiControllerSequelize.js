// Importing libraries
const { Sequelize, DataTypes } = require('sequelize');

// Creating DB connection
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: process.env.PGUSER,
});

// Define a User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
    // autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact: {
    type: DataTypes.STRING, // use STRING for phone numbers
    allowNull: true
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users', // maps to existing table
  timestamps: false
});

// Fetch all users API
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const users = await User.create({
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      occupation: req.body.occupation
    });
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const userID = req.params.id;
    const users = await User.update(
      {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        occupation: req.body.occupation
      },
      {
        where: {id: userID},
        returning: true
      }
    );
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const userID = req.params.id;
    const users = await User.destroy({where: {id: userID}});
    res.status(200).json({ status: 'success', "message": "deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};
