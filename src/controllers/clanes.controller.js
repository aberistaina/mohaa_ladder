import { Clan } from "../models/Clan.model.js";

export const crearClan = async(req, res) =>{
    try {
        const { nombre, tag, id_etapa } = req.body
        if(!nombre || !tag || !id_etapa){
            res.status(400).json({
                code:400,
                message: "Todos los campos son requeridos"
            })
        }else{
            const nuevoClan = await Clan.create({
                nombre, 
                tag, 
                id_etapa})
                
            res.status(201).json({
                code:201,
                message: "Clan Creado Con éxito",
                data: nuevoClan
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

export const obtenerClanes = async(req, res) =>{
    try {
        const clanes = await Clan.findAll()
        res.status(200).json({
            code:200,
            message: "Clanes obtenidos Con éxito",
            data: clanes
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}