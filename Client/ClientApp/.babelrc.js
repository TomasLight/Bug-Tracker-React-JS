const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
            "useBuiltIns": "usage",
            "corejs": "3.6.4"
        }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
];

const alias = {
    "@State": "./src/config/redux/State",
    "@app": "./src/app",

    "@api": "./src/api",
    "@config": "./src/config",
    "@models": "./src/models",
    "@selectors": "./src/utils/redux/selectors",
    "@shared": "./src/shared",
    "@utils": "./src/utils"
};

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    [
        "babel-plugin-module-resolver",
        {
            root: [ "./src/" ],
            alias,
        },
    ],
    // "babel-jest"
];

/** @type {import("@babel/core").TransformOptions} */
const babelConfig = {
    presets,
    plugins,
};

module.exports = babelConfig;
