
JavaScript
// Importar Express
var express = require("express");

// Crear una aplicación Express
var app = express();

// Usar la carpeta "dist/APPLICATION-NAME" para archivos estáticos
app.use(express.static("dist/back-office"));

// Ruta raíz
app.get("/", function(req, res) {
  // Redireccionar a la raíz
  res.redirect("/");
});

// Iniciar el servidor en el puerto 4200
app.listen(4200);