define([
    'jquery',
    'underscore',
    'marionette',


    'text!./templates/app.html'
], function(
    $,
    _,
    Marionette,


    tmplApp
) {

    var AppLayout = Marionette.Layout.extend( {
        template: _.template( tmplApp ),


        el: $('body'),

        initialize: function(){
            Backbone.on('ajax:before', this.wait, this);
            Backbone.on('ajax:after', this.stopWaiting, this);
            Backbone.on('ajax:error', this.ajaxError, this);
        },

        wait: function() {
            $('#waitingWrapper').html('<img src="../img/spinner.gif" />').show();
        },

        stopWaiting: function() {
            $('#waitingWrapper').hide();
        },

        ajaxError: function( msg ){
            $('#waitingWrapper').html('<div class="errorMsg">' + msg + '</div>');
        },

        login: function() {
            this.render();
        }

    });

    var app = new AppLayout();

    return app;

});