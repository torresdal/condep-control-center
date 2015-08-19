'use strict';

var React = require('react'),
    Fluxible = require('fluxible'),
    routrPlugin = require('fluxible-plugin-routr'),
    ApplicationStore = require('./stores/ApplicationStore'),
    // authTokenPlugin = require('./fluxible-auth-token'),
    debug = require('debug')('ConDep');

debug('Creating new react factory...');

var app = new Fluxible({
  component: React.createFactory(require('./components/Main.jsx')),
  componentActionHandler: function(context, payload, done) {
    if(payload.err && payload.err === 401) {
      debug('Not authorized!!!!!!');
      if(typeof window !== 'undefined') {
        window.location = process.env.BASE_URL + '/timeout';
      }
      return;
    }
    else if(payload.err) {
      return;
    }
    done();
  }
});

app.plug(routrPlugin({
  routes: require('./routes')
}));

// app.plug(authTokenPlugin);

app.registerStore(ApplicationStore);
// app.registerStore(SigningStore);
// app.registerStore(ErrorStore);
// app.registerStore(ApplicationMessageStore);

module.exports = app;
