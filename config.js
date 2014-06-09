var pe = process.env;
exports.env = {
  'env'      : pe.FEEDME_ENV,
  'apiuri'   : pe.FEEDME_WEB_API_URI,
  'apiport'  : pe.FEEDME_WEB_API_PORT,
  'feuri'    : pe.FEEDME_FRONTEND_URI,
  'feuriabs' : pe.FEEDME_FRONTEND_URI+':'+pe.FEEDME_FRONTEND_PORT || pe.PORT,
  'feport'   : pe.FEEDME_FRONTEND_PORT || pe.PORT,
  'cookie'   : pe.FEEDME_FRONTEND_COOKIE,
  'session'  : pe.FEEDME_FRONTEND_SESSION
};
