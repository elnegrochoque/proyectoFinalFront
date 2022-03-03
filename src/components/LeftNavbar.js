import React from "react";
import styles from "../styles/Home.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCog,
  faHeart,
  faRocket,
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

function LeftNavbar(props) {
  const crearEvaluacion = () => {
    const ruta = "/profesor/" + props.props + "/crearevaluacion";
    window.location.href = ruta;
  };
  const modificarEvaluacion = () => {
    const ruta = "/profesor/" + props.props + "/modificarevaluaciones";
    window.location.href = ruta;
  };
  const historialEvaluacion = () => {
    const ruta = "/profesor/" + props.props + "/historial";
    window.location.href = ruta;
  };
  return (
    
    <div className={styles.navcontainer}>
      <div className={styles.logo}>
        <h3>Sistema de Evaluaciones</h3>
      </div>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a
              href="#"
              style={{ color: "#000000" }}
              onClick={(e) => crearEvaluacion(e)}
            >
              Crear Examen
            </a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faRocket}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a href="/profecatedra" style={{ color: "#000000" }}>
              Catedras
            </a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faBookOpen}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a
              href="#"
              style={{ color: "#000000" }}
              onClick={historialEvaluacion}
            >
              Examenes
            </a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faBookOpen}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a
              href="#"
              style={{ color: "#000000" }}
              onClick={modificarEvaluacion}
            >
              Modificar Examenes
            </a>
          </li>
          

          <li>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a href="/" style={{ color: "#000000" }}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftNavbar;
