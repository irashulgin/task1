(function () {
    'use strict';
 
    angular
        .module('myapp')
        .controller('RegisterController', RegisterController);
 
    RegisterController.$inject = ['UserService', '$location', '$rootScope'];
    function RegisterController(UserService, $location, $rootScope) {
        var self = this;
        
        self.register = register;

         /**
         * Updating email
         * @param {value} string - The email value
         */
        self.updateMyEmail = function(value){
           self.email = value;
        }

         /**
         * Updating password
         * @param {value} string - The password value
         */
        self.updateMyPassword = function(value){
           self.password = value;
        }

        /**
         * Registering user
         */
        function register() {
            self.dataLoading = true;
            self.user = {'email' : self.email, 'password': self.password};
            UserService.Register(self.user).then(function (response) {
                if (response.token) {
                    UserService.SetUser(response.token);
                    $location.path('/login');

                } else {
                    self.dataLoading = false;
                    self.error = response.message;
                }
            }); 
        }
    }
 
})();