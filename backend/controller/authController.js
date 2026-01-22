const prisma = require("../prismaClient");
const logger = require('./utils/logger');

const registerUser = async (req, res) => {
  logger.info("start registerUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end registerUser");
  }
};

const loginUser = async (req, res) => {
  logger.info("start loginUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end loginUser");
  }
};

const getSecurityQuestion = async (req, res) => {
  logger.info("start getSecurityQuestion");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end getSecurityQuestion");
  }
};

const logoutUser = async (req, res) => {
  logger.info("start logoutUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end logoutUser");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSecurityQuestion,
  logoutUser
};