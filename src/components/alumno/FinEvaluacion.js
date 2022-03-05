import React from "react";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import { Button } from "react-bootstrap";
import depositoLocal from "../depositoLocal";
const FinEvaluacion = () => {
  const _depositoLocal = depositoLocal.obtenerServicio();

  const id = _depositoLocal.obtenerIdPersona();
  const aInicio = (e) => {
    e.preventDefault();
    const ruta = "/";
    window.location.href = ruta;
  };
  return (
    <div className="text-center m-5">
      <LeftNavbar props={id}></LeftNavbar>
      <Header></Header>
      <h1>Fin evaluacion</h1>
    </div>
  );
};

export default FinEvaluacion;
