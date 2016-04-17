'use strict';
 
app.factory('CollegeDashBookedHistory', function ($firebaseObject, $firebaseArray, FIREBASE_URL, $rootScope, $q) {
	
	var CollegeDashBookedHistory = {
		
		getStudentDetail : function(studentId, urlId, $scope) {
			var nameRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentname");
			var emailRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/email");
			var photoRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentphoto");
			var statusRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentstatus");
			var nameObj = $firebaseObject(nameRef);
			var emailObj = $firebaseObject(emailRef);
			var photoObj = $firebaseObject(photoRef);
			var statusObj = $firebaseObject(statusRef);
			$scope.studentDetail[urlId] = {
											studentName : nameObj,
											studentEmail : emailObj,
											studentPhoto : photoObj,
											studentStatus : statusObj
				                       	   };						
		},

		getLimitedSessions : function($scope, collegeId) {
			var temp = 0;
		    var ref = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId+ "/currentSessionCount");
		    var nayaRef = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId);
		    var nayaobj = $firebaseObject(ref);
		    nayaobj.$loaded(function(nayaobj){ 
		    if(nayaobj.$value === null){
		    	$scope.loadVar = 'No value';
		    }
			});
		    nayaRef.orderByChild("sessionNumber").limitToLast(20).on("child_added", function(snapshot) {
			    if(typeof snapshot.val().sessionNumber !== 'undefined') {
			      $scope.session = $scope.session.concat(snapshot.val());
			      temp = temp+1;
			      $scope.loadVar = 'Not Done';
			      if(temp === 20) {
			        var obj = $firebaseObject(ref);
			        obj.$loaded(function(result) {
			          $scope.sessionNumber = (result.$value)-19;
			        })
			      }
			  	}
		    });
		    var watchChangesObj = $firebaseObject(new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId+ "/currentSessionCount"));
		    watchChangesObj.$loaded(function(watchChangesObj) {
		    	$scope.checkChangesInSession = watchChangesObj;
		    	 $scope.changeOccur = watchChangesObj.$value;
		    });
		},


		loadAllSessions : function($scope,collegeId) {
			$scope.session =  [];
			var temp = 0;
		    var ref = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId+ "/currentSessionCount");
		    var nayaRef = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId);
		    nayaRef.orderByChild("sessionNumber").on("child_added", function(snapshot) {
		    if(typeof snapshot.val().sessionNumber !== 'undefined') {
		      $scope.session = $scope.session.concat(snapshot.val());
		      temp = temp+1;
		      $scope.loadVar = 'Not Done';
		      $scope.sessionNumber =1;
		  	}
		  	$scope.$evalAsync();
		    });
		},		

		dynamicSession : function($scope,sessionlimit,collegeId) {
			$scope.session =  [];
			var temp = 0;
		    var ref = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId+ "/currentSessionCount");
		    var nayaRef = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId);
		    nayaRef.orderByChild("sessionNumber").limitToLast(sessionlimit).on("child_added", function(snapshot) {
		    if(typeof snapshot.val().sessionNumber !== 'undefined') {
		      $scope.session = $scope.session.concat(snapshot.val());
		      temp = temp+1;
		      $scope.loadVar = 'Not Done';
		      if(temp === sessionlimit) {
		        var obj = $firebaseObject(ref);
		        obj.$loaded(function(result) {
		          $scope.sessionNumber = (result.$value)-(sessionlimit - 1);
		        });
		      }
		  	}
		  	$scope.$evalAsync();
		    });
		},

		limitedContact : function($scope,contactlimit,collegeId) {
			var collegeref = new Firebase(FIREBASE_URL + "profileForCollege/" + collegeId + '/approvesessionCount');
			var approveobj = $firebaseObject(collegeref);
			approveobj.$loaded(function(approveobj){
				if(approveobj.$value === 0){
					$scope.loadVar = 'No value';
				}
			});
			$scope.allContactLoaded = 'Not Done';
			$scope.approvedSession = [];
			$scope.studentContactDetail = [];
			var tempLastValue = '';
			$scope.key =  0;
			$scope.changeOccurInContact = 0;
			var approvedSessionref = new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId);
			var approvedSessionCount = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId + '/currentApprovedSessionCount'));
			approvedSessionCount.$loaded(function (approvedSessionCount){
				$scope.approvedSessionCount = approvedSessionCount.$value;
				approvedSessionref.orderByChild("sessionNumber").limitToLast(contactlimit).on("child_added", function(snapshot) {
					if(typeof snapshot.val().sessionNumber !== 'undefined') {
						$scope.lastValue = snapshot.val().studenturl;
						CollegeDashBookedHistory.getStudentContactDetail(snapshot.val().studenturl, collegeId, $scope.key, $scope);
						$scope.key = $scope.key+1;
					}
					if($scope.tempLastValue === $scope.lastValue) {
								$scope.waitContactStatus = 'Not Done';
								$scope.allContactLoaded = "Done";
					}
				});
			});
			approvedSessionref.orderByChild("sessionNumber").limitToFirst(2).on("child_added", function(result) {
				if( typeof result.val().sessionNumber !== 'undefined') {
					$scope.tempLastValue = result.val().studenturl;
			   }
		});


			var watchChangesObj = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId + '/currentApprovedSessionCount'));
				watchChangesObj.$loaded(function(watchChangesObj) {
		    	$scope.checkChangesInSession1 = watchChangesObj;
		    	 $scope.changeOccur1 = watchChangesObj.$value;
		    });

		},



		getNextSessions : function($scope, collegeId) {
			
			  var nayaRef = new Firebase(FIREBASE_URL + "collegeSessions/" +collegeId);
	      	  nayaRef.orderByChild("sessionNumber").startAt($scope.sessionNumber-20).endAt($scope.sessionNumber-1).on("child_added", function(snapshot) {
		      $scope.session = $scope.session.concat(snapshot.val());
		      $scope.sessionNumber = $scope.sessionNumber-1;
		      $scope.waitstatus = 'Not Done';
		      $scope.$evalAsync();
		    });
		
		},

		loadAllContacts : function($scope,collegeId) {			
			var collegeref = new Firebase(FIREBASE_URL + "profileForCollege/" + collegeId + '/approvesessionCount');
			var approveobj = $firebaseObject(collegeref);
			approveobj.$loaded(function(approveobj){
				if(approveobj.$value === 0){
					$scope.loadVar = 'No value';
				}
			});
			$scope.allContactLoaded = 'Not Done';
			$scope.approvedSession = [];
			$scope.studentContactDetail = [];
			var tempLastValue = '';
			$scope.key =  0;
			$scope.changeOccurInContact = 0;
			var approvedSessionref = new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId);
			var approvedSessionCount = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId + '/currentApprovedSessionCount'));
			approvedSessionCount.$loaded(function (approvedSessionCount){
				$scope.approvedSessionCount = approvedSessionCount.$value;
				approvedSessionref.orderByChild("sessionNumber").on("child_added", function(snapshot) {
					if(typeof snapshot.val().sessionNumber !== 'undefined') {
						$scope.lastValue = snapshot.val().studenturl;
						CollegeDashBookedHistory.getStudentContactDetail(snapshot.val().studenturl, collegeId, $scope.key, $scope);
						$scope.key = $scope.key+1;
					}
					if($scope.tempLastValue === $scope.lastValue) {
								$scope.waitContactStatus = 'Not Done';
								$scope.allContactLoaded = 'Done';
					}
				});
			});
			approvedSessionref.orderByChild("sessionNumber").limitToFirst(2).on("child_added", function(result) {
				if( typeof result.val().sessionNumber !== 'undefined') {
					$scope.tempLastValue = result.val().studenturl;
			   }
		});


			var watchChangesObj = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId + '/currentApprovedSessionCount'));
				watchChangesObj.$loaded(function(watchChangesObj) {
		    	$scope.checkChangesInSession1 = watchChangesObj;
		    	 $scope.changeOccur1 = watchChangesObj.$value;
		    });

		},


		getApprovedSessions : function(collegeId, $scope) {			
			var collegeref = new Firebase(FIREBASE_URL + "profileForCollege/" + collegeId + '/approvesessionCount');
			var approveobj = $firebaseObject(collegeref);
			approveobj.$loaded(function(approveobj){
				if(approveobj.$value === 0){
					$scope.loadVar = 'No value';
				}
			});
			$scope.allContactLoaded = 'Not Done';
			$scope.approvedSession = [];
			$scope.studentContactDetail = [];
			var tempLastValue = '';
			$scope.key =  0;
			$scope.changeOccurInContact = 0;
			var approvedSessionref = new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId);
			var approvedSessionCount = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId + '/currentApprovedSessionCount'));
			approvedSessionCount.$loaded(function ( approvedSessionCount){
				$scope.approvedSessionCount = approvedSessionCount.$value;
				approvedSessionref.orderByChild("sessionNumber").limitToLast(20).on("child_added", function(snapshot) {
					if(typeof snapshot.val().sessionNumber !== 'undefined') {
						$scope.lastValue = snapshot.val().studenturl;
						CollegeDashBookedHistory.getStudentContactDetail(snapshot.val().studenturl, collegeId, $scope.key, $scope);
						$scope.key = $scope.key+1;
						$scope.count = $scope.count + 1;
					}
					if($scope.tempLastValue === $scope.lastValue) {
								//$scope.waitContactStatus = 'Not Done';
								//$scope.allContactLoaded = "Done";
					}
				});
			});
			approvedSessionref.orderByChild("sessionNumber").limitToFirst(2).on("child_added", function(result) {
				if( typeof result.val().sessionNumber !== 'undefined') {
					$scope.tempLastValue = result.val().studenturl;
			   }
			});


			var watchChangesObj = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId + '/currentApprovedSessionCount'));
				watchChangesObj.$loaded(function(watchChangesObj) {
		    	$scope.checkChangesInSession1 = watchChangesObj;
		    	 $scope.changeOccur1 = watchChangesObj.$value;
		    });
		},

		loadMOreStudentContact :function(collegeId, $scope) {
			var temp = 0;
			$scope.allContactLoaded = 'Not Done';
			var approvedSessionref = new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeId);
			if($scope.approvedSessionCount > $scope.key + 19) {
					approvedSessionref.orderByChild("sessionNumber").limitToLast($scope.key+19).on("child_added", function(snapshot) {
						temp = temp + 1;
						if(typeof snapshot.val().sessionNumber !== 'undefined') {
							if(temp < 20) {
								$scope.lastValue = snapshot.val().studenturl;
								CollegeDashBookedHistory.getStudentContactDetail(snapshot.val().studenturl, collegeId, $scope.key, $scope);
								$scope.key = $scope.key + 1;
								$scope.waitContactStatus = 'Not Done';
							}
						}
						if($scope.tempLastValue === $scope.lastValue) {
								$scope.waitContactStatus = 'Not Done';
								$scope.allContactLoaded = "Done";
							}
					});
		    }
		    else { 
		    	var load =  $scope.approvedSessionCount - $scope.key;
		    	approvedSessionref.orderByChild("sessionNumber").limitToFirst(load + 1).on("child_added", function(snapshot) {
						temp = temp + 1;
						if(typeof snapshot.val().sessionNumber !== 'undefined') {
							if(temp < 20) {
								$scope.lastValue = snapshot.val().studenturl;
								CollegeDashBookedHistory.getStudentContactDetail(snapshot.val().studenturl, collegeId, $scope.key, $scope);
								$scope.key = $scope.key + 1;
								$scope.waitContactStatus = 'Not Done';
							}
						}
						if($scope.tempLastValue === $scope.lastValue) {
								$scope.waitContactStatus = 'Not Done';
								$scope.allContactLoaded = "Done";
							}
					});

		    }

		},

		getStudentContactDetail : function(studentId, collegeId, index, $scope) {
			var nameRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentname");
			var emailStatusRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/emailverificationstatus");
			var emailRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/email");
			var phoneRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/studentmobile");
			var IIDRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + studentId + "/interactionId");
			var sessionNumberRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + studentId + "/sessionNumber");
			var nameObj = $firebaseObject(nameRef);
			var emailStatusObj = $firebaseObject(emailStatusRef);
			var emailObj = $firebaseObject(emailRef);
			var phoneObj = $firebaseObject(phoneRef);
			var IIDObj = $firebaseObject(IIDRef);
			var sessionNumberObj = $firebaseObject(sessionNumberRef);
			$scope.loadVar = 'Not Done';
			sessionNumberObj.$loaded(function(sessionNumberObj){
				$scope.loadVar = 'Not Done';
				$scope.studentContactDetail[index] = {
												studentName : nameObj,
												studentEmailStatus : emailStatusObj,
												studentEmail : emailObj,
												studentPhone : phoneObj,
												interactionId : IIDObj,
												sessionNumber : sessionNumberObj.$value
					                       	   };
			});
							
								                       	   
		}

	}
	return CollegeDashBookedHistory;
});