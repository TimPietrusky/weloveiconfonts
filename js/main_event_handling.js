(function() {
  window.App = {
    Models : {},
    Collections : {},
    Views : {}
  };

  window.template = function(id) {
    return _.template($('#' + id).html());
  };

  App.Models.Task = Backbone.Model.extend({
    validate : function(attributes) {
      if (!$.trim(attributes.title)) {
        return 'A task requires a title';
      }
    }
  });

  App.Collections.Tasks = Backbone.Collection.extend({model : App.Models.Task});

  App.Views.Tasks = Backbone.View.extend({
    tagName : 'ul',

    initialize : function() {
      this.collection.on('add', this.addOne, this);
    },

    render : function() {
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne : function(task) {
      var taskView = new App.Views.Task({model : task});
      this.$el.append(taskView.render().el);
    }
  });

  App.Views.Task = Backbone.View.extend({
    tagName : 'li',

    template : template('taskTemplate'),

    initialize : function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    events : {
      'click .edit' : 'editTask',
      'click .delete' : 'deleteTask'
    },

    editTask : function() {
      var newTitle = prompt('Change the task', this.model.get('title'));
      this.model.set('title', newTitle);
    },

    deleteTask : function() {
      this.model.destroy();
    },

    remove : function() {
      this.$el.remove();
    },

    render : function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  }); 

  App.Views.AddTask = Backbone.View.extend({
    el : '#addTask',

    events : {
      'submit' : 'submit'
    },

    initialize : function() {
      
    },

    submit : function(e) {
      e.preventDefault();
      
      var newTitle = $(e.currentTarget).find('input[type=text]').val();
      var task = new App.Models.Task({title : newTitle});

      this.collection.add(task);
    }
  });

  var tasksCollection = new App.Collections.Tasks([
    {
    title : 'test 1',
    priority : 4
  },
    {
    title : 'test 2',
    priority : 3
  },
    {
    title : 'test 3',
    priority : 2
  },
  ]);

  var tasksView = new App.Views.Tasks({collection : tasksCollection});
  $('body').append(tasksView.render().el);

  var addTaskView = new App.Views.AddTask({collection : tasksCollection});
})();