
export const fetchHook = async(url, method, ) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
