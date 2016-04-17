'use strict';

app.controller('NodalDashCtrl', function ($location, $document, $scope, NodalAuth) {
  
  $scope.usern = NodalAuth.usern;
  $scope.go = function ( path ) {
      $location.path( path );
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };
}).value('duScrollOffset', 30);
