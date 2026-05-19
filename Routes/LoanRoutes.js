import express from "express";
import LoanController from "../Controllers/LoanControllers.js";

const router = express.Router();

router.post("/", LoanController.createLoan);
router.get("/", LoanController.getAllLoans);

// Rotas específicas precisam vir antes de /:id
router.get("/available/count", LoanController.countLoans);
router.get("/available", LoanController.getAllLoans);
router.get("/active", LoanController.getLoanActive)
router.get("/overdue", LoanController.getLoanOverdue);
router.get("/date/:date", LoanController.getLoansByDate);
router.get("/Value/:min/:max", LoanController.getLoansByValueRange);
router.get("/title/:title", LoanController.getLoansByBook);
router.get("/user/:userId",LoanController.getLoanByUser)
router.get("/:id", LoanController.getLoanById);
router.put("/:id", LoanController.updateLoan);
router.patch("/:id/availability", LoanController.updateLoan);
router.get("/:id/fine/simulate",LoanController.simulateFine);

export default router;