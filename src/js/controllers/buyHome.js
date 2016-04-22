(function (window, angular, undefined) {

    angular.module( 'coderControllers' ).controller( 'buyHomeCtrl', [
        '$scope', '$timeout', '$location', '$log', '$routeParams', 'User',
        function( $scope, $timeout, $location, $log, $routeParams, User ) {
            $log.log( "loaded buyHomeCtrl ..." );

            $scope.editorSettings = {
                initDone: false,
                busy: false,
                editor: 'text',
                language: 'javascript',
                tab: $routeParams.tab || 'team',
		list: null,
            };
            
	    User.getChecklist( "buy_home", function( resp ) {
                if ( resp.data ) {
		    $log.log( resp.data );
                    $scope.editorSettings.list = resp.data;
                }
            });

            $scope.changeTab = function( tab ) {
                $scope.editorSettings.tab = tab;
            };
            
	}
    ]);

})(window, window.angular);
