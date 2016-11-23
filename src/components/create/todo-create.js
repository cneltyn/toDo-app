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
      scope: {content:'='},
      link: function (scope, element, attrs, controller) {

        scope.content = "or drop a .txt file here, edit and copy upwards";

        var processDragOverOrEnter;

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

          if (event !== null) {
            event.preventDefault();
          }
          var reader = new FileReader();
          reader.onload = insertText;
          reader.readAsText(event.dataTransfer.files[0]);
        }
      }
    };
  }]);

function TodoCreateController($state, ToDoService) {
  var self = this;
  console.log(this.text);
  self.addTodo = function() {
    ToDoService.addTodo(self.todoText);
    $state.go('todos');
  };
}