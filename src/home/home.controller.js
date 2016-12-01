(function () {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);

    function HomeController(mapService) {
        let vm = this;
        vm.markers = [];
        vm.center = {};

        getMarkersFromApi();
        ////////////

        /**
         * Get markers from the charge points API (chargepoints.json)
         */
        function getMarkersFromApi(){
            mapService.getMarkersFromApi().then(res => {
                vm.markers = res;
                vm.center = vm.markers[0];
            });
        }
    }
})();
