export const guardarFoto = async (file, id) => {
    var formdata = new FormData();

    formdata.append("files", file);
    formdata.append("id", id);
  
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    const URL = "http://localhost:4000/api/sistemadeevaluaciones/file";
    try {
      const consulta = await fetch(URL, requestOptions);
      const respuesta = await consulta.json();
      return respuesta;
    } catch (error) {
      console.log(error);
    }
};
export default guardarFoto;
