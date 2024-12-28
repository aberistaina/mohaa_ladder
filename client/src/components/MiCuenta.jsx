import React from "react";

export const MiCuenta = () => {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Información del Jugador */}
                <div className="flex mb-8">
                    <div className="w-1/3 pr-6">
                        {/* Imagen del Jugador */}
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Jugador"
                            className="rounded-full w-full object-cover"
                        />
                    </div>
                    <div className="w-2/3">
                        <h2 className="text-2xl font-semibold mb-4">
                            Información del Jugador
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <strong>ID:</strong> 12345
                            </p>
                            <p>
                                <strong>Username:</strong> player_username
                            </p>
                            <p>
                                <strong>Fecha de Ingreso:</strong> 2024-01-01
                            </p>
                            <p>
                                <strong>ID Voluntad:</strong> 67890
                            </p>
                            <p>
                                <strong>Email:</strong> player@example.com
                            </p>
                            <p>
                                <strong>Victorias:</strong> 20
                            </p>
                            <p>
                                <strong>Derrotas:</strong> 5
                            </p>
                        </div>
                    </div>
                </div>

                {/* Información del Equipo */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Información del Equipo
                    </h2>
                    <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200 text-left">
                                <tr>
                                    <th className="px-4 py-2">
                                        Nombre del Clan
                                    </th>
                                    <th className="px-4 py-2">Etapa</th>
                                    <th className="px-4 py-2">Rango</th>
                                    <th className="px-4 py-2">
                                        Fecha de Ingreso
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-2">Clan Alpha</td>
                                    <td className="px-4 py-2">Etapa 1</td>
                                    <td className="px-4 py-2">Rango A</td>
                                    <td className="px-4 py-2">2023-06-15</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2">Clan Beta</td>
                                    <td className="px-4 py-2">Etapa 2</td>
                                    <td className="px-4 py-2">Rango B</td>
                                    <td className="px-4 py-2">2023-09-20</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Clan Gamma</td>
                                    <td className="px-4 py-2">Etapa 3</td>
                                    <td className="px-4 py-2">Rango C</td>
                                    <td className="px-4 py-2">2024-01-01</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
