const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Routes
app.use('/usuario',require('./routes/user'));
app.use('/interesado', require('./routes/interesados'));
app.use('/noticia', require('./routes/noticia'));

//iniciando el servidor
app.listen(app.get('port'), () => {
  console.log("Ejecute on port 4000");
});