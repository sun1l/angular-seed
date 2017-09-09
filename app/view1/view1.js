'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'MainCtrl'
  });
}])
.controller('View1Ctrl', [function() {
  
  }])
.service('dataService', ['$http', function($http){
  let svc = this;
  this.items = {
    list: []
  };

  /** Fetch items from an external service and set the store */
  this.getItems = function() {
    $http({
      method: 'GET',
      url: 'http://www.mocky.io/v2/59b2206a1200006a0189220f'
    }).then(function(response) {
      console.log(response);
      svc.updateItems(JSON.parse(response.data).items);
    }, function() {
      console.log('error');
    });
  };

  /** Update the values in the global store */
  this.updateItems = function(values) {
    this.items.list = values;
  };

}])
.controller('MainCtrl', ['$scope', 'dataService', function($scope, dataService) {
  $scope.items = dataService.items;
  this.update = function(values) {
    dataService.updateItems(values);
  };
  dataService.getItems();
}])
.component('childComp', {
  template: '<ul ng-repeat="item in items.list"><input ng-model="item.value"></input></ul>',
  bindings: {
    items: '<',
    onChange: '&'
  },
  controller: ['$scope',function($scope) {
    var ctrl = this;
    $scope.items = this.items;
  }]
});
