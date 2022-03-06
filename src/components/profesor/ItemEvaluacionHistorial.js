import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { getCatedra } from "../alumno/apiCatedra";
const ItemEvaluacionHistorial = (props) => {

  const [nombreMateria, setNombreMateria] = useState(
    props.evaluacion.materiaEvaluacion
  );
  useEffect(async () => {
    const catedrasAux = await getCatedra(props.evaluacion.materiaEvaluacion);

    if (catedrasAux.materiaCatedra != undefined) {
      setNombreMateria(catedrasAux.materiaCatedra);
    } else {
    }
  }, []);
  const enviarResultadosEvaluacion = (id) => {
    Swal.fire({
      title: "¿Está seguro de enviar los resultados?",
      text: "Cada alumno recibira su resultado a su mail",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#757575",
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          confirmButtonColor: "#000000",
          icon: "success",
          title: "Enviado",
          text: "Los resultados han sido enviados",
        });
      }
    });
  };
  return (
    <tr>
      <td>{nombreMateria}</td>
      <td>{props.evaluacion.nombreEvaluacion}</td>
      <td>{props.evaluacion._id}</td>
      <td className="text-center">
        <Row>
          <Button
            className="mx-3"
            variant="btn btn-secondary"
            onClick={() => enviarResultadosEvaluacion(props.evaluacion._id)}
          >
            ENVIAR RESULTADOS
          </Button>

          <Link
            to={`/profesor/${props.idProfesor}/historial/${props.evaluacion._id}`}
            className="btn btn-dark mr-2"
          >
            VER
          </Link>
        </Row>
      </td>
    </tr>
  );
};
export default ItemEvaluacionHistorial;
