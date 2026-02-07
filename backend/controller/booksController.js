const prisma = require("../prismaClient");
const { Prisma } = require("@prisma/client");
const logger = require('../utils/logger');

const getAllBooks = async (req, res) => {
  try {
    logger.info("start");
    const book = await prisma.book_managements.findMany({
      select: {
        id: true,
        title: true,
        desicription: true,
      },
    });
    logger.info(book);
    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  if(!Number.isInteger(id)){
    return res.status(400).json({
      message:'Invalid id format'
    })
  }
  try {
    const book = await prisma.book_managements.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        desicription: true,
      },
    });
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "指定されたIDの書籍は見つかりませんでした。",
      });
    }
    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const createBook = async (req, res) => {
  const { title , desicription} = req.body;
  try {
    if(title === undefined || title === null){
      return res.status(400).json({
        message:'タイトルが不足しています'
      })
    }
    logger.info("title：" + title);
    logger.info("desicription：" + desicription);
    
    const book = await prisma.book_managements.create({
      data: {
        title: title,
        desicription: desicription,
      },
    });
    logger.info(book);
    res.status(201).json({ status: "success", book });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, desicription } = req.body;
  try {
    logger.info("title：" + title);
    logger.info("desicription：" + desicription);
    const book = await prisma.book_managements.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        desicription: desicription,
      },
    });
    logger.info(book);
    res.status(200).json({ status: "success", book });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "p2025"
    ) {
      res.status(404).json({
        status: "error",
        message: "record not found",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "サーバーエラー：" + error.message,
      });
    }
    throw error;
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    logger.info("id:" + id);
    const book = await prisma.book_managements.update({
      where: { id: parseInt(id) },
      data: {
        deleateed_at: new Date(),
      },
    });
    logger.info(book);
    res.status(204).json({status:"success",book});
  }catch(error){
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "p2025"
    ) {
      res.status(404).json({
        status: "error",
        message: "record not found",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "サーバーエラー：" + error.message,
      });
    }
    throw error;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
