# About

### Project description
- Frontend for the Thames Admin App.
- 'MS' stands for 'management system'
- The ['thames-auth' repository](https://github.com/Roundtable-Design/thames-auth) provides API endpoints

### Notable files/folders + file structure
1. '/deploy.sh'
    - Executed on `git push` on the server
2. '/App.js'
    - Routing
3. This is built on top of a 'create-react-app' boilerplate

# Set up

### Prerequisite software
1. Node
2. NPM

### Configuration
_This variable should point to the URL of the live thames-auth server that is being used._
1. `REACT_APP_API_ROOT="http://localhost:8000/api"`

### How to run locally
1. `npm install`
2. `npm start`
3. Also, run `npm start` in the `thames-auth` directory

### How to deploy and depoloyment pipeline
Push changes to the `master` branch
A webhook has been set up on an AWS instance that waits for a 'git push' event
