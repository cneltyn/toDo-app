angular.module('todoApp.components')
  .component('todo-edit', {
    restrict: 'E',
    scope: {},
    templateUrl: 'todo-edit.html',
    bindings: {appTitle: '='},
    controller: TodoEditController
  });

function TodoEditController(todos, ToDoService) {
	var self = this;
  console.log(self.appTitle);
  self.todos = todos;
    self.editTodo = function() {
      ToDoService.editTodo(self.todoText);
      self.todoText = '';
  };
}