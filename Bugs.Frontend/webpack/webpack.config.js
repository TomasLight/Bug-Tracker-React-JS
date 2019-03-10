const path = require("path");
const merge = require("webpack-merge");

const jsxRule = require("./rules/jsx-rule");
const tsxRule = require("./rules/tsx-rule");

const forkTsCheckerWebpackPlugin = require("./plugins/fork-ts-checker-webpack-plugin");

module.exports = merge(
    {
        mode: "development",
        devtool: "eval-source-map",
        entry: {
            app: [
                "@babel/polyfill",
                "./src/newBugs/index.tsx"
            ]
        },
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "/../../Bugs/wwwroot/js/"),
            publicPath: "/js/"
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            modules: [
                path.resolve(__dirname + "../"),
                "node_modules"
            ]
        }
    },
    jsxRule(),
    tsxRule(),
    forkTsCheckerWebpackPlugin()
);