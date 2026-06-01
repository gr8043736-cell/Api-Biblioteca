import express from "express";
import UserController from "../Controllers/UserControllers.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/me", authMiddleware, UserController.getMe)
router.put("/me", authMiddleware, UserController.updateMe)
router.get("/", authMiddleware, adminMiddleware, UserController.getAllUsers)
router.get("/count", authMiddleware, adminMiddleware, UserController.countUsers);
router.get("/email/:email", authMiddleware, adminMiddleware, UserController.getUserByEmail);
router.get("/exists/:email", authMiddleware, adminMiddleware, UserController.emailExists);
router.get("/search/:name", authMiddleware, adminMiddleware, UserController.searchUsersByName);

router.get("/:id", authMiddleware, adminMiddleware, UserController.getUserById);
router.patch("/me/name", authMiddleware , UserController.updateUserName);
router.delete("/me/delete", authMiddleware, UserController.deleteUser);
router.patch("/me/deactive", authMiddleware, UserController.deactivateUser);


export default router;