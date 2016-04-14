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
    url : document.URL + 'api/?json=',

    initialize : function(attr) {
      this.url += attr.family;
    },

    toggleView : function() {
    },

    comparator: function (model) {
      return model.get('name');
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
    iconfonts : undefined,

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
      'click a' : 'scrollTo',
      'click .toggle' : 'toggleView'
    },

    iconClicked : function(data) {
      var textarea = $(this.preview.selector);

      data['class'] = data['class'].replace(/active/g, '');
      textarea.val(data['class']);

      if (textarea.val != "") {
        textarea.css({'opacity': '0'});
        textarea.fadeOut(0, function() {
          $(this).fadeIn(0, function() {
            textarea.css({'opacity': '1'});
          });
        });
      }
    },

    /**
     * Handle add / remove icon font to the collection
     *
     * default : ' add'
     */
    addClicked : function(el) {
      var data = el.attr('data-collection');

      // Sub navigation
      // if (this.iconfonts == undefined) {
      //   this.iconfonts = $('.creator .iconfonts a');
      // }

      //  Remove From collection
      if (el.attr('data-type') == 2) {
        // Change type
        el.attr('data-type', '3');
        // Change the text
        el.html('<span class="fontawesome-remove"></span>  remove');

        _(this.collection.models).each(function(asdf) {
          if (asdf.get('family') == data) {
            ++this.selected;
            asdf.set('selected', true);
          }
        }, this);

      //  add
      } else if (el.attr('data-type') == 3) {
        // Change type
        el.attr('data-type', '2');
        // Change the text
        el.html('<span class="fontawesome-heart"></span>  add');

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
      var counter = $('.creator .plain');

      if (this.selected > 0) {
        counter.html('Use ' + this.selected);

        if (!counter.hasClass('active')) {
          counter.addClass('active');
        }
      } else {
        counter.removeClass('active');
        counter.html();
      }
    }
,
    /**
     * Scroll to a element because the default
     * href="#" + id doesn't work on mobile browsers.
     */
    scrollTo : function(e) {
      var jump = $(e.currentTarget).attr('href');

      if (jump != '#') {
        var new_position = $(jump).offset();
        window.scrollTo(new_position.left, new_position.top);
        return false;
      }
    },

    /**
     * Toggle between full & minimal view for the icons.
     */
    toggleView : function(e) {
      e.preventDefault();

      var icon_lists = $('section[data-name="preview"]'),
          el = $(e.currentTarget);

      // Full view
      if (icon_lists.hasClass('minimal')) {
        icon_lists.removeClass('minimal');
        el.removeClass('entypo-plus-squared');
        el.addClass('entypo-minus-squared');

      // Minimal view
      } else {
        icon_lists.addClass('minimal');
        el.removeClass('entypo-minus-squared');
        el.addClass('entypo-plus-squared');
      }
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
      var url = "@import url(<span class=\"url\">http://weloveiconfonts.com/api/?family=",
          link = "&lt;link href='http://weloveiconfonts.com/api/?family='",
          body = "",
          count = 0,
          count_added = 0;

      this.collection.each(function(model) {
        if (model.get('selected')) {
          if (count++ > 0) {
            url += "|";
          }
          url += model.get('family');

          body += "<span>/* " + model.get('family') + " */</span>\n"+
            "[class*=\"" + model.get('family') + "-\"]::before {"+
            "\n  <span class=\"css\">font-family: '" + model.get('font') + "', sans-serif;</span>"+
            "\n}\n\n";

        } else {
          ++count_added;
        }
      }, this);

      url += "</span>);\n\n";
      link += "\n\ rel='stylesheet' type='text/css'>";

      // Set the default pro tip when all collection are removed
      if (count_added == this.collection.length) {
        url = "";
        body = "Pro tip: Select some icon fonts to the see real output here!\n\n";
      }

      // URL
      this.$el.html(url + body);
    },
  });

})();
