angular.module('todoApp', [
  'ui.router','todoApp.components','todoApp.services'
])
.config(routing);

function routing ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos');
  $stateProvider
    .state('todos', {
      url: '/todos',
      template: '<todos todos="$resolve.todos"></todos>',
      resolve: {
        todos: function(ToDoService) {
          return ToDoService.getTodos();
        }
      }
    })
    .state('todos.create', {
      url: '/create',
      template: '<create todos="$resolve.todos"></create>',
      resolve: {
        todos: function(ToDoService) {
          return ToDoService.getTodos();
        }
      }
    })
    .state('todos.edit', {
      url: '/edit',
      template: '<edit todos=$resolve.todos></edit>',
      resolve: {
        todos: function(ToDoService) {
          return ToDoService.getTodos();
        }
      }
    });
}
