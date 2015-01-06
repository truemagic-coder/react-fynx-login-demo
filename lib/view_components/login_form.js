'use strict';
var React = require('react'),
  Fynx = require('fynx'),
  userStore = require('../stores/user'),
  actions = require('../actions'),
  styles = require('../styles'),
  Router = require('react-router'),
  api = require('../api');

module.exports = React.createClass({
  mixins: [
    // Make sure the "user" state is updated whenever the store changes.
    Fynx.connect(userStore, 'user'),
    Router.Navigation,
    Router.State
  ],
  componentDidMount() {
    // if already logged in then goto success page
    if (this.state.user.get('token')) {
      this.transitionTo('success');
    }
    // if a browser has a username and token then validate them
    // if they are valid then save them to the userStore and
    // also goto success page
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      api.token(localStorage.getItem('username'), localStorage.getItem('token'))
        .then( (userData) => { 
          userStore(userData);
          this.transitionTo('success');
        });
    }
  },
  getInitialState() {
    return {
      username: '',
      password: '',
      error: null,
      promise: null
    };
  },
  handleFormSubmit(evt) {
    evt.preventDefault();
    // If a login attempt has already been made, cancel it.
    if (this.state.promise) this.state.promise.cancel();
    var promise = actions.loginAttempt({
      username: this.state.username,
      password: this.state.password
    });
    // If the login attempt fails, show the error message.
    promise.then(null, (reason) => {
      // If it failed because it was cancelled, ignore it.
      if (promise.cancelled()) return;
      this.setState({error: reason});
      // add invalid class on inputs
      this.refs.inputPassword.getDOMNode().classList.add('invalid');
      this.refs.inputUsername.getDOMNode().classList.add('invalid');
    });
    // If the login is a success then transition to the success page
    promise.then((userData) => {
      // go to success page
      this.transitionTo('success');
    });
    // Finally clear the previous error message.
    this.setState({
      error: null,
      promise: promise
    });
  },
  handleUsernameChange(evt) {
    this.setState({username: evt.target.value});
  },
  handlePasswordChange(evt) {
    this.setState({password: evt.target.value});
  },
  handleFocus(evt) {
    var label = evt.target.previousSibling;
    label.classList.add('active');
    // remove invalid class on inputs
    this.refs.inputPassword.getDOMNode().classList.remove('invalid');
    this.refs.inputUsername.getDOMNode().classList.remove('invalid');
    // set error state to false
    this.setState({error: null});
  },
  handleBlur(evt) {
    var input = evt.target;
    var label = input.previousSibling;
    if (input.value.length === 0) {
      label.classList.remove('active');
    }
  },
  componentWillUnmount() {
    // If the component is being unmounted, old promises can only do harm.
    // So we need to make sure the component does not react to it.
    if (this.state.promise) this.state.promise.cancel();
  },
  render() {
    return (
      <div className="row">
        <h4>React Login Demo</h4>
        <span className="card-title grey-text">
          Login
        </span>
        <div className="row" style={styles.paddingTop()}>
          <form className="col s12"
            onSubmit={this.handleFormSubmit}>
            <div className="row">
              <div className="col s12 m4 l4 input-field">
                <label
                  id="label-username" 
                  ref="labelUsername"
                  htmlFor="login-username">
                    Username
                </label>
                <input
                  id="login-username" 
                  ref="inputUsername"
                  type="text" 
                  className="validate"
                  style={styles.inputWidth()}
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur} />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4 l4 input-field">
                <label
                  id="label-password"
                  ref="labelPassword"
                  htmlFor="login-password">
                    Password
                </label>
                <input
                  id="login-password"
                  ref="inputPassword"
                  type="password" 
                  className="validate"
                  style={styles.inputWidth()}
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur} />
              </div>
            </div>
            { this.state.error ?
              <div className="row">
                <span style={styles.errorMessageStyle()}>
                  {this.state.error}
                </span>
              </div>
              : null
            }
            <button
              className="btn waves-effect waves-light"
              type="submit" name="action">
                Login
                <i className="mdi-content-send right"></i>
            </button>
          </form>
        </div>
        <div className="row" style={styles.infoMessage()}>
          <div className="row">
            <span>Valid username = test and </span>
            <span>Valid password = test</span>
          </div>
          <div className="row">
            <span>Invalid username and password = </span>
            <span>anything but above combination</span>
          </div>
        </div>
      </div>
    );
  }
});
