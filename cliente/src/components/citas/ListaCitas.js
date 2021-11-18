import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import AlertaContext from "../../context/alertas/alertaContext";
import CitaContext from "../../context/citas/citaContext";
import Error from "../Error/Error";

import Cita from "./Cita";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -9px;
  flex-direction: column;
  margin: 10px 0px;
`;

const Mensaje = styled.div`
  display: flex;
  justify-content: center;
  width:100%;
`

const ListaCitas = () => {
  const { mensaje, obtenerCitas, citas,cargando } = useContext(CitaContext);
  const { alerta, crearAlerta } = useContext(AlertaContext);

  useEffect(() => {
    if (mensaje) {
      crearAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerCitas();
  }, [mensaje]);

  if (citas.length === 0 && !cargando)
    return (
      <Mensaje>
        <p>No hay citas agendadas</p>
      </Mensaje>
    );

  return (
    <Container>
      {alerta ? <Error alerta={alerta}/> : null}

      {citas.map((cita) => (
        <Cita key={cita._id} cita={cita} />
      ))}
    </Container>
  );
};

export default ListaCitas;
