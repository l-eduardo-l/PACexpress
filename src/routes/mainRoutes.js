import { Router } from 'express';
import mainControllers from '../controllers/mainControllers.js';
import SessionMiddleawre from '../middlewares/sessionMidleware.js';
import IsLogged from '../middlewares/loginMiddleware.js';

const router = new Router();

router.get('/', SessionMiddleawre, mainControllers.getHomePage);
router.get('/erro', SessionMiddleawre, mainControllers.getHomeErro);
router.get(
  '/avaliacao',
  SessionMiddleawre,
  IsLogged,
  mainControllers.getAvaliacao
);

router.get(
  '/encomendas',
  SessionMiddleawre,
  IsLogged,
  mainControllers.getEncomendas
);

router.get(
  '/historico',
  SessionMiddleawre,
  IsLogged,
  mainControllers.getHistorico
);

export default router;
