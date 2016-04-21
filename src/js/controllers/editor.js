(function (window, angular, undefined) {

    angular.module( 'coderControllers' ).controller( 'editorCtrl', [
        '$scope', '$timeout', '$location', '$log', '$routeParams', '$mdSidenav', 'User',
        function( $scope, $timeout, $location, $log, $routeParams, $mdSidenav, User ) {
            $log.log( "loaded editorCtrl ..." );

            $scope.streams = {
                editor: null,
                stdout: null,
            };
            $scope.editorSettings = {
                initDone: false,
                busy: false,
                editor: 'text',
                language: 'javascript',
                tab: $routeParams.tab || 'Buy Home',
            };
            
            $scope.changeTab = function( tab ) {
                $scope.editorSettings.tab = tab;
            };
            
            $scope.openRight = function() {
                if ( ! $scope.isOpenRight()) {
                    $scope.toggleRight();
                }
            };
            $scope.toggleRight = buildToggler('right');
            $scope.isOpenRight = function(){
                return $mdSidenav( 'right' ).isOpen();
            };
            /**
             * Supplies a function that will continue to operate until the
             * time is up.
             */
            function debounce(func, wait, context) {
                var timer;
                return function debounced() {
                    var context = $scope,
                        args = Array.prototype.slice.call(arguments);
                    $timeout.cancel(timer);
                    timer = $timeout(function() {
                        timer = undefined;
                        func.apply(context, args);
                    }, wait || 10);
                };
            }
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildDelayedToggler(navID) {
                return debounce(function() {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                }, 200);
            }
            function buildToggler(navID) {
                return function() {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                }
            }


            
	}
    ]);

})(window, window.angular);
