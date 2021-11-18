import React, { useReducer } from "react";
import AlertaContext from "./alertaContext";
import alertaReducer from "./alertaReducer";

import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  const stateInitial = {
    alerta: null,
  };

  const [state, dispath] = useReducer(alertaReducer, stateInitial);

  //Funciones
  const crearAlerta = (msg, categoria) => {
    dispath({
      type: MOSTRAR_ALERTA,
      payload: { msg, categoria },
    });

    setTimeout(() => {
      dispath({
        type: OCULTAR_ALERTA,
      });
    },1000);
  };

  return (
    <AlertaContext.Provider
      value={{
        alerta: state.alerta,
        crearAlerta,
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  );
};

export default AlertaState;
