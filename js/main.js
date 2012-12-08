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
    initialize : function() {

    },

    /**
     * Update and extend the data of the model. 
     */
    update : function() {
      var normal_name = this.get('name').split('-');
      normal_name = normal_name.slice(1, (normal_name.length)).join('-');

      // The name without the font-prefix
      this.set('normal-name', normal_name);
    }
  });

  App.Models.Creator = Backbone.Model.extend({
  });


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
    },

    render : function() {
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne : function(icon) {
      icon.update();
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

    events : {
      'click' : 'clicked'
    },

    clicked : function() {
      vent.trigger("iconClicked", {'class' : this.$el.attr('class')});

      $(this.el.parentElement).find('li.active').removeClass('active');
      this.$el.addClass('active');
    },

    render : function() {
      var template = this.template(this.model.toJSON());

      // Set class
      this.$el.attr('class', this.model.get('name'));
      // Set title
      this.$el.attr('data-text', this.model.get('normal-name'));

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
    selected : 0,

    template : template('creatorTemplate'),
    preview : '',
    collected : '',

    initialize : function() {
      // Liste
      vent.bind("iconClicked", this.iconClicked, this);
      vent.bind("addClicked", this.addClicked, this);

      this.collection.each(function(model) {
        model.on('change', this.counter, this);
      }, this);

      $('article button.add').on('click', function(e) {
        vent.trigger("addClicked", $(e.currentTarget));
      });
    },

    events : {
      'click a' : 'scrollTo'
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

    /**
     * Handle add / remove icon font to the collection
     * 
     * default : 'add to collection'
     *
     * [TimPietrusky] #6: Give the ability to remove fonts from collection. 
     */
    addClicked : function(el) {
      var data = el.attr('data-collection');

      // Remove from collection
      if (el.attr('data-type') == 2) {
        // Change type
        el.attr('data-type', '3');
        // Change the text
        el.html('<span class="fontawesome fontawesome-remove"></span> remove from collection');

        _(this.collection.models).each(function(asdf) {
          if (asdf.get('family') == data) {
            ++this.selected;
            asdf.set('selected', true);
          }
        }, this);

      // Add to collection
      } else if (el.attr('data-type') == 3) {
        // Change type
        el.attr('data-type', '2');
        // Change the text
        el.html('<span class="fontawesome fontawesome-plus"></span> add to collection');

        _(this.collection.models).each(function(asdf) {
          if (asdf.get('family') == data) {
            --this.selected;
            asdf.set('selected', false);
          }
        }, this);
      }

      return this;
    },

    counter : function() {
      console.log(this.selected);
      var counter = $('.creator .plain');
      counter.html(this.selected);
    }
,
    /**
     * Scroll to a element because the default
     * href="#" + id doesn't work on mobile browsers.
     */
    scrollTo : function(e) {
      var jump = $(e.currentTarget).attr('href');
      var new_position = $(jump).offset();
      window.scrollTo(new_position.left, new_position.top);
      return false;
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

  var iconsCollection4 = new App.Collections.Icons({'family':'fontawesome'});
  iconsCollection4.fetch().then(function() {
    var iconsView = new App.Views.Icons({ collection : iconsCollection4 });
    $('.fontawesome section[data-name="preview"] div').append(iconsView.render().el);
  });


  var allIconsCollection = new App.Collections.Creator([
    {"family" : "brandico", "font" : "brandico", "selected" : false},
    {"family" : "entypo", "font" : "entypo", "selected" : false},
    {"family" : "fontawesome", "font" : "FontAwesome","selected" : false},
    {"family" : "typicons", "font" : "Typicons","selected" : false},
    {"family" : "zocial", "font" : "zocial","selected" : false}
  ]);

  var creatorView = new App.Views.Creator({ collection : allIconsCollection });
  $('body').append(creatorView.render().el);

  var outputView = new App.Views.Output({ collection : allIconsCollection });
  $('section[data-name="output"] div').append(outputView.render().el);

})();