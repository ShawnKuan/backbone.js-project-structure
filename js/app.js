define([
    'jquery',
    'underscore',
    'marionette',
    'services/Translator',

    'text!./templates/app.html'
], function(
    $,
    _,
    Marionette,

    Translator,
    tmplApp
) {

    var AppLayout = Marionette.Layout.extend( {
        template: _.template( tmplApp ),

        el: $('body'),

        events: {
            'click .switch-lang' : 'switchLanguage'
        },
        
        templateHelpers: {
            language: Translator.getLanguage()
        },

        initialize: function(){
            /*(̅_̅_̅(̲̲̲̅̅̅(̅_̅_̲̅_̅̅_̅_̅_̅_̅()ڪے */
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
        },

        switchLanguage: function(event) {
            event.preventDefault();
            var langs = {
                'en-US': 'zh-CN',
                'zh-CN': 'en-US'
            };
            Backbone.trigger('language:change', langs[Translator.getLanguage()]);
        }

    });

    var app = new AppLayout();

    return app;

});