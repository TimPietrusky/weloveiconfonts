(function() {
  window.App = {
    Models : {},
    Collections : {},
    Views : {}
  };

  window.template = function(id) {
    return _.template($('#' + id).html());
  };

  window.vent = _.extend({}, Backbone.Events);

  /***************************************************
   *
   * Models 
   */
  App.Models.Icon = Backbone.Model.extend({
  });

  App.Models.Creator = Backbone.Model.extend({
  });

  // App.Models.Task = Backbone.Model.extend({
  //   validate : function(attributes) {
  //     if (!$.trim(attributes.title)) {
  //       return 'A task requires a title';
  //     }
  //   }
  // });

  /***************************************************
   *
   * Collections 
   */
  App.Collections.Icons = Backbone.Collection.extend({
    model : App.Models.Icon,
    url : 'http://weloveiconfonts.com/api/?json=',

    initialize : function(attr) {
      this.url += attr.family;
    }
  });

  App.Collections.Creator = Backbone.Collection.extend({
    model : App.Models.Creator
  });


  /***************************************************
   *
   * Views 
   */

  /**
   * Some icons in a list.
   */
  App.Views.Icons = Backbone.View.extend({
    tagName : 'ul',

    initialize : function() {
      // this.collection.on('add', this.addOne, this);
    },

    render : function() {
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne : function(icon) {
      var iconView = new App.Views.Icon({model : icon});
      this.$el.append(iconView.render().el);
    }
  });

  /**
   * An icon.
   */
  App.Views.Icon = Backbone.View.extend({
    tagName : 'li',
    template : template('iconTemplate'),

    initialize : function() {
      // this.model.on('change', this.render, this);
      // this.model.on('destroy', this.remove, this);
    },

    events : {
      'click' : 'clicked'
    },

    clicked : function() {
      vent.trigger("iconClicked", {'class' : this.$el.attr('class')});
    },

    render : function() {
      var template = this.template(this.model.toJSON());

      // Set class
      this.$el.attr('class', this.model.get('name'));
      // Set title
      this.$el.attr('data-text', this.model.get('name'));

      this.$el.html(template);
      return this;
    }
  }); 

  /**
   * Your collections. 
   */
  App.Views.Creator = Backbone.View.extend({
    tagName : 'div',
    className : 'creator',

    template : template('creatorTemplate'),
    preview : '',
    collected : '',

    initialize : function() {
      vent.bind("iconClicked", this.iconClicked, this);
      vent.bind("addClicked", this.addClicked, this);

      this.collection.each(function(model) {
        model.on('change', this.counter, this);
      }, this);

      // $('.creator plain').html(1);
      $('article button.add').on('click', function(e) {
        vent.trigger("addClicked", $(e.currentTarget));
      });
    },

    iconClicked : function(data) {
      var textarea = $(this.preview.selector);
      textarea.val(data.class);
      
      textarea.css({'opacity': '.2'});
      textarea.fadeOut(0, function(){
        $(this).fadeIn(200, function() {
          textarea.css({'opacity': '1'});
        });
      });
    },

    addClicked : function(el) {

      var data = el.attr('data-collection');

      if (!el.attr('disabled')) {
        el.attr('disabled', "disabled")
      
        // Change type and add another text
        el.attr('data-type', '4');
        el.html('<span class="entypo entypo-check"></span>');

        _(this.collection.models).each(function(asdf) {
          if (asdf.get('family') == data && asdf.get('selected') == false) {
            asdf.set('selected', true);
          }
        }, this);
      }

      return this;
    },

    counter : function() {
      var counter = $('.creator .plain');
      counter.html(parseInt(counter.html()) + 1);
    },

    render : function() {
      var template = this.template();
      this.$el.html(template);

      this.preview = $('.creator textarea');
      this.collected = $('.creator .plain');
      return this;
    }
  }); 

  /**
   * Your collections. 
   */
  App.Views.Output = Backbone.View.extend({
    el : 'pre.output',
    template : template('outputTemplate'),

    initialize : function() {
      this.collection.each(function(model) {
        model.on('change', this.create, this);
      }, this);

      console.log(this.$el);
    },

    create : function(model) {
      var url = "@import url(http://weloveiconfonts.com/api/?family=",
          body = "body {",
          count = 0;

      this.collection.each(function(model) {
        if (model.get('selected')) {
          if (count++ > 0) {
            url += "|";
          }
          url += model.get('family');
          body += "\n  font-family: '" + model.get('font') + "', sans-serif;"
        }
      }, this);

      url += ");\n\n";
      body += "\n}\n\n";

      // URL
      console.log(this.$el);
      this.$el.html(url + body);
    },
  });


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



  var allIconsCollection = new App.Collections.Creator([
    {"family" : "brandico", "font" : "brandico", "selected" : false},
    {"family" : "entypo", "font" : "entypo", "selected" : false},
    {"family" : "typicons", "font" : "Typicons","selected" : false},
    {"family" : "zocial", "font" : "zocial","selected" : false}
  ]);

  var creatorView = new App.Views.Creator({ collection : allIconsCollection });
  $('body').append(creatorView.render().el);

  var outputView = new App.Views.Output({ collection : allIconsCollection });
  $('section[data-name="output"] div').append(outputView.render().el);

})();

