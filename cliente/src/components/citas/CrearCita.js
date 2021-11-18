import React, { Fragment, useContext, useState, useEffect } from "react";

import styled from "styled-components";
import Barra from "../layout/Barra";

import useSelect from "../../hooks/useSelect";
import CitaContext from "../../context/citas/citaContext";
import AlertaContext from "../../context/alertas/alertaContext";
import Error from "../Error/Error";

import moment from "moment";

const Form = styled.form`
  width: 100%;
  min-height: 80vh;
  display: block;
  background-color: #f7f7f7;
  padding: 30px 15px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormTitle = styled.span`
  width: 100%;
  display: block;
  font-size: 30px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  font-weight: 500;
  padding-bottom: 30px;

  @media (min-width: 768px) {
    padding-bottom: 20px;
  }
`;

const WrapInput = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  padding: 0px 10px 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  outline: none;
  border-radius: 10px;
  width: 100%;
  display: block;
  background: transparent;
  font-size: 14px;
  color: #555555;
  line-height: 1.2;
  padding: 0 26px;
  border: 1px solid #6b6b6b;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border: 1px solid #6675df;
  }
`;

const ContainerBoton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Boton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: #4a5c94;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #6a89eb;
  }
`;

const CrearCita = () => {
  const fechaActual = Date.now();

  let hoy = moment(fechaActual).format("YYYY-MM-DD");

  const personalE = [
    {
      personal: "Andres Guerrero",
      especialidad: "Dermatologo",
      id: 1,
    },
    {
      personal: "Andres Guerrero",
      especialidad: "General",
      id: 2,
    },
    {
      personal: "Andres Guerrero",
      especialidad: "Traumatologo",
      id: 3,
    },
  ];

  const { mensaje, crearCitas, citaActual } = useContext(CitaContext);
  const { alerta, crearAlerta } = useContext(AlertaContext);

  const [datos, guardarDatos] = useState({
    paciente: "",
    sintomas: "",
    personal: "",
    fechaCita: "",
  });

  useEffect(() => {
    if (mensaje) {
      crearAlerta(mensaje.msg, mensaje.categoria);
    }

    if (citaActual) {
      guardarDatos(citaActual);
      console.log("esta");
    }
  }, [mensaje]);

  const { paciente, sintomas, personal, fechaCita } = datos;
  

  const obtenerDatos = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //Hooks
  const [state, Select] = useSelect(personal, personalE, obtenerDatos);

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (paciente.trim() === "" || sintomas.trim() === "" || fechaCita === "") {
      crearAlerta("Todos lo campos son obligatorios de aqui", "alerta-error");
      return;
    }

    if (personal === "") {
      crearAlerta("Todos lo campos son obligatorios personal", "alerta-error");
      return;
    }

    console.log(datos);

    //Enviar
    crearCitas(datos);

    crearAlerta("Se creo exitosamente la cita", "alerta-ok");

    //Reset
    guardarDatos({
      paciente: "",
      sintomas: "",
      personal: "",
      fechaCita: "",
    });
  };

  return (
    <Fragment>
      <Barra />
      {alerta ? <Error alerta={alerta} /> : null}
      <Form onSubmit={onSubmit}>
        <FormTitle>Crear Cita</FormTitle>
        <WrapInput>
          <Label htmlFor="paciente">Nombre de paciente</Label>
          <InputContainer>
            <Input
              type="text"
              onChange={obtenerDatos}
              name="paciente"
              value={paciente}
              placeholder="Nombre de Paciente"
              id="paciente"
            />
          </InputContainer>
        </WrapInput>

        <WrapInput>
          <Label htmlFor="sintomas">Sintomas</Label>
          <InputContainer>
            <Input
              type="text"
              onChange={obtenerDatos}
              name="sintomas"
              value={sintomas}
              placeholder="Digite Sintomas"
              id="sintomas"
            />
          </InputContainer>
        </WrapInput>

        <WrapInput>
          <Label htmlFor="personal">Personal Encargado</Label>
          <InputContainer>
            <Select />
          </InputContainer>
        </WrapInput>

        <WrapInput>
          <Label htmlFor="fechacita">Fecha de Cita</Label>
          <InputContainer>
            <Input
              onChange={obtenerDatos}
              name="fechaCita"
              value={moment(fechaCita).format("YYYY-MM-DD")}
              type="date"
              placeholder="Fecha de cita"
              id="fechacita"
              min={hoy}
            />
          </InputContainer>
        </WrapInput>

        <ContainerBoton>
          <Boton>Crear Cita</Boton>
        </ContainerBoton>
      </Form>
    </Fragment>
  );
};

export default CrearCita;
