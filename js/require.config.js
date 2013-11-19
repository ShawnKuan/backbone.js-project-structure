  require.config({
    paths: {
        'jquery':                 '../bower_components/jquery/jquery',
        'underscore':             '../bower_components/underscore/underscore',
        'backbone':               '../bower_components/backbone/backbone',
        'backboneValidation':     '../bower_components/backbone-validation/src/backbone-validation',
        'JSON':                   '../bower_components/json2/json2',
        'bootstrap-tab':          '../bower_components/sass-bootstrap/js/bootstrap-tab',
        'text':                   '../bower_components/requirejs-text/text',
        'select2':                '../bower_components/select2/select2',
        'marionette':             '../bower_components/backbone.marionette/lib/backbone.marionette',
        'backbone-forms':         '../bower_components/backbone-forms/distribution/backbone-forms',
        'backbone-forms-bootstrap':'../bower_components/backbone-forms/distribution/templates/bootstrap',
        'backbone-validation':    '../bower_components/backbone-validation/dist/backbone-validation',
        'bootstrap-datepicker':    '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker'
    },

    shim:{
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'JSON', 'jquery'],
            exports: 'Backbone'
        },
        backboneValidation: {
            deps: ['backbone']
        },
        select2: {
            deps: ['jquery']
        },
        'bootstrap-tab': {
            deps: ['jquery']
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'backbone-forms': {
            deps: ['backbone']
        },
        'backbone-forms-bootstrap': {
            deps: ['backbone-forms']
        },
        'backbone-validation': {
            deps: ['backbone']
        },
        'bootstrap-datepicker': {
            deps: ['jquery']
        }
    }
});

require(['router'], function(Router) {
    var router = new Router();
    Backbone.history.start();
});