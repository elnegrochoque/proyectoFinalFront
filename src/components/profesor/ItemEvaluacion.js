import React from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import {  Button} from 'react-bootstrap';
const ItemEvaluacion = (props) => {
    
    const eliminarEvaluacion = (id) => {
        const URL = process.env.REACT_APP_API_URL + 'evaluaciones/' + id;
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se borrara permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(URL, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.status === 200) {

                        Swal.fire(
                            'Producto eliminado',
                            'El producto seleccionado fue correctamente elminado',
                            'success'
                        )

                        //mostrar el cartel de prod eliminado

                        //actualizar los datos
                        props.consultarAPI();
                    }
                    else {
                        Swal.fire(
                            'Error',
                            'Se produjo un error',
                            'error'
                        )
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Se produjo un eror',
                        'Intentelo en unos minutos',
                        'error'
                    )
                }
            }
        })

    }
    return (
        <tr >
            <td>{props.evaluacion.materiaEvaluacion}</td>
            <td>{props.evaluacion.nombreEvaluacion}</td>
            <td>{props.evaluacion._id}</td>
            <td className="text-center">
            <Button className="mx-3" variant="danger" onClick={() => eliminarEvaluacion(props.evaluacion._id)}>BORRAR</Button>
                <Link to={`/profesor/${props.idProfesor}/modificarevaluaciones/editar/${props.evaluacion._id}`} className="btn btn-warning mr-2">
                    EDITAR
                </Link> 
            </td>
        </tr>

    );
};

export default ItemEvaluacion;