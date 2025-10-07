// Importing prisma
const { PrismaClient } = require('./../generated/prisma');

// creating a PRISMA client
const prisma = new PrismaClient();
console.log('✅ Database connected via PRISMA ORM')

// Get all Users API
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Get user by ID API
exports.getUser = async (req, res) => {
  try {
    const userID = req.params.id * 1;
    const user = await prisma.user.findUnique({
      where: {id: userID},
    });
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Create user API
exports.createUsers = async (req, res) => {
  try {
    const { name, address, contact, occupation } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        address,
        contact,
        occupation
      }
    });
    res.status(200).json({ status: 'success', data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Update user API
exports.updateUsers = async (req, res) => {
  try {

    const userID = req.params.id * 1;

    const { name, address, contact, occupation } = req.body;

    const updateUser = await prisma.user.update({
      where: {id: userID},
      data: {
        name,
        address,
        contact,
        occupation
      }
    });
    res.status(200).json({ status: 'success', data: updateUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Delete user API
exports.deleteUsers = async (req, res) => {
  try {

    const userID = req.params.id * 1;

    const deleteUser = await prisma.user.delete({
      where: {id: userID}
    });
    res.status(200).json({ status: 'success', "message": "deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};
