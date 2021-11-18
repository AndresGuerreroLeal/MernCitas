import React, { Fragment, useEffect, useContext } from "react";
import Barra from "../layout/Barra";

import { Link } from "react-router-dom";

import styled from "styled-components";
import ListaCitas from "./ListaCitas";

import tokenAuth from "../../config/token";
import AuthContext from "../../context/auth/authContext";
import CitaContext from "../../context/citas/citaContext";

const Container = styled.div`
  height: 80vh;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 10px 5px;

  @media (min-width: 768px) {
    padding: 20px 30px;
  }
`;

const Boton = styled.button`
  height: 40px;
  padding: 10px;
  width: 60%;
  background: #2d496d;
  outline: none;
  border: none;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  margin: 10px 0px 10px;

  & a {
    text-decoration: none;
    color: white;
  }

  &:hover {
    background: #5d94db;
  }
`;

const Citas = () => {
  const { usuarioAutenticado } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
    console.log("desde aqui")
  }, []);

  return (
    <Fragment>
      <Barra />
      <Container>
        <Boton>
          <Link to="/citas/crear-cita">Crear Cita</Link>
        </Boton>

        <ListaCitas />
      </Container>
    </Fragment>
  );
};

export default Citas;
