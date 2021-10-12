const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes');
const { error } = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use('', routes);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
