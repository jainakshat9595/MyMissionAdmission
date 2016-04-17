'use strict';
 
app.factory('CollegeDashFeedback', function ($firebaseObject, $firebaseArray, FIREBASE_URL, $rootScope, $q) {
	
	var CollegeDashFeedback = {

		getLimitedFeedbacks : function($scope, collegeId) {
			var temp = 0;
		    var ref = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId+ "/currentFeedbackCount");
		    var nayaRef = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId);
		    var nayaobj = $firebaseObject(ref);
		    nayaobj.$loaded(function(nayaobj){ 
		    if(nayaobj.$value === null){
		    	$scope.loadVar = 'No value';
		    }
			});
		    nayaRef.orderByChild("feedbackNumber").limitToLast(20).on("child_added", function(snapshot) {
		     if(typeof snapshot.val().feedbackNumber !== 'undefined') {	
		      $scope.feedback = $scope.feedback.concat(snapshot.val());
		      temp = temp+1;
		      $scope.loadVar = 'Not Done';
		      if(temp === 20) {
		        var obj = $firebaseObject(ref);
		        obj.$loaded(function(result) {
		          $scope.feedbackNumber = (result.$value)-19;
		        });
		      }
		    } 
		    });

		    var watchChangesObj = $firebaseObject(new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId+ "/currentFeedbackCount"));
		    watchChangesObj.$loaded(function(watchChangesObj) {
		    	$scope.checkChangesInFeedback = watchChangesObj;
		    	 $scope.changeOccur = watchChangesObj.$value;
		    });
		},

		limitedFeedback : function($scope,feedbackLimit ,collegeId) {
			$scope.feedback = [];
			var temp = 0;
		    var ref = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId+ "/currentFeedbackCount");
		    var nayaRef = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId);
		    nayaRef.orderByChild("feedbackNumber").limitToLast(feedbackLimit).on("child_added", function(snapshot) {
		     if(typeof snapshot.val().feedbackNumber !== 'undefined') {	
		      $scope.feedback = $scope.feedback.concat(snapshot.val());
		      temp = temp+1;
		      $scope.loadVar = 'Not Done';
		      if(temp === feedbackLimit) {
		        var obj = $firebaseObject(ref);
		        obj.$loaded(function(result) {
		          $scope.feedbackNumber = (result.$value)-(feedbackLimit - 1);
		        });
		       }
		     } 
		     $scope.$evalAsync();
		    });
		},


		loadAllFeedbacks : function($scope,collegeId) {
			$scope.feedback = [];
			var temp = 0;
		    var ref = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId+ "/currentFeedbackCount");
		    var nayaRef = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId);
		    nayaRef.orderByChild("feedbackNumber").on("child_added", function(snapshot) {
		     if(typeof snapshot.val().feedbackNumber !== 'undefined') {	
		      $scope.feedback = $scope.feedback.concat(snapshot.val());
		      temp = temp+1;
		      $scope.loadVar = 'Not Done';
		      $scope.feedbackNumber = 1;	
		     } 
		     $scope.$evalAsync();
		    });
		},


		getNextFeedbacks : function($scope, collegeId) {	
			var nayaRef = new Firebase(FIREBASE_URL + "collegeFeedback/" +collegeId);
		    nayaRef.orderByChild("feedbackNumber").startAt($scope.feedbackNumber-20).endAt($scope.feedbackNumber-1).on("child_added", function(snapshot) {
		      $scope.feedback = $scope.feedback.concat(snapshot.val());
		      $scope.feedbackNumber = $scope.feedbackNumber-1;
    		  $scope.waitFeedBackStatus = "Not Done";
		      $scope.$evalAsync();
		    }); 
		},

		
		getStudentDetail : function(studentId, index, $scope) {	
			var nameRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentname");
			var emailRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/email");
			var statusRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentstatus");
			var emailStatusRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/emailverificationstatus");
			var nameObj = $firebaseObject(nameRef);
			var emailObj = $firebaseObject(emailRef);
			var statusObj = $firebaseObject(statusRef);
			var emailStatus = $firebaseObject(emailStatusRef);
			$scope.studentDetail[index] = {
											studentName : nameObj,
											studentEmail : emailObj,
											studentStatus : statusObj,
											emailStatus : emailStatus
				                       	   };
		}

	}
	return CollegeDashFeedback;
});
