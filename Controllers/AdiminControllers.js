import AdminServices from "../Services/AdminServices.js";

 const dashbordGeral = async (req, res, next) => {
   try {
     const information = await AdminServices.dashbordGeral(req.body);
     res.status(201).json(information);
   } catch (error) {
     next(error);
   }
 };
 const getUsersWithActiveLoans = async (req, res, next) => {
  try {
    const users = await AdminServices.getUsersWithActiveLoans();

    res.status(200).json({
      message: "Usuários com empréstimos ativos encontrados com sucesso",
      total: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
const getMostBorrowedBooks = async (req, res, next) => {
  try {
    const books = await AdminServices.getMostBorrowedBooks();

    res.status(200).json({
      message: "Livros mais emprestados encontrados com sucesso",
      total: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};
const getFines = async (req, res, next) => {
  try {
    const fines = await AdminServices.getFines();

    res.status(200).json({
      message: "Multas encontradas com sucesso",
      total: fines.length,
      data: fines,
    });
  } catch (error) {
    next(error);
  }
};



 export default {
  dashbordGeral,
  getUsersWithActiveLoans,
  getMostBorrowedBooks,
  getFines
};

