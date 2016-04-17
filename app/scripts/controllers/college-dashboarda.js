'use strict';

app.controller('CollegeDashCtrlA', function ($scope, $document, Auth) {
    
	$scope.user = Auth.user;

	
	$scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };


  }).value('duScrollOffset', 30);
