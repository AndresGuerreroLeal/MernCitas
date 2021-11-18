import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import AuthContext from "../../context/auth/authContext";
import CitaContext from "../../context/citas/citaContext";

import { Link } from "react-router-dom";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  background: #e6e6e6;
  min-width: 300px;
  height: auto;
  margin-bottom: 10px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    width: 600px;
  }
`;

const ContainerText = styled.div`
  width: 100%;
  padding: 10px 10px 8px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 10px 60px 8px;
  }
`;

const TextCard = styled.p`
  font-size: 12px;
  font-weight: 400;
  width: 50%;
  text-align: right;
`;
const TextBold = styled.span`
  font-weight: bold;
`;

const ContainerOptions = styled.div`
  display: flex;
  width: 100%;
  padding: 6px;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

const BotonOptions = styled.button`
  width: 80%;
  height: 45px;
  padding: 15px;
  margin: 5px;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 10px;
  background: #cbab4b;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: #ffc20c;
  }

  &[name="eliminar"] {
    background: #c34848;

    &:hover {
      background: #eb1717;
    }
  }
`;

const Cita = ({ cita }) => {
  const { usuario } = useContext(AuthContext);
  const { eliminarCita, obtenercitaActual } = useContext(CitaContext);

  let fechaCrea = moment(cita.fechaActual).format("YYYY-DD-MM");
  let fechaCita = moment(cita.fechaCita).format("YYYY-DD-MM");

  return (
    <Card>
      <ContainerText>
        <TextBold>Nombre de paciente: </TextBold>
        <TextCard>{cita.paciente}</TextCard>
      </ContainerText>
      <ContainerText>
        <TextBold>Sintomas de paciente:</TextBold>
        <TextCard>{cita.sintomas}</TextCard>
      </ContainerText>
      <ContainerText>
        <TextBold>Personal a cargo: </TextBold>
        <TextCard>{cita.personal}</TextCard>
      </ContainerText>
      <ContainerText>
        <TextBold>Cita agendada por: </TextBold>
        <TextCard>{usuario.usuario.nombre}</TextCard>
      </ContainerText>
      <ContainerText>
        <TextBold>Fecha de cita:</TextBold>
        <TextCard>{fechaCita}</TextCard>
      </ContainerText>
      <ContainerText>
        <TextBold>Fecha de creación:</TextBold>
        <TextCard>{fechaCrea}</TextCard>
      </ContainerText>
      <ContainerOptions>
        <Link to="/citas/crear-cita">
          <BotonOptions onClick={() => obtenercitaActual(cita)}>
            Editar
          </BotonOptions>
        </Link>

        <BotonOptions name="eliminar" onClick={() => eliminarCita(cita._id)}>
          Eliminar
        </BotonOptions>
      </ContainerOptions>
    </Card>
  );
};

export default Cita;
