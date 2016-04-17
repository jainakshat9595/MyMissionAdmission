'use strict';

app.controller('CollegeDashFeedbackCtrl', function ($scope, $location,  $modal,  $filter, $document, Auth, AuthCollege, CollegeDashFeedback, Search, Feedback) {

  $scope.user = Auth.user.profile;
  $scope.userc = AuthCollege.userc;
  $scope.studentDetail = [];
  $scope.feedback = [];
  $scope.waitFeedBackStatus = "Not Done";
  $scope.loadVar = 'Not Done';
  $scope.videoIconTemp = '';

  $scope.showVideoCollege = false;
  $scope.videourl = "";
  var vedioId = "";
  
  $scope.callVideo = function (id) {
    $scope.custom = {
      video: id,
      player: null,
      vars: {
          controls: 1,
          rel:0
      }
    };
  
  };

  $scope.videoIconCicked = function(elementID) {
    if((!$scope.videoIconTemp) || ($scope.videoIconTemp === '') || ($scope.videoIconTemp === null)) {
      var y = '';
      $scope.videoIconTemp = elementID;
      y = '#'+$scope.videoIconTemp;
      $(y).addClass('videoIcon_green');
    }
    else {
      var x = '';
      var y = '';
      x = '#'+$scope.videoIconTemp;
      $(x).removeClass('videoIcon_green');
      $scope.videoIconTemp = elementID;
      y = '#'+$scope.videoIconTemp;
      $(y).addClass('videoIcon_green');
    }
  }
  
  $scope.startVideo = function(url){
     $scope.showVideoCollege = true;
     $scope.videourl = "";
     var data = url.split("watch?v=");
        if(typeof (data[1]) !== 'undefined') {
          $scope.videourl = "";
          var Id = data[1].split("&");
          vedioId = Id[0];
          $scope.callVideo(vedioId);
        }
        if(typeof (data[1]) == 'undefined'){
          $scope.videourl = "";
          var Id = url.split(".be/");
          vedioId = Id[1];
          $scope.callVideo(vedioId);
          if(typeof vedioId === 'undefined'){
            $scope.videourl = "NoVideo";
          }
        }
  };
  $scope.stopVideo = function(){
    $scope.showVideoCollege = false;
  };

  $scope.getLimitedFeedbacks = function() {
    $scope.loadVar = 'Done';
    var collegeId = AuthCollege.resolveUser().uid;
    $scope.collegeid = collegeId;
    CollegeDashFeedback.getLimitedFeedbacks($scope, $scope.collegeid);
  };

  $scope.limitedFeedback = function(feedbackLimit){
      $scope.feedback = [];
      $scope.loadVar = 'Done';
      CollegeDashFeedback.limitedFeedback($scope,feedbackLimit, $scope.collegeid);
  };

  $scope.loadAllFeedbacks = function(){
      $scope.loadVar = 'Done';
      CollegeDashFeedback.loadAllFeedbacks($scope,$scope.collegeid);
  };

  $scope.studentstatus= function (feedbackId){
    var studentStatusObj = Search.getStudentStatus(feedbackId);
    return studentStatusObj;
  };  

  $scope.getNextFeedbacks = function() {
    $scope.waitFeedBackStatus = "Done";
    CollegeDashFeedback.getNextFeedbacks($scope, $scope.collegeid);
  }; 

  $scope.getStudentDetail = function(studentId, index, collegeurl) {
    CollegeDashFeedback.getStudentDetail(studentId, index, $scope); 
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
  };

});
