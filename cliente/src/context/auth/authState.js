import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";

//Defaults
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const AuthState = ({ children }) => {
  const stateInitial = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispath] = useReducer(authReducer, stateInitial);

  //Funciones
  //Crear usuario
  const registrarUsuario = async (datos) => {
    try {
      const resultado = await clienteAxios.post("/api/usuarios", datos);

      dispath({
        type: REGISTRO_EXITOSO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispath({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    try {
      const resultado = await clienteAxios.get("/api/auth");

      dispath({
        type: OBTENER_USUARIO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);

      dispath({
        type: LOGIN_ERROR,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      const resultado = await clienteAxios.post("/api/auth", datos);

      dispath({
        type: LOGIN_EXITOSO,
        payload: resultado.data,
      });

      usuarioAutenticado();
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispath({
        type: LOGIN_ERROR,
        payload: alerta,
      });

      setTimeout(() => {
        dispath({
          type: LOGIN_ERROR,
        });
      }, 1000);
    }
  };

  const cerrarSesion = () => {
    dispath({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        usuario: state.usuario,
        autenticado: state.autenticado,
        cargando: state.cargando,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
