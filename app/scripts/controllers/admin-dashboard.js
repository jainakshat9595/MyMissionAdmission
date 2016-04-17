'use strict';

app.controller('AdminDashCtrl', function ($location, $document, $scope, $timeout, AdminAuth, Search) {
    
  $scope.usera = AdminAuth.usera;
  $scope.collegetype = Search.allAsArray;


   $scope.expandSlip = false;
  $scope.emailChanged = "no";
  $scope.liveCollege=null;
  $scope.addLiveColleges = function(liveCollege) {
    var collegeDetail = liveCollege;
    var data = collegeDetail.split(" (");
    if(typeof data[1] === 'undefined') {
      $scope.emailChanged = "yes";
      $timeout($scope.changeEmailChangeStatus, 5000, true);
    }
    else {
      var email = data[1].split(")");
      if(typeof email[0] === 'undefined') {
        $scope.emailChanged = "yes";
        $timeout($scope.changeEmailChangeStatus, 5000, true);
      }
      else {
        Search.getCollegeIdByEmail(email[0]).then(function(result) {
          var id = result;
          if(id === "user doesnot exists"){
            $scope.emailChanged = "yes";
            $timeout($scope.changeEmailChangeStatus, 5000, true);
          }
          else if(id !== "user doesnot exists")
            AdminAuth.addLiveColleges(id,email[0]);
          $scope.liveCollege=null;
        })
      }
    }
  };

  $scope.changeEmailChangeStatus = function() {
    $scope.emailChanged = "no";
  };

  $scope.getCollegeName = function(id){
    return Search.getCollegeName(id);
  }

  $scope.showLiveColleges = function() {
    return AdminAuth.showLiveColleges();
  };

  $scope.getAMName = function(AMId) {
    return AdminAuth.getAMName(AMId);
  };

  $scope.removeCollege = function(freeCollege) {
    AdminAuth.removeCollege(freeCollege);
  };

  $scope.go = function ( path ) {
      $location.path( path );
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };

}).value('duScrollOffset', 30);
