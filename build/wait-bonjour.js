var bonjour = require('bonjour')();

// advertise an HTTP server on port 3000
//bonjour.publish({ name: 'My Web Server', type: 'http', port: 3000, subtypes: ["webpack"] });

// browse for all http services
bonjour.find({ type: 'http', subtypes: ["webpack"] }, function (service) {
  console.log('\n receive webpack-dev-server signal...');
  process.exit(0);
});