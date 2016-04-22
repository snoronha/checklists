(function (window, angular, undefined) {

    angular.module('coderDirectives').directive( 'headerGeneral', [
        '$log', '$location', 'User',
        function( $log, $location, User ) {
            return {
                // restrict: "E",
                template: "<md-toolbar class=\"demo-toolbar md-primary\"> \
                             <div class=\"md-toolbar-tools\" layout=\"row\" layout-align=\"space-between center\"> \
                               <h3 class=\"ng-binding\"><a href=\"/#/home\">Check Lists</a></h3> \
                               <div class=\"md-primary\" layout=\"row\" layout-align=\"end center\"> \
                               </div> \
                             </div> \
                           </md-toolbar>",
                link: function( scope ) {
                    scope.config  = {
                        isLoggedIn: User.getUserid() ? true : false,
                    };

                    scope.logout = function() {
                        User.logoutUser();
                        $location.path( '/home' );
                    };

                    scope.gotoLogin = function() {
                        $location.path( '/login' );
                    };
                }
            };
        }
    ]);

})(window, window.angular);
