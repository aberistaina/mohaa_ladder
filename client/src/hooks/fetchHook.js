
export const fetchHook = async(url, method, body ) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null

        })
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json()
        if (!data) {
            throw new Error("Respuesta JSON vacía o inválida");
        }

        return data
    } catch (error) {
        console.log(error)
    }
}
