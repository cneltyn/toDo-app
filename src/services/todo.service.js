angular.module('todoApp.services')
    .service('ToDoService', ToDoService);

function ToDoService() {
  var self = this;

  self.appTitle = 'Do or do not, there is no try';
  self.saved = localStorage.getItem('todos');
  self.todos = (localStorage.getItem('todos') !== null) ? JSON.parse(self.saved) :
    [{ id: 0, text: 'Learn AngularJS', done: false },
    { id: 1, text: 'Build an Angular app', done: false }];
  localStorage.setItem('todos', JSON.stringify(self.todos));

  self.getTodos = function () {
    return self.todos;
  };

  self.find = function (id) {
    var todo = self.todos.filter(function (toDo) {
      return toDo.id === parseInt(id, 10);
    });

    return (todo && todo[0]) || null;
  };

  self.getById = function (id) {
    var index = self.todos
      .map(function (element) { return element.id; })
      .indexOf(id);
    if (index === -1) {
      return false;
    }
    return index;
  };

  self.getUnDo = function () {
    self.todos = self.todos.filter(function (todo) {
      return todo.done !== true;
    });
    return self.todos;
  };

  self.remaining = function () {
    var count = 0;
    angular.forEach(self.todos, function (todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  self.archive = function () {
    localStorage.setItem('todos', JSON.stringify(self.getUnDo()));
  };

  self.removeTodo = function (id) {
    self.todos.splice(self.getById(id), 1);
    localStorage.setItem('todos', JSON.stringify(self.todos));
  };

  self.addTodo = function (todoText) {
    var tmp = null;
    if (self.todos.length > 0) {
      tmp = self.todos[self.todos.length - 1].id;
    } else {
      tmp = -1;
    }
    self.todos.push({
      id: tmp += 1,
      text: todoText,
      done: false
    });
    localStorage.setItem('todos', JSON.stringify(self.todos));
  };

  self.editTodo = function () {
    localStorage.setItem('todos', JSON.stringify(self.todos));
  };
}
