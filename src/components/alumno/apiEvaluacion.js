export const getEvaluacion = async (idEvaluacion) => {
  const URL = process.env.REACT_APP_API_URL + "evaluaciones/" + idEvaluacion;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const consulta = await fetch(URL, requestOptions);
    const respuesta = await consulta.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
export const getEvaluacionesAlumno = async (idAlumno) => {
  const URL = process.env.REACT_APP_API_URL + "resultadosalumno/" + idAlumno;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const consulta = await fetch(URL, requestOptions);
    const respuesta = await consulta.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
export const getPreguntasEvaluacion = async (idResultado) => {
  const URL = process.env.REACT_APP_API_URL + "respuestas/resultados/"+idResultado;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const consulta = await fetch(URL, requestOptions);
    const respuesta = await consulta.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
export const getPregunta = async (idPregunta) => {
  const URL = process.env.REACT_APP_API_URL + "preguntas/respuesta/"+idPregunta;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const consulta = await fetch(URL, requestOptions);
    const respuesta = await consulta.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};