import { app } from "./src/main.js";
import { sequelize } from "./src/database/database.js"
import logger from './src/utils/logger.js'


//MODELS
import "./src/models/Asociaciones.js"

const PORT = 3000;

const main = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Conexión a la base de datos establecida correctamente.');
        console.log('Conexión a la base de datos establecida correctamente.');
        await sequelize.sync({ force: false, alter: false });
        logger.info('Modelos sincronizados correctamente.');

        const server = app.listen(PORT, () => {
            console.log(`🚀Servidor escuchando en el puerto: ${PORT}🚀`);
            logger.info(`Servidor escuchando en el puerto: ${PORT}`);;
        })
        
    } catch (error) {
        console.log("Ha ocurrido un error", error);
        logger.error("Ha ocurrido un error", error);
    }
};

main();

