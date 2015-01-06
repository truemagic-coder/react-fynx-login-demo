'use strict';
var React = require('react'),
  Router = require('react-router'),
  { RouteHandler } = Router;

module.exports = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State
  ],
  render() {
    return (
      <div className="row">
        <RouteHandler/>
      </div>
    );
  }
});
