angular.module('todoApp.services')
	.service('ToDoService', ToDoService);

function ToDoService() {
	var self = this;

	self.appTitle = "Do or do not, there is no try";
	self.saved = localStorage.getItem('todos');
  	self.todos = (localStorage.getItem('todos')!==null) ? JSON.parse(self.saved) : [ {id: 0, text: 'Learn AngularJS', done: false}, {id: 1, text: 'Build an Angular app', done: false} ];
  	localStorage.setItem('todos', JSON.stringify(self.todos));

	self.getTodos = function() {
  		return self.todos;
	};

	self.getById = function(id) {

	};

	self.remaining = function() {
		var count = 0;
	    angular.forEach(self.todos, function(todo){
	    	count+= todo.done ? 0 : 1;
	    });
	    return count;
	};

	self.archive = function() {
		console.log(self.todos.filter(function(todo) {
			return todo.done !== true;
		}));
		self.todos = self.todos.filter(function(todo) {
			return todo.done !== true;
		});
		localStorage.setItem('todos', JSON.stringify(self.todos));
	};

	self.removeTodo = function(id) {
		var index = self.todos
							.map(function (element) {return element.id;})
							.indexOf(id);
		if (index === -1) {
			return;
		}
		self.todos.splice(index, 1);
		localStorage.setItem('todos', JSON.stringify(self.todos));
	};

	self.addTodo = function(todoText) {
     	var tmp = null;
      	if (self.todos.length > 0) {
        	tmp = self.todos[self.todos.length - 1].id;
      	}
      	else {
      		tmp = -1;
      	}
      	self.todos.push({
        	id: ++tmp,
        	text: todoText,
          	done: false
      	});
      	localStorage.setItem('todos', JSON.stringify(self.todos));
    };

  self.editTodo = function(todoText) {
  	console.log(todoText);
    localStorage.setItem('todos', JSON.stringify(self.todos));
    //console.log(id);
    //console.log($scope.todoText);
    //var todos = JSON.parse(localStorage.todos);
    //console.log($scope.todos[id]);
    //todos[id].text = 'fw';
    //localStorage.setItem("todos", JSON.stringify(todos));
  };
  //return elem by id
}