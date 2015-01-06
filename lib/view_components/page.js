'use strict';
var React = require('react'),
  Router = require('react-router'),
  styles = require('../styles'),
  { RouteHandler } = Router;

module.exports = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State
  ],
  render() {
    return (
      <div className="row" style={styles.pageSize()}>
        <div className="card">
          <div className="card-content">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});
