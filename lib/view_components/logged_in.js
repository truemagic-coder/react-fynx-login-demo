'use strict';
var React = require('react'),
  Fynx = require('fynx'),
  actions = require('../actions'),
  userStore = require('../stores/user'),
  styles = require('../styles'),
  Router = require('react-router');

module.exports = React.createClass({
  mixins: [
    // Make sure the "user" state is updated whenever the store changes.
    Fynx.connect(userStore, 'user'),
    Router.Navigation,
    Router.State
  ],
  componentDidMount() {
    // unauthorized
    if (!this.state.user.get('token')) {
      this.transitionTo('/');
    }
  },
  handleLogout(evt) {
    actions.logout();
    this.transitionTo('login');
  },
  render() {
    return (
      <div>
        <h4>React Login Demo</h4>
        <div className="row">
          <h5>Logged in as {this.state.user.get('username')}</h5>
          <div className="row" style={styles.paddingTop()}>
            To see the session logout click this button:
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn" 
            onClick={this.handleLogout}>Logout</a>
          </div> 
          <div className="row">
            <span>To see the session persist when browser</span>
            <span>refreshed click this button:</span>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn" 
            href="javascript:{location.reload();}">Refresh</a>
          </div>
        </div>
      </div>
    );
  }
});
