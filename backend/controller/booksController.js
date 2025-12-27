const prisma = require("../prismaClient");
const { Prisma } = require("@prisma/client");

const getAllBooks = async (req, res) => {
  try {
    console.log("start");
    const book = await prisma.book_managements.findMany({
      select: {
        id: true,
        title: true,
        desicription: true,
      },
    });
    console.log(book);
    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book_managements.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        desicription: true,
      },
    });
    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const createBook = async (req, res) => {
  const { title, desicription } = req.body;
  try {
    console.log("title：" + title);
    console.log("desicription：" + desicription);
    const book = await prisma.book_managements.create({
      data: {
        title: title,
        desicription: desicription,
      },
    });
    console.log(book);
    res.status(201).json({status:"success",book});
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
    console.log("title：" + title);
    console.log("desicription：" + desicription);
    const book = await prisma.book_managements.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        desicription: desicription,
        updated_at: new Date(),
      },
    });
    console.log(book);
    res.status(201).json({status:"success",book});
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try{
    console.log("id:"+ id);
    const book = await prisma.book_managements.update({
      where:{id : parseInt(id)},
      data:{
        updated_at:new Date(),
        deleateed_at:new Date(),
      }
    });
    console.log(book);
    res.status(201).json({status:"success",book});
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
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
