'use strict';

app.controller('CollegeDashBookedHistoryCtrl', function ($scope, $location,$document,  $modal, $filter,Auth, AuthCollege, CollegeDashBookedHistory, Search, Feedback) {

  $scope.user = Auth.user.profile;
  $scope.userc = AuthCollege.userc;
  $scope.studentDetail = [];
  $scope.waitstatus = 'Not Done';
  $scope.waitContactStatus = 'Not Done';
  $scope.loadVar = 'Not Done';
  $scope.allContactLoaded = 'Not Done';
  $scope.studentInSessions = [];

  $scope.ugCourses=['Engineering','Computer Applications/IT' ,'Biotechnology','Microbiology','Agriculture','Food Technology','Nutrition and Dietetics','Arts (Humanities)','Library Science','Management','Commerce','Economics','Hotel Management/Hospitality and Tourism','Architecture','Planning','Fine Arts','Performing Arts','Pharmaceutical Sciences','Ayurvedic Pharmaceutical Sciences','Physiotherapy','Paramedical Sciences','Education','Physical Education','Law','Design','Sciences','Nursing','Film & Television','Media & Journalism'];
  $scope.pgCourses=['Engineering','Computer Applications / IT' ,'Biotechnology','Microbiology','Biochemistry','Agriculture','Food Technology','Nutrition and Dietetics','English and Foreign Languages','Indian Languages','Library Science','Sociology','Geography','Management','Commerce','Economics','Hotel Management/Hospitality and Tourism' ,'Architecture','Planning','Fine Arts','Performing Arts','Pharmaceutical Sciences','Ayurvedic Pharmaceutical Sciences','Physiotherapy','Paramedical Sciences','History','Political Science','Psychology','Education','Physical Education','Law','Design','Sciences','Nursing','Film & Television','Media & Journalism'];


  $scope.getLimitedSessions = function() {
    $scope.loadVar = 'Done';
    $scope.changeOccur;
    var collegeId = AuthCollege.resolveUser().uid;
    $scope.collegeid = collegeId;
    $scope.session = [];
    CollegeDashBookedHistory.getLimitedSessions($scope, $scope.collegeid);
  };

  $scope.loadAllSessions = function(){
      $scope.studentInSessions = [];
      $scope.loadVar = 'Done';
      CollegeDashBookedHistory.loadAllSessions($scope,$scope.collegeid);
  };

  $scope.imgClick = function(){ 
      $('#personalInfo').hide();
      $('#studBio').hide();
      $('#acadRec').hide();
      $('#courIntr').hide();
      $('#studImg').removeClass("dashHome-content stu-enq-modal modal-dialog modal-body img");
      $('#studImg').addClass("col-sm-12 imgClass");
      $('#closeBtn').removeClass("hideCross");
 
  };

  $scope.hideLargeImg = function(){ 
      $('#studImg').removeClass("col-sm-12 imgClass");
      $('#studImg').addClass("dashHome-content stu-enq-modal modal-dialog modal-body img");
      $('#personalInfo').show();
      $('#studBio').show();
      $('#acadRec').show();
      $('#courIntr').show();
      $('#closeBtn').addClass("hideCross");
  };

  $scope.mainBody = function(){
      $('#studImg').removeClass("col-sm-12 imgClass");
      $('#studImg').addClass("dashHome-content stu-enq-modal modal-dialog modal-body img");
      $('#personalInfo').show();
      $('#studBio').show();
      $('#acadRec').show();
      $('#courIntr').show();
      $('#closeBtn').addClass("hideCross");
  };

  $scope.sendValue = function(sessionLimit){
      $scope.studentInSessions = [];
      $scope.loadVar = 'Done';
      CollegeDashBookedHistory.dynamicSession($scope,sessionLimit, $scope.collegeid);
  };

  $scope.limitedContact = function(contactLimit){
      $scope.loadVar = 'Done';
      CollegeDashBookedHistory.limitedContact($scope,contactLimit, $scope.collegeid);
  };

  $scope.loadAllContacts = function(){
      $scope.studentContactDetail = [];
      $scope.loadVar = 'Done';
      CollegeDashBookedHistory.loadAllContacts($scope,$scope.collegeid);
  };

  $scope.getNextSessions = function() {
    $scope.waitstatus = 'Done';
    CollegeDashBookedHistory.getNextSessions($scope, $scope.collegeid);
  };

  $scope.getStudentDetail = function(studentId, urlId, collegeurl, sessionNumber) {
    $scope.studentInSessions[sessionNumber] = studentId;
    CollegeDashBookedHistory.getStudentDetail(studentId, urlId, $scope); 
  };

  $scope.studentsdetail = function (studenturl, sessionNumber) {
    $scope.currentStudentSessionNumber = sessionNumber;
    $scope.studentobject = Search.getStudentDetail(studenturl);
    $('#studImg').removeClass("col-sm-12 imgClass");
  };
  
  $scope.modalNormal=function(){
    $('#studImg').addClass("dashHome-content stu-enq-modal modal-dialog modal-body img");
    $('#personalInfo').show();
    $('#studBio').show();
    $('#acadRec').show();
    $('#courIntr').show();
    $('#closeBtn').addClass("hideCross");
  };

  $scope.getApprovedSessions = function() {
    $scope.loadVar = 'Done';
    var collegeId = AuthCollege.resolveUser().uid;
    $scope.changeOccurInContact = 0;
    $scope.collegeid = collegeId;
    CollegeDashBookedHistory.getApprovedSessions($scope.collegeid,$scope);
  };

  $scope.loadMOreStudentContact = function() {
    $scope.waitContactStatus = 'Done';
    CollegeDashBookedHistory.loadMOreStudentContact($scope.collegeid,$scope);
  };

  $scope.getFeedbackStatus = function(studentId, urlid, collegeId) {
    return Search.getFeedbackStatus(studentId, collegeId);
  };

  $scope.getPreviousStudentDetail = function(studentobject) {
    var temp = $scope.currentStudentSessionNumber+1;
    if(typeof $scope.studentInSessions[temp] !== 'undefined') {
      $scope.currentStudentSessionNumber = $scope.currentStudentSessionNumber+1;
      $scope.studentobject = Search.getStudentDetail($scope.studentInSessions[temp]);
    }
  };

  $scope.getNextStudentDetail = function(studentobject) {
    var temp = $scope.currentStudentSessionNumber-1;
    if(typeof $scope.studentInSessions[temp] !== 'undefined') {
      $scope.currentStudentSessionNumber = $scope.currentStudentSessionNumber-1;
      $scope.studentobject = Search.getStudentDetail($scope.studentInSessions[temp]);
    }
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
  };
});
