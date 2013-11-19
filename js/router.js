define([
	'underscore',
    'backbone',
    'app'
], function(
	_,
    Backbone,
    App
){
	var Router = Backbone.Router.extend({
        // ### List of allowed urls
        routes: {
            // * go to login page
            'login':            'loginAction',
            // * log user out then go back to login page
            'logout':           'logoutAction',
            // * show forgot password form
            'forgot-password':  'forgotPasswordAction',
            // * change user password
            'change-password':  'changePasswordAction',
            // * default action, triggered when nothing else matches
            '*actions':         'loginAction'
        },

        loginAction: function() {
            App.login();
        }

        
    });

    return Router;
});