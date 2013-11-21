define(['config'],
 function(
    Config
){  
    // ### Storage functionalities
    if (!window.localStorage) {
        if (Config.debug) {
            console.warn('localStorage is not supported');
        }
    }
    else {
        var storage = {};
        storage.getItem = function (key) {            
            var item = localStorage.getItem(key);
            // return object from string
            if (_.isObject(item)) {
                item = JSON.parse(item);
            }
            return item;
        };
        // wrap setItem function with try/catch
        // fix private browsing errors on Safari
        storage.setItem = function (key, item) {
            try {
                // save string instead of object
                if (_.isObject(item)) {
                    item = JSON.strignify(item);
                }
                localStorage.setItem(key, item);
            } catch (error) {
                return false;
            }
        };

        window.storage = storage; 
    }      
});