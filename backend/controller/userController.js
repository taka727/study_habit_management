const prisma = require("../prismaClient");
const logger = require('./utils/logger');

const getUser = async (req, res) => {
  logger.info("start getUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end getUser");
  }
};

const updateUser = async (req, res) => {
  logger.info("start getUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end getUser");
  }
};

const deleteUser = async (req, res) => {
  logger.info("start getUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    logger.info("end getUser");
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser
};
