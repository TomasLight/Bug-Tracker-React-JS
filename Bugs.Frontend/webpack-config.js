const path = require("path");
const forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        app: [
            "@babel/polyfill", 
            "./GUI/index.tsx"
        ]
    },
    output: {
        filename: "[name].js",
        path: path.join(__distname, "/builds/")
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node-modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.tsx?$/,
                exclude: /node-modules/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new forkTsCheckerWebpackPlugin()
    ]
};