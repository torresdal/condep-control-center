'use strict';

var React = require('react'),
    ApplicationStore = require('../stores/ApplicationStore'),
    // ErrorStore = require('../stores/ErrorStore'),
    RouterMixin = require('flux-router-component').RouterMixin,
    FluxibleMixin = require('fluxible').FluxibleMixin;
    // NavLink = require('flux-router-component').NavLink,
    // MainPage = require('./MainPage.jsx'),
    // LoginPage = require('./Authentication/login.jsx'),
    // LogoutPage = require('./Authentication/logoutInfo.jsx'),
    // TimeoutPage = require('./Authentication/timeout.jsx'),
    // SignPage = require('./Signing/SignPage.jsx'),
    // SignPageComplete = require('./Signing/SignPageComplete.jsx'),
    // ErrorBox = require('./ErrorBox.jsx'),
    // Menu = require('./Menu.jsx'),
    // Footer = require('./Footer.jsx'),
    // text = require('../text'),
    // debug = require('debug')('Brage');
    // logNavigateAction = require('../actions/logNavigateAction.js');

module.exports = React.createClass({
  mixins: [RouterMixin, FluxibleMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },
  getInitialState: function () {
    return this.getState();
  },

  getState: function () {
    return null;
    // var appStore = this.getStore(ApplicationStore);
    // var errorStore = this.getStore(ErrorStore);
    //
    // return {
    //     currentPageName: appStore.getCurrentPageName(),
    //     pageTitle: appStore.getPageTitle(),
    //     route: appStore.getCurrentRoute(),
    //     pages: appStore.getPages(),
    //     user: appStore.getUser(),
    //     errorObj: errorStore.getError(),
    //     hostName: appStore.getHostName()
    // };
  },

  onChange: function () {
      this.setState(this.getState());
  },

  render: function () {
    // var output = '';

    // this.context.executeAction(logNavigateAction, this.state.route);
    // switch (this.state.currentPageName) {
    //   case 'home':
    //       output = <MainPage/>;
    //       break;
    // }

    return (
      <div>
        <p>Hello world!</p>
    </div>
    );
  }
});
