import path from "path";
import merge from "webpack-merge";

import {jsxRule} from "./rules/jsx-rule";
import {tsxRule} from "./rules/tsx-rule";

import {forkTsCheckerWebpackPlugin} from "./plugins/fork-ts-checker-webpack-plugin";

module.exports = merge(
    {
        entry: "./src/newBugs/index.tsx",
        mode: "development",
        devtool: "eval-source-map",
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "/../../Bugs/wwwroot/js/"),
            publicPath: "/js/"
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            modules: [
                path.resolve(__dirname + "../"),
                path.resolve(__dirname + "../src/"),
                "node_modules"
            ]
        }
    },
    jsxRule(),
    tsxRule(),
    forkTsCheckerWebpackPlugin()
);