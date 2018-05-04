const nodeExternals = require("./node-externals");
nodeExternals["./assets/stats.json"] = "commonjs ./assets/stats.json";
nodeExternals["./assets/app.server.js"] = "commonjs ./assets/app.server.js";

module.exports = nodeExternals;
