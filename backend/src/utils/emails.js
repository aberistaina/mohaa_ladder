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

export const crearMailOptions = (email, asunto, token, username) =>{

    let asuntoCorreo
    if(asunto === "validar"){
        asuntoCorreo = "Bienvenido a la Comunidad Mohaax Chile"
    }else if(asunto === "nuevaValidacion"){
        asuntoCorreo = "Enlace de validación Comunidad Mohaax Chile"
    }else if(asunto === "recuperarPassword"){
        asuntoCorreo = "Enlace de recuperación de contraseña Comunidad Mohaax Chile"
    }else{
        asuntoCorreo = "Contraseña de Comunidad Mohaax Chile Modificada exitosamente"
    }


    const mailOptions = {
            from: "Comunidad Mohaax Chile", // Dirección del remitente
            to: `${email}`, // Dirección del destinatario
            subject: asuntoCorreo, // Asunto del correo
            text: "", 
            html: crearTemplateHtml(email, asunto, token, username ), // Cuerpo del correo en HTML (opcional)
        };

    return mailOptions
}


export const enviarCorreo = (email, asunto, token , username ) =>{
    
    const mailOptions = crearMailOptions(email, asunto, token, username)
    
    // Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error al enviar el correo:", error);
    } else {
        console.log("Correo enviado:", info.response);
    }
});
}

