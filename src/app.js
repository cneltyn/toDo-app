angular.module('todoApp', [
  'ui.router','todoApp.components'
])
.config(routing);

function routing ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos');
  $stateProvider
    .state('todos', {
      url: '/todos',
      templateUrl: 'components/todo-list.html',
      controller: 'TodoListController',
      controllerAs: 'tlCntl',
      resolve: {}
    })
    .state('otherwise', {
      url: '/todos',
      templateUrl: 'components/todo-list.html'
    });
}
