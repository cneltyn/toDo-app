angular.module('todoApp.components')
  .component('todo-create', {
    restrict: 'E',
    scope: {},
    templateUrl: 'todo-create.html',
    controller: TodoCreateController
});

function TodoCreateController(todos, ToDoService) {
    var self = this;
    self.todos = todos;
    self.addTodo = function() {
      ToDoService.addTodo(self.todoText);
      self.todoText = '';
    };
}