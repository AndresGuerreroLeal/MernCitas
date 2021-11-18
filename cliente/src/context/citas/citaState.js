import React, { useReducer } from "react";
import CitaContext from "./citaContext";
import citaReducer from "./citaReducer";

import {
  OBTENER_CITAS,
  CITA_ERROR,
  AGREGAR_CITA,
  CITA_ACTUAL,
  ELIMINAR_CITA,
} from "../../types";

import clienteAxios from "../../config/axios";

const CitaState = (props) => {
  const stateInitial = {
    citas: [],
    cita: null,
    mensaje: null,
    cargando: true,
    citaActual:null,
  };

  const [state, dispath] = useReducer(citaReducer, stateInitial);

  //Funciones
  //Crear citas
  const crearCitas = async (datos) => {
    try {
      const resultado = await clienteAxios.post("/api/citas", datos);

      dispath({
        type: AGREGAR_CITA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: error.response.data.msg,
        categoria: "alert-error",
      };

      dispath({
        type: CITA_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerCitas = async () => {
    try {
      const resultado = await clienteAxios.get("/api/citas");

      dispath({
        type: OBTENER_CITAS,
        payload: resultado.data.citas,
      });
    } catch (error) {
      console.log(error);

      dispath({
        type: CITA_ERROR,
      });
    }
  };

  const eliminarCita = async (citaId) => {
    try {
      await clienteAxios.delete(`/api/citas/${citaId}`);

      dispath({
        type: ELIMINAR_CITA,
        payload: citaId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenercitaActual = (cita) => {

    dispath({
      type: CITA_ACTUAL,
      payload: cita,
    });
  };

  const actualizarCita = async (cita) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CitaContext.Provider
      value={{
        citas: state.citas,
        cita: state.cita,
        mensaje: state.mensaje,
        cargando: state.cargando,
        citaActual:state.citaActual,
        crearCitas,
        obtenerCitas,
        eliminarCita,
        obtenercitaActual
      }}
    >
      {props.children}
    </CitaContext.Provider>
  );
};

export default CitaState;
