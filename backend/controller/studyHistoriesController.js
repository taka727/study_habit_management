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
  const {task_id, description,occurreed_on,started_at,ended_at} = req.body;
  try {
    const newHistory = await prisma.study_histories.create({
        data:{
            task_id,
            description,
            occurreed_on,
            started_at,
            ended_at
        }
    });
    res.status(201).json({status:'success',data:newHistory});
  } catch (error) {
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end createHistory");
  }
};
const getHistory = async (req, res) => {
  console.log("start getHistory");
  const { id } = req.params;

  try {
    const history = await prisma.study_histories.findUnique({
        where:{
            id:parseInt(id)
        }
    });
    res.status(200).json({status:'success',data:history});
  } catch (error) {
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end getHistory");
  }
};
const updateHistory = async (req, res) => {
  console.log("start updateHistory");
  const { id } = req.params;
  const {task_id, description,occurreed_on,started_at,ended_at} = req.body;

  try {
    const updatedHistory = await prisma.study_histories.update({
        where:{
            id:parseInt(id) 
        },
        data:{
            task_id,
            description,
            occurreed_on,
            started_at,
            ended_at
        }
    });
    res.status(200).json({status:'success',data:updatedHistory});
  } catch (error) {
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end updateHistory");
  }
};
const deleteHistory = async (req, res) => {
  const { id } = req.params;
  console.log("start deleteHistory");
  try {
    const deletedHistory = await prisma.study_histories.delete({  
        where:{
            id:parseInt(id)
        }
    });
    res.status(200).json({status:'success',data:deletedHistory});
  } catch (error) {
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end deleteHistory");
  }
};
const startStudyHistory = async (req, res) => {
  console.log("start startStudyHistory");
  const { task_id, description, occurreed_on } = req.body;
  try {
    const newHistory = await prisma.study_histories.create({
        data:{
            task_id,
            description,
            occurreed_on,
            started_at: new Date(),
            ended_at: null
        }
    });
    res.status(201).json({status:'success',data:newHistory});
  } catch (error) {
    res.status(500).json({status:'error',message:error.message});
  } finally {
    console.log("end startStudyHistory");
  }
};
const endStudyHistory = async (req, res) => {
  console.log("start endStudyHistory");
  const { id } = req.params;
  try {
    const endedHistory = await prisma.study_histories.update({
        where:{
            id:parseInt(id)
        },
        data:{
            ended_at: new Date()
        }
    });
    res.status(200).json({status:'success',data:endedHistory});
  } catch (error) {
    res.status(500).json({status:'error',message:error.message});
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
