'use strict';
 
app.factory('studentDashBookedHistory', function ($firebaseObject, $firebaseArray, FIREBASE_URL, $rootScope, $q) {
	
	var studentDashBookedHistory = {
		
		getCollegeDetail : function(collegeId, urlId, $scope) {
			var nameRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/collegename');
			var photoRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/collegephoto');
			var nameObj = $firebaseObject(nameRef);
			var photoObj = $firebaseObject(photoRef);
			nameObj.$loaded(function(result) {
				photoObj.$loaded(function(photo) {
					$scope.collegeDetail[urlId] = {
											collegeName : result.$value,
											collegePhoto : photo.$value
				                       	   };
				});
				
			});
		},

		getLimitedColleges : function($scope, studentId) {
			var temp = 0;
		    var nayaRef = new Firebase(FIREBASE_URL + "studentSessions/" +studentId);
		    $scope.session = $firebaseArray(nayaRef);
		   
		}
	}
	return studentDashBookedHistory;
});