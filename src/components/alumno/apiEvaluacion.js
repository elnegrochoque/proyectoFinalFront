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
