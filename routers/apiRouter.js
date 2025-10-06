// Importing modules
const express = require('express');
const apiControllerPG = require('./../controllers/apiControllerPG');
const apiControllerSequelize = require('./../controllers/apiControllerSequelize');
const apiControllerPrisma = require('./../controllers/apiControllerPrisma');
const apiControllerTypeORM = require('./../controllers/apiControllerTypeORM');

// Defining router
const router = express.Router();

// Routes with different ORM'S
router.get('/home', apiControllerPG.home);
router.get('/users-pg', apiControllerPG.getAllUsers);
router.get('/users-sequelize', apiControllerSequelize.getAllUsers);
router.get('/users-prisma', apiControllerPrisma.getAllUsers);
router.get('/users-type-orm', apiControllerTypeORM.getAllUsers);

module.exports = router;
