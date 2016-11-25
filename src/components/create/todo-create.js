angular.module('todoApp.components')
  .component('create', {
    bindings: {
      todos: '<'
    },
    templateUrl: 'components/create/todo-create.html',
    controller: TodoCreateController
  })
  .directive('drag', [function () {
    return {
      restrict: 'EA',
      scope: { content: '=' },
      link: function (scope, element) {
        var processDragOverOrEnter;

        scope.content = 'or drop a .txt file here, edit and copy upwards';

        processDragOverOrEnter = function (event) {
          if (event !== null) {
            event.preventDefault();
          }
          event.dataTransfer.effectAllowed = 'copy';
          return false;
        };

        element.bind('dragover', processDragOverOrEnter);
        element.bind('dragenter', processDragOverOrEnter);
        element.bind('drop', handleDropEvent);

        function insertText(loadedFile) {
          scope.content = loadedFile.target.result;
          scope.$apply();
        }

        function handleDropEvent(event) {
          var reader = new FileReader();
          if (event !== null) {
            event.preventDefault();
          }
          reader.onload = insertText;
          reader.readAsText(event.dataTransfer.files[0]);
        }
      }
    };
  }]);

function TodoCreateController($state, ToDoService) {
  var self = this;
  self.addTodo = function () {
    ToDoService.addTodo(self.todoText);
    $state.go('todos');
  };
}
