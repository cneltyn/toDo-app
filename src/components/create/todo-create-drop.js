angular
  .module('todoApp.components')
  .directive('drag', drag);

function drag() {
  return {
    restrict: 'EA',
    require: 'ngModel',
    link: link
  };

  function link(scope, element, attrs, ngModelCtrl) {
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
      ngModelCtrl.$setViewValue(loadedFile.target.result);
      ngModelCtrl.$render();
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
}
