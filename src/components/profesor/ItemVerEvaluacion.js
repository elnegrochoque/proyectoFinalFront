import React, { Fragment, useState, useEffect } from "react";

import { Card, Container, Form, InputGroup } from "react-bootstrap";
const ItemVerEvaluacion = (props) => {

  const [checkBox1, setCheckBox1] = useState();
  const [checkBox2, setCheckBox2] = useState();
  const [checkBox3, setCheckBox3] = useState();
  const [checkBox4, setCheckBox4] = useState();
  const [desarrollo, setDesarrollo] = useState("");
  const [flagDesarrollo, setFlagDesarrollo] = useState(false);
  const [nota, setNota] = useState(0);
  useEffect(() => {
    atras();
  }, []);
  
  const atras = () => {
    for (const i in props.respuestas) {
      if (props.respuestas[i].IDPregunta === props.preguntas._id) {
        setCheckBox1(props.respuestas[i].opcion1CorrectaRespuesta);
        setCheckBox2(props.respuestas[i].opcion2CorrectaRespuesta);
        setCheckBox3(props.respuestas[i].opcion3CorrectaRespuesta);
        setCheckBox4(props.respuestas[i].opcion4CorrectaRespuesta);
        setDesarrollo(props.respuestas[i].desarrollo);
      }
      if (
        props.preguntas.opcion1CorrectaPregunta == false &&
        props.preguntas.opcion1CorrectaPregunta == false &&
        props.preguntas.opcion1CorrectaPregunta == false &&
        props.preguntas.opcion1CorrectaPregunta == false
      ) {
        setFlagDesarrollo(true);
      }
    }
  };
  return (
    <Fragment>
      <Container className="my-5">
        <Card className="" border="dark">
          <Card.Header className="text-center" style={{ fontSize: "40px" }}>
            {" "}
            {props.preguntas.enunciadoPregunta}
          </Card.Header>
          <Card.Body>
            <Form>
              {flagDesarrollo ? (
                <Card>
                  <Card.Body border="secondary">{desarrollo}</Card.Body>
                </Card>
              ) : null}

              {props.preguntas.opcion1Pregunta == "" ? null : (
                <InputGroup className="mb-3" size="lg">
                  <InputGroup.Checkbox
                    id="opcion1CorrectaRespuesta"
                    defaultChecked={checkBox1}
                  />
                  <Form.Control
                    className=" mx-4"
                    plaintext
                    readOnly
                    defaultValue={props.preguntas.opcion1Pregunta}
                  />
                </InputGroup>
              )}
              {props.preguntas.opcion2Pregunta == "" ? null : (
                <InputGroup className="mb-3" size="lg">
                  <InputGroup.Checkbox
                    id="opcion2CorrectaRespuesta"
                    defaultChecked={checkBox2}
                  />
                  <Form.Control
                    className=" mx-4"
                    plaintext
                    readOnly
                    defaultValue={props.preguntas.opcion2Pregunta}
                  />
                </InputGroup>
              )}
              {props.preguntas.opcion3Pregunta == "" ? null : (
                <InputGroup className="mb-3" size="lg">
                  <InputGroup.Checkbox
                    id="opcion3CorrectaRespuesta"
                    defaultChecked={checkBox3}
                  />
                  <Form.Control
                    className=" mx-4"
                    plaintext
                    readOnly
                    defaultValue={props.preguntas.opcion3Pregunta}
                  />
                </InputGroup>
              )}
              {props.preguntas.opcion4Pregunta == "" ? null : (
                <InputGroup className="mb-3" size="lg">
                  <InputGroup.Checkbox
                    id="opcion4CorrectaRespuesta"
                    defaultChecked={checkBox4}
                  />
                  <Form.Control
                    className=" mx-4"
                    plaintext
                    readOnly
                    defaultValue={props.preguntas.opcion4Pregunta}
                  />
                </InputGroup>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ItemVerEvaluacion;
