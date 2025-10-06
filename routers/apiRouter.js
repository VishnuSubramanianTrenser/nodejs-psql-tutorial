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

// 1. PG
router.get('/users-pg', apiControllerPG.getAllUsers);
router.post('/create-users-pg', apiControllerPG.createUser);
router.patch('/update-users-pg', apiControllerPG.updateUser);
router.delete('/delete-users-pg/:id', apiControllerPG.deleteUser);

// 2. Sequelize
router.get('/users-sequelize', apiControllerSequelize.getAllUsers);
router.post('/create-users-sequelize', apiControllerSequelize.createUsers);
router.patch('/update-users-sequelize/:id', apiControllerSequelize.updateUsers);
router.delete('/delete-users-sequelize/:id', apiControllerSequelize.deleteUsers);

// 3. Prisma
router.get('/users-prisma', apiControllerPrisma.getAllUsers);
router.post('/create-users-prisma', apiControllerPrisma.createUsers);
router.patch('/update-users-prisma/:id', apiControllerPrisma.updateUsers);
router.delete('/delete-users-prisma/:id', apiControllerPrisma.deleteUsers);

// 4. TypeORM
router.get('/users-type-orm', apiControllerTypeORM.getAllUsers);

module.exports = router;
