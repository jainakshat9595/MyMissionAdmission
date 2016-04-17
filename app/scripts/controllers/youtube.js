'use strict';

app.controller('YouTubeCtrl', function ($scope, YT_event) {


  $scope.YT_event = YT_event;

  $scope.sendControlEvent = function (ctrlEvent) {
    this.$broadcast(ctrlEvent);
  }
    	
  });
