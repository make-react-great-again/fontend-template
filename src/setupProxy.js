const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/backend', { target: 'http://192.168.36.139:8094' }));
};
