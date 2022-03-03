import React from "react";
import styles from "../styles/Home.module.css";
import Imagen from "../img/Librería Etsy Tienda Ícono (3).png";
import {
  Image,
  Container,
  Form,
  Button,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
function Header() {
  return (
    <div className={styles.headcontainer}>
      <div className={styles.headwrapper}>
        <div className={styles.title}>
          <h2>
            Hola, <span>Profesor</span>
          </h2>
          <p>Bienvenido al Sistema de Evaluciones</p>
        </div>
        <div className={styles.profile}>
          <Image src={Imagen} style={{ width: "65px" }} rounded={true}></Image>
        </div>
      </div>
    </div>
  );
}

export default Header;
