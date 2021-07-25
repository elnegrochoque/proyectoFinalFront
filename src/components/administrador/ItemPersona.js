import React from 'react';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
const ItemPersona = (props) => {
 
    return (
        <tr >
            <td>{props.persona.apellidoPersona}</td>
            <td>{props.persona.nombrePersona}</td>
            <td>{props.persona.UIPersona}</td>
            <td>{props.persona.tipo}</td>
            <td className="text-center col-3">
                <Button className="mx-3" variant="danger">BORRAR</Button>
                <Button variant="warning">EDITAR</Button>
            </td>
        </tr>

    );
};

export default ItemPersona;