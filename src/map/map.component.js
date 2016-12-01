(function () {
    'use strict';
    angular.module('app')
        .component('chargepoints', {
            templateUrl: 'views/map.component.html',
            bindings: {
                markers: '<',
                center: '<'
            },
            controller: function (mapService) {
                let vm = this;

                let mapOptions = {
                    zoom: 8,
                    center: {
                        lat: vm.center.lat,
                        lng: vm.center.lng
                    },
                    mapTypeId: 'roadmap'
                };


                mapService.initMap(mapOptions);
                for (let marker of vm.markers){
                    mapService.addMarker(marker.lat, marker.lng, marker.title);
                }
            }
        });
})();