const paths = require('./paths');
const fs = require('fs');
const {DefinePlugin} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const externals = fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, cur) => Object.assign(acc, {[cur]: 'commonjs ' + cur}), {});

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const cssFilename = '/static/css/[name].[contenthash:8].css';
const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    {publicPath: Array(cssFilename.split('/').length).join('../')}
  : {};
const getClientEnvironment = require('./env');
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: paths.ssrJs,
  output: {
    path: paths.appStatic,
    filename: 'render.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
  },
  node: {__dirname: false, __filename: true, path: true, url: true},
  target: 'node',
  externals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /bootstrap\.scss$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {sourceMap: true, minimize: true},
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: {sourceMap: true},
                },
              ],
            },
            extractTextPluginOptions,
          ),
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    modules: true,
                    minimize: true,
                    sourceMap: shouldUseSourceMap,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            },
            extractTextPluginOptions,
          ),
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: '/static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      filename: 'template.html',
      minify: {
        // removeComments: false,
        // collapseWhitespace: true,
        // removeRedundantAttributes: true,
        // useShortDoctype: true,
        // removeEmptyAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // keepClosingSlash: true,
        // minifyJS: true,
        // minifyCSS: true,
        // minifyURLs: true,
      },
    }),
    new DefinePlugin({
      window: '"__server"',
    }),
  ],
};
