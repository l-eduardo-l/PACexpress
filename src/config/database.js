import dotenv from 'dotenv';

// Ativa o .env
dotenv.config();

// Cria um objeto com as configurações do Sequelize
const config = {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {},
  timezone: 'America/Sao_Paulo',
};

// Exporta as configurações
export default config;
