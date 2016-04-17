'use strict';

app.controller('AdminAuthCtrl', function ($scope, $document, $controller, $http, $location, AdminAuth, usera) {

  $scope.submitbuttondisabled = false;
  if (usera) {
    $location.path('/');
  }
  $scope.message = "";

  $scope.login = function () {
    $scope.modalShown = true;
    AdminAuth.loginAdmin($scope.usera, $scope).then(function () {
      var usertype = AdminAuth.resolveUser().uid;    
      $location.path('/dashboard-admin');
    });
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };


  $scope.showEmailText = false;
  $scope.showEmail = function() {
    if($scope.usera.adminemail == "") {
      $scope.showEmailText = false;
    }
    else {
      $scope.showEmailText = true;
    }  
  };

  $scope.showPasswordText = false;
  $scope.showPass = function() {
    if($scope.usera.adminpassword == "") {
      $scope.showPasswordText = false;
    }
    else {
      $scope.showPasswordText = true;
    }
  };



  $scope.registerAdmin = function () {
    $scope.submitbuttondisabled = false;
    $scope.modalShown = true;
    var check = !(($scope.admin_reg.confirm_password.$dirty) && ($scope.admin_reg.confirm_password.$error.validator));
    if (check) {
      AdminAuth.registerAdmin($scope.usera).then(function(usera) {
        return AdminAuth.loginAdmin($scope.usera).then(function() {
          usera.adminname = $scope.usera.adminname;
          usera.adminemail = angular.lowercase($scope.usera.adminemail);
          usera.adminmobile = $scope.usera.adminmobile;
          return AdminAuth.createProfileForAdmin(usera);
        }).then(function() {
          $scope.modalShown = false;
          AdminAuth.createAdminForSpecialUsers(usera);
          var dataToPost = {
                                to: usera.adminemail, 
                                adminpass: $scope.usera.adminpassword, 
                                adminname: $scope.usera.adminname
                            };
                $http({
                url: "/sendadminmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            adminname: dataToPost.adminname,
                            adminpass : dataToPost.adminpass
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });

                $http({
                url: "/sendsuperadminmail", 
                method: "GET",
                params: {   
                            adminname: dataToPost.adminname,
                            adminemail: dataToPost.to
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });
          $location.path('/dashboard-admin');
        });
      }, function(error) {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.error = error.message;
      });
    } else {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.message = "Please re-check passwords";
    }
  };
}).value('duScrollOffset', 30);