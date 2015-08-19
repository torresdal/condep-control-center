'use strict';
var createStore = require('fluxible/addons').createStore,
    routesConfig = require('../routes'),
    debug = require('debug')('Brage');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',

    handlers: {
        'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
        'RECEIVE_USER': 'updateUser',
        'RECEIVE_HOSTNAME' : 'updateHostName',
        'RECEIVE_AUTHORIZATION_DATA': 'addAuthData'
    },

    initialize: function () {
        this.currentPageName = null;
        this.currentPage = null;
        this.currentRoute = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.user = null;
        this.authData = null;
        this.hostName = null;
    },

    handleNavigate: function (route) {
        if (this.currentRoute && (this.currentRoute.url === route.url)) {
            return;
        }
        debug("url:"+route.url);
        var pageName = route.config.page;
        var page = this.pages[pageName];

        this.currentPageName = pageName;
        this.currentPage = page;
        this.currentRoute = route;
        this.emitChange();
    },

    getCurrentPageName: function () {
        return this.currentPageName;
    },

    getPageTitle: function () {
        return this.pageTitle;
    },

    getCurrentRoute: function () {
        return this.currentRoute;
    },

    getPages: function () {
        return this.pages;
    },

    updateUser: function(user) {
      this.user = user;
      this.emit('change');
    },

    updateHostName: function(hostName) {
      this.hostName = hostName;
    },

    getHostName: function() {
      return this.hostName;
    },

    getUser: function() {
      return this.user;
    },

    addAuthData: function(data) {
      this.authData = data;
    },

    getAuthData: function() {
      return this.authData;
    },

    getState: function () {
      return {
        route: this.currentRoute
      };
    },

    dehydrate: function () {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute,
            pageTitle: this.pageTitle,
            user: this.user,
            authData: this.authData,
            hostName: this.hostName
        };
    },

    rehydrate: function (state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
        this.user = state.user;
        this.authData = state.authData;
        this.hostName = state.hostName;
    }
});

module.exports = ApplicationStore;
