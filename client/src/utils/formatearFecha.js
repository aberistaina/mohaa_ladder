export const formatDate = (fecha) => {
    if (!fecha) return 'Fecha no disponible'
    
    const [datePart] = fecha.split("T");
    const [year, month, day] = datePart.split("-");
    
    return `${day}/${month}/${year}`;
};
