import React from 'react';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';



const ItemPersona = (props) => {

    const eliminarPersona = (id) => {
        const URL = process.env.REACT_APP_API_URL + 'personas/' + id;
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

    const urlEditarUsuario = "/administrador/"+props.idAdmin+"/editar/"+props.persona.id;



    }
    return (
        <tr >
            <td>{props.persona.apellidoPersona}</td>
            <td>{props.persona.nombrePersona}</td>
            <td>{props.persona.UIPersona}</td>
            <td>{props.persona.tipo}</td>
            <td className="text-center col-3">
                <Button className="mx-3" variant="danger" onClick={() => eliminarPersona(props.persona._id)}>BORRAR</Button>
                <Link to={`${props.idAdmin}/editar/${props.persona._id}`} className="btn btn-warning mr-2">
                    EDITAR
                </Link>
            </td>
        </tr>

    );
};

export default ItemPersona;