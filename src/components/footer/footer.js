angular.module('todoApp.components')
  .component('footer', {
    templateUrl: 'components/footer/footer.html',
    controller: TodoFooter
  });

  function TodoFooter() {
    var self = this;

    self.date = Date.now();
}