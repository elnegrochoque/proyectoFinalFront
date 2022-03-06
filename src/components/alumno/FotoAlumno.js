import React from "react";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
import {
  Image,
  Container,
  Form,
  Button,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import guardarFoto from "./apiFoto";
const FotoAlumno = () => {
  const [playing, setPlaying] = useState(false);
  const [foto, setFoto] = useState();
  const videoRef = useRef(null);
  const fotoRef = useRef(null);
  const [hayFoto, setHayFoto] = useState(false);

  const tomarFoto = () => {
    const width = 300;
    const height = 228;
    let video = videoRef.current;
    let foto = fotoRef.current;
    foto.width = width;
    foto.height = height;
    let ctx = foto.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHayFoto(true);
    const guardarFotoAux = guardarFoto();
 

    let blob1;
    var image = document.getElementById("canvas").toBlob(
      function (blob) {
        blob1 = blob;
        
      },
      "image/jpeg",
      0.8
    );
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, width: 1920, height: 1080 })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cerrar = () => {
    let foto = fotoRef.current;
    let ctx = foto.getContext("2d");
    ctx.clearRect(0, 0, foto.width, foto.height);
    setHayFoto(false);
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className={styles.Container}>
      <div className={styles.container}>
        <LeftNavbar></LeftNavbar>
        <Header></Header>
        <div className={styles.contentcontainer}>
          <Container style={{ textAlign: "center", marginBottom: "100px" }}>
            <Row>
              <Col sm="auto">
                <div>
                  <video width="300" ref={videoRef}></video>
                </div>
                <div onClick={tomarFoto}>
                  <Button>Foto</Button>
                </div>
              </Col>
              <Col sm="auto">
                <div style={{ textAlign: "center" }}>
                  <canvas id="canvas" ref={fotoRef}></canvas>
                  <div onclick={cerrar} style={{ textAlign: "center" }}>
                    <Button>Continuar</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FotoAlumno;
