const prisma = require("../prismaClient");
const { Prisma } = require("@prisma/client");

const getAllGoals = async (req, res) => {
  try {
    console.log("start");
    const Goal = await prisma.Goal_managements.findMany({
      select: {
        id: true,
        title: true,
        desicription: true,
      },
    });
    console.log(Goal);
    res.status(200).json({ status: "success", data: Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const getGoalById = async (req, res) => {
  const { id } = req.params;

  try {
    const Goal = await prisma.Goal_managements.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        desicription: true,
      },
    });
    res.status(200).json({ status: "success", data: Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const createGoal = async (req, res) => {
  const { title, desicription } = req.body;
  try {
    console.log("title：" + title);
    console.log("desicription：" + desicription);
    const Goal = await prisma.Goal_managements.create({
      data: {
        title: title,
        desicription: desicription,
      },
    });
    console.log(Goal);
    res.status(201).json({status:"success",Goal});
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, desicription } = req.body;
  try {
    console.log("title：" + title);
    console.log("desicription：" + desicription);
    const Goal = await prisma.Goal_managements.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        desicription: desicription,
        updated_at: new Date(),
      },
    });
    console.log(Goal);
    res.status(201).json({status:"success",Goal});
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try{
    console.log("id:"+ id);
    const Goal = await prisma.Goal_managements.update({
      where:{id : parseInt(id)},
      data:{
        updated_at:new Date(),
        deleateed_at:new Date(),
      }
    });
    console.log(Goal);
    res.status(201).json({status:"success",Goal});
  }catch(error){
    res
      .status(500)
      .json({
      status: "error",
      message:"サーバーエラー："+ error.message
      });
  }
};

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};
