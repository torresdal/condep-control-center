'use strict';

var React = require('react'),
  debug = require('debug')('Brage'),
  text = require('../text'),
  FluxibleMixin = require('fluxible').FluxibleMixin,
  SigningStore = require('../stores/SigningStore'),
  LoadApplications = require('../actions/loadApplications'),
  AppList = require('./Application/applicationList.jsx'),
  NotActiveCustomer = require('./NotActiveCustomer.jsx');

module.exports = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
      storeListeners: [SigningStore]
  },

  getInitialState: function () {
    debug('Getting app state for MainPage');
    return this.getStore(SigningStore).getState();
  },

  componentDidMount: function () {
    this.context.executeAction(LoadApplications);
  },

  onChange: function () {
    debug('App state changed for MainPage');
    var state = this.getStore(SigningStore).getState();
    this.setState(state);
  },

  onClick: function() {
      debug('on click!');
  },

  render: function () {
    debug('Rendering MainPage!');
    debug(this.context);
    if(this.state.noCurrentApplications) {
       return (
        <div>
          <header className="header-container">
            <h1>{text.mainpage.welcome}</h1>
          </header>
          <NotActiveCustomer />
        </div>
      );
     }
     else {
        return (
          <div>
            <header className="header-container">
              <h1>{text.mainpage.welcome}</h1>
              <p>{text.mainpage.info}</p>
            </header>
            <AppList applications={this.state.applications} />
          </div>
        );
     }
  }
});
