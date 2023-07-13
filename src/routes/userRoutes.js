import { Router } from 'express';

import SessionMiddleawre from '../middlewares/sessionMidleware.js';
import userControllers from '../controllers/userControllers.js';

const router = new Router();

// o padrao de ser criado uma rota é
// router.get('/caminhoDaRota', função que sera executado caso ele tente usar a rota)
// caso aja mais de uma funcao toda atuarão como middleware menos a ultima
// exemplo do caso abaixo caminho é /logout e tem 2 duas funções a ultima é o userControllers.logout
// No caso a que sobrou é um middleware

router.get('/logout', SessionMiddleawre, userControllers.logout);

router.get('/conta', SessionMiddleawre, userControllers.getAcountPage);

router.get('/login', SessionMiddleawre, userControllers.getLoginPage);
router.post('/login', userControllers.postLoginPage);

router.get('/register', SessionMiddleawre, userControllers.getRegisterPage);
router.post('/register', userControllers.postRegisterPage);

export default router;
