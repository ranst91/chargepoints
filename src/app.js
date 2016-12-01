//Modules
// import './shared/app.core.module';
// import './auth/auth.module';

// //Configuration files
// import './config/app.route.js';
// import './config/app.interceptors';
// import './config/app.run';
//
// //Services
// import './services/messages.service';
// import './services/map.service';
//
// //Controllers and components
// import './home/home.controller';
// import './map/map.component';

//Initialize the app
(function () {
    angular.module('app', ["app.core", "app.auth"]);
})();
