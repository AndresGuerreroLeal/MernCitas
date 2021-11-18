import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        mensaje: null,
        autenticado: true,
        cargando: false,
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        mensaje: null,
        autenticado: true,
        cargando: false,
        usuario: action.payload,
      };

    case LOGIN_ERROR:
    case REGISTRO_ERROR:
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        autenticado: null,
        cargando: null,
        token: null,
        mensaje: action.payload || null,
      };

    default:
      return state;
  }
};
