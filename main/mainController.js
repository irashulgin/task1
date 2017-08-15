(function () {
    'use strict';
    angular
        .module('myapp')
        .controller('mainController', mainController);
  
    function mainController($location) {
        /*if (!UserService.GetUser()) {
          $location.path('/login');
        }*/
    }
 
})();