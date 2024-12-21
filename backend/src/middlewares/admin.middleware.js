export const verificarAdmin = (req, res, next) => {
    if(req.player){
        let player = req.player
        if(player.admin){
            next()
        }else{
            res.status(403).json({code:401, message: "no tiene permisos para acceder a esta página"})
        }

    }else{
        res.status(403).json({code:401, message: "no se encontrol informacion respecto al usuario"})
    }
}