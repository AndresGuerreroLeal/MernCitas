import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

//Iconos
import google from "../../assets/icons/google.png";
import twitter from "../../assets/icons/twitter.png";

//Imagen
import imagenR from "../../assets/images/imagenR.jpg";

//Link
import { Link } from "react-router-dom";

//Context
import AuthContext from "../../context/auth/authContext";
import AlertaContext from "../../context/alertas/alertaContext";
import Error from "../Error/Error";

const ContainerLogin = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const WrapLogin = styled.div`
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  flex-direction: row-reverse;
`;

const LoginForm = styled.form`
  width: 100%;
  min-height: 100vh;
  display: block;
  background-color: #f7f7f7;
  padding: 35px 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 60px 15px 10px;
  }

  @media (min-width: 769px) {
    width: 50%;
  }
`;

const LoginFormTitle = styled.span`
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
  height: 105px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  padding: 20px 10px 20px;
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

  & a {
    text-decoration: none;
  }
`;

const Boton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
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
  margin-bottom: 10px;

  &[name="crearcuenta"] {
    margin-top: 30px;
  }
`;

const ContainerTextSign = styled.div`
  padding: 10px 0 15px;
  text-align: center;

  & a {
    text-decoration: none;
    border-bottom: 0.1px solid #999999;
  }
`;

const TextSign = styled.span`
  font-size: 13px;
  line-height: 1.4;
  color: #999999;
`;

const MethodsSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const MethodSign = styled.a`
  margin-right: 5px;

  & img {
    height: 40px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const LoginImage = styled.div`
  display: none;

  @media (min-width: 769px) {
    background-image: url(${imagenR});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
    width: 50%;
    display: block;

    &::before {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

function NuevaCuenta(props) {
  const [usuarionuevo, guardarUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarpassword: "",
  });

  const { nombre, apellido, email, password, confirmarpassword } = usuarionuevo;

  const { alerta, crearAlerta } = useContext(AlertaContext);
  const { mensaje, autenticado, registrarUsuario } = useContext(AuthContext);

  useEffect(() => {
    if (autenticado) {
      props.history.push("/citas");
    }

    if (mensaje) {
      crearAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado]);

  const obtenerDatos = (e) => {
    guardarUsuario({
      ...usuarionuevo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitUsuario = (e) => {
    e.preventDefault();

    //Validar
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmarpassword.trim() === ""
    ) {
      crearAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    if (password.length < 6) {
      crearAlerta("Se requiere un password mayor de 6 caracteres", "alerta-error");
      return;
    }

    if (password.trim() !== confirmarpassword.trim()) {
      crearAlerta("La password no es igual", "alerta-error");
      return;
    }

    //Eliminar confirmar
    delete usuarionuevo["confirmarpassword"];

    //Enviar
    registrarUsuario(usuarionuevo);

    //Reset
    guardarUsuario({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmarpassword: "",
    });
  };

  return (
    <ContainerLogin>
      <WrapLogin>
        {alerta ? <Error alerta={alerta} /> : null}

        <LoginForm onSubmit={onSubmitUsuario}>
          <LoginFormTitle>Registro</LoginFormTitle>

          <WrapInput>
            <Label htmlFor="nombre">Nombre</Label>
            <InputContainer>
              <Input
                type="text"
                placeholder="Digite su nombre"
                id="nombre"
                name="nombre"
                onChange={obtenerDatos}
                value={nombre}
              />
            </InputContainer>
          </WrapInput>

          <WrapInput>
            <Label htmlFor="apellido">Apellido</Label>
            <InputContainer>
              <Input
                type="text"
                placeholder="Digite su apellido"
                id="apellido"
                name="apellido"
                onChange={obtenerDatos}
                value={apellido}
              />
            </InputContainer>
          </WrapInput>

          <WrapInput>
            <Label htmlFor="email">Email</Label>
            <InputContainer>
              <Input
                type="email"
                placeholder="Digite su email"
                id="email"
                name="email"
                onChange={obtenerDatos}
                value={email}
              />
            </InputContainer>
          </WrapInput>

          <WrapInput>
            <Label htmlFor="password">Password</Label>
            <InputContainer>
              <Input
                type="password"
                placeholder="Digite su password"
                id="password"
                name="password"
                onChange={obtenerDatos}
                value={password}
              />
            </InputContainer>
          </WrapInput>

          <WrapInput>
            <Label htmlFor="confirmarpassword">Confirmar Password</Label>
            <InputContainer>
              <Input
                type="password"
                placeholder="Confirme password"
                id="confirmarpassword"
                name="confirmarpassword"
                onChange={obtenerDatos}
                value={confirmarpassword}
              />
            </InputContainer>
          </WrapInput>

          <ContainerBoton>
            <Boton name="crearcuenta">
              Crear Cuenta
            </Boton>
          </ContainerBoton>

          <ContainerTextSign>
            <Link to="/">
              <TextSign>Inicia Sesión</TextSign>
            </Link>
          </ContainerTextSign>

          <ContainerTextSign>
            <TextSign>o registrate con </TextSign>
          </ContainerTextSign>

          <MethodsSign>
            <MethodSign>
              <img src={twitter} alt="logo twitter" />
            </MethodSign>
            <MethodSign>
              <img src={google} alt="logo google" />
            </MethodSign>
          </MethodsSign>
        </LoginForm>
        <LoginImage />
      </WrapLogin>
    </ContainerLogin>
  );
}

export default NuevaCuenta;
