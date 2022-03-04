import React from "react";
import Swal from "sweetalert2";

import { useState, useEffect } from "react";
import { getCatedra } from "../alumno/apiCatedra";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const ItemEvaluacion = (props) => {
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
  const eliminarEvaluacion = (id) => {
    const URL = process.env.REACT_APP_API_URL + "evaluaciones/" + id;
    Swal.fire({
      title: "¿Está seguro?",
      text: "Se borrara permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            Swal.fire(
              "Examen eliminado",
              "El examen seleccionado fue correctamente elminado",
              "success"
            );

            //mostrar el cartel de prod eliminado

            //actualizar los datos
            props.consultarAPI();
          } else {
            Swal.fire("Error", "Se produjo un error", "error");
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Se produjo un eror", "Intentelo en unos minutos", "error");
        }
      }
    });
  };
  return (
    <tr>
      <td>{nombreMateria}</td>
      <td>{props.evaluacion.nombreEvaluacion}</td>
      <td>{props.evaluacion._id}</td>
      <td className="text-center">
        <Link
          to={`/profesor/${props.idProfesor}/modificarevaluaciones/editar/${props.evaluacion._id}`}
          className="btn btn-secondary mr-2"
        >
          EDITAR
        </Link>
        <Button
          className="mx-3"
          variant="btn btn-dark"
          onClick={() => eliminarEvaluacion(props.evaluacion._id)}
        >
          BORRAR
        </Button>
      </td>
    </tr>
  );
};

export default ItemEvaluacion;
