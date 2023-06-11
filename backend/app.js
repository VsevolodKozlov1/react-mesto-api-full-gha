const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./utils/limiter-config');
const routes = require('./routes');
const errHandler = require('./middlewares/err-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errHandler);

app.listen(PORT, () => {
});
