angular.module('todoApp.components')
  .controller('TodoCreateController', todoCreateController);

function todoCreateController($scope) {
  	console.log($scope.todos.length);
  	console.log(localStorage.todos);
  	$scope.addTodo = function() {
  		console.log($scope.todoText);
  		//console.log($scope.todos[$scope.todos.length - 1].id);
  		var tmp = null;
  		if ($scope.todos.length > 0) {
  			tmp = $scope.todos[$scope.todos.length - 1].id;
  		}
  		else tmp = -1;

	    $scope.todos.push({
	    	id: ++tmp,
	    	text: $scope.todoText,
      		done: false
    	});
    	$scope.todoText = '';
    	localStorage.setItem('todos', JSON.stringify($scope.todos));
  	};
}