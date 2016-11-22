angular.module('todoApp.components')
  .component('edit', {
    bindings: {
      todo: '<'
    },
    templateUrl: 'components/edit/todo-edit.html',
    controller: TodoEditController
  });

function TodoEditController($state, ToDoService) {
	var self = this;

  self.editTodo = function() {
    ToDoService.editTodo();
    $state.go('todos');
  };
}