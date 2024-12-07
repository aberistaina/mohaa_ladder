import { Juego } from "../models/Juego.model.js";

export const crearJuego = async(req, res) =>{
    try {
        const { nombre } = req.body
        
        if(!nombre){
            res.status(400).json({
                code:400,
                message: "Todos los campos son requeridos"
            })
        }else{
            const nuevoJuego = await Juego.create({
                nombre
            })
            res.status(201).json({
                code:201,
                message: "Juego agregado Con éxito",
                data: nuevoJuego
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const obtenerJuegos = async(req, res) =>{
    try {
        const juegos = await Juego.findAll()
        res.status(200).json({
            code:200,
            message: "Juegos obtenidos Con éxito",
            data: juegos
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}