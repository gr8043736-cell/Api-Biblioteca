import express from "express";
import UserController from "../Controllers/UserControllers.js";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);

// Rotas específicas precisam vir antes de /:id
router.get("/count", UserController.countUsers);
router.get("/email/:email", UserController.getUserByEmail);
router.get("/exists/:email", UserController.emailExists);
router.get("/search/:name", UserController.searchUsersByName);

router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.patch("/:id/name", UserController.updateUserName);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id",UserController.deactivateUser);
router.delete("/:id", UserController.deleteAllUsers);

export default router;