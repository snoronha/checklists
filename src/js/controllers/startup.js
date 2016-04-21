(function (window, angular, undefined) {

    angular.module( 'coderControllers' ).controller( 'startupCtrl', [
        '$scope', '$timeout', '$location', '$log', '$routeParams', 'User',
        function( $scope, $timeout, $location, $log, $routeParams, User ) {
            $log.log( "loaded startupCtrl ..." );

            $scope.editorSettings = {
                initDone: false,
                busy: false,
                editor: 'text',
                language: 'javascript',
                tab: $routeParams.tab || 'team',
            };
            
            $scope.changeTab = function( tab ) {
                $scope.editorSettings.tab = tab;
            };
            
	}
    ]);

})(window, window.angular);
