"use strict";

import http from "http";
import flow from "./flow";
import utils from "./utils";

/**
 * Create an array instance with some handy server helper methods.
 * @type {Array} Members:
 * ```js
 * {
 *     server: http.Server,
 *
 *     // http.Server.prototype.listen, but returns a promise instead.
 *     listen: (port) => Promise,
 *
 *     close: (cb) => Promise,
 *
 *     // The http `requestListener` of the Node native `http.createServer`.
 *     listener: (req ,res) => undefined
 * }
 * ```
 * @example
 * ```js
 * import flow from "noflow"
 * let app = flow();
 * app.push("OK");
 * app.listen(8123).then(() => console.log("started"));
 * ```
 */
var app = function () {
    if (arguments.length > 0) {
        return flow.apply(0, arguments);
    }

    var routes = [];

    routes.listener = flow(routes);

    routes.listen = function () {
        routes.server = http.createServer(routes.listener);

        return utils.yutils.promisify(
            routes.server.listen, routes.server
        ).apply(0, arguments);
    };

    routes.close = function () {
        return utils.yutils.promisify(
            routes.server.close, routes.server
        ).apply(0, arguments);
    };

    return routes;
};

utils.assign(app, utils);

export default app;
