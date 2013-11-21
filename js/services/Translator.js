// Translate strings in the appropriate language
define([
    'polyglot',
    'underscore',
    'backbone',

    'i18n/en',
    'i18n/cn'

], function(
    polyglot,
    _,
    Backbone,

    english,
    chinese
) {
    // Holds the current language for the length of the session in case
    // localStorage isn't available (iOS in private browsing)
    var CURRENT_LANG;
    // List of language locales as detected by the browser and the appropriate file
    // to be used for the language
    var languages = {
        'en-US': english,
        'zh-CN': chinese
    };

    function getLanguage() {
        return storage.getItem('language') || CURRENT_LANG;
    }

    // Creates the translator instance
    var p = new Polyglot();

    // Allows directly setting the correct language for the translation
    function setLanguage(lang) {
        lang = _.contains(_.keys(languages), lang) ? lang : 'en-US';
        storage.setItem('language', lang);
        CURRENT_LANG = lang;
        var language = languages[lang] || english;
        p.replace(language);
    }
    // Immediately choose a default language based on the user's browser
    var language = getLanguage() || window.navigator.language;
    setLanguage(language);

    // Change the language when requested
    Backbone.on('language:change', function(lang) {
        setLanguage(lang);
        window.location.reload();
    });

    // Mixin the translate function to _.t so it can be conveniently used
    // everywhere we use underscore. Especially in the templates.
    //
    // *eg:* `_.t('login')` => Login
    _.mixin({
        t: function(key, values) {
            return p.t(key, values);
        }
    });

    return {
        getLanguage: getLanguage
    };
});