import React, { createContext, useState, useEffect } from 'react';
import { obtenerLocalStorage, guardarLocalStorage, limpiarLocalStorage } from '../hooks/localStorage';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [player, setPlayer] = useState(null);
    const [token, setToken] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const { playerData } = obtenerLocalStorage();
        const { token } = obtenerLocalStorage();
        if (playerData && token) {
            setPlayer(playerData)
            setToken(token)
        }
    }, []);

    // Login tradicional
    const login = async (email, password) => {
        const url = 'https://mohaax.cl/api/v1/login';
        const method = 'POST';
        const body = { email, password };

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.code === 200) {
                guardarLocalStorage(data.token, data.player);
                setPlayer(data.player);
                enqueueSnackbar('Sesión iniciada correctamente', { variant: 'success' });
                navigate('/ladder');
            } else if(data.code === 403) {
                enqueueSnackbar(data.message, { variant: 'warning' });
                navigate('/ladder/validar-cuenta');
            }else{
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error al iniciar sesión', { variant: 'error' });
        }
    };

    // Login con Google
    const loginGoogle = async (token) => {
        const url = 'https://mohaax.cl/api/v1/login/google';
        const method = 'POST';
        const decodedToken = jwtDecode(token);
        const body = {
            token,
            name: decodedToken.name,
            email: decodedToken.email,
        };

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.code === 200) {
                guardarLocalStorage(data.token, data.player);
                setPlayer(data.player);
                enqueueSnackbar('Sesión iniciada correctamente con Google', { variant: 'success' });
                navigate('/ladder');
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error al iniciar sesión con Google', { variant: 'error' });
        }
    };

    // Logout
    const logout = () => {
        limpiarLocalStorage();
        setPlayer(null);
        enqueueSnackbar('Sesión cerrada', { variant: 'warning' });
        navigate('/ladder');
    };

    return (
        <LoginContext.Provider value={{ player, token, login, loginGoogle, logout }}>
            {children}
        </LoginContext.Provider>
    );
};
