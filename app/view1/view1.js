'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
	$scope.shower = false;
	$scope.results = {};
	$scope.keys = []
	file.onchange = function(event) {
		$scope.results = {};
		$scope.keys = []
		var file = document.getElementById("file").files;;
		Papa.parse(file[0], {header: true,
			complete: function(results){
				$scope.keys = Object.keys(results.data[0]);
				$scope.results = results;
			}
		});
	}

	$scope.show = function(){
		$scope.keys = $scope.keys;
		$scope.shower = true;
	}

	template.onkeyup = function(event){
		$scope.template = document.getElementById("template").value;
  	}

	$scope.download = function(){
		if($scope.template != undefined){
			var out = [];

			for(var l = 0; l < $scope.results.data.length; l++){
				out[l] = $scope.template;
			}

			for(var i = 0; i < $scope.keys.length; i++){
                if($scope.template.indexOf("@@" + $scope.keys[i]) > -1){
					for(var j = 0; j < $scope.results.data.length; j++){
  						out[j] = out[j].replace("@@" + $scope.keys[i], $scope.results.data[j][$scope.keys[i]]);
					}
				}
			}
			$scope.out = out;
		} else{
			alert('Error. Undefined template.');
		}
	}
});
