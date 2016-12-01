(function () {
    'use strict';
    angular.module('app.auth')
        .service('authService', authService);

    function authService($http, $httpParamSerializer, $localStorage) {
        /**
         * Exposed functions available from this service
         * @type {{login: login, logout: logout, getUserInfo: getUserInfo}}
         */
        let service = {
            login: login,
            logout: logout,
            getUserInfo: getUserInfo
        };

        let endpoint_login = 'https://api.test.thenewmotion.com/oauth2/access_token';
        let endpoint_info = 'https://api.test.thenewmotion.com/v1/me';
        return service;
        ///////////////////

        // Email: programming-assignment@thenewmotion.com
        // Password:Zea2E5RA
        /**
         * @name login
         * @desc Sends a login request to the server
         * @param {String} email
         * @param {String} password
         * @returns {Function}
         */
        function login(email, password) {
            return $http({
                method: 'POST',
                url: endpoint_login,
                headers: {
                    "Authorization": "Basic dGVzdF9jbGllbnRfaWQ6dGVzdF9jbGllbnRfc2VjcmV0=",
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializer({
                    grant_type: "password",
                    username: email,
                    password: password
                })
            }).then(res => {
                return _registerAccessToken(res.data);
            });
        }

        /**
         * @name _registerAccessToken
         * @desc Sends a login request to the server
         *       If a token is present, register it to the local storage and return true
         *       else return false
         * @param {String} response A response from a login endpoint
         * @returns {Boolean}
         */
        function _registerAccessToken(response){
            if (response.access_token){
                $localStorage.currentUser = {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token
                };
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.access_token;
                $rootScope.isAuthenticated = true;
                return true;
            } else {
                return false;
            }
        }

        /**
         * @name getUserInfo
         * @desc Sends a request to get basic user info, based on authenticated user
         * @returns {Object} User object
         */
        function getUserInfo() {
            return $http({
                method: 'GET',
                url: endpoint_info,
            }).then(user => {
                return user;
            });
        }

        /**
         * @name logout
         * @desc Logs a user out by cleaning the local storage and the default token headers for http requests
         */
        function logout() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();