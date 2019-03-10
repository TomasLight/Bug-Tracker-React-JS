const forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function() {
    return {
        plugins: [
            new forkTsCheckerWebpackPlugin()
        ]
    };
};