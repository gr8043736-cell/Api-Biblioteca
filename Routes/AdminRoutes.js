import express from "express";
import AdminControllers from "../Controllers/AdiminControllers.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/dashbord", authMiddleware, adminMiddleware, AdminControllers.dashbordGeral);
router.get("/users/with-active-loans", authMiddleware, adminMiddleware, AdminControllers.getUsersWithActiveLoans);
router.get("/books/most-borrowed", authMiddleware, adminMiddleware, AdminControllers.getMostBorrowedBooks);
router.get("/fines", authMiddleware, adminMiddleware, AdminControllers.getFines);
export default router;