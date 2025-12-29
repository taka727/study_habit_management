const prisma = require("../prismaClient");
const { Prisma } = require("@prisma/client");

const getAllHistories = async (req, res) => {
  console.log("start getALLHistories");
  const {from ,to} = req.query;
  const fromDate = from ? new Date(from) : undefined;
  const toDate = to ? new Date(new Date(to).setHours(23, 59, 59, 999)) : undefined;

  try {
    console.log(fromDate);
    console.log(toDate);

    const histories = await prisma.study_histories.findMany({
        where:{
            created_at:{
                gte:fromDate,
                lte:toDate,
            },
            deleateed_at:null
        }
    });
    console.log(histories);
    res.status(200).json({status:'success',data:histories});
  } catch (error){
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end getALLHistories");
  }
};

const createHistory = async (req, res) => {
  console.log("start createHistory");
  try {
  } catch {
  } finally {
    console.log("end createHistory");
  }
};
const getHistory = async (req, res) => {
  console.log("start getHistory");
  try {
  } catch {
  } finally {
    console.log("end getHistory");
  }
};
const updateHistory = async (req, res) => {
  console.log("start updateHistory");
  try {
  } catch {
  } finally {
    console.log("end updateHistory");
  }
};
const deleteHistory = async (req, res) => {
  console.log("start deleteHistory");
  try {
  } catch {
  } finally {
    console.log("end deleteHistory");
  }
};
const startStudyHistory = async (req, res) => {
  console.log("start startStudyHistory");
  try {
  } catch {
  } finally {
    console.log("end startStudyHistory");
  }
};
const endStudyHistory = async (req, res) => {
  console.log("start endStudyHistory");
  try {
  } catch {
  } finally {
    console.log("end endStudyHistory");
  }
};

module.exports = {
  getAllHistories,
  createHistory,
  getHistory,
  updateHistory,
  deleteHistory,
  startStudyHistory,
  endStudyHistory,
};
