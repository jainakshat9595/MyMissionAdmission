'use strict';

app.controller('studentDashBookedHistoryCtrl', function ($scope, $location,  $modal, $filter, $firebaseObject, Auth, AuthCollege, studentDashBookedHistory, Search, Webinar) {

  $scope.user = Auth.user.profile;
  $scope.userc = AuthCollege.userc;
  $scope.studentDetail = [];

  $scope.getLimitedColleges = function() {
    var studentId = AuthCollege.resolveUser().uid;
    $scope.studentid = studentId;
    $scope.session = [];
    studentDashBookedHistory.getLimitedColleges($scope, $scope.studentid);
  };

  $scope.getCollegeDetail = function(collegeId,collegeuid) {
    $scope.collegeDetail = [];
    studentDashBookedHistory.getCollegeDetail(collegeId,collegeuid,$scope);
  }; 


                                                                    /*webinar*/

  $scope.getStudentsWebinarHistory = function() {
    var studentId = AuthCollege.resolveUser().uid;
    Webinar.getStudentsWebinarHistory(studentId, $scope);
  };

  $scope.getCurrentWebinarDetails = function(webinar) {
    $scope.currentWebinar = webinar;
    $scope.$evalAsync();
  };
  
                                                                    /*webinar*/

});
