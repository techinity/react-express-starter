Webstorm Run Configurations
===========================

These are webstorm specific run configurations that make it really simple to work with the project.

Development Server
------------------

![Webstorm Development Server Config](images/webstorm-development-server-config.png)

Production Server
-----------------

The production server needs to build an optimized runtime that compiles non-compatible syntax
such as JSX into javascript that Node can understand.

This configuration ensures that `npm run runtime` is executed before launching the server.

![Webstorm Production Server Config](images/webstorm-production-server-config.png)
