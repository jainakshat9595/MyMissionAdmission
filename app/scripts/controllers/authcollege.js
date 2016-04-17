'use strict';

app.controller('AuthCollegeCtrl', function ($scope, $controller, $document, $location, AuthCollege, userc, Search,$routeParams) {

  $scope.mailParameter=$routeParams.clgMail;
  if (userc) {
    $location.path('/');
  }

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };

    $scope.doThisForCounsellor = function(collegeEmail) {
      collegeEmail = angular.lowercase(collegeEmail);
      if(!collegeEmail) {
        $scope.collegeIdFlag = "";
        }
      else {
        Search.getCollegeIdByEmail(collegeEmail).then ( function ( result ) {
        $scope.collegeUid = result;
        if($scope.collegeUid !== "user doesnot exists") {
          $scope.collegeIdFlag = "Done";
          $scope.collegeName = Search.getCollegeName($scope.collegeUid); 
          }
        else{
          $scope.collegeIdFlag = "Not Done";
          }
        }, function(error){
          $scope.collegeIdFlag = "Not Done";
          console.log(error);
        });
      }
    };

    $scope.doThisForStudent = function(studentEmail1) { 
      studentEmail1 = angular.lowercase(studentEmail1);
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        }
      else {
          Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result;
          if($scope.student1Uid !== "user doesnot exists") {
            $scope.student1IdFlag = "Done";
            $scope.student1Name = Search.getStudentName($scope.student1Uid);
            }
          else{
            $scope.student1IdFlag = "Not Done";
             }
        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };



  $scope.showEmailText = false;
  $scope.showEmail = function() {
    if($scope.userc.email == "") {
      $scope.showEmailText = false;
    }
    else {
      $scope.showEmailText = true;
    }  
  };

  $scope.showPasswordText = false;
  $scope.showPass = function() {
    if($scope.userc.password == "") {
      $scope.showPasswordText = false;
    }
    else {
      $scope.showPasswordText = true;
    }
  };



  $scope.login = function () {
    $scope.modalShown = true;
    AuthCollege.login($scope.userc, $scope).then(function () {
      $location.path('/dashboard-college');
    });
  };

}).value('duScrollOffset', 30);