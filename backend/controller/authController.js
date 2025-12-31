const prisma = require("../prismaClient");

const registerUser = async (req, res) => {
  console.log("start registerUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end registerUser");
  }
};

const loginUser = async (req, res) => {
  console.log("start loginUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end loginUser");
  }
};

const getSecurityQuestion = async (req, res) => {
  console.log("start getSecurityQuestion");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end getSecurityQuestion");
  }
};

const logoutUser = async (req, res) => {
  console.log("start logoutUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end logoutUser");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSecurityQuestion,
  logoutUser
};