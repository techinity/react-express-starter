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

Bundling
--------

Produces a static bundle of JavaScript and assets need on the client side. Required when running in production.

```npm run bundle```

Production
----------

Before running in production, ensure that the webpack bundle has been run.

```npm run start:prod```

IDE Configuration
-----------------

• [Webstorm](docs/webstorm-run-configurations.md)
