(function (window, angular, undefined) {

    var coderApp = angular.module('coderApp', [
        'ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate', 'ngMaterial',
        'coderControllers', 'coderServices', 'coderDirectives', 'coderFilters',
    ]);

    coderApp.config([
        '$routeProvider', '$locationProvider', '$httpProvider', '$mdIconProvider',
        function( $routeProvider, $locationProvider, $httpProvider, $mdIconProvider ) {

            // $locationProvider.hashPrefix('!'); // necessary for prerendering and SEO
            $mdIconProvider.defaultIconSet('/images/icons/content-icons.svg', 24);
            
            $routeProvider
                .when('/home', {
                    templateUrl: 'src/partials/home.html',
                    controller: 'homeCtrl'
                })
                .when('/login', {
                    templateUrl: 'src/partials/login.html',
                    controller: 'loginCtrl'
                })
                .when('/register', {
                    templateUrl: 'src/partials/register.html',
                    controller: 'registerCtrl'
                })
                .when('/startup', {
                    templateUrl: 'src/partials/startup.html',
                    controller: 'startupCtrl'
                })
                .when('/buy_home', {
                    templateUrl: 'src/partials/buy_home.html',
                    controller: 'buyHomeCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }
    ]);
    
    coderApp.run( function( $rootScope, $log, $location ) {
        $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
            // Util.logEntryInit(); // any init functions here
        });
    });
    
})(window, window.angular);

