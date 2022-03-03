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
  console.log(props.props);
  console.log(props);
  const InicioEval = () => {
    const ruta = "/alumno/" + props.props;
    window.location.href = ruta;
  };

  console.log(props);
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
              onClick={(e) => InicioEval(e)}
            >
              Ingresar a Examen
            </a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faRocket}
              style={{ width: "18px", cursor: "pointer" }}
            />{" "}
            <a href="#" style={{ color: "#000000" }}>
              Historial de Examenes
            </a>
          </li>

          <li>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ width: "14px", cursor: "pointer" }}
            />{" "}
            <a href="/alumnoinscripcion" style={{ color: "#000000" }}>
              Listado de Materias Inscripto
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
