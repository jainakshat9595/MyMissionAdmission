'use strict';

app.controller('AdminFeedbackCtrl', function ($scope, $filter, $document, $http, $location, NodalAuth, Search, Session, AdminAuth, AdminTask, Update, $sce) {
	
  $scope.usera = AdminAuth.usera;
  $scope.signedIn = AdminAuth.signedIn;
	$scope.submitdisabled = true;
	$scope.collegeIdFlag = "";
  $scope.student1IdFlag = "";
  $scope.nosession = '';

	$scope.doThisForCollege = function(collegeEmail) {
      $scope.nosession = '';
      if(!collegeEmail) {
        $scope.collegeIdFlag = "";
        $scope.collegeUid = "";
        $scope.submitdisabled = true;
        $scope.nosession = '';
      }
      else {
		Search.getCollegeIdByEmail(collegeEmail).then ( function ( result ) {
	        $scope.collegeUid = result;
	        if($scope.collegeUid !== "user doesnot exists") {	          
	          $scope.collegeIdFlag = "Done";
	          $scope.collegeName = Search.getCollegeName($scope.collegeUid);
	          if(($scope.student1IdFlag == "Done")){
	            $scope.submitdisabled = false;
	          }
	        }
	        else{
	          $scope.collegeIdFlag = "Not Done";
	          $scope.submitdisabled = true;
	        }
        }, function(error){
          $scope.collegeIdFlag = "Not Done";
          console.log(error);
        });
      }
    };

    $scope.doThisForStudent = function(studentEmail1) { 
      $scope.nosession = '';
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        $scope.nosession = '';
        $scope.submitdisabled = true;
      }
      else {
        Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result;
          if($scope.student1Uid !== "user doesnot exists") {
            $scope.student1IdFlag = "Done";
            $scope.student1Name = Search.getStudentName($scope.student1Uid);
            if($scope.collegeIdFlag == "Done"){
              $scope.submitdisabled = false;
            }
          }
          else{
            $scope.student1IdFlag = "Not Done";
            $scope.submitdisabled = true;            
          }
        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.checkFeedback = function(studentId, collegeId) {      
      Search.isFeedbackGiven(studentId, collegeId).then( function(result) {
        $scope.sessionStatus = result;       
        if(typeof result.sessiondate == 'undefined') {
          $scope.nosession = "yes";
        }
      });
    };

});
