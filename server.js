'use strict';
require('dotenv').load();
require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serialize = require('serialize-javascript'),
    pkg = require('./package.json'),
    React = require('react'),
    fluxibleApp = require('./app/app.jsx'),
    navigateAction = require('flux-router-component').navigateAction,
    HtmlComponent = React.createFactory(require('./app/HtmlComponent.jsx')),
    passport = require('passport'),
    // auth = require('./authentication'),
    // superagent = require('superagent'),
    debug = require('debug')('ConDep');

var app = express();

// auth.initPassport(app);

app.use(cookieParser());
app.use(bodyParser.text());

var sessionConf = {
  name: 'condep-control-center',
  secret: 'det er ikke lurt aa spise for mye is paa 17. mai',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
};

app.use(session(sessionConf));
app.use(passport.initialize());
app.use(passport.session());

// auth.createRoutes(app, executeNavigationAction);

app.use('/fonts', express.static('./public/assets/fonts'));
if(process.env.NODE_ENV !== 'production'){
  app.use('/fonts', express.static('./.tmp/public/assets/fonts'));
}

app.use('/assets', express.static('./public/assets'));
if(process.env.NODE_ENV !== 'production'){
  app.use('/assets', express.static('./.tmp/public/assets'));
}

// function binaryParser(res, callback) {
//     res.setEncoding('binary');
//     res.data = '';
//     res.on('data', function (chunk) {
//         res.data += chunk;
//     });
//     res.on('end', function () {
//         callback(null, new Buffer(res.data, 'binary'));
//     });
// }

function executeNavigationAction(context, req, res, next) {
  // var actionContext = context.getActionContext();

  context.executeAction(navigateAction, { url: req.url }, function (err) {
    if (err) {
      if (err.status && err.status === 404) {
        debug('404');
        return next();
      } else {
        debug(JSON.stringify(err));
        return next(err);
      }
      debug('This should not be possible!');
      return;
    }
    var exposed = 'window.App=' + serialize(fluxibleApp.dehydrate(context)) + ';';
    var html;

    React.withContext(context.getComponentContext(), function() {
       html = React.renderToStaticMarkup(new HtmlComponent({
        appVersion: pkg.version,
        baseUrl: process.env.BASE_URL,
        context: context.getComponentContext(),
        state: exposed,
        markup: React.renderToString(context.createElement())
      }));
    });
    res.type('html');
    res.write('<!DOCTYPE html>' + html);
    res.end();
  });
}

//auth.ensureAuthenticated,
app.use(function (req, res, next) {
  debug('user: ' + JSON.stringify(req.session.passport.user));

  var context = fluxibleApp.createContext({
      req: req,
      token: req.session.passport.user ? req.session.passport.user.bearer.toString().replace(/"/g, '') : null
  });

  var actionContext = context.getActionContext();
  if(req.session.passport.user && req.session.passport.user.userData) {
    actionContext.dispatch('RECEIVE_USER', req.session.passport.user.userData);
  }

  executeNavigationAction(context, req, res, next);
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = server;
