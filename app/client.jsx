/*global document, window */

'use strict';

var React = require('react');
//var debug = require('debug');
//var debugClient = debug('grunt');
var app = require('./app.jsx');
var dehydratedState = window.App; // Sent from the server

require('es6-promise').polyfill();

window.React = React; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
//window.fluxibleDebug = debug;

//console.log('rehydrating app');

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    window.context = context;
    var mountNode = document.getElementById('app-container');

    //console.log('React Rendering');
    React.render(context.createElement(), mountNode, function () {
      //console.log('React Rendered');
    });

});
