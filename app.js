var myapp = angular.module("myapp", ['ngRoute', 'ngCookies','ui.sortable']);

myapp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when("/register", {
                controller: 'RegisterController',
                templateUrl: 'register/register.html',
                controllerAs: 'registerCtrl'
            }).
            when('/main', {
                templateUrl: 'main/main.html',
                controller: 'mainController',
                controllerAs: 'mainCtrl'
            }).
             when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.html',
                controllerAs: 'loginCtrl'
            }).
            when('/details/:id', {
                 templateUrl: 'app/views/details.html',
                 controller: 'detailsController as detailsCtrl'
            }).
            when("/", {
                redirectTo: '/main'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
]);
myapp.run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {
        
        $rootScope.userData = $cookies.getObject('userToken');
        if ($rootScope.userData) {
            $http.defaults.headers.common['Authorization'] = $rootScope.userData;
        }  
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // go to login page  
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1; 
            var loggedIn = $rootScope.userData;
            if (restrictedPage && angular.isUndefined(loggedIn)) {
                $location.path('/login');
            } else {
                if ($rootScope.userData) {
                    $http.defaults.headers.common['Authorization'] = $rootScope.userData;
                } 
            }
        });
    }
]);