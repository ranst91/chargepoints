(function () {
    'use strict';
    angular.module('app.auth')
        .controller('LoginController', LoginController);

    function LoginController(authService, messageService, $state) {
        let vm = this;
        vm.submit = submit;

        initController();
        ////////////

        /**
         * @name initController
         * @desc Reset the login status
         */
        function initController() {
            authService.logout();
        }

        /**
         * @name submit
         * @desc Submit a login request using email and password.
         *       If user is logged in, Prompts welcome message.
         *       Else, prompts error
         */
        function submit() {
            authService.login(vm.email, vm.password).then(response => {
                if (response === true) {
                    //get user info from Auth.getUserInfo
                    authService.getUserInfo().then(response => {
                        let userInfo = response.data;
                        //toastr welcome
                        messageService.success(`Welcome ${userInfo.firstName}`);
                        //redirect home
                        $state.go('home');
                    });
                } else {
                    messageService.error('Email or password is incorrect');
                }
            }).catch(error => {
                //USE $LOG!!!
                messageService.error('It seems like there was an error logging you in');
            });
        }
    }
})();
