const logger = require('../../logger');

const express = require('express');
const router = express.Router();

// authController
const authController = require('../controller/authController');
const { isAdminLoggedOut, isLoggedOut } = require('../middleware/authMiddleware');

// ===================== USER ROUTES ======================

router.get('/login', isLoggedOut, (req, res, next) => {
  logger.info('GET /login accessed');
  return authController.getUserLogin(req, res, next);
});

router.post('/login', isLoggedOut, (req, res, next) => {
  logger.info(`POST /login attempt from ${req.body.email}`);
  return authController.userLogin(req, res, next);
});

router.get('/register', isLoggedOut, (req, res, next) => {
  logger.info('GET /register accessed');
  return authController.getUserRegister(req, res, next);
});

router.post('/register', isLoggedOut, (req, res, next) => {
  logger.info(`POST /register attempt from ${req.body.email}`);
  return authController.userRegister(req, res, next);
});

// ===================== ADMIN ROUTES ======================

router.get('/admin/login', isAdminLoggedOut, (req, res, next) => {
  logger.info('GET /admin/login accessed');
  return authController.getAdminLogin(req, res, next);
});

router.post('/admin/login', (req, res, next) => {
  logger.info(`POST /admin/login attempt from ${req.body.email}`);
  return authController.adminLogin(req, res, next);
});

router.get('/admin/register', isAdminLoggedOut, (req, res, next) => {
  logger.info('GET /admin/register accessed');
  return authController.getAdminRegister(req, res, next);
});

router.post('/admin/register', (req, res, next) => {
  logger.info(`POST /admin/register attempt from ${req.body.email}`);
  return authController.adminRegister(req, res, next);
});

// ===================== LOGOUT ROUTES ======================

router.get('/logout', (req, res, next) => {
  logger.info('User logged out');
  return authController.logout(req, res, next);
});

router.get('/admin/logout', (req, res, next) => {
  logger.info('Admin logged out');
  return authController.adminLogout(req, res, next);
});

module.exports = router;


