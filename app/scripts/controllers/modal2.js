'use strict';

app.controller('ModalInstanceCtrl2', function ($scope, $location, Search, $window, $modalInstance, items) {
 // $scope.items = "asnakska";

	$scope.nodalid = function (){
		if(typeof items !== 'undefined'){
	      var str = items.split("L");
	      var nodalid  = "simplelogin:"+str[1];
	      Search.getNodalAdminDetail(nodalid).then( function( result ) {

	        $scope.nodalemail = result.nodalAdminEmail;
	         $scope.redirectToGoogleHangout($scope.nodalemail);
	      });
	    }  
	    else{
	    	$scope.GoogleHangout();
	    }
	};

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.redirectToGoogleHangout = function(nodalemail){
  			$modalInstance.dismiss('cancel');
            $window.open('http://www.mymissionadmission.com/#/hang/:'+nodalemail+'', '_blank');
  };

  $scope.GoogleHangout = function(){
  			$modalInstance.dismiss('cancel');
            $window.open('http://www.mymissionadmission.com/#/hang', '_blank');
  };
  
  });