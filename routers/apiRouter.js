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

// 1. Using PG Library
router.get('/users-pg', apiControllerPG.getAllUsers);
router.get('/get-users-pg/:id', apiControllerPG.getUser);
router.post('/create-users-pg', apiControllerPG.createUser);
router.patch('/update-users-pg', apiControllerPG.updateUser);
router.delete('/delete-users-pg/:id', apiControllerPG.deleteUser);

// 2. Using Sequelize ORM
router.get('/users-sequelize', apiControllerSequelize.getAllUsers);
router.get('/get-users-sequelize/:id', apiControllerSequelize.getUser);
router.post('/create-users-sequelize', apiControllerSequelize.createUsers);
router.patch('/update-users-sequelize/:id', apiControllerSequelize.updateUsers);
router.delete('/delete-users-sequelize/:id', apiControllerSequelize.deleteUsers);

// 3. Using Prisma ORM
router.get('/users-prisma', apiControllerPrisma.getAllUsers);
router.get('/get-users-prisma/:id', apiControllerPrisma.getUser);
router.post('/create-users-prisma', apiControllerPrisma.createUsers);
router.patch('/update-users-prisma/:id', apiControllerPrisma.updateUsers);
router.delete('/delete-users-prisma/:id', apiControllerPrisma.deleteUsers);

// 4. Using TypeORM ORM
router.get('/users-type-orm', apiControllerTypeORM.getAllUsers);
router.get('/get-users-type-orm/:id', apiControllerTypeORM.getUser);
router.post('/create-users-type-orm', apiControllerTypeORM.createUsers);
router.patch('/update-users-type-orm/:id', apiControllerTypeORM.updateUsers);
router.delete('/delete-users-type-orm/:id', apiControllerTypeORM.deleteUsers);

module.exports = router;
