import Book from "../Models/BookModels.js";
import User from "../Models/UserModels.js";
import Loan from "../Models/LoanModels.js";

const createLoan = async (data) => {
  const { userId, bookId, dataEmprestimo, dataPrevistaDevolucao, dataDevolucao, status, formaPagamento } = data;

  if (!userId || !bookId ) {
    const error = new Error("userid, bookid , e data prevista de devolucao  são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  const book = await Book.findById(bookId);

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!book.ativo) {
    const error = new Error("Este livro não está disponível para Empréstimo");
    error.statusCode = 400;
    throw error;
  }
  let multa = 10;

  const loan = await Loan.create({
    userId,
    bookId,
    dataPrevistaDevolucao,
    //valorEmpréstimo: valorEmpréstimo ?? livro.preco,
    formaPagamento,
    dataEmprestimo: dataEmprestimo ?? Date.now(),
    status,
    multa
  });

  book.disponivel = false;
  await book.save();

  return Loan.findById(loan._id).populate("userId").populate("bookId");
};

const getAllLoans = async () => {
  return Loan.find().populate("userId").populate("bookId");
};

const getLoanById = async (id) => {
  const loan = await Loan.findById(id).populate("userId").populate("bookId");

  if (!loan) {
    const error = new Error("Empréstimo não encontrado");
    error.statusCode = 404;
    throw error;
  }

//  console.log(loan)

  return loan;
};

const updateLoan = async (id, data) => {
  const loan = await Loan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("userId")
    .populate("bookId");

  if (!loan) {
    const error = new Error("Venda não encontrada");
    error.statusCode = 404;
    throw error;
  }
}

const getLoanByUser = async (userId) => {
  return Loan.find({ userId: userId }).populate("userId").populate("bookId");
};

const getLoanByBook = async (bookId) => {
  return Loan.find({ bookId }).populate("userId").populate("bookId");
};

const updateLoanStatus = async (id, status) => {
  if (!status) {
    const error = new Error("O campo status é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  const loan = await Loan.findById(id);

  if (!loan) {
    const error = new Error("Empréstimo não encontrado");
    error.statusCode = 404;
    throw error;
  }

  loan.status = status;
  await loan.save();

  if (status === "cancelada") {
    await Book.findByIdAndUpdate(loan.bookId, { disponivel: true });
  }

  return Loan.findById(id).populate("userId").populate("bookId");
};

const getLoansByValueRange = async (min, max) => {
  const minValue = Number(min);
  const maxValue = Number(max);

  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    const error = new Error("Os valores min e max precisam ser números");
    error.statusCode = 400;
    throw error;
  }

  return Loan.find({
    valorEmpréstimo: { $gte: minValue, $lte: maxValue },
  })
    .populate("userId")
    .populate("bookId");
};

const getLoansByDate = async (date) => {
  if (/^\d{4}$/.test(date)) {
    const year = Number(date);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return Loan.find({
      dataEmprestimo: { $gte: startDate, $lt: endDate },
    })
      .populate("userId")
      .populate("bookId");
  }

  const startDate = new Date(date);

  if (Number.isNaN(startDate.getTime())) {
    const error = new Error("Data inválida. Use o formato 2026 ou 2026-04-15");
    error.statusCode = 400;
    throw error;
  }

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  return Loan.find({
    dataEmprestimo: { $gte: startDate, $lt: endDate },
  })
    .populate("userId")
    .populate("bookId");
};

const getLoanActive = async () => {
  const loans = await Loan.find({ status: true })

  if (!loans) {
    const error = new Error("Nenhum empréstimo ativo encontrado.")
    error.statusCode = 404;
    throw error;
  }

  return loans;
};

const countLoans = async () => {
  return Loan.countDocuments();
};
const getLoanOverdue = async () => {
  const loans = await Loan.find({ status: true })
  if (!loans) {
    const error = new Error("Empréstimos não encontrado.")
    error.statusCode = 404;
    throw error;
  }

  let allLoansOverdue = [];
  for (let i = 0; i < loans.length; i++) {
    if (loans[i].dataPrevistaDevolucao < Date.now) {
      allLoansOverdue[i] = loans[i]
    }
  }
  return loans;
}
const simulateFine = async (id) => {
  const loan = await Loan.findById(id)
  //console.log(loan)
  if(!loan) {
    const error = new Error("Empréstimo não encontrado.")
    error.statusCode = 404;
    throw error;
  }

  let verificadorMulta
  if(loan.dataPrevistaDevolucao > Date.now()) {
    verificadorMulta = 0;
  } else {
    let quatosDias = Date.now() - loan.dataPrevistaDevolucao
    verificadorMulta = quatosDias * 21
  }

  return {
    message: "Sua multa será de " + verificadorMulta
  }
}


export default {
  simulateFine,
  getLoanActive,
  createLoan,
  getLoanOverdue,
  getAllLoans,
  getLoanById,
  updateLoan,
  getLoanByUser,
  getLoanByBook,
  updateLoanStatus,
  getLoansByValueRange,
  getLoansByDate,
  countLoans,
};