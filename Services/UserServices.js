import User from "../Models/UserModels.js";
import Loan from "../Models/LoanModels.js";

const createUser = async (data) => {
  const { nome, email, telefone } = data;

  if (!nome || !email || !telefone) {
    const error = new Error("Nome, email e telefone são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Já existe um usuário com esse email");
    error.statusCode = 400;
    throw error;
  }

  return User.create({ nome, email, telefone });



};
const getAllUsers = async () => {
  return User.find();
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const deleteUser = async (id) => {
  const loansCount = await Loan.countDocuments({ userId: id });

  if (loansCount > 0) {
    const error = new Error("Não é possível deletar um usuário que possui empréstimos cadastradas");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const countUsers = async () => {
  return User.countDocuments();
};

const updateUserName = async (id, nome) => {
  if (!nome) {
    const error = new Error("O campo nome é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { nome },
    { new: true, runValidators: true }
  );

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const emailExists = async (email) => {
  const user = await User.findOne({ email });
  return Boolean(user);
};

const searchUsersByName = async (name) => {
  return User.find({
    nome: { $regex: name, $options: "i" },
  });
};

const deleteAllUsers = async () => {
  const loansCount = await Loan.countDocuments();

  if (loansCount > 0) {
    const error = new Error("Não é possível deletar todos os usuários enquanto existirem Empréstimos cadastrados");
    error.statusCode = 400;
    throw error;
  }

  return User.deleteMany();
};

const deactivateUser = async (id) => {
//  const loansCount = await Loan.countDocuments();
//  if (loansCount > 0) {
//    const error = new Error("Não é possível desativar todos os usuários enquanto existirem Empréstimos cadastrados");
//    error.statusCode = 400;
//    throw error;
//  }
//
//  return User.updateMany(
//    { active:  false } , 
//    { $set: { active: false, deactivatedAt: new Date() } } 
//  );

  const user = await User.findById(id)

  if (!user) {
    const error = new Error("usuario não encontrado")
    error.statusCode = 404
    throw error 
  }

  if(user.ativo === false){
  const erro = new Error("usuario já esta desativado")
  erro.statusCode = 400
  throw erro
  }

  user.ativo = false
  return user;
};
export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  countUsers,
  updateUserName,
  emailExists,
  searchUsersByName,
  deleteAllUsers,
  deactivateUser,
};