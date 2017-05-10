melvaultApp = angular.module('melvaultApp', ['angular-loading-bar', 'ui-notification'])
melvaultApp.config(['NotificationProvider', '$httpProvider', function(NotificationProvider, $httpProvider) {
    NotificationProvider.setOptions({
        delay: 3000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

melvaultApp.controller('melvaultCtrl', ['$scope', '$http', 'Notification', function ($scope, $http, Notification) {
    $scope.shortUrl = {
        original_url: ''
    }

    $scope.cpuData = [];
    $scope.niftyGainers = [];

    var getShortUrl = function() {
        $http.get('/get_cpu_data/').
        success(function(data, status, headers, config) {
            $scope.cpuData = data.cpuData;
        }).
        error(function(data, status, headers, config) {
            Notification.error(data.message);
        });
    }

    var getNeseData = function() {
        Notification.primary("fetching data for given url after 2 minutes",.300);
        $http.get('/get_neft_data/').
        success(function(data, status, headers, config) {
            $scope.niftyGainers = data.data;
        }).
        error(function(data, status, headers, config) {
            Notification.error(data.message);
        });
    }

    setInterval(function (){getNeseData();}, 1000*60);

    var init = function(){
        getShortUrl();
        getNeseData();
    }

    init();
}]);
