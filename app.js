const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// handlebars
app.engine(
    'handlebars',
    engine({
      defaultLayout: 'main', // Define o layout padrão
      layoutsDir: __dirname + '/views/layouts', // Pasta onde ficam os layouts
    })
  );
  app.set('view engine', 'handlebars'); // Define o Handlebars como view engine
  app.set('views', __dirname + '/views'); // Define o diretório de views

// Rotas
app.use('/', userRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
