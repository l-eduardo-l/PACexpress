import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';

// importa o modelo para ativar o banco de dados
import models from './database/index.js';

// Importa as rotas da aplicação
import userRoutes from './routes/userRoutes.js';
import mainRoutes from './routes/mainRoutes.js';

// Por usarmos o "type":"module" temos que reecriar a função __filename
const __filename = fileURLToPath(import.meta.url);
// Por usarmos o "type":"module" temos que reecriar a função __dirname
const __dirname = path.dirname(__filename);

// Ativa o .env
dotenv.config();

// Cria a class da aplicação

class App {
  constructor() {
    // instânciando o express
    this.app = express();
    // setando o reenderizados como ejs ao inves de html
    this.app.set('view engine', 'ejs');
    // setando arquivo de templates
    this.app.set('views', path.join(__dirname, 'views', 'templates'));
    // setando static em uma rota
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, 'views', 'public'))
    );
    this.app.use(express.static(path.resolve(__dirname, 'views', 'public')));
    this.app.use(express.static('files'));

    // ativa os middlewares
    this.middlewares();

    // ativa as rotas
    this.routes();
  }

  middlewares() {
    // poder passar argumentos pela url exemplo /user/{id} = /user/1
    this.app.use(express.urlencoded({ extended: true }));

    // poder receber/retornar json
    this.app.use(express.json());

    // sessoes flash para mostrar aviso
    this.app.use(flash());

    // sessoes de cookie
    this.app.use(
      session({
        secret: process.env.SECRET_TOKEN,
        saveUninitialized: false,
        resave: false,
      })
    );
  }

  routes() {
    // ativa as rotas de usuario apartir do caminh /user
    this.app.use('/user', userRoutes);
    // ativa as rotas de principais apartir do caminho / ou seja o root do projeto
    this.app.use('/', mainRoutes);
  }
}

// exporta o aplicativo com as configurações
export default new App().app;
