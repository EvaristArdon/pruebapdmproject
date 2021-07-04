"use strict";
const error_types = {
  Error401: function(msg) {
    //no autorizado
    let err = Error.apply(this, [msg]);
    this.name = err.name = "Error401";
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  Error403: function(msg) {
    //prohibido
    let err = Error.apply(this, [msg]);
    this.name = err.name = "Error403";
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  Error404: function(msg) {
    //no encontrado
    let err = Error.apply(this, [msg]);
    this.name = err.name = "Error404";
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  InfoError: function(msg) {
    //todo ok, solo información
    let err = Error.apply(this, [msg]);
    this.name = err.name = "InfoError";
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
};

module.exports = {
  errorHandler: (error, req, res, next) => {
    if (error instanceof error_types.InfoError)
      res.status(200).json({ error: error.message });
    else if (error instanceof error_types.Error404)
      res.status(404).json({ error: error.message });
    else if (error instanceof error_types.Error403)
      res.status(403).json({ error: error.message });
    else if (error instanceof error_types.Error401)
      res.status(401).json({ error: error.message });
    else if (error.name == "ValidationError")
      //de mongoose
      res.status(200).json({ error: error.message });
    else if (error.message) res.status(500).json({ error: error.message });
    else next();
  },
  notFoundHandler: (req, res, next) => {
    console.log(
      "ejecutando middleware para manejo de endpoints no encontrados"
    );
    res.status(404).json({ error: "endpoint not found" });
  },
};
