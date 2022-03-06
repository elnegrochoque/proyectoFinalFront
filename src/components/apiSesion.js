export const getDisponible = async (id) => {
  const URL = process.env.REACT_APP_API_URL + "estadopersona/" + id;

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

export const putSalir = async (id) => {
   
  const URL = process.env.REACT_APP_API_URL + "personas/" + id;
  const raw = JSON.stringify({
    "estadoPersona": "false"
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

export const putEntrar = async (id) => {
    const URL = process.env.REACT_APP_API_URL + "personas/" + id;
    const ultimaConexion=   Date.now();
  
    const raw = JSON.stringify({
      "estadoPersona": "true",
      "ultimaConexion":ultimaConexion
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
  
  export const getUltimaConexion = async (id) => {
     
    const URL = process.env.REACT_APP_API_URL + "conexionpersona/" + id;
  
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