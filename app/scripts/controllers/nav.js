'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth, AdminAuth, CollegeReg, $rootScope, $routeParams, $route) {

  	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
	$scope.user = Auth.user;
  $scope.loc = $location.path();
  $scope.$evalAsync();
  
  //$scope.usera = AdminAuth.usera;
	//$scope.userb = CollegeReg.userb;

  $scope.$on('$routeChangeSuccess', function(next, current) { 
    $scope.loc = $location.path();
    $scope.$evalAsync();
  });

	$scope.signedInForCollege = CollegeReg.signedInForCollege;
  	$scope.logoutForCollege = CollegeReg.logoutForCollege;
  	$scope.regpage = function() {
  		if($location.path() == '/college')
  			return true;
  	};

    $scope.go = function ( path ) {
  		$location.path( path );
	};


});
