module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node-modules/,
                    use: ["babel-loader"]
                },
            ],
        },
    };
};