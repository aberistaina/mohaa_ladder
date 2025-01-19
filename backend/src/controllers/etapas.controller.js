import { Etapa } from "../models/Etapa.model.js";
import { Juego } from "../models/Juego.model.js";


export const crearEtapa = async(req, res) =>{
    try {
        const { nombre, id_juego } = req.body

        if(!nombre || !id_juego){
            res.status(400).json({
                code:400,
                message: "Todos los campos son requeridos"
            })
        }else{
            const nuevaEtapa = await Etapa.create({
                nombre,
                id_juego
            })
            res.status(201).json({
                code:201,
                message: "Juego agregado Con éxito",
                data: nuevaEtapa
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}


export const obtenerEtapas = async(req, res) =>{
    try {
        const etapas = await Etapa.findAll({
            include: [
                {
                    model: Juego,
                    as: "juego", 
                    attributes: ["nombre"],
                },
            ],
            attributes: ["id", "nombre"],
            raw: true,
            nest: true,     
        });

        const etapasConJuego = etapas.map((etapa) => {
            return {
                ...etapa,
                juego: etapa.juego.nombre,
            };
        });


        res.status(200).json({
            code:200,
            message: "Etapas obtenidas Con éxito",
            data: etapasConJuego
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const obtenerEtapasPorJuego = async(req, res) =>{
    try {
        const { id } = req.params
        const etapas = await Etapa.findAll({
            include: [
                {
                    model: Juego,
                    as: "juego", 
                    attributes: ["nombre"],
                },
            ],
            where: {
                id_juego: id
            },
            attributes: ["id", "nombre"],
            raw: true,
            nest: true,     
        });

        const etapaConJuego = etapas.map((etapa) => {
            return {
                ...etapa,
                juego: etapa.juego.nombre,
            };
        });


        res.status(200).json({
            code:200,
            message: "Etapa obtenida Con éxito",
            data: etapaConJuego
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const obtenerEtapaPorId = async(req, res) =>{
    try {

        const { id } = req.params
        const etapa = await Etapa.findOne({
            where: {
                id
            },
        })
        res.status(200).json({
            code:200,
            message: "Etapa obtenida Con éxito",
            data: etapa
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}