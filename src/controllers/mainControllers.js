// import User from '../models/User.js';

// eslint-disable-next-lint
function redirectComAviso(req, res, mensagem, tipo, rota) {
  req.flash(tipo, mensagem);
  res.redirect(rota);
}

class MainController {
  // async exemplo(requisacao, resposta) {
  //   pegar os avisos caso aja algum salvo em message
  //   requisacao.locals.message = req.flash();
  //   renderiza o arquivo no caminho abaixo
  //   resposta.render('.exemplo/exemplo.ejs');
  // }

  async getHomePage(req, res) {
    res.locals.message = req.flash();
    res.render('./home/index.ejs');
  }

  async getHomeErro(req, res) {
    res.locals.message = req.flash();
    res.render('./Error404/index.ejs');
  }

  async getAvaliacao(req, res) {
    res.locals.message = req.flash();
    res.render('./avaliacao/index.ejs');
  }

  async getEncomendas(req, res) {
    res.locals.message = req.flash();
    res.render('./encomendas/index.ejs');
  }

  async getHistorico(req, res) {
    res.locals.message = req.flash();
    res.render('./historico/index.ejs');
  }
}

export default new MainController();
