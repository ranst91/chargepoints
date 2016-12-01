(function () {
    'use strict';
    angular.module('app')
        .service('mapService', mapService);

    function mapService($http) {
        let service = {
            initMap: initMap,
            addMarker: addMarker,
            getMarkersFromApi: getMarkersFromApi
        };
        return service;
        //////////////////


        /**
         * @name initMap
         * @desc Initialized a google maps object
         * @param {Object} options The options to use when initializing the map
         */
        function initMap(options) {
            options.center = _getLatLng(options.center.lat, options.center.lng);
            service.map = new google.maps.Map(document.getElementById('map_self'), options);
        }

        /**
         * @name addMarker
         * @desc Creates a new google maps marker object
         * @param {String} lat Latitude parameter
         * @param {String} lng Longitude parameter
         * @param {String} title Title to use for the marker
         * @returns {Object} google maps Marker
         */
        function addMarker(lat,lng, title) {
            return new google.maps.Marker({
                position: _getLatLng(lat,lng),
                map: service.map,
                title: title
            });
        }

        /**
         * @name _getLatLng
         * @desc Returnes a new lat-lng google maps object
         * @param {String} lat Latitude parameter
         * @param {String} lng Longitude parameter
         * @returns {Object} google maps lat-lng object
         */
        function _getLatLng(lat,lng){
            return new google.maps.LatLng(lat, lng);
        }

        /**
         * @name getMarkersFromApi
         * @desc Gets all data from the chargepoints API
         * @returns {Function}
         */
        function getMarkersFromApi(){
            return $http.get('/chargepoints.json').then(res => {
                return mapChargePointsData(res.data);
            });
        }


        /**
         * @name mapChargePointsData
         * @desc Maps the chargepoints data to return a usable marker object for each item in the array
         * @returns {Array} a new array with relevant data only
         */
        function mapChargePointsData(data){
            return data.map(marker => {
                return {
                    title: `${marker.address}, ${marker.city}`,
                    lat: marker.lat,
                    lng: marker.lng
                };
            });
        }
    }
})();
