import React, { useState } from "react";

import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  display: block;
  background: transparent;
  font-size: 14px;
  color: #555555;
  line-height: 1.2;
  padding: 0 26px;
  font-family: "Montserrat", sans-serif;
`;

const useSelect = (initialState, opciones, obtenerDatos) => {
  const [state, guadarState] = useState(initialState);

  console.log(state);

  const selectInput = () => {
    return (
      <Select name="personal"  onChange={obtenerDatos}  >
        <option value="">-- Seleccione Especialidad -- </option>
        {opciones.map((option) => (
          <option key={option.id} value={option.id}>
            {option.personal} -- {option.especialidad}
          </option>
        ))}
      </Select>
    );
  };

  return [state, selectInput];
};

export default useSelect;
