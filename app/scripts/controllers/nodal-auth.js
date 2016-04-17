'use strict';

app.controller('NodalAuthCtrl', function ($scope, $document, $controller, $http, $location, NodalAuth, $filter, usern) {

  $scope.submitbuttondisabled = false;
  if (usern) {
    $location.path('/');
  }
  $scope.message = "";

  $scope.login = function () {
    $scope.modalShown = true;
    NodalAuth.loginAdmin($scope.usern,$scope).then(function () {
      var usertype = NodalAuth.resolveUser().uid;    
      $location.path('/dashboard-nodal');
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
    if($scope.usern.adminemail == "") {
      $scope.showEmailText = false;
    }
    else {
      $scope.showEmailText = true;
    }  
  };

  $scope.showPasswordText = false;
  $scope.showPass = function() {
    if($scope.usern.adminpassword == "") {
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
      NodalAuth.registerAdmin($scope.usern).then(function(usern) {
        return NodalAuth.loginAdmin($scope.usern).then(function() {
          usern.nodalcentername = $scope.usern.nodalcentername;
          usern.nodaladminname = $scope.usern.nodaladminname;
          usern.nodaladminemail = angular.lowercase($scope.usern.nodaladminemail);
          usern.nodalphone = $scope.usern.nodalphone;
          usern.assetnumber = $scope.usern.assetnumber;
          usern.nodaladdress = $scope.usern.nodaladdress;
          usern.nodalcity = $scope.usern.nodalcity;
          usern.nodalcountry = $scope.usern.nodalcountry;
          usern.nodalstate = $scope.usern.nodalstate;
          usern.doa = $filter('date')(new Date(),'d MMMM yyyy');
          usern.adminpassword = $scope.usern.adminpassword;
          return NodalAuth.createProfileForAdmin(usern);
        }).then(function() {
          $scope.modalShown = false;
          NodalAuth.createAdminForSpecialUsers(usern);
          var dataToPost = {
                               to: usern.nodaladminemail, 
                               nodalpass: $scope.usern.adminpassword, 
                               nodalname: $scope.usern.nodaladminname,
                               centername: $scope.usern.nodalcentername
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
               });
          $location.path('/dashboard-nodal');
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