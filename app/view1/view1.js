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
  $scope.parentValue = "Parent Value";

  this.updatevalue = function(newValues) {
    console.log("Sfdsd", newValues)
    for (var key in newValues) {
      if (newValues.hasOwnProperty(key)) {
        $scope[key] = newValues[key];
      }
    };
  };
  
  $http({
    method: 'GET',
    url: 'http://www.mocky.io/v2/59b2206a1200006a0189220f'
  }).then(function(response) {
    $scope.items.list = JSON.parse(response.data).items;
  }, function() {
    console.log('error');
  });
}])
.component('childComp', {
template: '<ul ng-repeat="item in items.list"><input ng-model="item.value"></input></ul><input ng-blur="$ctrl.changeParent(parentvalue)" ng-model="parentvalue"></input>',
bindings: {
  items: '<',
  onChange: '=',
  parentvalue: '='
},
controller: ['$scope',function($scope) {
  var ctrl = this;
  $scope.items = this.items;
  $scope.parentvalue = this.parentvalue;
  ctrl.changeParent = function(value) {
    ctrl.onChange({parentValue: value});
  }
}]
});
