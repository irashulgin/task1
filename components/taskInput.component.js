(function(angular) {
  'use strict';
  function taskInputController() {
    var ctrl = this;

    /**
     * add new task
     * @param {text} string - The text for new task
     */
    ctrl.addTask = function(text) {
      ctrl.onClick({text: text});
    };

    /**
     * search task
     * @param {query} string - The query for the search
     */
    ctrl.searchTask = function(query) {
      ctrl.onClick({query: query});
    };

    ctrl.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      ctrl.type = ctrl.type;
    };
  }

  angular.module('myapp').component('taskInput', {
    templateUrl: '../components/taskInput.html',
    controller: taskInputController,
    bindings: {
      type: '@?',
      onClick: '&'
    }
  });
})(window.angular);