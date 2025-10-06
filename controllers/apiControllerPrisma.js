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
