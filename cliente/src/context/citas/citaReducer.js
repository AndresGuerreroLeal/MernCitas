import {
  OBTENER_CITAS,
  CITA_ERROR,
  AGREGAR_CITA,
  CITA_ACTUAL,
  ELIMINAR_CITA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case AGREGAR_CITA:
      return {
        ...state,
        citas: [...state.citas, action.payload.cita],
        cargando: false,
      };

    case CITA_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    case OBTENER_CITAS:
      return {
        ...state,
        citas: action.payload,
        cargando: false,
      };
    case ELIMINAR_CITA:
      return {
        ...state,
        citas: state.citas.filter((cita) => cita._id !== action.payload),
      };

    case CITA_ACTUAL:
      return {
        ...state,
        citaActual: action.payload,
      };
    default:
      return state;
  }
};
