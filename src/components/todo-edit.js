angular.module('todoApp.components')
  .component('edit', {
    bindings: {
      todos: '<'
    },
    templateUrl: 'components/todo-edit.html',
    controller: TodoEditController
  });

function TodoEditController(ToDoService) {
	var self = this;

  console.log(self.todos);
  //self.todos = todos;

  self.editTodo = function() {
      console.log(self.todos.id);
      ToDoService.editTodo(self.todoText);
      self.todoText = '';
  };
}