import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js"

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: "Token não enviado" })
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.status(401).json({ error: "Token mal formatado" })
        }

        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.status(401).json({ error: "Formato do token invalido" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" })
        }

        if (!user.ativo) {
            return res.status(403).json({ error: "Usuário não encontrado" })
        }

        req.user = user;

        next();
    } catch (error){
        return res.status(401).json({error: "Token inválido ou expirado"})
    }
}

export default authMiddleware;