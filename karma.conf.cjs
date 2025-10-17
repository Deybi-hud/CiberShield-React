// karma.conf.js
module.exports = function (config) {
  
  process.env.CHROME_BIN = require('puppeteer').executablePath();
 config.set({
   frameworks: ['jasmine'],
    files: [
     'src/test/setupTests.js',
     'src/test/**/*.spec.jsx'
    ],
    preprocessors: {
      'src/test/setupTests.js': ['webpack'],
      'src/test/**/*.spec.jsx': ['webpack']
    },
   webpack: {
     mode: 'development',
     output: {
       assetModuleFilename: '[name][ext]'
     },
     module: {
       rules: [
         {
           test: /\.jsx?$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env', '@babel/preset-react'],
             },
           },
         },
         {
         test: /\.css$/,
         use: ['style-loader', 'css-loader'],
         },
           {
           test: /\.(woff|woff2|eot|ttf|otf)$/,
           type: 'asset/inline',
           },
           {
           test: /\.(png|jpe?g|gif|svg)$/i,
           type: 'asset/inline',
           },
        ],
      },
     resolve: {
       extensions: ['.js', '.jsx'],
     },
   },
   reporters: ['progress', 'kjhtml', 'coverage'],
   coverageReporter: {
     type: 'html',
     dir: 'coverage/',
   },
   browsers: ['ChromeHeadless'],
   singleRun: true,
   restartOnFileChange: true,
   plugins: [
     'karma-jasmine',
     'karma-webpack',
     'karma-chrome-launcher',
     'karma-coverage',
     'karma-jasmine-html-reporter'
   ]
 });
};
