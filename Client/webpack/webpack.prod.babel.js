import webpack from "webpack";
import merge from "webpack-merge";

import common from "./webpack.common";

const prodWebpackConfig = merge(common, {
    mode: "production",
    plugins: [
        // don't include all moment locale packages in bundle, its not need now
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        })
    ],
});

module.exports = prodWebpackConfig;
