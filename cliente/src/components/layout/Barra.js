import React, { useContext } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Header = styled.header`
  background: #2d496d;
  height: 60px;
  padding: 15px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    text-decoration: none;
  }
`;

const Left = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    flex: 1;

    & p {
      font-size: 25px;
      color: white;
      font-weight: 300;

      & span {
        font-weight: bold;
      }
    }
  }
`;

const Center = styled.div`
  flex: 1;

  text-align: center;

  & p {
    font-size: 25px;
    font-weight: bold;
    color: #74777c;
    color: white;

    & span {
      font-weight: 300;
    }
  }
`;

const Right = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    flex: 1;
    text-align: right;

    & button {
      background: transparent;
      outline: none;
      border: none;
      color: white;
      font-size: 18px;
      font-weight: 300;
      font-family: "Montserrat", sans-serif;
      cursor: pointer;
    }
  }
`;

const Barra = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  return (
    <Header>
      <Left>
        <p>
          {/* Hola<span> {usuario.usuario.nombre}</span> */}
        </p>
      </Left>
      <Center>
        <Link to="/citas">
          <p>MERNCitas</p>
        </Link>
      </Center>
      <Right>
        <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
      </Right>
    </Header>
  );
};

export default Barra;
