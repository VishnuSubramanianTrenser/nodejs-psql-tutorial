// Importing prisma
const { PrismaClient } = require('./../generated/prisma');

// creating a PRISMA client
const prisma = new PrismaClient();

// Fetch all Users API
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const { id, name, address, contact, occupation } = req.body;

    const newUser = await prisma.user.create({
      data: {
        id,
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
