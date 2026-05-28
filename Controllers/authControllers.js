import authService from "../Services/authServices.js"

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            message: "Usuario registrado com sucesso",
            data: user,
        })
    } catch (error) {
        next(error)

    }
}
const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            message: "Login realizado com sucesso",
            data: result,
        })
    } catch (error) {
        next(error);
    }
}



export default {
    register,
    login
};