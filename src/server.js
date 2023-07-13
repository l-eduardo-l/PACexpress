import dotenv from 'dotenv';
// importa o app
import app from './app.js';

// ativa o .env
dotenv.config();

// pega a porta do .env
const port = process.env.PORT;

// ativa o servidor na porta
app.listen(port, () => {
  console.log('server start in localhost:3000');
});
