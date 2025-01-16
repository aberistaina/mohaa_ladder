import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const crearNuevoToken = (data, expiracion) => {
    const secret = process.env.SECRET;
    try {
        const token = jwt.sign(
            {
                data,
            },
            secret,
            { expiresIn: expiracion }
        );
        return token;
    } catch (error) {
        console.log(error.message);
    }
};
