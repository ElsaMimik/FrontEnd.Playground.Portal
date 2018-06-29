const path = require('path');
const bonjour = require('bonjour')();
const fs = require('fs');

var resolve = dir => {
    return path.join(__dirname, dir)
};

const entryFolder = './ClientApp/entries';
let entries = {};

fs.readdirSync(entryFolder).forEach(file => {
  let nameList = file.split('.');
  if (nameList[nameList.length-1].toLowerCase() === 'js') {
    nameList.pop();
  }
  entries[nameList.join('.')] = `./ClientApp/entries/${file}`;
});

module.exports = {
  baseUrl: '/js/',
  outputDir: './wwwroot/js',
  css: {
    extract: false
  },
  lintOnSave: false,
  chainWebpack: config => {

    config.resolve.alias.set('@', resolve('./ClientApp'));
    config.resolve.alias.set('signalr', '@aspnet/signalr/dist/browser/signalr.js');
    
    config.plugins.delete('html');
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    config.plugins.delete('pwa');
    config.plugins.delete('copy');

    //config.plugins.delete('hmr');

    config.entryPoints.delete('app');

    for (let fileName in entries) {
      config.entry(fileName).add(entries[fileName]);
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: 'vendors.js'
    }
  },
  devServer: {
    before() {
      bonjour.publish({ name: 'webpack-dev-server', type: 'http', port: 3000, subtypes: ["webpack"] });
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    progress: true
  }
};
