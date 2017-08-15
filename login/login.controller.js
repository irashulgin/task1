(function () {
    'use strict';
 
    angular
        .module('myapp')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'UserService' ];
    function LoginController($location, UserService ) {
        var self = this;
        self.login = login;

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
         * Login function
         */
        function login() {
            self.dataLoading = true; 
            UserService.Login({'email': self.email,'password': self.password})
                 .then(function (response) {
                    if (response.token) {
                        UserService.SetUser(response.token);
                        self.dataLoading = false;
                        self.error = "";
                        $location.path('/main');
                    } else {
                        self.dataLoading = false;
                        self.error = response.message;
                    } 
                }, function (error) {
                    self.dataLoading = false;
                    self.error = response;
                });
        };
    }
 
})();

