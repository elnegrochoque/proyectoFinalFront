import React from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
const ItemPregunta = (props) => {
    return (
        <tr >
            <td>{props.pregunta._id}</td>
            <td>{props.pregunta.enunciadoPregunta}</td>
            
            
        </tr>

    );
};

export default ItemPregunta;