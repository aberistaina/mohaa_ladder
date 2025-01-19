import nodemailer from "nodemailer";
import dotenv from "dotenv"
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, "../.env")});
import { crearTemplateHtml } from "./templatesEmail.js";



const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS, 
    },
});

export const crearMailOptions = (email, asunto, token) =>{


    const mailOptions = {
            from: "tu_correo@gmail.com", // Dirección del remitente
            to: `${email}`, // Dirección del destinatario
            subject: "Recuperación Contraseña Mohaa.cl", // Asunto del correo
            text: "Este es el cuerpo del correo en texto plano", // Cuerpo del correo en texto plano
            html: crearTemplateHtml(asunto, token, email), // Cuerpo del correo en HTML (opcional)
        };

    return mailOptions
}


export const enviarCorreo = (email, asunto, token, ) =>{
    
    const mailOptions = crearMailOptions(email, asunto, token)
    
    // Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error al enviar el correo:", error);
    } else {
        console.log("Correo enviado:", info.response);
    }
});
}

