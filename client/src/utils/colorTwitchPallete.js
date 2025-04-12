const colores = [
    "bg-purple-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-indigo-600",
    "bg-blue-500",
];  

export const getColorForUsername = (username) => {

    const color = colores[Math.floor(Math.random() * colores.length)];
    return color;
};
