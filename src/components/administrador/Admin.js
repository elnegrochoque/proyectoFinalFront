import React, { Fragment } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ItemPersona from "./ItemPersona";
const Admin = (props) => {
  console.log(props.personas);

  const { id } = useParams();
  const urlCrearUsuario = "/administrador/" + id + "/nuevousuarioadmin";
  const urlCrearCatedra = "/admin/crearaula"
  return (
    <Fragment>
      <Row className="m-5">
        <Col>
          <h3 className=" font-weight-bold">Administrador</h3>
        </Col>
        <Col>
          <Link to={urlCrearUsuario} className="btn btn-dark mr-2 text-light">
            Nuevo Usuario
          </Link>
        </Col>
        <Col>
          <Link to={urlCrearCatedra} className="btn btn-dark mr-2 text-light">
            Nueva aula
          </Link>
        </Col>
        <Table striped bordered hover size="sm" className="my-4">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>UI</th>
              <th>Tipo de usuario</th>
            </tr>
          </thead>
          <tbody key="tbody">
            {props.personas.map((persona) => (
              <ItemPersona
                persona={persona}
                key={persona._id}
                consultarAPI={props.consultarAPI}
                idAdmin={id}
              ></ItemPersona>
            ))}
          </tbody>
        </Table>
      </Row>
    </Fragment>
  );
};

export default Admin;
