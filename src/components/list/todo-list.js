angular.module('todoApp.components')
  .component('todos', {
    bindings: {
      todos: '<'
    },
    templateUrl: 'components/list/todo-list.html',
    controller: TodoListController
  });

function TodoListController (ToDoService) {
  var self = this;

  self.appTitle = ToDoService.appTitle;

  self.removeTodo = function(id) {
    ToDoService.removeTodo(id);
  };

  self.remaining = function() {
    return ToDoService.remaining();
  };

  self.archive = function() {
    ToDoService.archive();
    self.todos = ToDoService.getTodos();
  };
}