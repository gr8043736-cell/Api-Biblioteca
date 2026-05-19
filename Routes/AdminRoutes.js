import express from "express";
import AdminControllers from "../Controllers/AdiminControllers.js";

const router = express.Router();

router.get("/dashbord", AdminControllers.dashbordGeral);
router.get("/users/with-active-loans", AdminControllers.getUsersWithActiveLoans);
router.get("/books/most-borrowed", AdminControllers.getMostBorrowedBooks);
router.get("/fines", AdminControllers.getFines);
export default router;