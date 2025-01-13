export const crearTemplateHtml = (asunto, token, email) =>{
    const template = 
        `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f7f7f7;
                                margin: 0;
                                padding: 0;
                            }
                            .email-container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .header h1 {
                                color: #4A90E2;
                            }
                            .content {
                                font-size: 16px;
                                color: #333333;
                                line-height: 1.5;
                                margin-bottom: 20px;
                            }
                            .button {
                                display: inline-block;
                                background-color: #4A90E2;
                                color: #ffffff;
                                font-size: 16px;
                                font-weight: bold;
                                padding: 12px 20px;
                                text-decoration: none;
                                border-radius: 5px;
                                margin: 20px 0;
                            }
                            .footer {
                                text-align: center;
                                font-size: 12px;
                                color: #888888;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <h1>Bienvenido a Mohaa.cl</h1>
                            </div>
                            <div class="content">
                                <p>¡Hola!</p>
                                <p>Gracias por registrarte en <strong>Mohaa.cl</strong>. Para completar tu registro y activar tu cuenta, por favor haz clic en el siguiente botón:</p>
                                <a href="http://localhost:3000/api/v1/players/validar/${email}?token=${token}" class="button">Validar Cuenta</a>
                                <p>tu token es : ${token}</p>
                                <p>Si no te registraste en Mohaa.cl, por favor ignora este correo.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 Mohaa.cl | Todos los derechos reservados</p>
                                <p>Si tienes alguna pregunta, puedes contactarnos a <a href="mailto:support@mohaa.cl">support@mohaa.cl</a>.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `
        return template
}