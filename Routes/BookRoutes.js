import express from "express";
import BookController from "../Controllers/BookControllers.js";

const router = express.Router();

router.post("/", BookController.createBook);
router.get("/", BookController.getAllBooks);

// Rotas específicas precisam vir antes de /:id
router.get("/available/count", BookController.countAvailableBooks);
router.get("/available", BookController.getAvailableBooks);
router.get("/brand/:brand", BookController.getBooksByBrand);
router.get("/category/:categoria", BookController.getBookByCategory);
router.get("/title/:titulo", BookController.getBookBytitle);

router.get("/:id", BookController.getBookById);
router.put("/:id", BookController.updateBook);
router.patch("/:id/availability", BookController.updateAvailability);
router.patch("/:id/deactivate", BookController.deactivateBook);
router.delete("/:id", BookController.deleteBook);

export default router;