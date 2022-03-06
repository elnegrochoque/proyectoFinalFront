import React from "react";
import { useState } from "react";
import {
  Image,
  Container,
  Form,
  Button,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import isologotipo_unsta from "../img/Librería Etsy Tienda Ícono (3).png";
import Swal from "sweetalert2";
import Header from "./Header";
import LeftNavbar from "./LeftNavbar";
import depositoLocal from "./depositoLocal";
import { getDisponible, getUltimaConexion, putEntrar } from "./apiSesion";
const Inicio = (props) => {
 
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    let esUsuario = false;

    e.preventDefault();
    //  validar los datos
    if (usuario.trim() === "" || contrasena.trim() === "") {
      // mostrar el cartel de error
      setError(true);
      return;
    } else {
      // quitar cartel de error
      setError(false);
      // verificar si el usuario existe

      for (const i in props.personas) {
        if (
          props.personas[i].usuarioPersona === usuario &&
          props.personas[i].passwordPersona === contrasena
        ) {
          const _depositoLocal = depositoLocal.obtenerServicio();
          _depositoLocal.setearIdPersona(props.personas[i]._id);
          const sesionDuplicada = await getDisponible(props.personas[i]._id);
  
         
          const ultimaConexionAux = await getUltimaConexion(props.personas[i]._id);
          const ultimaConexion=ultimaConexionAux.conectado
          const tiempoAhora = Date.now();
          const resta=tiempoAhora-ultimaConexion

          if (sesionDuplicada.conectado == "false"|| resta>600000) {
            const entrar = await putEntrar(props.personas[i]._id);
            esUsuario = true;
            if (props.personas[i].tipo === "administrador") {
              const ruta = "/administrador/" + props.personas[i]._id;
              window.location.href = ruta;
            }
            if (props.personas[i].tipo === "alumno") {
              const ruta = "/alumnoprincipal/" + props.personas[i]._id;
              window.location.href = ruta;
            
            }
            if (props.personas[i].tipo === "profesor") {
              const ruta = "/profesor/" + props.personas[i]._id;
              window.location.href = ruta;
            }
          }
        }
      }
      if (esUsuario === false) {
        Swal.fire({
          confirmButtonColor: "#000000",
          icon: "error",
          title: "Error",
          text: "Usuario no valido o sesion iniciada",
        });
      }
    }
  };

  return (
    <div>
      <div className="text-center mt-5">
        <Image
          src={isologotipo_unsta}
          style={{ width: "200px" }}
          rounded={true}
        ></Image>
      </div>
      <h1 className="text-center">Sistema de evaluaciones</h1>
      <Container>
        <Form onSubmit={handleSubmit}>
          {error === true ? (
            <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
          ) : null}
          <Row className="justify-content-center">
            <Col lg="8">
              <Form.Group controlId="formNombre">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="forContrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="btn btn-dark" type="submit" className="w-25">
                  Ingresar
                </Button>
              </div>
              <div className="text-center my-3">
                <Button variant="btn btn-dark" href="/nuevousuario" className="w-25">
                  Nuevo Usuario
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Inicio;
