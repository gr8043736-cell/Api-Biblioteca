import User from "../Models/UserModels.js"
import Book from "../Models/BookModels.js"
import Loan from "../Models/LoanModels.js"


const dashbordGeral = async () => {
    const allUsers = await User.countDocuments()
    if (!allUsers) {
        const error = new Error("no user found.");
        error.statusCode = 404;
        throw error;
    }
    const allUsersActive = await User.countDocuments({ ativo: true })
    if (!allUsersActive) {
        const error = new Error("No active user was found.")
        error.statusCode = 404;
        throw error;
    }
    const allBooks = await Book.countDocuments()
    if (!allBooks) {
        const error = new Error("No book was found.")
        error.statusCode = 404;
        throw error;
    }
    const allBooksActive = await Book.countDocuments({ ativo: true })
    if (!allBooksActive) {
        const error = new Error("No active book was found.")
        error.statusCode = 404;
        throw error;
    }

    const allBooksAvailable = await Book.find()
    let totalBooksAvailable = 0;
    for (let i = 0; i < allBooksAvailable.length; i++) {
        totalBooksAvailable = totalBooksAvailable + Number(allBooksAvailable[i].quantidadedisponivel)
    }
    if (!allBooksAvailable) {
        const error = new Error("No available book was found.")
        error.statusCode = 404;
        throw error;
    }



    const allLoans = await Loan.countDocuments()
    if (!allLoans) {
        const error = new Error("no Loan found.");
        error.statusCode = 404;
        throw error;
    }
    const allLoansActive = await Loan.countDocuments({ status: true })
    if (!allLoansActive) {
        const error = new Error("No active loan was found.")
        error.statusCode = 404;
        throw error;
    }
    const allLoansLate = await Loan.countDocuments({ status: true, multa: { "$gt": 0 } })
    if (!allLoansLate) {
        const error = new Error("no Late loan was found.")
        error.statusCode = 404;
        throw error;
    }
    const allFineGenerated = await Loan.find()
    let verificadorMulta = []
    let oi = 0
    for (let i = 0; i < allFineGenerated.length; i++) {
        if (allFineGenerated[i].multa !== 0) {
            if (allFineGenerated[i].multa) {
                verificadorMulta[oi] = allFineGenerated[i].multa
                console.log(oi)
                oi++
            }
        }
    }
    if (!allFineGenerated) {
        const error = new Error("No fine was generated.")
        error.statusCode = 404;
        throw error;
    }


    return {
        allUsers,
        allUsersActive,
        allBooks,
        allBooksActive,
        allBooksAvailable: +totalBooksAvailable,
        allLoans,
        allLoansActive,
        allLoansLate,
        allFineGenerated: verificadorMulta.length

    }
}
const getUsersWithActiveLoans = async () => {
    const loans = await Loan.find({ status: true })
    //    .populate("userId")
    //    .populate("bookId")
        .sort({ createdAt: -1 });

    const usersMap = new Map();

    loans.forEach((loan) => {
        if (!loan.userId) return;

        const userId = loan.userId._id.toString();

        if (!usersMap.has(userId)) {
            usersMap.set(userId, {
                user: loan.userId,
                activeLoans: [],
            });
        }

        usersMap.get(userId).activeLoans.push(loan);
    });

    return Array.from(usersMap.values());
};
const getMostBorrowedBooks = async () => {
  const result = await Loan.aggregate([
    {
      $group: {
        _id: "$bookId",
        totalEmprestimos: { $sum: 1 },
      },
    },
    {
      $sort: { totalEmprestimos: -1 },
    },
  ]);

  const books = await Promise.all(
    result.map(async (item) => {
      const book = await Book.findById(item._id);

      return {
        book,
        totalEmprestimos: item.totalEmprestimos,
      };
    })
  );

  return books.filter((item) => item.book);
};
const getFines = async () => {
  return Loan.find({ multa: { $gt: 0 } })
    .populate("userId")
    .populate("bookId")
    .sort({ dataDevolucao: -1 });
};


export default {
    dashbordGeral,
    getUsersWithActiveLoans,
    getMostBorrowedBooks,
    getFines

};