'use strict';

app.controller('TotalCtrl', function ($scope, $filter, $document, $http, $location, NodalAuth, Search, Session, AdminAuth, AdminTask, Update, $sce, Total, toaster,NodalTask) {
  
    $scope.usera = AdminAuth.usera;
    $scope.collegetype = Total.allAsArray;
    $scope.signedIn = AdminAuth.signedIn;
    $scope.totalPendingSessions = 0;
    $scope.approvedSessionsCount = 0;
    $scope.totalsessionCount = 0;
    $scope.totalpendingsessionCount = 0;
    $scope.totalrejectedsessionCount = 0;
    $scope.totalfeedbacknotgivenCount = 0;
    $scope.totalapprovesessionCount = 0;
    $scope.totalfacetofacesessionCount = 0;
    $scope.totalextrasessionCount = 0;
    $scope.totalcontractsessionCount = 0;
    

  $scope.totalCount = function (sessioncount, pendingcount, rejectedsessionCount, feedbacknotgivenCount, approvesessionCount, facetofacesessioncount, extrasessioncount, contractsessionscount, collegetype ) {
    $scope.totalsessionCount = $scope.totalsessionCount +  sessioncount;
    $scope.totalpendingsessionCount = $scope.totalpendingsessionCount + pendingcount;
    $scope.totalrejectedsessionCount = $scope.totalrejectedsessionCount + rejectedsessionCount;
    $scope.totalfeedbacknotgivenCount = $scope.totalfeedbacknotgivenCount + feedbacknotgivenCount;
    $scope.totalapprovesessionCount = $scope.totalapprovesessionCount + approvesessionCount ;
    if(typeof facetofacesessioncount !== 'undefined' ){
      $scope.totalfacetofacesessionCount = $scope.totalfacetofacesessionCount + facetofacesessioncount;
    }
    if(typeof extrasessioncount !== 'undefined'  ){
      $scope.totalextrasessionCount = $scope.totalextrasessionCount + extrasessioncount;
    }
    if(typeof contractsessionscount !== 'undefined' && collegetype == 'paid'){
      $scope.totalcontractsessionCount = $scope.totalcontractsessionCount + contractsessionscount;
    }


  };

    $scope.totalsessionCountpaid = 0;
    $scope.totalpendingsessionCountpaid = 0;
    $scope.totalrejectedsessionCountpaid = 0;
    $scope.totalfeedbacknotgivenCountpaid = 0;
    $scope.totalapprovesessionCountpaid = 0;
    $scope.totalfacetofacesessionCountpaid = 0;
    $scope.totalextrasessionCountpaid = 0;
    $scope.totalcontractsessionCountpaid = 0;  

  $scope.totalCountForPaid = function (sessioncount, pendingcount, rejectedsessionCount, feedbacknotgivenCount, approvesessionCount, facetofacesessioncount, extrasessioncount, contractsessionscount ) {
    $scope.totalsessionCountpaid = $scope.totalsessionCountpaid +  sessioncount;
    $scope.totalpendingsessionCountpaid = $scope.totalpendingsessionCountpaid + pendingcount;
    $scope.totalrejectedsessionCountpaid = $scope.totalrejectedsessionCountpaid + rejectedsessionCount;
    $scope.totalfeedbacknotgivenCountpaid = $scope.totalfeedbacknotgivenCountpaid + feedbacknotgivenCount;
    $scope.totalapprovesessionCountpaid = $scope.totalapprovesessionCountpaid + approvesessionCount ;
    if(typeof facetofacesessioncount !== 'undefined' ){
      $scope.totalfacetofacesessionCountpaid = $scope.totalfacetofacesessionCountpaid + facetofacesessioncount;
    }
    if(typeof extrasessioncount !== 'undefined' ){
      $scope.totalextrasessionCountpaid = $scope.totalextrasessionCountpaid + extrasessioncount;
    }
    if(typeof contractsessionscount !== 'undefined' ){
      $scope.totalcontractsessionCountpaid = $scope.totalcontractsessionCountpaid + contractsessionscount;
    }

  };

  $scope.hidediv = "Not Done";

  $scope.paidcolleges = function (){
    $scope.hidediv = "Done";
  };

  $scope.allcolleges = function (){
    $scope.hidediv = "Not Done";
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
  };

}).value('duScrollOffset', 30);
