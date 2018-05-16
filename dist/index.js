"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const server = app_1.app.listen(app_1.app.get('port'), _ => console.log('App running on port ' + app_1.app.get('port')));
exports.server = server;
//# sourceMappingURL=index.js.map