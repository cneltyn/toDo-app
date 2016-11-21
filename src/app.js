angular.module('todoApp', [
  'ui.router','todoApp.components','todoApp.services'
])
.config(routing);

function routing ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos');
  $stateProvider
    .state('todos', {
      url: '/todos',
      // templateUrl: 'components/todo-list.html',
      // controller: 'TodoListController',
      // controllerAs: 'tlCntl',
      template: '<todos todos="$resolve.todos"></todos>',
      resolve: {
        todos: function(ToDoService) {
          return ToDoService.resolve('todos@getTodos');
        }
      }
    })
    .state('todos.create', {
      url: '/create',
      template: "<create></create>"
      //templateUrl: 'components/todo-create.html',
      //controller: 'TodoCreateController',
      //controllerAs: 'tcCntl'
    })
    .state('todos.edit', {
      url: '/edit',
      template: "<edit></edit>"
      // templateUrl: 'components/todo-edit.html',
      // controller: 'TodoEditController',
      // controllerAs: 'teCntl'
    });
    // .state('otherwise', {
    //   url: '/todos',
    //   templateUrl: 'components/todo-list.html'
    // });
}
