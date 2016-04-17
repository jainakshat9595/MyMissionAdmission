'use strict';

app.controller('AdminDeligationCtrl', function ($location, $document, $scope, AdminAuth, Search, AdminDeligation, toaster) {

  $scope.signedIn = AdminAuth.signedIn;
  $scope.usera = AdminAuth.usera;
  $scope.admin = Search.getAdmins();
  $scope.admin.id = '';
  
  $scope.onefeature = [
    {id: 'LiveColleges',     text: 'Live colleges'},
    {id: 'LiveCollegesSeeOnly',     text: 'Live Colleges See Only'},
  ];

  $scope.operationsFeatures = [
    {id: 'ShowCollegeinSearch',     text: 'Show College in Search'},
    {id: 'HidecollegeinSearch',     text: 'Hide college in Search'},
    {id: 'EditCollegeDetails',      text: 'Edit College Details'},
    {id: 'ChangeCollegeRank',       text: 'Change College Rank'},
    {id: 'ChangeCounsellorEmail',   text: 'Change Counsellor Email'},
    {id: 'Buildanenquiry',          text: 'Build an enquiry'},
    {id: 'DeleteEnquiry',           text: 'Delete Enquiry'},
    {id: 'ChangeStudentEmail',      text: 'Change Student E-mail'},
    {id: 'ChangeStudentPassword',   text: 'Change Student Password'},
    {id: 'ChangeCollegePassword',   text: 'Change College Password'},
    {id: 'VerifyaStudent',          text: 'Verify a Student'},
    {id: 'UnverifyaStudent',        text: 'Unverify a Student'},
    {id: 'BlockStudent',            text: 'Block Student'},
    {id: 'UnblockStudent',          text: 'Unblock Student'},
    {id: 'GiveFeedback',            text: 'Give Feedback'},
    {id: 'VerifyNewSessions',       text: 'Verify New Sessions'},
    {id: 'ViewSessionDetails',      text: 'View Session Details'},
    {id: 'RejectedSessionDetails',  text: 'Rejected Session Details'},    
    {id: 'SessionAllignment',       text: 'Session Allignment'},
    {id: 'CollegeFeedbackRequired', text: 'College Feedback Required'},
    {id: 'StudentsEmailList',       text: 'Students Email List From Nodal'},
    {id: 'RemoveDemoStudentFromCollege',       text: 'Remove Demo Student From College'},
  ];

  $scope.uSer = {
    Features: []
  };
  
  $scope.salesFeatures = [
    {id: 'UpgradeDowngradeCollege', text: 'Upgrade/ Downgrade College'},
    {id: 'ShowCollegeinSearch',     text: 'Show College in Search'},
    {id: 'HidecollegeinSearch',     text: 'Hide college in Search'},
    {id: 'TotalSessions',           text: 'Total Sessions'},
    {id: 'ViewSessionDetails',      text: 'View Session Details'},
  ];

  $scope.businessFeatures = [
    {id: 'VerifyNewSessions',       text: 'Verify New Sessions'},
    {id: 'VerifyNodalCenter',       text: 'Verify Nodal Center'},
    {id: 'UnverifyNodalCenter',     text: 'Unverify Nodal Center'},
    {id: 'NodalCenterInformation',  text: 'Nodal Center Information'},
  ];
  

    var test = 'start';
    $scope.testarray = function (valuee) {
        test = valuee;

        if(test == 'LiveColleges'){
        var tag_story = $scope.uSer.Features,
        id_tag = 'LiveCollegesSeeOnly',
        position = tag_story.indexOf(id_tag);
        if ( ~position ) tag_story.splice(position, 1);
        }
        else if(test == 'LiveCollegesSeeOnly'){
        var tag_story1 = $scope.uSer.Features,
        id_tag1 = 'LiveColleges',
        position1 = tag_story1.indexOf(id_tag1);
        if ( ~position ) tag_story1.splice(position1, 1);
        }   
    };


  $scope.approveBusinessSubordinate = function() {
        var current_path = $location.path();
        var subId = current_path.split("SelectFeatureForBusinessSub:");
        var currentuser = AdminAuth.resolveUser().uid;
        AdminDeligation.approveSubordinate(subId[1],$scope.uSer.Features,currentuser);
        $scope.go();
  };


  $scope.approveSalesSubordinate = function() {
        if(test !==  'start'){
        $scope.uSer.Features.push(test);
        }
        else{
        }
        var current_path = $location.path();
        var subId = current_path.split("SelectFeatureForSalesSub:");
        var currentuser = AdminAuth.resolveUser().uid;
        AdminDeligation.approveSubordinate(subId[1],$scope.uSer.Features,currentuser);
        $scope.go();

  };

  $scope.approveOperationSubordinate = function() {
        if(test !==  'start'){
        $scope.uSer.Features.push(test);
        }
        else{
        }
        var current_path = $location.path();
        var subId = current_path.split("SelectFeatureForOperationsSub:");
        var currentuser = AdminAuth.resolveUser().uid;
        AdminDeligation.approveSubordinate(subId[1],$scope.uSer.Features,currentuser);
        $scope.go();

  };

  $scope.getsalesfeature = function() {
    var current_path = $location.path();
    var subId = current_path.split("UpdateFeatureForSalesSub:");
    Search.getAdminDetail(subId[1]).then (function( resulta ){ 
      if(resulta.features.LiveColleges  == 'yes'){
          //$scope.admin.id = 'Test1';
          $scope.onefeaturemodel = 'LiveColleges'; 
      }
      else if(resulta.features.LiveCollegesSeeOnly  == 'yes'){
       //$scope.admin.id = 'Test2';
       $scope.onefeaturemodel = 'LiveCollegesSeeOnly'; 
      }
    });

    Search.getAdminFeatures(subId[1]).then (function( result ){
      angular.forEach(result, function(key,value) {
      $scope.uSer.Features = $scope.uSer.Features.concat(key.$id);
      });
      
    });
  };

 $scope.getoperationfeature = function() {
    var current_path = $location.path();
    var subId = current_path.split("UpdateFeatureForOperationsSub:");
    Search.getAdminDetail(subId[1]).then (function( resulta ){ 
      if(resulta.features.LiveColleges  == 'yes'){
          //$scope.admin.id = 'Test1';
          $scope.onefeaturemodel = 'LiveColleges'; 
      }
      else if(resulta.features.LiveCollegesSeeOnly  == 'yes'){
       //$scope.admin.id = 'Test2';
       $scope.onefeaturemodel = 'LiveCollegesSeeOnly'; 
      }
    });
    Search.getAdminFeatures(subId[1]).then (function( result ){
      angular.forEach(result, function(key,value) {
      $scope.uSer.Features = $scope.uSer.Features.concat(key.$id);
      });
    });
  };

  $scope.updateOperationSubordinate = function() {
        if(test !==  'start'){
        $scope.uSer.Features.push(test);
        }
        else{
        }
        var current_path = $location.path();
        var subId = current_path.split("UpdateFeatureForOperationsSub:");
        var currentuser = AdminAuth.resolveUser().uid;
        AdminDeligation.updateapproveSubordinate(subId[1],$scope.uSer.Features,currentuser);
        $location.path("/updateAdminDeligation");

  };

  $scope.updateSalesSubordinate = function() {
        
        if(test !==  'start'){
        $scope.uSer.Features.push(test);
        }
        else{
        }
        var current_path = $location.path();
        var subId = current_path.split("UpdateFeatureForSalesSub:");

        var currentuser = AdminAuth.resolveUser().uid;
        AdminDeligation.updateapproveSubordinate(subId[1],$scope.uSer.Features,currentuser);
         $location.path("/updateAdminDeligation");
  };

  $scope.go = function() {
    $location.path("/workDeligation");
  };

  $scope.approveAdmin = function(adminData) {
    AdminDeligation.approveAdmin(adminData);
  };

  $scope.makeHimHead = function(adminData, adminType) {
    AdminDeligation.makeHimHead(adminData, adminType)
  };

  $scope.updateHead = function(adminData, adminType) {
   
    AdminDeligation.updateHead(adminData, adminType);
  };

  $scope.toTheTop = function() {
    $document.scrollTopAnimated(0, 2000);
  };
    
}).value('duScrollOffset', 30);
