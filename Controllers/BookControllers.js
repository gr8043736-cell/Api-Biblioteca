import BookService from "../Services/BookServices.js";

const createBook = async (req, res, next) => {
  try {
    const book = await BookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => { 
  try {
    const books = await BookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await BookService.updateBook(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await BookService.deleteBook(req.params.id);
    res.json({ message: "Livro deletado com sucesso", book });
  } catch (error) {
    next(error);
  }
};

const deactivateBook = async (req, res, next) => {
  try {
    const book = await BookService.deactivateBook(req.params.id);
    res.json({ message: "Livro desativado com sucesso", book });
  } catch (error) {
    next(error);
  }
};

const getAvailableBooks = async (req, res, next) => {
  try {
    const books = await BookService.getAvailableBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const updateAvailability = async (req, res, next) => {
  try {
    const book = await BookService.updateAvailability(req.params.id, req.body.disponivel);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const getBookByCategory = async (req, res, next) => {
  try {
    const book = await BookService.getBookByCategory(req.params.categoria);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const getBookBytitle = async (req, res, next) => {
  try {
    const book = await BookService.getBookBytitle(req.params.titulo);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const countAvailableBooks = async (req, res, next) => {
  try {
    const totalDisponiveis = await BookService.countAvailableBooks();
    res.json({ totalDisponiveis });
  } catch (error) {
    next(error);
  }
};

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  deactivateBook,
  getAvailableBooks,
  updateAvailability,
  getBookByCategory,
  getBookBytitle,
  countAvailableBooks,
};