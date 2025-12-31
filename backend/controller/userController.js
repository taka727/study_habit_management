const prisma = require("../prismaClient");

const getUser = async (req, res) => {
  console.log("start getUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end getUser");
  }
};

const updateUser = async (req, res) => {
  console.log("start getUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end getUser");
  }
};

const deleteUser = async (req, res) => {
  console.log("start getUser");
  try {
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end getUser");
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser
};
