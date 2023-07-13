export default async (req, res, next) => {
  // Salva as a sessão no cookie para que possa ser usado no ejs
  res.locals.logado = (req.session && req.session.logado) || false;
  res.locals.usuario = (req.session && req.session.usuario) || null;

  next();
};
