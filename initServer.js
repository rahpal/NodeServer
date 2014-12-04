"use strict";

global.app = require("./app");
global.controller = require("./controller");
global.viewEngine = require("./viewengine");

//console.log(app.config.controllerPath);
app.initLoad();

//console.log(app.routes);

app.startServer(9090);