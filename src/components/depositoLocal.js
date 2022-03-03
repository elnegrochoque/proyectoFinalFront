const depositoLocal = (function () {
  var _servicio;
  function _obtenerServicio() {
    if (!_servicio) {
      _servicio = this;
      return _servicio;
    }
    return _servicio;
  }

  function _setearIdPersona(id) {
    localStorage.setItem("id_persona", id);
  }
  function _obtenerIdPersona() {
    return localStorage.getItem("id_persona");
  }
  function _setearIdCatedra(id) {
    localStorage.setItem("id_catedra", id);
  }
  function _obtenerIdCatedra() {
    return localStorage.getItem("id_catedra");
  }
  return {
    obtenerIdPersona: _obtenerIdPersona,
    setearIdPersona: _setearIdPersona,
    obtenerIdCatedra: _obtenerIdCatedra,
    setearIdCatedra: _setearIdCatedra,
    obtenerServicio: _obtenerServicio,
  };
})();

export default depositoLocal;
