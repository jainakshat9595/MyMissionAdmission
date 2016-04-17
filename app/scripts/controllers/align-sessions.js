'use strict';

 
app.controller('AlignSessionsCtrl', function ($scope, $filter, $window, $document, $http, $location, Search, Session, AdminAuth, AdminTask, Update) {

  	$scope.usera = AdminAuth.usera;
	$scope.studentEmail1 = "";
	$scope.studentEmail2 = "";
	$scope.studentEmail3 = "";
	$scope.studentEmail4 = "";
	$scope.studentEmail5 = "";
	$scope.studentEmail6 = "";
	$scope.studentEmail7 = "";
	$scope.studentEmail8 = "";
	$scope.studentEmail9 = "";
	$scope.studentEmail10 = "";
	$scope.studentEmail11 = "";
	$scope.studentEmail12 = "";
	$scope.studentEmail13 = "";
	$scope.studentEmail14 = "";
	$scope.studentEmail15 = "";
	$scope.studentEmail16 = "";
	$scope.studentEmail17 = "";
	$scope.studentEmail18 = "";
	$scope.studentEmail19 = "";
	$scope.studentEmail20 = "";
	$scope.collType = "paid";
	$scope.studentDetail = "zero";
	$scope.liveCollegesStatus = "included";
	
	$scope.validStudent1 = "yes";
	$scope.validStudent2 = "yes";
	$scope.validStudent3 = "yes";
	$scope.validStudent4 = "yes";
	$scope.validStudent5 = "yes";
	$scope.validStudent6 = "yes";
	$scope.validStudent7 = "yes";
	$scope.validStudent8 = "yes";
	$scope.validStudent9 = "yes";
	$scope.validStudent10 = "yes";
	$scope.validStudent11 = "yes";
	$scope.validStudent12 = "yes";
	$scope.validStudent13 = "yes";
	$scope.validStudent14 = "yes";
	$scope.validStudent15 = "yes";
	$scope.validStudent16 = "yes";
	$scope.validStudent17 = "yes";
	$scope.validStudent18 = "yes";
	$scope.validStudent19 = "yes";
	$scope.validStudent20 = "yes";

	$scope.getEmailList = function() {
		var temp = $location.path();
		var data = temp.split("sessions:");
		if(data[1] == 'none') {
			$scope.nodalCodeOFStudents = "TEMP";
		}
		else if(data[1] !== "none") {
			var nodalSimLog = data[1];
			var newstr = nodalSimLog.split("simplelogin:");
			if(typeof newstr[1] !== 'undefined'){
				var nodalurlid = newstr[1].split("NCode")
				$scope.nodalCodeOFStudents = "NODAL"+nodalurlid[1];	
				AdminTask.getNodalStudentList("simplelogin:"+nodalurlid[0], nodalurlid[0], $scope);
			}
			else if(typeof newstr[1] === 'undefined'){
				var nodalurlid = nodalSimLog.split("NCode");
				$scope.nodalCodeOFStudents = "NODAL"+nodalurlid[1];	
			    AdminTask.getNodalStudentList(nodalurlid[0], nodalurlid[1], $scope);
			
			}
		}
	};

	/*========================================================================================================================*/

	$scope.disableFirstTenStudentsForBuildEnquiry = "no";

	$scope.buildEnquiryForFirstTenStu = function(collegeEmail, studentDetails) {
		var firstTenStudents = [];
		var len = studentDetails.length;
 		for(var i=0; i<10; i++) {
			if(typeof studentDetails[i] !== 'undefined')
				firstTenStudents = firstTenStudents.concat(studentDetails[i].studentId);
			if(i==9) {
				if(len < 10 || len == 10)
					$scope.disableFirstTenStudentsForBuildEnquiry = "no";
				else if(len > 10)
					$scope.disableFirstTenStudentsForBuildEnquiry = "yes";
				AdminTask.saveStudentList(firstTenStudents,$scope.nodalCodeOFStudents);
    			$window.open('http://www.mymissionadmission.com/#/build-enquiry/Nid'+$scope.nodalCodeOFStudents+'CEmail'+collegeEmail);
			};
		};
	};


	$scope.buildEnquiryForLastTenStu = function(collegeEmail, studentDetails) {
		var lastTenStudents = [];
 		for(var i=10; i<20; i++) {
			if(typeof studentDetails[i] !== 'undefined')
				lastTenStudents = lastTenStudents.concat(studentDetails[i].studentId);
			if(i==19) {
				$scope.disableFirstTenStudentsForBuildEnquiry = "no";
				AdminTask.saveStudentList(lastTenStudents,$scope.nodalCodeOFStudents);
    			$window.open('http://www.mymissionadmission.com/#/build-enquiry/Nid'+$scope.nodalCodeOFStudents+'CEmail'+collegeEmail);
			};
		};
	};

	$scope.updateScopeForStudent1 = function(studentEmail1) {
		$scope.studentEmail1=studentEmail1;
	};
	$scope.updateScopeForStudent2 = function(studentEmail2) {
		$scope.studentEmail2=studentEmail2;
	};
	$scope.updateScopeForStudent3 = function(studentEmail3) {
		$scope.studentEmail3=studentEmail3;
	};
	$scope.updateScopeForStudent4 = function(studentEmail4) {
		$scope.studentEmail4=studentEmail4;
	};
	$scope.updateScopeForStudent5 = function(studentEmail5) {
		$scope.studentEmail5=studentEmail5;
	};
	$scope.updateScopeForStudent6 = function(studentEmail6) {
		$scope.studentEmail6=studentEmail6;
	};
	$scope.updateScopeForStudent7 = function(studentEmail7) {
		$scope.studentEmail7=studentEmail7;
	};
	$scope.updateScopeForStudent8 = function(studentEmail8) {
		$scope.studentEmail8=studentEmail8;
	};
	$scope.updateScopeForStudent9 = function(studentEmail9) {
		$scope.studentEmail9=studentEmail9;
	};
	$scope.updateScopeForStudent10 = function(studentEmail10) {
		$scope.studentEmail10=studentEmail10;
	};
	$scope.updateScopeForStudent11 = function(studentEmail11) {
		$scope.studentEmail11=studentEmail11;
	};
	$scope.updateScopeForStudent12 = function(studentEmail12) {
		$scope.studentEmail12=studentEmail12;
	};
	$scope.updateScopeForStudent13 = function(studentEmail13) {
		$scope.studentEmail13=studentEmail13;
	};
	$scope.updateScopeForStudent14 = function(studentEmail14) {
		$scope.studentEmail14=studentEmail14;
	};
	$scope.updateScopeForStudent15 = function(studentEmail15) {
		$scope.studentEmail15=studentEmail15;
	};
	$scope.updateScopeForStudent16 = function(studentEmail16) {
		$scope.studentEmail16=studentEmail16;
	};
	$scope.updateScopeForStudent17 = function(studentEmail17) {
		$scope.studentEmail17=studentEmail17;
	};
	$scope.updateScopeForStudent18 = function(studentEmail18) {
		$scope.studentEmail18=studentEmail18;
	};
	$scope.updateScopeForStudent19 = function(studentEmail19) {
		$scope.studentEmail19=studentEmail19;
	};
	$scope.updateScopeForStudent20 = function(studentEmail20) {
		$scope.studentEmail20=studentEmail20;
	};

	$scope.getResults = function(studentEmail) {
		if(studentEmail === $scope.studentEmail1) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent1 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent1 = "yes";					
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges1 = result;
						$scope.studentDetail1 = Search.getStudentDetail(studentId);
						$scope.student1Sessions = Search.getStudentSessions(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail2) {
			$scope.allColleges2 = Search.getAvaillableColleges();
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent2 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent2 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges2 = result;
						$scope.student2Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail2 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail3) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent3 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent3 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges3 = result;
						$scope.student3Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail3 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail4) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent4 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent4 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges4 = result;
						$scope.student4Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail4 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail5) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent5 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent5 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges5 = result;
						$scope.student5Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail5 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail6) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent6 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent6 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges6 = result;
						$scope.student6Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail6 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail7) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent7 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent7 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges7 = result;
						$scope.student7Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail7 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail8) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent8 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent8 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges8 = result;
						$scope.student8Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail8 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail9) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent9 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent9 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges9 = result;
						$scope.student9Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail9 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail10) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent10 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent10 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges10 = result;
						$scope.student10Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail10 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		if(studentEmail === $scope.studentEmail11) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent11 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent11 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges11 = result;
						$scope.student11Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail11 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail12) {
			$scope.allColleges2 = Search.getAvaillableColleges();
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent12 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent12 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges12 = result;						
						$scope.student12Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail12 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail13) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent13 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent13 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges13 = result;
						$scope.student13Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail13 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail14) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent14 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent14 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges14 = result;
						$scope.student14Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail14 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail15) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent15 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent15 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges15 = result;
						$scope.student15Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail15 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail16) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent16 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent16 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges16 = result;
						$scope.student16Sessions = Search.getStudentSessions(studentId);						
						$scope.studentDetail16 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail17) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent17 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent17 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges17 = result;
						$scope.student17Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail17 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail18) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent18 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent18 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges18 = result;
						$scope.student18Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail18 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail19) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent19 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent19 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges19 = result;
						$scope.student19Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail19 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
		else if(studentEmail === $scope.studentEmail20) {
			Search.getStudentIdByEmail(studentEmail).then (function(ID) {
				var studentId = ID;
				if(studentId == "user doesnot exists") {
					$scope.validStudent20 = "no";
				}
				else if(studentId !== "user doesnot exists") {
					$scope.validStudent20 = "yes";
					Search.getAvaillableColleges(studentId, $scope.collType).then(function(result) {
						$scope.allColleges20 = result;
						$scope.student20Sessions = Search.getStudentSessions(studentId);
						$scope.studentDetail20 = Search.getStudentDetail(studentId);
					})
				}
			})
		}
	};

	$scope.getCollegeName = function(collegeId) {
		return Search.getCollegeName(collegeId);
	};

	$scope.getRemainingColleges = function(studentemail) { 
		if(studentemail === $scope.studentEmail1) {
			var session = $scope.student1Sessions;
			var len = $scope.allColleges1.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges1[i].collegeId == key) {
						$scope.allColleges1.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges1;
		}
		else if(studentemail === $scope.studentEmail2) {
			var session = $scope.student2Sessions;
			var len = $scope.allColleges2.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges2[i].collegeId == key) {
						$scope.allColleges2.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges2;
		}
		else if(studentemail === $scope.studentEmail3) {
			var session = $scope.student3Sessions;
			var len = $scope.allColleges3.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges3[i].collegeId == key) {
						$scope.allColleges3.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges3;
		}
		else if(studentemail === $scope.studentEmail4) {
			var session = $scope.student4Sessions;
			var len = $scope.allColleges4.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges4[i].collegeId == key) {
						$scope.allColleges4.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges4;
		}
		else if(studentemail === $scope.studentEmail5) {
			var session = $scope.student5Sessions;
			var len = $scope.allColleges5.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges5[i].collegeId == key) {
						$scope.allColleges5.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges5;
		}
		else if(studentemail === $scope.studentEmail6) {
			var session = $scope.student6Sessions;
			var len = $scope.allColleges6.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges6[i].collegeId == key) {
						$scope.allColleges6.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges6;
		}
		else if(studentemail === $scope.studentEmail7) {
			var session = $scope.student7Sessions;
			var len = $scope.allColleges7.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges7[i].collegeId == key) {
						$scope.allColleges7.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges7;
		}
		else if(studentemail === $scope.studentEmail8) {
			var session = $scope.student8Sessions;
			var len = $scope.allColleges8.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges8[i].collegeId == key) {
						$scope.allColleges8.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges8;
		}
		else if(studentemail === $scope.studentEmail9) {
			var session = $scope.student9Sessions;
			var len = $scope.allColleges9.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges9[i].collegeId == key) {
						$scope.allColleges9.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges9;
		}
		else if(studentemail === $scope.studentEmail10) {
			var session = $scope.student10Sessions;
			var len = $scope.allColleges10.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges10[i].collegeId == key) {
						$scope.allColleges10.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges10;
		};
		if(studentemail === $scope.studentEmail11) {
			var session = $scope.student11Sessions;
			var len = $scope.allColleges11.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges11[i].collegeId == key) {
						$scope.allColleges11.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges11;
		}
		else if(studentemail === $scope.studentEmail12) {
			var session = $scope.student12Sessions;
			var len = $scope.allColleges12.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges12[i].collegeId == key) {
						$scope.allColleges12.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges12;
		}
		else if(studentemail === $scope.studentEmail13) {
			var session = $scope.student13Sessions;
			var len = $scope.allColleges13.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges13[i].collegeId == key) {
						$scope.allColleges13.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges13;
		}
		else if(studentemail === $scope.studentEmail14) {
			var session = $scope.student14Sessions;
			var len = $scope.allColleges14.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges14[i].collegeId == key) {
						$scope.allColleges14.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges14;
		}
		else if(studentemail === $scope.studentEmail15) {
			var session = $scope.student15Sessions;
			var len = $scope.allColleges15.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges15[i].collegeId == key) {
						$scope.allColleges15.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges15;
		}
		else if(studentemail === $scope.studentEmail16) {
			var session = $scope.student16Sessions;
			var len = $scope.allColleges16.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges16[i].collegeId == key) {
						$scope.allColleges16.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges16;
		}
		else if(studentemail === $scope.studentEmail17) {
			var session = $scope.student17Sessions;
			var len = $scope.allColleges17.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges17[i].collegeId == key) {
						$scope.allColleges17.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges17;
		}
		else if(studentemail === $scope.studentEmail18) {
			var session = $scope.student18Sessions;
			var len = $scope.allColleges18.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges18[i].collegeId == key) {
						$scope.allColleges18.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges18;
		}
		else if(studentemail === $scope.studentEmail19) {
			var session = $scope.student19Sessions;
			var len = $scope.allColleges19.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges19[i].collegeId == key) {
						$scope.allColleges19.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges19;
		}
		else if(studentemail === $scope.studentEmail20) {
			var session = $scope.student20Sessions;
			var len = $scope.allColleges20.length;
			angular.forEach(session, function(value,key) { 
				for( var i=0; i<len; i++) {
					if($scope.allColleges20[i].collegeId == key) {
						$scope.allColleges20.splice(i, 1);
						len--;
					}
				}
			})
			return $scope.allColleges20;
		};
	};
	$scope.colleges = [];
	$scope.collegesCopy = [];
	$scope.counter = [];

	$scope.addDataInArray = function(collegeId,studentId) {
		var temp = "none";
		var len = $scope.colleges.length;
		for(var i = 0; i < len; i++) {
			if($scope.colleges[i].collegeId === collegeId) {
				temp = i;
			}
		}
		
		if(temp !== "none") {
			var len1 = ($scope.colleges[temp].students.length);
			$scope.colleges[temp].students[len1] = {
													studentId : studentId
												   };
			angular.copy($scope.colleges, $scope.collegesCopy);
		}
		else if(temp === "none") {
			$scope.colleges = $scope.colleges.concat([{collegeId : collegeId, 
														students :[{
																	studentId : studentId
																  },]
													}]);
			angular.copy($scope.colleges, $scope.collegesCopy);
		}
	};


	$scope.getCollegeDetails =  function(collegeId) {
		return Search.getcollegeDetailForCollegeAllignment(collegeId);
	};

	$scope.getStudentName =  function(studentId) {
		return Search.getStudentName(studentId);
	};
	$scope.getStudentEmail =  function(studentId) {
		return Search.getStudentEmail(studentId);
	};
	

	$scope.getCollegeName = function(collegeId) {
		return Search.getCollegeName(collegeId);
	};

	$scope.excludeLiveColleges = function() {
		var count = 0;
		angular.forEach($scope.colleges, function(value,key) {
			Search.getcollegeDetail(value.collegeId).then(function(result) {
				if(result.collegeLive === 'yes') {
					var newKey = key-count;
					$scope.colleges.splice(newKey, 1);
					count = count+1;
				}
			})
		})
		$scope.liveCollegesStatus = "excluded";
	};

	$scope.includeLiveColleges = function() {
		$scope.liveCollegesStatus = "included";
		$scope.colleges = [];
		angular.copy($scope.collegesCopy, $scope.colleges)
	};

	$scope.removeCollegeRemaining = function(collegesRemaining, studentEmail, inputIndex) {
		Search.getStudentIdByEmail(studentEmail).then (function(ID) {
			var studentId = ID;
			var collegesCopyTwo = [];
			angular.copy($scope.colleges,collegesCopyTwo);
			var count = 0;
			angular.forEach(collegesCopyTwo, function(value,key) {
				var objLength = value.students.length;
				if(objLength>1) {
					angular.forEach(value.students, function(studentValue,studentKey) {
						if(studentValue.studentId == studentId) {
							$scope.colleges[key].students.splice(studentKey,1);	
							$scope.collegesCopy[key].students.splice(studentKey,1);
						}
					})
				}
				else if(objLength == 1) {
					var newKey = key-count;
					angular.forEach(value.students, function(studentValue,studentKey) {
						if(studentValue.studentId == studentId) {
							$scope.colleges.splice(newKey, 1);
							$scope.collegesCopy.splice(newKey, 1);
							count = count+1;
						}
					})
				}
			})
			if(inputIndex == 1) {
				$scope.studentDetail1 = null;
				$scope.student1Sessions = null;
			}
			if(inputIndex == 2) {
				$scope.studentDetail2 = null;
				$scope.student2Sessions = null;
			}
			if(inputIndex == 3) {
				$scope.studentDetail3 = null;
				$scope.student3Sessions = null;
			}
			if(inputIndex == 4) {
				$scope.studentDetail4 = null;
				$scope.student4Sessions = null;
			}
			if(inputIndex == 5) {
				$scope.studentDetail5 = null;
				$scope.student5Sessions = null;
			}
			if(inputIndex == 6) {
				$scope.studentDetail6 = null;
				$scope.student6Sessions = null;
			}
			if(inputIndex == 7) {
				$scope.studentDetail7 = null;
				$scope.student7Sessions = null;
			}
			if(inputIndex == 8) {
				$scope.studentDetail8 = null;
				$scope.student8Sessions = null;
			}
			if(inputIndex == 9) {
				$scope.studentDetail9 = null;
				$scope.student9Sessions = null;
			}
			if(inputIndex == 10) {
				$scope.studentDetail10 = null;
				$scope.student10Sessions = null;
			}
			if(inputIndex == 11) {
				$scope.studentDetail11 = null;
				$scope.student11Sessions = null;
			}
			if(inputIndex == 12) {
				$scope.studentDetail12 = null;
				$scope.student12Sessions = null;
			}
			if(inputIndex == 13) {
				$scope.studentDetail13 = null;
				$scope.student13Sessions = null;
			}
			if(inputIndex == 14) {
				$scope.studentDetail14 = null;
				$scope.student14Sessions = null;
			}
			if(inputIndex == 15) {
				$scope.studentDetail15 = null;
				$scope.student15Sessions = null;
			}
			if(inputIndex == 16) {
				$scope.studentDetail16 = null;
				$scope.student16Sessions = null;
			}
			if(inputIndex == 17) {
				$scope.studentDetail17 = null;
				$scope.student17Sessions = null;
			}
			if(inputIndex == 18) {
				$scope.studentDetail18 = null;
				$scope.student18Sessions = null;
			}
			if(inputIndex == 19) {
				$scope.studentDetail19 = null;
				$scope.student19Sessions = null;
			}
			if(inputIndex == 20) {
				$scope.studentDetail20 = null;
				$scope.student20Sessions = null;
			}
		})
	};

	$scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };
    
}).value('duScrollOffset', 30);