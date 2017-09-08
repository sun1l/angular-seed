'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', [function() {
  
  }])
.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.items = { list: [] };
  
  $http({
    method: 'GET',
    url: 'http://www.mocky.io/v2/59b2206a1200006a0189220f'
  }).then(function(response) {
    console.log(JSON.parse(response.data));
    $scope.items.list = JSON.parse(response.data).items;
  }, function() {
    console.log('error');
  });
}])
.component('childComp', {
template: '<ul ng-repeat="item in items.list"><li>{{item.value}}</li></ul>',
bindings: {
  items: '<'
},
controller: ['$scope',function($scope) {
  $scope.items = this.items;
}]
});
