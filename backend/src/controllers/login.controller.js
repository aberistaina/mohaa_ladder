import crypto from 'crypto'
import bcrypt from "bcrypt"
import { Player } from "../models/Player.model.js"



export const login = (req, res) =>{
    try {

        res.status(200).json({
            code:200,
            message: "Login exitoso ",
            player: req.player,
            token: req.token
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Hubo un problema en el proceso de autenticación"
        })
    }
}


export const loginGoogle = async(req, res) =>{
    try {
        const { name, email, token } = req.body

        const player = await Player.findOne({
            attributes: ["id", "username", "email", "admin"],
            where: { email }
        })

        if(!player){
            const password = crypto.randomBytes(16).toString('hex')

            const hash = bcrypt.hashSync(password, 10)

            const nuevoUsario = await Player.create({
                username: name,
                email, 
                password: hash,
                activado: true
            })
            
            res.status(201).json({
                code:201,
                message: "Usuario Creado Con éxito",
                data: nuevoUsario
            })  
        }else{
            res.status(200).json({
                code:200,
                message: "Login exitoso",
                player: player,
                token: token
            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            code: 500,
            message: "Hubo un problema en el proceso de autenticación"
        })
    }
}