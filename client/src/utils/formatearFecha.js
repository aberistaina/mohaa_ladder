export const formatDate = (fecha) => {
    if (!fecha) {
        return {
            fechaFormateada: "Fecha no disponible",
            horaFormateada: "Hora no disponible",
        };
    }

    const [datePart, hora] = fecha.split("T");
    
    const [year, month, day] = datePart.split("-");

    const fechaFormateada = `${day}/${month}/${year}`;
    const horaFormateada = hora.slice(0, 5)
    
    return {
        fechaFormateada,
        horaFormateada,
    };
};
