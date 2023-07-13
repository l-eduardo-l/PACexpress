function redirectComAviso(req, res, mensagens, tipo, rota, passivo = false) {
  req.flash(tipo, mensagens);
  if (passivo) {
    res.redirect(rota);
  }
}

export default async (req, res, next) => {
  // Se o usuario estiver logado passa para a proxima requisição
  if (req.session.logado) {
    next();
  } else {
    // caso o usuario não estiver logado passa redireciona para a página de login
    redirectComAviso(req, res, 'Você não está logado', 'message', '', false);
    return res.redirect('/user/login');
  }
};
