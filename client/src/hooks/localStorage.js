export const guardarLocalStorage = (token, playerData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("token", JSON.stringify(playerData))
}

export const limpiarLocalStorage = () => {
    localStorage.clear()
}

export const obtenerLocalStorage = () => { 
    const token = localStorage.getItem("token")
    const playerData = JSON.parse(localStorage.getItem("playerData"))
    return {token, playerData}
}