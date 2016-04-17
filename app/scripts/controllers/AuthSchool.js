'use strict';

app.controller('AuthSchoolCtrl', function ($scope, $document, $controller, $http, $location, AuthSchool, $filter, users) {

  $scope.submitbuttondisabled = false;
  if (users) {
    $location.path('/');
  }
  $scope.message = "";

  

  $scope.login = function () {
    $scope.modalShown = true;
    AuthSchool.loginAdmin($scope.users,$scope).then(function () {
      var usertype = AuthSchool.resolveUser().uid;    
      $location.path('/dashboard-school');
    }, function (error) {
      $scope.error = error.message;
    });
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };


  $scope.showEmailText = false;
  $scope.showEmail = function() {
    if($scope.users.adminemail == "") {
      $scope.showEmailText = false;
    }
    else {
      $scope.showEmailText = true;
    }  
  };

  $scope.showPasswordText = false;
  $scope.showPass = function() {
    if($scope.users.adminpassword == "") {
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
    var check1 = !(($scope.admin_reg.confirm_email.$dirty) && ($scope.admin_reg.confirm_email.$error.validator));
    if (check && check1) {
      AuthSchool.registerAdmin($scope.users).then(function(users) {
        return AuthSchool.loginAdmin($scope.users).then(function() {
          users.schoolname = $scope.users.schoolname;
          users.schooladminname = $scope.users.schooladminname;
          users.schooladminemail = angular.lowercase($scope.users.schooladminemail);
          users.phonenumber = $scope.users.phonenumber;
          users.schooladdress = $scope.users.schooladdress;
          users.schoolcity = $scope.users.schoolcity;
          users.schoolcountry = $scope.users.schoolcountry;
          users.schoolstate = $scope.users.schoolstate;
          users.schoolzipcode = $scope.users.schoolzipcode;
          users.doa = $filter('date')(new Date(),'d MMMM yyyy');
          users.password = $scope.users.password;
          return AuthSchool.createProfileForAdmin(users);
        }).then(function() {
          $scope.modalShown = false;
          AuthSchool.createAdminForSpecialUsers(users);
          /*var dataToPost = {
                               to: users.nodaladminemail, 
                               nodalpass: $scope.users.password, 
                               nodalname: $scope.users.schooladminname,
                               centername: $scope.users.schoolname
                           };
               $http({
               url: "/sendmailtonodalmail", 
               method: "GET",
               params: {   to: dataToPost.to,
                           nodalname: dataToPost.nodalname,
                           centername: dataToPost.centername,
                           nodalpass : dataToPost.nodalpass
                       }
               }).success(function(serverResponse) {
                   console.log(serverResponse);
               }).error(function(serverResponse) {
                   console.log(serverResponse);
               });

               $http({
               url: "/sendnodalregistrationmailtoAdmin", 
               method: "GET",
               params: {   to: dataToPost.to,
                           nodalname: dataToPost.nodalname,
                           centername: dataToPost.centername,
                           nodalpass : dataToPost.nodalpass
                       }
               }).success(function(serverResponse) {
                   console.log(serverResponse);
               }).error(function(serverResponse) {
                   console.log(serverResponse);
               });*/
          $location.path('/dashboard-school');
        });
      }, function(error) {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.error = error.message;
      });
      $scope.message = "";
      $scope.error ="";
    }
     else if (!check1 && !check)
      {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.message = "Please re-check emails & passwords";
    }
    else if (!check)
      {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.message = "Please re-check passwords";
    }
     else {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.message = "Please re-check emails";
    }
  };
}).value('duScrollOffset', 30);