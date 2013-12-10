(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    var App = window.App;

    var iconsCollection = new App.Collections.Icons({'family':'brandico'});
    iconsCollection.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection });
      $('.brandico section[data-name="preview"] div').append(iconsView.render().el);
    });

    var iconsCollection1 = new App.Collections.Icons({'family':'entypo'});
    iconsCollection1.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection1 });
      $('.entypo section[data-name="preview"] div').append(iconsView.render().el);
    });


    var iconsCollection6 = new App.Collections.Icons({'family':'fontelico'});
    iconsCollection6.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection6 });
      $('.fontelico section[data-name="preview"] div').append(iconsView.render().el);
    });

    var iconsCollection7 = new App.Collections.Icons({'family':'maki'});
    iconsCollection7.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection7 });
      $('.maki section[data-name="preview"] div').append(iconsView.render().el);
    });

    var iconsCollection5 = new App.Collections.Icons({'family':'openwebicons'});
    iconsCollection5.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection5 });
      $('.openwebicons section[data-name="preview"] div').append(iconsView.render().el);
    });

    var iconsCollection2 = new App.Collections.Icons({'family':'typicons'});
    iconsCollection2.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection2 });
      $('.typicons section[data-name="preview"] div').append(iconsView.render().el);
    });

    var iconsCollection3 = new App.Collections.Icons({'family':'zocial'});
    iconsCollection3.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection3 });
      $('.zocial section[data-name="preview"] div').append(iconsView.render().el);
    });

    var iconsCollection4 = new App.Collections.Icons({'family':'fontawesome'});
    iconsCollection4.fetch().then(function() {
      var iconsView = new App.Views.Icons({ collection : iconsCollection4 });
      $('.fontawesome section[data-name="preview"] div').append(iconsView.render().el);
    });

    // var iconsCollection8 = new App.Collections.Icons({'family':'webfont7696'});
    // iconsCollection4.fetch().then(function() {
    //   var iconsView = new App.Views.Icons({ collection : iconsCollection4 });
    //   $('.fontawesome section[data-name="preview"] div').append(iconsView.render().el);
    // });


    var allIconsCollection = new App.Collections.Creator([
      {'family' : 'brandico', 'font' : 'brandico', 'selected' : false},
      {'family' : 'entypo', 'font' : 'entypo', 'selected' : false},
      {'family' : 'fontawesome', 'font' : 'FontAwesome','selected' : false},
      {'family' : 'fontelico', 'font' : 'fontelico','selected' : false},
      {'family' : 'maki', 'font' : 'maki','selected' : false},
      {'family' : 'openwebicons', 'font' : 'OpenWeb Icons','selected' : false},
      {'family' : 'typicons', 'font' : 'Typicons','selected' : false},
      {'family' : 'zocial', 'font' : 'zocial','selected' : false}
      // {'family' : 'webfont7696', 'font' : 'zocial','selected' : false}
    ]);

    var creatorView = new App.Views.Creator({ collection : allIconsCollection });
    $('body').append(creatorView.render().el);

    var outputView = new App.Views.Output({ collection : allIconsCollection });
    $('section[data-name="output"] div').append(outputView.render().el);

  });

})(jQuery, window, document);
