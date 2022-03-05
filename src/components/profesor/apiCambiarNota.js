
export const putCambiarNota = async (idResultado, nuevaNota) => {
   
    const URL = process.env.REACT_APP_API_URL + "/resultados/" + idResultado;
    const raw = JSON.stringify({
      "NotaEvaluacion": nuevaNota
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
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
  