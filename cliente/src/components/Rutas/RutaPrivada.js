import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router";
import AuthContext from "../../context/auth/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
