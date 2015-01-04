# React Login Demo using Fynx and Materialize

- make sure you have nvm installed - the instructions are here - https://github.com/creationix/nvm - recommended CURL install
- make sure that this line is in your .bash_profile or .zshenv file: source ~/.nvm/nvm.sh  # This loads NVM
- restart your shell (terminal) if you installed nvm
- git clone git@github.com:bevanhunt/react-fynx-login-demo.git
- cd react-fynx-login-demo
- nvm install
- sudo npm install -g gulp
- sudo npm install
- run the app in development: gulp & the server is started on http://localhost:9000
- warning: this was coded to be a demo app only - it is not suitable for production without modification
- warning: the apps usage of sessionStorage and stores should not be used in production as it is insecure
- warning: the plain text password is saved in the state of the login component so you will need to dispose of state when you are done with the login component