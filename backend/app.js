// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');

const handelError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(requestLogger);
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handelError);

mongoose.connect(MONGODB);

app.listen(PORT, () => {
  console.log(`Приложение успешно запущено на ${PORT} порту`);
});
