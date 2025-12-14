const prisma = require("../prismaClient");
const { Prisma } = require("@prisma/client");

const getAllBooks = async (req, res) => {
  try {
    console.log("start");
    const book = await prisma.book_managements.findMany({
        select:{
            id:true,
            title:true,
            desicription:true
        }
    });
    console.log(book);
    res.status(200).json({status:'success',book});
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "サーバーエラー:" + error.message });
  }
};

const getBookById = async (req, res) => {}; 
const createBook = async (req, res) => {};
const updateBook = async (req, res) => {};
const deleteBook = async (req, res) => {};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
