// angular.module('todoApp.components')
//   .controller('TodoListController', todoListController);

angular.module('todoApp.components')
  .component('todos', {
    // restrict: 'E',
    // scope: {},
    bindings: {
    todos: '='
    },
    templateUrl: 'components/todo-list.html',
    controller: TodoListController
    // controllerAs: 'tlCntl'
  });

function TodoListController (ToDoService) {
  var self = this;
  self.appTitle = ToDoService.appTitle;
  console.log(self.appTitle);
  //console.log($scope.$parent.$resolve.todos);
  self.todos = todos;
  console.log(self.todos);
  self.removeTodo = function(id) {
    ToDoService.removeTodo(id);
  };
  self.remaining = function() {
    return ToDoService.remaining();
  };
  self.archive = function() {
    ToDoService.archive();
  };
}

// angular.module('todoApp.components')
//   .component('todos', {
//     restrict: 'E',
//     scope:{},
//     templateUrl: 'components/todo-list.html',
//     controller: TodoListController
//   });