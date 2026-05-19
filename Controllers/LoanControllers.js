import LoanServices from "../Services/LoanServices.js";
import LoanService from "../Services/LoanServices.js";

const createLoan = async (req, res, next) => {
  //const { userId, bookId, dataPrevistaDevolucao } = req.body;

  //console.log(req.body);

  try {
    const result = await LoanService.createLoan(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
    //res.status(400).json({ error: error.message });
  }
}

const getAllLoans = async (req, res, next) => {
  try {
    const loans = await LoanService.getAllLoans();
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const getLoanById = async (req, res, next) => {
  try {
    const loan = await LoanService.getLoanById(req.params.id);

    // Verifica se o serviço retornou algo
    if (!loan) {
      return res.status(404).json({ message: "Empréstimo não encontrado no banco de dados." });
    }

    res.json(loan);
  } catch (error) {
    // Se o erro for "Empréstimo não encontrado", você pode tratar o status aqui
    if (error.message === "Empréstimo não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

const updateLoan = async (req, res, next) => {
  try {
    const loan = await LoanService.updateLoan(req.params.id, req.body);
    res.json(loan);
  } catch (error) {
    next(error);
  }
};

const getLoanByUser = async (req, res, next) => {
  try {
    const loans = await LoanService.getLoanByUser(req.params.userId);
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const getLoansByBook = async (req, res, next) => {
  try {
    const loans = await LoanService.getLoansByBook(req.params.bookId);
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const updateLoanStatus = async (req, res, next) => {
  try {
    const loan = await LoanService.updateLoanStatus(req.params.id, req.body.status);
    res.json(loan);
  } catch (error) {
    next(error);
  }
};

const getLoansByValueRange = async (req, res, next) => {
  try {
    const loans = await LoanService.getLoansByValueRange(req.params.min, req.params.max);
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const getLoansByDate = async (req, res, next) => {
  try {
    const loans = await LoanService.getLoansByDate(req.params.date);
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const countLoans = async (req, res, next) => {
  try {
    const total = await LoanService.countLoans();
    res.json({ total });
  } catch (error) {
    next(error);
  }
};
const getLoanActive = async (req, res, next) => {
  try {
    const loans = await LoanService.getLoanActive()
    res.json(loans)
  } catch (error) {
    next(error)
  }
}
const getLoanOverdue = async (req, res, next) => {

  try {
    const loans = await LoanService.getLoanOverdue()
    res.json(loans)
  } catch (error) {
    next(error)
  }
}
const simulateFine = async (req, res, next) => {
  try {
    const loans = await LoanService.simulateFine(req.params.id)
    res.json(loans)
  } catch (error) {
    next(error)
  }
}
export default {
  simulateFine,
  getLoanOverdue,
  createLoan,
  getLoanActive,
  getAllLoans,
  getLoanById,
  updateLoan,
  getLoanByUser,
  getLoansByBook,
  updateLoanStatus,
  getLoansByValueRange,
  getLoansByDate,
  countLoans,
};