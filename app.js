'use strict';
var React = require('react'),
  Fynx = require('fynx'),
  immutable = require('immutable');

// create actions
var actions = Fynx.createAsyncActions([
  'loginAttempt',
  'loginComplete',
  'logout'
]);

// create store
var userStore = Fynx.createSimpleStore(immutable.Map());

// save userData to storage on login
actions.loginComplete.listen((userData) => saveInStorage(userData));

// setup listener to login
actions.loginAttempt.listen( (credentials) => 
  login(credentials.username, credentials.password)
    .then((userData) => actions.loginComplete(userData))
);

// setup listener to logout
actions.logout.listen( () => logout());

// on app load check if user is already signed in and validate
// if valid API token save userData to storage
if (localStorage.getItem('username') && localStorage.getItem('token')) {
  token(localStorage.getItem('username'), localStorage.getItem('token'))
    .then((userData) => userStore(userData));
}

// save userData to storage
function saveInStorage(userData) {
  localStorage.setItem('username', userData.username);
  localStorage.setItem('token', userData.token);
  userStore(userData);
}

// clear storage on logout
function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  userStore({});
}

// API call to validate token
function token(username, apiToken) {
  return new Promise( (resolve, reject) => {
    if (username === 'test' && apiToken === '123') {
      resolve({username: username, token: apiToken});
    } else {
      reject('Invalid or expired token');
    }
  });
}

// API call to validate login
function login(username, password) {
  return new Promise( (resolve, reject) => {
    if (username === 'test' && password === 'test') {
      resolve({username: username, token: '123'});
    } else {
      reject('Please enter a valid username and password');
    }
  });
}

// create styles
var errorMessageStyle = {
  color: 'red',
  fontSize: '-4',
  fontStyle: 'italic',
  marginLeft: '15px'
  },
  infoMessage = {
    marginLeft: '30px'
  },
  paddingBelow = {
    marginBottom: '10px'
  },
  pageSize = {
    marginTop: '40px',
    width: '500px'
  },
  inputWidth = {
    width: '350px'
  },
  paddingTop = {
    marginTop: '15px'
  };

// create component
var Login = React.createClass({
  mixins: [
    // Make sure the "user" state is updated whenever the store changes.
    Fynx.connect(userStore, 'user')
  ],
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
    // Finally clear the previous error message.
    this.setState({
      error: null,
      promise: promise
    });
  },
  handleLogout(evt) {
    this.setState({username: '', password: ''});
    actions.logout();
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
    // Show message if user already signed in
    if (this.state.user.get('username') && this.state.user.get('token')) {
      return (
        <div className="row" style={pageSize}>
          <div className="card">
            <div className="card-content">
              <h4>React Login Demo</h4>
              <div className="row">
                <h5>Logged in as {this.state.user.get('username')}</h5>
                <div className="row" style={paddingTop}>
                  To see the session logout click this button:
                </div>
                <div className="row">
                  <a className="waves-effect waves-light btn" onClick={this.handleLogout}>Logout</a>
                </div> 
                <div className="row">
                  To see the session persist when browser refreshed click this button:
                </div>
                <div className="row">
                  <a className="waves-effect waves-light btn" href="javascript:{location.reload();}">Refresh</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row" style={pageSize}>
        <div className="card">
          <div className="card-content">
            <h4>React Login Demo</h4>
            <span className="card-title grey-text">
              Login
            </span>
            <div className="row" style={paddingTop}>
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
                      style={inputWidth}
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
                      style={inputWidth}
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur} />
                  </div>
                </div>
                { this.state.error ?
                  <div className="row">
                    <span style={errorMessageStyle}>{this.state.error}</span>
                  </div>
                  : null
                }
                <button
                  className="btn waves-effect waves-light"
                  type="submit" name="action">
                    Login
                    <i
                      className="mdi-content-send right">
                    </i>
                </button>
              </form>
            </div>
          </div>
          <div className="row" style={infoMessage}>
            <div className="row">Valid username = test and password = test</div>
            <div className="row">Invalid username and password = anything but above combination</div>
          </div>
        </div>
      </div>
    );
  }
});

React.render(
  <Login />,
  document.body
);