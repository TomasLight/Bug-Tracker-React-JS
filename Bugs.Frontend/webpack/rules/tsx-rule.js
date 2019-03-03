module.exports = function() {
    return {
        module: {
            rules: [
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
                },
            ],
        },
    };
};