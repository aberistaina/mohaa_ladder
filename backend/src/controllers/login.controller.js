
export const login = (req, res) =>{
    try {

        res.status(200).json({
            code:200,
            message: "Login exitoso",
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