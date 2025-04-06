export const crearTemplateHtml = (email, asunto, token, username) => {
    let template;

    if (asunto === "validar") {
        template = `
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
                            .boton {
                                display: flex;
                                justify-content: center;
                                align-items: center;  /* Esto asegura la alineación vertical */
                                width: 100%;  /* Asegura que el contenedor ocupe el 100% del espacio disponible */
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
                                <h1>Bienvenido a Mohaax.cl</h1>
                            </div>
                            <div class="content">
                                <p>¡Hola! <strong>${username}</strong></p>
                                <p>Gracias por registrarte en <strong>Mohaax.cl</strong>. Para completar tu registro y activar tu cuenta, por favor haz clic en el siguiente botón:</p>
                                <div class="boton">
                                    <a href="http://localhost:5173/ladder/validar-cuenta/?email=${email}&token=${token}" class="button">Validar Cuenta</a>
                                </div>
                                <div class="bienvenida" style="text-align: center;">
                                    <img src="https://mohaax.cl/assets/public/bienvenida.png" alt="Bienvenida" style="max-width: 600px; width: 100%; height: auto;">
                                </div>

                                
                                <p>Si no te registraste en Mohaax.cl, por favor ignora este correo.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 Mohaax.cl | Todos los derechos reservados</p>
                                <p>Si tienes alguna pregunta, puedes contactarnos a <a href="mailto:comunidad.mohaacl@gmail.com
                                ">comunidad.mohaacl@gmail.com
                                </a>.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `;
    } else if (asunto === "nuevaValidacion") {
        template = `
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
                            .boton {
                                display: flex;
                                justify-content: center;
                                align-items: center;  /* Esto asegura la alineación vertical */
                                width: 100%;  /* Asegura que el contenedor ocupe el 100% del espacio disponible */
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
                                <h1>Validación Mohaax.cl</h1>
                            </div>
                            <div class="content">
                                <p>¡Hola! <strong>${username}</strong></p>
                                <p></strong>. Para activar tu cuenta, por favor haz clic en el siguiente botón:</p>
                                <div class="boton">
                                    <a href="http://localhost:5173/ladder/validar-cuenta/?email=${email}&token=${token}" class="button">Validar Cuenta</a>
                                </div>
                                <p>Si no te registraste en Mohaax.cl, por favor ignora este correo.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 Mohaax.cl | Todos los derechos reservados</p>
                                <p>Si tienes alguna pregunta, puedes contactarnos a <a href="mailto:comunidad.mohaacl@gmail.com
                                ">comunidad.mohaacl@gmail.com
                                </a>.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `;
    } else if (asunto == "recuperarPassword") {
        template = `
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
                            .boton {
                                display: flex;
                                justify-content: center;
                                align-items: center;  /* Esto asegura la alineación vertical */
                                width: 100%;  /* Asegura que el contenedor ocupe el 100% del espacio disponible */
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
                                <h1>Recupera tu contraseña de Mohaax.cl</h1>
                            </div>
                            <div class="content">
                                <p>¡Hola! <strong>${username}</strong></p>
                                <p>Para recuperar tu contraseña por favor haz clic en el siguiente botón:</p>
                                <div class="boton">
                                    <a href="http://localhost:5173/ladder/modificar-password/${email}?token=${token}" class="button">Cambiar Contraseña</a>
                                </div>
                                <p>Si no pediste un cambio de contraseña en Mohaax.cl, por favor ignora este correo.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 Mohaax.cl | Todos los derechos reservados</p>
                                <p>Si tienes alguna pregunta, puedes contactarnos a <a href="mailto:comunidad.mohaacl@gmail.com
                                ">comunidad.mohaacl@gmail.com
                                </a>.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `;
    } else if (asunto == "passwordModificada") {
        template = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f7fc;
                                margin: 0;
                                padding: 0;
                                -webkit-font-smoothing: antialiased;
                            }
                            .email-container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 8px;
                                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 25px;
                                background-color: #4A90E2;
                                padding: 15px;
                                border-radius: 8px;
                                color: white;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                                font-weight: 700;
                            }
                            .content {
                                font-size: 16px;
                                color: #333333;
                                margin-bottom: 20px;
                            }
                            .button-container {
                                display: flex;
                                justify-content: center;
                                margin: 20px 0;
                            }
                            .button {
                                display: inline-block;
                                background-color: #4A90E2;
                                color: #ffffff;
                                font-size: 16px;
                                font-weight: bold;
                                padding: 12px 25px;
                                text-decoration: none;
                                border-radius: 25px;
                                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                                transition: all 0.3s ease;
                            }
                            .button:hover {
                                background-color: #357ABD;
                                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
                            }
                            .footer {
                                text-align: center;
                                font-size: 12px;
                                color: #888888;
                                margin-top: 30px;
                            }
                            .footer a {
                                color: #4A90E2;
                                text-decoration: none;
                                transition: color 0.3s ease;
                            }
                            .footer a:hover {
                                color: #357ABD;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <h1>Cambio de Contraseña Exitoso</h1>
                            </div>
                            <div class="content">
                                <p>¡Hola! <strong>${username}</strong></p>
                                <p>Tu contraseña ha sido modificada correctamente en Mohaax.cl. Si no realizaste este cambio, por favor contáctanos inmediatamente.</p>
                            </div>
                            <div class="button-container">
                                <a href="http://localhost:5173/ladder" class="button">Volver a Iniciar Sesión</a>
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 Mohaax.cl | Todos los derechos reservados</p>
                                <p>Si tienes alguna pregunta, puedes contactarnos a <a href="mailto:comunidad.mohaacl@gmail.com">comunidad.mohaacl@gmail.com</a>.</p>
                            </div>
                        </div>
                    </body>
                </html>

            `;
    }

    return template;
};
