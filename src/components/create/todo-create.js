angular.module('todoApp.components')
  .component('create', {
    bindings: {
      todos: '<'
    },
    templateUrl: 'components/create/todo-create.html',
    controller: TodoCreateController
  });

function TodoCreateController(ToDoService) {
  var self = this;

  self.addTodo = function() {
    ToDoService.addTodo(self.todoText);
    self.todoText = '';
  };
}