'use strict';
var React = require('react');

var Html = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={this.props.baseUrl + '/assets/pure-min.css'} />
          <link rel="stylesheet" href={this.props.baseUrl + '/assets/grids-responsive-min.css'} />
          <link rel="stylesheet" href={this.props.baseUrl + '/assets/main-' + this.props.appVersion + '.min.css'} />
          <link rel="stylesheet" href={this.props.baseUrl + '/assets/font-awesome.min.css'} />
        </head>
        <body>
          <div id="app-container" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src={this.props.baseUrl + '/assets/bundle-' + this.props.appVersion + '.min.js'} defer></script>
      </html>
    );
  }
});

module.exports = Html;
