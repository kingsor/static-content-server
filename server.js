// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var compress   = require('compression');
var app        = express();                 // define our app using express
var bunyan     = require('bunyan');         // load bunyan


// configure app to use bunyan as logger
var logger = bunyan.createLogger({name: 'StaticContentServer'});

// set our port
var port = process.env.PORT || 3000;

// middleware to use for all request
var commonMiddleware = function(req, res, next){
    logger.info('Captured ' + req.method + ' request to ' + req.baseUrl+req.url);
    next(); // make sure to go to the next route
};

app.use(commonMiddleware);

// Use compress middleware to gzip content
app.use(compress());

//app.use('/', express.static(__dirname + '/public'));
app.use(express.static('public'));

// START THE SERVER
// =============================================================================
var server = app.listen(port, function(){
    logger.info('Magic happens on port ' + port);
});
