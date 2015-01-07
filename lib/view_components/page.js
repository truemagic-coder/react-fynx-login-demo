'use strict';
var React = require('react'),
  Router = require('react-router'),
  styles = require('../styles'),
  { RouteHandler } = Router;

module.exports = React.createClass({
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
