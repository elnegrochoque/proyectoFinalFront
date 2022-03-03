export const postAlumnoCatedra = async (idCatedra, idPersona) => {
  const URL = process.env.REACT_APP_API_URL + "personascatedra";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const persona = {
    idCatedra: idCatedra,
    idPersona: idPersona,
  };
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(persona),
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

export const getCatedras = async () => {
  const URL = process.env.REACT_APP_API_URL + "catedra";

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
export const getInscripto = async (idAlumno, idCatedra) => {
  const URL = process.env.REACT_APP_API_URL + "idpersonaidcatedra";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    idCatedra: idCatedra,
    idPersona: idAlumno,
  });
  var requestOptions = {
    method: "POST",
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
export const deleteidAlumnoidCatedra = async (idCatedra, idPersona) => {
  const URL = process.env.REACT_APP_API_URL + "idpersonaidcatedra";
  console.log("idPersona", idPersona);
  console.log("idCatedra", idCatedra);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const persona = {
    idCatedra: idCatedra,
    idPersona: idPersona,
  };
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(persona),
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

export const getPersonaConIdCatedra = async (idCatedra) => {
  const URL = process.env.REACT_APP_API_URL + "personaidcatedra";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    idCatedra: idCatedra,
  });
  var requestOptions = {
    method: "POST",
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


export const getCatedra = async (idCatedra) => {
  const URL = process.env.REACT_APP_API_URL + "catedra/"+idCatedra;

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
