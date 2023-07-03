const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para analizar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Agregar el middleware para servir archivos estáticos
app.use(express.static('public'));

// Array ficticio de notas
const notas = ['Nota 1', 'Nota 2', 'Nota 3'];

// Ruta de inicio
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Ruta para mostrar todas las notas
app.get('/notas', (req, res) => {
  res.render('notas', { notas: notas });
});

// Ruta para mostrar el formulario de edición de una nota específica
app.get('/notas/edit/:id', (req, res) => {
  // Aquí puedes obtener los datos de la nota correspondiente al ID proporcionado
  // Por ahora, utilizaremos una nota de ejemplo
  const nota = 'Nota de ejemplo';

  res.render('editarNota', { nota: nota });
});

// Ruta para procesar el formulario de creación de una nueva nota
app.post('/notas', (req, res) => {
  const nuevaNota = req.body.nota;
  notas.push(nuevaNota);
  res.redirect('/notas');
});

// Ruta para procesar el formulario de edición de la nota
app.post('/notas/edit/:id', (req, res) => {
  const id = req.params.id;
  const nuevaNota = req.body.nota;

  // Aquí puedes actualizar la nota correspondiente al ID proporcionado con los datos enviados desde el formulario
  // Por ahora, simplemente imprimimos la nota actualizada en la consola
  console.log(`Nota ${id} actualizada: ${nuevaNota}`);

  // Redirige al usuario a la página que muestra todas las notas después de la edición
  res.redirect('/notas');
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
