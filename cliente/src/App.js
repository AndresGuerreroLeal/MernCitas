import React from "react";

//Components
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Login from "./components/auth/Login";
import Citas from "./components/citas/Citas";
import CrearCita from "./components/citas/CrearCita";

//React-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Provider Context
import AuthState from "./context/auth/authState";
import AlertaState from "./context/alertas/alertaState";
import CitaState from "./context/citas/citaState";

//Ruta privada
import RutaPrivada from "./components/Rutas/RutaPrivada";
import NoExiste from "./components/layout/NoExiste";

function App() {
  return (
    <AuthState>
      <AlertaState>
        <CitaState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <RutaPrivada exact path="/citas" component={Citas} />
              <RutaPrivada
                exact
                path="/citas/crear-cita"
                component={CrearCita}
              />
              <Route path="*" component={NoExiste} />
            </Switch>
          </Router>
        </CitaState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
