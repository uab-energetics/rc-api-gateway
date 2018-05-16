"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const dotenv_1 = __importDefault(require("dotenv"));
/* LOAD ENVIRONMENT VALUES */
dotenv_1.default.config({ path: ".env" });
/* BOOTSTRAP THE APPLICATION */
const app = express_1.default();
exports.app = app;
app.set('port', process.env.PORT || 6000);
/* SETUP THE PROXY */
const monolithProxy = express_http_proxy_1.default(process.env.HOST_RC_BACKEND);
// proxy every request for now. *NOTE - future services will be added here as they are developed.
app.use((req, res, next) => {
    monolithProxy(req, res, next);
});
//# sourceMappingURL=app.js.map