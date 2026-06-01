import UserService from "../Services/UserServices.js";

const createUser = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserService.deleteUser(req.user._id);
    res.json({ message: "Usuário deletado com sucesso", user });
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await UserService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const countUsers = async (req, res, next) => {
  try {
    const total = await UserService.countUsers();
    res.json({ total });
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const user = await UserService.updateUserName(req.user._id, req.body.nome);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const emailExists = async (req, res, next) => {
  try {
    const exists = await UserService.emailExists(req.params.email);
    res.json({ exists });
  } catch (error) {
    next(error);
  }
};

const searchUsersByName = async (req, res, next) => {
  try {
    const users = await UserService.searchUsersByName(req.params.name);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const deactivateUser = async (req, res, next) => {
  try {
    const result = await UserService.deactivateUser(req.user._id);
    
    res.json({ 
      message: "O usuário foi desativado com sucesso", 
      result 
    });
  } catch (error) {
    next(error);
  }
};
const deleteAllUsers = async (req, res, next) => {
  try {
    const result = await UserService.deleteUser();
    res.json({ message: "Usuários deletados com sucesso", result });
  } catch (error) {
    next(error);
  }
};
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Usuário logado encontrado",
      data: req.user,
    })
  } catch (error) {
    next(error);
  }
}
const updateMe = async (req, res, next) => {
  try {
    const user = await UserService.updateMe(req.user._id, req.body)

    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      data: user,
    })
  } catch (error){
      next(error)
  }
}
export default {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserByEmail,
  countUsers,
  updateUserName,
  emailExists,
  searchUsersByName,
  deleteAllUsers,
  deactivateUser,
  getMe,
  updateMe
};