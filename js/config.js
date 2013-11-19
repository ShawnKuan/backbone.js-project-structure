// Defines the initial configuration of various environments specific to the
// VRent app.
define([
	'jquery',
	'underscore'
], function(
	$,
	_
){
	// ### dev environment configuration
	var dev = {
		env: 'dev',
		debug: true
	};

	// ### qa environment configuration
	var qa = {
		env: 'qa',
		debug: true
	};

	// ### prod environment configuration
	var prod = {
		env: 'prod',
		debug: false
	};

	// ### Default configuration
	//
	// All variables defined here will be the same for all environments
	var config = {};

    config.tracking = false;

	// check for iphone/ipad. for now to apply style for datetime-polyfill	
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        config.isIOS = true;
    }

    // check for small screensize to add functionality to mobile/desktop version
    if (Modernizr.mq('(max-width: 767px)')) {
        config.isScreenSm = true;
    }

    // check if browser supports transitions
    if (Modernizr.csstransitions) {
        config.isCssTransitions = true;
    }

    // if IE no ajax caching
    if ($('html').hasClass('ua-trident')) {
        $.ajaxSetup({ cache: false });
    }

    // We return a config that contains all default config variables as well as
    // the ones specific to this environment
    return _.defaults(config, prod);
});