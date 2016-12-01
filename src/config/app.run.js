(function () {
    'use strict';
    angular.module('app')
        .run(run);

    function run($rootScope, $http, $location, $state, $localStorage) {
        if ($localStorage.currentUser) {
            $rootScope.isAuthenticated = true;
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            let publicPages = ['/auth/login'];
            let restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $rootScope.isAuthenticated = false;
                // $state.go('login');
                $location.path( "/auth/login" );
            }
        });
    }
})();
