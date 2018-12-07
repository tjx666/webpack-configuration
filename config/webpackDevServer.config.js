const Path = require('path');

module.exports = {
    port: 8848,
    contentBase: Path.resolve(__dirname, '../dist'),
    hot: true,
    // quiet: true,
    compress: true,
    watchContentBase: true,
    overlay: false,
    historyApiFallback: false,
};