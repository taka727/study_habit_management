const prisma = require("../prismaClient");
const { Prisma } = require("@prisma/client");

const getAllGoals = async (req, res) => {
  try {
    console.log("start");
    const Goal = await prisma.goals.findMany({
      where: {
        deleateed_at: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        goal_deadline: true,
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
    const Goal = await prisma.goals.findUnique({
      where: {
        id: parseInt(id),
        deleateed_at: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        goal_deadline: true,
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
  const { name, description, goal_deadline } = req.body;
  try {
    console.log("name：" + name);
    console.log("description：" + description);
    console.log("deadline：" + goal_deadline);
    const Goal = await prisma.goals.create({
      data: {
        name: name,
        description: description,
        goal_deadline: goal_deadline,
      },
    });
    console.log(Goal);
    res.status(201).json({ status: "success", Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, description, goal_deadline } = req.body;
  try {
    console.log("name：" + name);
    console.log("description：" + description);
    console.log("deadline：" + goal_deadline);
    const Goal = await prisma.goals.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        description: description,
        goal_deadline: goal_deadline,
      },
    });
    console.log(Goal);
    res.status(201).json({ status: "success", Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id:" + id);
    const Goal = await prisma.goals.update({
      where: { id: parseInt(id) },
      data: {
        deleateed_at: new Date(),
      },
    });
    console.log(Goal);
    res.status(204).json({ status: "success", Goal });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "サーバーエラー：" + error.message,
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
