
export const crearAula = async (nombreCatedra, nombreMateria, idProfesor) => {
    
  const URL = process.env.REACT_APP_API_URL + "catedra";
 
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const catedra = {
    nombreCatedra: nombreCatedra,
    materiaCatedra: nombreMateria,
    idProfesor: idProfesor,
  };
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(catedra),
    redirect: "follow",
  };
  const URLaux = "http://localhost:4000/api/sistemadeevaluaciones/file";
  try {
    const consulta = await fetch(URL, requestOptions);
    const respuesta = await consulta.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const getPersona = async (UIProfesor) => {
    
    const URL = process.env.REACT_APP_API_URL + "personasui/"+UIProfesor;

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
  
export const getPersonaId = async (idPersona) => {
    
  const URL = process.env.REACT_APP_API_URL + "personas/"+idPersona;

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
  
export default crearAula;
