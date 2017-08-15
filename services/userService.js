(function () {
    'use strict';

    angular
        .module('myapp')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http', '$cookies', '$rootScope'];
    function UserService($http, $cookies, $rootScope) {
        var service = {};

        service.path = 'http://todos.moonsite.co.il/api/';
        service.GetAll = GetAll;
        service.AddTask = AddTask;
        service.Login = Login;
        service.Update = Update;
        service.Delete = Delete;
        service.Register = Register;
        service.SearchTask = SearchTask;
        service.SetUser = SetUser;
        service.GetUser = GetUser;

        return service;

        /**
         * Register user
         * @param {data} object - user data
         */
        function Register(data) {
            return $http.post(service.path + 'register', data).then(handleSuccess, handleError('Error registering user'));
        }

        /**
         * Login user
         * @param {data} object - user data
         */
        function Login(data) { 
            return $http.post(service.path + 'login', data).then(handleSuccess, handleError('Error login user'));
        }

        /**
         * Get all tasks data
         */
        function GetAll() {
            return $http.get(service.path + 'tasks').then(handleSuccess, handleError('Error getting all tasks'));
        }

        /**
         * Adding new task
         * @param {data} object - task data
         */
        function AddTask(data) {
            return $http.post(service.path + 'tasks', data).then(handleSuccess, handleError('Error adding task'));
        }

        /**
         * Search for task
         * @param {query} string - query
         */
        function SearchTask(query) {
             return $http.get(service.path + 'tasks/search?q='+query).then(handleSuccess, handleError('Error getting task'));
        }
       
        /**
         * Update for task
         * @param {task} object - task data
         */
        function Update(task) {
            var task = {'id':task.id,'order':task.order,'task':task.task};
            return $http.put(service.path + 'tasks/' + task.id, task).then(handleSuccess, handleError('Error updating task'));
        }
        
        /**
         * Delete task
         * @param {id} string - task id
         */
        function Delete(id) {
            return $http.delete(service.path + 'tasks/' + id).then(handleSuccess, handleError('Error deleting task'));
        }
 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        /**
         * Set user token
         * @param {string} token - user token
         */
        function SetUser(token) { 
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('userToken', token, { expires: cookieExp });
            $rootScope.userData = $cookies.getObject('userToken');
        }

        /**
         * Check if user has token
         */
        function GetUser(){
            return (angular.isDefined($cookies.getObject('userToken')))
        }
    }
 
})();
 