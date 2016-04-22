(function (window, angular, undefined) {

    angular.module( 'coderControllers' ).controller( 'startupCtrl', [
        '$scope', '$timeout', '$location', '$log', '$routeParams', 'User',
        function( $scope, $timeout, $location, $log, $routeParams, User ) {
            $log.log( "loaded startupCtrl ..." );

            $scope.editorSettings = {
                initDone: false,
                busy: false,
                tab: $routeParams.tab || 'team',
		list: null,
            };

            // if ( $routeParams.list_name ) { // Get problem definition
            User.getChecklist( "startup", function( resp ) {
                if ( resp.data ) {
		    $log.log( resp.data );
                    $scope.editorSettings.list = resp.data;
                }
            });
            // }

            $scope.changeTab = function( tab ) {
                $scope.editorSettings.tab = tab;
            };
            
	}
    ]);

})(window, window.angular);
