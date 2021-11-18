import React, { Fragment } from "react";
import "./styled.css";

const Error = ({ alerta }) => {
  return (
    <Fragment>
      <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
    </Fragment>
  );
};

export default Error;
