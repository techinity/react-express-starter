React Express Starter
=====================

[![Build Status](https://travis-ci.org/techinity/react-express-starter.svg?branch=master)](https://travis-ci.org/techinity/react-express-starter)

React Express Starter app for Node 8 and above built with the following technologies:-

  * [React.js](https://facebook.github.io/react/)
    - A JavaScript library for building user interfaces
  * [Redux](http://redux.js.org/)
    - Redux is a predictable state container for JavaScript apps.
  * [Webpack](https://webpack.github.io/)
    - webpack is a module bundler that takes modules with dependencies and emits static assets representing those modules.
  * [Express](https://expressjs.com/)
    - Fast, unopinionated, minimalist web framework for Node.js
  * [Jest](https://facebook.github.io/jest/)
    - Complete and easy to set-up JavaScript testing solution.
  * [Sass](http://sass-lang.com/)
    - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.


This repo is indented to demonstrate connecting various frameworks and libraries together to produce a server-side rendered react application.


Getting Started
---------------

  __Install node module dependencies__
  
  ```npm install```
  
  __Run dev server__
  
  Launch the server HTTP server in development mode with automatic reloading:
  
  ```npm run start```
  
  __Launch a web browser__
  
  ```http://localhost:3000/```


Testing
-------

Execute tests (single pass)

```npm test```

Automatically watch files and rerun tests on change:-

```npm run test:watch```

Runtime
-------

For production, both client and server have their own static bundles.

To build both bundles together:

```npm run runtime```

Production
----------

By default, `npm start` will detect which environment it is running in based on `NODE_ENV`. To force the application to start up
in production mode, set the value `NODE_ENV=production` 


```NODE_ENV=production npm start```

To run in a production environment, the `npm runtime` task must have been executed first.

IDE Configuration
-----------------

• [Webstorm](docs/webstorm-run-configurations.md)
