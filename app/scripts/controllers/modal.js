'use strict';

app.controller('ModalInstanceCtrl', function ($scope, $location, Search, $window, $modalInstance) {
  var str = $location.path();
  var collegeIdArraySplit = str.split("/college-profile/");
  $scope.college = Search.find(collegeIdArraySplit[1]);   
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.redirectToGoogleHangout = function(){
        $modalInstance.dismiss('cancel');
            $window.open('http://www.mymissionadmission.com/#/hang', '_blank');
        };

  });