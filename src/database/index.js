import { Sequelize } from 'sequelize';

// importa as configurações do banco de dados
import databaseConfig from '../config/database.js';
// importa o modelo do usuario
import User from '../models/User.js';

// cria um array com os modelos criados
const models = [User];

// cria uma conexão com as configurações
const connection = new Sequelize(databaseConfig);

// inicia a conexão para cada modelo
models.forEach((model) => model.init(connection));

export default models;
