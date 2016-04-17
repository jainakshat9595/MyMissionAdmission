'use strict';

app.controller('Nav-dashCtrl', function ($scope, $location, $document, Auth) {

  	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;

	$scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };


}).value('duScrollOffset', 30);