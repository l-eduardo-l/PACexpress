import User from '../models/User.js';

function redirectComAviso(req, res, mensagens, tipo, rota, passivo = false) {
  if (mensagens.isArray && mensagens.length > 0) {
    mensagens.forEach((mensagem) => {
      req.flash(tipo, mensagem);
    });

    return res.redirect(rota);
  }

  req.flash(tipo, mensagens);
  res.redirect(rota);
}

function getValidationErrors(error) {
  if (error.name === 'SequelizeValidationError') {
    const validationErrors = error.errors;
    const errorMessages = validationErrors.map(
      (validationError) => validationError.message
    );

    return errorMessages;
  }
  return [];
}

class UserController {
  // Reseta a sessao do usuario
  async logout(req, res) {
    req.session.logado = false;
    req.session.usuario = null;
    req.session.save();
    redirectComAviso(req, res, 'Deslogado com sucesso', 'message', '/');
  }

  async postLoginPage(req, res) {
    // Valida se o usuario existe via email
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      return redirectComAviso(
        req,
        res,
        'Email inválido',
        'message',
        '/user/login'
      );
    }

    // Valida se a senha é valida
    const validPassword = user.validPassword(req.body.senha);
    if (!validPassword) {
      return redirectComAviso(
        req,
        res,
        'Senha inválida',
        'message',
        '/user/login'
      );
    }

    // Seta a sessao do usuario
    req.session.logado = true;
    req.session.usuario = user.dataValues;
    req.session.save();

    return redirectComAviso(
      req,
      res,
      'Login efetuado com sucesso',
      'message',
      '/'
    );
  }

  async postRegisterPage(req, res) {
    try {
      // Cria a conta do usuario
      await User.create({ ...req.body });

      // Rediciona caso de certo
      redirectComAviso(
        req,
        res,
        'Registro concluido com sucesso',
        'message',
        '/user/login'
      );
    } catch (error) {
      // Rediciona e mostra os erros

      const Erros = getValidationErrors(error);

      redirectComAviso(req, res, Erros, 'message', '/user/register');
    }
  }

  async getLoginPage(req, res) {
    res.locals.message = req.flash();
    res.render('./login/index.ejs');
  }

  async getAcountPage(req, res) {
    res.locals.message = req.flash();
    res.render('./conta/index.ejs');
  }

  async getRegisterPage(req, res) {
    res.locals.message = req.flash();
    res.render('./register/index.ejs');
  }
}

export default new UserController();
