import Book from "../Models/BookModels.js";
import Loan from "../Models/LoanModels.js";

const createBook = async (book) => {
  const { titulo, autor, categoria, ano, quantidadetotal, quantidadedisponivel, ativo } = book;

  if (!titulo || !autor || !categoria || !ano || !quantidadetotal || !quantidadedisponivel || !ativo) {
    const error = new Error("titulo e autor são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const bookExists = await Book.findOne({ titulo: titulo.toUpperCase() });

  if (bookExists) {
    const error = new Error("Já existe um livro cadastrado com esse titulo");
    error.statusCode = 400;
    throw error;
  }

  return Book.create({
    titulo,
    autor,
    categoria,
    ano,
    quantidadetotal,
    quantidadedisponivel,
    ativo
  });
};

const getAllBooks = async () => {
  return Book.find();
};

const getBookById = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const updateBook = async (id, data) => {
  const book = await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const deleteBook = async (id) => {
  const loanCount = await Loan.countDocuments({ BookId: id });

  if (loanCount > 0) {
    const error = new Error("Não é possível deletar um livro que possui empréstimos cadastradas");
    error.statusCode = 400;
    throw error;
  }

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book;
};
const deactivateBook = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (book.isActive === false) {
    const error = new Error("Este livro já está desativado");
    error.statusCode = 400;
    throw error;
  }
  const loanCount = await Loan.countDocuments({ BookId: id });
  if (loanCount > 0) {
    const error = new Error("Não é possível desativar um livro que possui empréstimos cadastrados");
    error.statusCode = 400;
    throw error;
  }


  book.isActive = false;
  await book.save();

  return book;
};


const getBooksByBrand = async (title) => {
  return Book.find({ titulo: { $regex: `^${title}$`, $options: "i" } });
};

const getAvailableBooks = async () => {
  return Book.find({ ativo: true });
};

const updateAvailability = async (id, disponivel) => {
  if (disponivel === undefined) {
    const error = new Error("O campo disponivel é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  const book = await Book.findByIdAndUpdate(
    id,
    { disponivel },
    { new: true, runValidators: true }
  );

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const getBooksByPriceRange = async (min, max) => {
  const minValue = Number(min);
  const maxValue = Number(max);

  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    const error = new Error("Os valores min e max precisam ser números");
    error.statusCode = 400;
    throw error;
  }

  return Book.find({
    preco: { $gte: minValue, $lte: maxValue },
  });
};

const getBookByCategory = async (categoria) => {
  const book = await Book.findOne({ categoria: categoria });

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book
};

const countAvailableBooks = async () => {
  return Book.countDocuments({ disponivel: true });
};

const getBookBytitle = async (titulo) => {
  const book = await Book.findOne({ titulo: titulo });

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }
  return book;
}

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  getBookBytitle,
  deleteBook,
  deactivateBook,
  getBooksByBrand,
  getAvailableBooks,
  updateAvailability,
  getBooksByPriceRange,
  getBookByCategory,
  countAvailableBooks,
};