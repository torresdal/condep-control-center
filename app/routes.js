'use strict';

module.exports = {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Min side'
  },
  login: {
    path: '/oauth2/authorize',
    method: 'get',
    page: 'login',
    title: 'Pålogging'
  },
  logout: {
    path: '/logout',
    method: 'get',
    page: 'logoutInfo',
    title: 'Du er nå utlogget'
  },
  timeout: {
    path: '/timeout',
    method: 'get',
    page: 'timeout',
    title: 'Tidsavbrudd'
  },
  signPage: {
    path: '/signPage/:id',
    method: 'get',
    title: 'Signering',
    page : 'signPage'
  },
  signPageComplete: {
    path: '/signPageComplete/',
    method: 'get',
    title: 'Signering ferdig',
    page : 'signPageComplete'
  }
};
