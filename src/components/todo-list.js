angular.module('todoApp.components')
  .controller('TodoListController', todoListController);

function todoListController ($scope) {
  $scope.appTitle = "Do or do not, there is no try";
  $scope.saved = localStorage.getItem('todos');
  $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {id: 0, text: 'Learn AngularJS', done: false}, {id: 1, text: 'Build an Angular app', done: false} ];
  localStorage.setItem('todos', JSON.stringify($scope.todos));

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo){
      count+= todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo){
      if (!todo.done)
        $scope.todos.push(todo);
    });
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };

  $scope.editTodo = function(id) {
    //console.log(id);
    //console.log($scope.todoText);
    //var todos = JSON.parse(localStorage.todos);
    //console.log($scope.todos[id]);
    //todos[id].text = 'fw';
    //localStorage.setItem("todos", JSON.stringify(todos));
  };

  $scope.removeTodo = function(id) {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo){
      if (todo.id !== id)
        $scope.todos.push(todo);
    });
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };
}
