import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

//Iconos
import google from "../../assets/icons/google.png";
import twitter from "../../assets/icons/twitter.png";

//Imagen
import imagen from "../../assets/images/imagen.jpg";

import { Link } from "react-router-dom";
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

const ContainerOptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 3px 0 35px;
`;

const RemenberCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

const InputCheckbox = styled.input`
  border: 1px solid #6675df;
  height: 15px;
  width: 15px;
`;

const LabelCheckbox = styled.label`
  font-size: 13px;
  color: #999999;
  line-height: 1.4;
  padding-left: 5px;
  cursor: pointer;
`;

const TextoPassword = styled.a`
  font-size: 13px;
  line-height: 1.4;
  color: #555555;
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
    background-color: #809ce5;
  }
`;

const ContainerTextSign = styled.div`
  padding: 20px 0 20px;
  text-align: center;
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
    background-image: url(${imagen});
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

function Login(props) {
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const { alerta, crearAlerta } = useContext(AlertaContext);
  const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext);

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
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    //Validar
    if (email.trim() === "" || password.trim() === "") {
      crearAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //enviar datos
    iniciarSesion(usuario);

    //Reset
    guardarUsuario({
      email: "",
      password: "",
    });
  };

  return (
    <ContainerLogin>
      <WrapLogin>
        {alerta ? <Error alerta={alerta} /> : null}
        <LoginForm onSubmit={onSubmitForm}>
          <LoginFormTitle>Login</LoginFormTitle>
          <WrapInput>
            <Label htmlFor="email">Email</Label>
            <InputContainer>
              <Input
                type="text"
                placeholder="Digite su email"
                id="email"
                value={email}
                name="email"
                onChange={obtenerDatos}
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
                value={password}
                name="password"
                onChange={obtenerDatos}
              />
            </InputContainer>
          </WrapInput>

          <ContainerOptions>
            <RemenberCheckbox>
              <InputCheckbox type="checkbox" id="remember" />
              <LabelCheckbox htmlFor="remember">Recordarme</LabelCheckbox>
            </RemenberCheckbox>

            <div className="ForgotPassword">
              <TextoPassword href="#!">¿Olvidaste la contraseña?</TextoPassword>
            </div>
          </ContainerOptions>

          <ContainerBoton>
            <Boton>Login</Boton>
            <Link to="/nueva-cuenta">
              <Boton name="crearcuenta">Crear Cuenta</Boton>
            </Link>
          </ContainerBoton>

          <ContainerTextSign>
            <TextSign>o inicia sesión con </TextSign>
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

export default Login;
