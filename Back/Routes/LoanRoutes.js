import express from "express";
import LoanController from "../Controllers/LoanControllers.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, LoanController.createLoan);
router.get("/", authMiddleware, adminMiddleware, LoanController.getAllLoans);

// Rotas específicas precisam vir antes de /:id
router.get("/available/count", authMiddleware, adminMiddleware, LoanController.countLoans);
//router.get("/available", LoanController.getAllLoans);
router.get("/active", authMiddleware, adminMiddleware, LoanController.getLoanActive)
router.get("/overdue", authMiddleware, adminMiddleware, LoanController.getLoanOverdue);
router.get("/date/:date", authMiddleware, adminMiddleware, LoanController.getLoansByDate);
router.get("/Value/:min/:max", authMiddleware, adminMiddleware, LoanController.getLoansByValueRange);
router.get("/title/:title", authMiddleware, adminMiddleware, LoanController.getLoansByBook);
router.get("/user/:userId", authMiddleware, adminMiddleware, LoanController.getLoanByUser)
router.get("/:id", authMiddleware, adminMiddleware, LoanController.getLoanById);
router.put("/:id", authMiddleware, adminMiddleware, LoanController.updateLoan);
//router.patch("/:id/availability", authMiddleware, adminMiddleware, LoanController.updateLoan);
router.get("/:id/fine/simulate", authMiddleware,  LoanController.simulateFine);

export default router;