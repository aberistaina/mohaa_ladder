export const guardarLocalStorage = (token, playerData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("player", JSON.stringify(playerData))
}

export const limpiarLocalStorage = () => {
    localStorage.clear()
}

export const obtenerLocalStorage = () => { 
    try {
        const token = localStorage.getItem("token")
        const playerData = JSON.parse(localStorage.getItem("player"))
        return {token, playerData}
    } catch (error) {
        return { playerData: null, token: null }
    }
    
}