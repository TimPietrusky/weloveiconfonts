(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    var App = window.App,
        _ = window._;

    // Render the view for every iconCollection
    _(window.iconfonts).each(function(font) {
      var iconsCollection = new App.Collections.Icons({'family': font.family});
      iconsCollection.fetch().then(function() {
        var iconsView = new App.Views.Icons({ collection : iconsCollection });
        $('.' + font.family + ' section[data-name="preview"] div').append(iconsView.render().el);
      });
    });

    // A collection of all icon fonts
    var allIconsCollection = new App.Collections.Creator(window.iconfonts);

    // The fixed menu with the name of a clicked icon, 
    // an amount field, an min/max trigger and an anchor to the "How To" section
    var creatorView = new App.Views.Creator({ collection : allIconsCollection });
    $('body').append(creatorView.render().el);

    // The generated output for the selection icon fonts
    var outputView = new App.Views.Output({ collection : allIconsCollection });
    $('section[data-name="output"] div').append(outputView.render().el);

  });

})(jQuery, window, document);
