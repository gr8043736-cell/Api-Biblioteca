import express from "express";
import BookController from "../Controllers/BookControllers.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, BookController.createBook);
router.get("/" ,BookController.getAllBooks);

// Rotas específicas precisam vir antes de /:id
router.get("/available/count", authMiddleware, BookController.countAvailableBooks);
router.get("/available", authMiddleware, BookController.getAvailableBooks);
router.get("/category/:categoria", authMiddleware, BookController.getBookByCategory);
router.get("/title/:titulo", authMiddleware, BookController.getBookBytitle);

router.get("/:id", authMiddleware, adminMiddleware, BookController.getBookById);
router.put("/:id", authMiddleware, adminMiddleware, BookController.updateBook);
router.patch("/:id/availability", authMiddleware, adminMiddleware, BookController.updateAvailability);
router.patch("/:id/deactivate", authMiddleware, adminMiddleware,  BookController.deactivateBook);
router.delete("/:id", authMiddleware, adminMiddleware, BookController.deleteBook);

export default router;