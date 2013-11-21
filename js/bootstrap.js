// Include libraries that should be included at "all times" and are dependencies
// to some other behaviors.
//
// Add some functionalities to specific parts of existing libraries
define([
    'backbone-validation',
    'marionette',
    'underscore',
    'config',

    'services/Translator',
    'services/Storage',
    'backbone-forms'

], function(
    BackboneValidation,
    Marionette,
    _,
    Config
){
    // ### Backbone validation
    //
    // Allows to use the backbone.validation plugin directly from a model's
    // validate method by mixing in backbone.validation methods inside of
    // Backbone.Model.validate
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    // ### Marionette
    //
    // Override the default ItemView so that it doesn't serialize the model's
    // data via `toJSON` but instead returns the whole object under the
    // `model` key. This allows using methods defined on the model.
    Marionette.ItemView.prototype.serializeData = function(){
        var data = {};

        if (this.model) {
          data = {model: this.model};
        }
        else if (this.collection) {
          data = { items: this.collection.toJSON() };
        }

        return data;
    };

    // #### Transitions
    //
    // Create a new Marionette Region type that triggers transitions between
    // the views that are being switched. Extends from the existing regions
    // and override some of its behavior
    Marionette.TransitionedRegion = Marionette.Region.extend({
        // **show:**
        //
        // Actually transitions the views
        show: function(view, reverse){

            this.ensureEl();

            var isViewClosed = view.isClosed || _.isUndefined(view.$el);

            var isDifferentView = view !== this.currentView;

            view.render();
            // Apply `page` class to all current views
            view.$el.addClass('page');

            if (isDifferentView || isViewClosed) {
                this.open(view);
            }

            // Switch references between old and current view
            this.oldView = this.currentView;
            this.currentView = view;

            if (this.oldView) {
                // The transitions are only applied if there is already a view
                // inside the region
                //
                // Transition the old view OUT
                var self = this;
                this.oldView.$el.removeClass('current');

                if (Config.isCssTransitions) {
                    this.oldView.$el.bind('transitionend webkitTransitionEnd', function(){
                        self.close();
                    });
                    
                    this.oldView.$el.addClass('old');
                } else {
                    self.close();
                }

                // Transition the new view IN
                view.$el.addClass('new');
                // The timeout is necessary or the browser won't even change the
                // classes if they are added and removed in a cycle
                _.defer(function(){
                    view.$el.removeClass('new').addClass('current');
                });
            } else {
                view.$el.addClass('current');
            }

            Marionette.triggerMethod.call(this, "show", view);
            Marionette.triggerMethod.call(view, "show");

            this.notifyDomRefresh(view);

        },

        // **open:**
        //
        // Appends the new view's element to the region
        open: function(view){
            this.$el.append(view.el);
        },

        // **close:**
        //
        // Removes the old view as well as all its content
        close: function(){
            var view = this.oldView;
            if (!view || view.isClosed){ return; }

            // call 'close' or 'remove', depending on which is found
            if (view.close) { view.close(); }
            else if (view.remove) { view.remove(); }

            Marionette.triggerMethod.call(this, "close");

            delete this.oldView;
        }
    });
 
    
    // #### Backbone AJAX
    //
    // Send events before and after a backbone ajax request
    Backbone.ajax = function() {
        Backbone.trigger('ajax:before');
        var errorCallback = arguments[0].error;
        var successCallback = arguments[0].success;
        arguments[0].success = _.before(successCallback, function(){Backbone.trigger('ajax:after');});
        arguments[0].error = _.before(errorCallback, function(jqXhr){
            Backbone.trigger('ajax:after');
            Backbone.trigger('api:error', jqXhr);
        });
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };

});