'use strict';

app.controller('NodalTaskCtrl', function ($scope, $document,  $filter, $controller, md5,$interval, $http ,$location ,NodalAuth ,NodalTask , toaster, Search, reCAPTCHA, $window) {
  
  $scope.submitbuttondisabled = false;
  $scope.message = "";
  $scope.usern = NodalAuth.usern;
  $scope.signedIn = NodalAuth.signedIn;
  $scope.sessionList=[];
  $scope.clgname='';
  $scope.studEnq='';
  $scope.Status='';
  $scope.iterate=1;
  $scope.month=[];
  
  $scope.student1nodalstatus = "";
  $scope.student2nodalstatus = "";
  $scope.student3nodalstatus = "";
  $scope.student4nodalstatus = "";
  $scope.student5nodalstatus = "";
  $scope.student6nodalstatus = "";
  $scope.student7nodalstatus = "";
  $scope.student8nodalstatus = "";
  $scope.student9nodalstatus = "";
  $scope.student10nodalstatus = "";
  $scope.student11nodalstatus = "";
  $scope.student12nodalstatus = "";
  $scope.student13nodalstatus = "";
  $scope.student14nodalstatus = "";
  $scope.student15nodalstatus = "";
  $scope.student16nodalstatus = "";
  $scope.student17nodalstatus = "";
  $scope.student18nodalstatus = "";
  $scope.student19nodalstatus = "";
  $scope.student20nodalstatus = "";

  $scope.student1Uid = "";
  $scope.student2Uid = "";
  $scope.student3Uid = "";
  $scope.student4Uid = "";
  $scope.student5Uid = "";
  $scope.student6Uid = "";
  $scope.student7Uid = "";
  $scope.student8Uid = "";
  $scope.student9Uid = "";
  $scope.student10Uid = "";
  $scope.student11Uid = "";
  $scope.student12Uid = "";
  $scope.student13Uid = "";
  $scope.student14Uid = "";
  $scope.student15Uid = "";
  $scope.student16Uid = "";
  $scope.student17Uid = "";
  $scope.student18Uid = "";
  $scope.student19Uid = "";
  $scope.student20Uid = "";
 
  $scope.student1IdFlag = "";
  $scope.student2IdFlag = "";
  $scope.student4IdFlag = "";
  $scope.student5IdFlag = "";
  $scope.student6IdFlag = "";
  $scope.student7IdFlag = "";
  $scope.student8IdFlag = "";
  $scope.student9IdFlag = "";
  $scope.student3IdFlag = "";
  $scope.student10IdFlag = "";
  $scope.student11IdFlag = "";
  $scope.student12IdFlag = "";
  $scope.student13IdFlag = "";
  $scope.student14IdFlag = "";
  $scope.student15IdFlag = "";
  $scope.student16IdFlag = "";
  $scope.student17IdFlag = "";
  $scope.student18IdFlag = "";
  $scope.student19IdFlag = "";
  $scope.student20IdFlag = "";

  $scope.submitdisabled = true;

  $scope.gender = [{
          name: "Male"
       },{  
          name: "Female"
  }];

  $scope.roles = [
    {id: '0', text: 'Engineering'},
    {id: '1', text: 'Computer Applications / IT'},
    {id: '2', text: 'Biotechnology'},
    {id: '3', text: 'Microbiology'},
    {id: '4', text: 'Agriculture'},
    {id: '5', text: 'Food Technology'},
    {id: '6', text: 'Nutrition and Dietetics'},
    {id: '7', text: 'Arts (Humanities)'},
    {id: '8', text: 'Library Science'},
    {id: '9', text: 'Management'},
    {id: '10', text: 'Commerce'},
    {id: '11', text: 'Economics'},
    {id: '12', text: 'Hotel Management/Hospitality and Tourism'},
    {id: '13', text: 'Architecture'},
    {id: '14', text: 'Planning'},
    {id: '15', text: 'Fine Arts'},
    {id: '16', text: 'Performing Arts'},
    {id: '17', text: 'Pharmaceutical Sciences'},
    {id: '18', text: 'Ayurvedic Pharmaceutical Sciences'},
    {id: '19', text: 'Physiotherapy'},
    {id: '20', text: 'Paramedical Sciences'},
    {id: '21', text: 'Education'},    
    {id: '22', text: 'Physical Education'},
    {id: '23', text: 'Law'},
    {id: '24', text: 'Design'},
    {id: '25', text: 'Sciences'},
    {id: '26', text: 'Nursing'},
    {id: '27', text: 'Film & Television'},
    {id: '28', text: 'Media & Journalism'}
  ];
  $scope.uSer = {
    roles: []
  };

  $scope.rolesA = [
    {idA: '0', textA: 'Engineering'},
    {idA: '1', textA: 'Computer Applications / IT'},
    {idA: '2', textA: 'Biotechnology'},
    {idA: '3', textA: 'Microbiology'},
    {idA: '4', textA: 'Biochemistry'},
    {idA: '5', textA: 'Agriculture'},
    {idA: '6', textA: 'Food Technology'},
    {idA: '7', textA: 'Nutrition and Dietetics'},
    {idA: '8', textA: 'English and Foreign Languages'},
    {idA: '9', textA: 'Indian Languages'},
    {idA: '10', textA: 'Library Science'},
    {idA: '11', textA: 'Sociology'},
    {idA: '12', textA: 'Geography'},
    {idA: '13', textA: 'Management'},
    {idA: '14', textA: 'Commerce'},
    {idA: '15', textA: 'Economics'},
    {idA: '16', textA: 'Hotel Management/Hospitality and Tourism'},
    {idA: '17', textA: 'Architecture'},
    {idA: '18', textA: 'Planning'},
    {idA: '19', textA: 'Fine Arts'},
    {idA: '20', textA: 'Performing Arts'},
    {idA: '21', textA: 'Pharmaceutical Sciences'},
    {idA: '22', textA: 'Ayurvedic Pharmaceutical Sciences'},
    {idA: '23', textA: 'Physiotherapy'},
    {idA: '24', textA: 'Paramedical Sciences'},
    {idA: '25', textA: 'History'},
    {idA: '26', textA: 'Political Science'},
    {idA: '27', textA: 'Psychology'},
    {idA: '28', textA: 'Education'},    
    {idA: '29', textA: 'Physical Education'},
    {idA: '30', textA: 'Law'},
    {idA: '31', textA: 'Design'},
    {idA: '32', textA: 'Sciences'},
    {idA: '33', textA: 'Nursing'},
    {idA: '34', textA: 'Film & Television'},
    {idA: '35', textA: 'Media & Journalism'}
  ];
  $scope.uSerA = {
    rolesA: []
  };
      
  var nodaluid = '' ;
  var nodalid = "";  
    
    $scope.getnodalid = function(){
        nodaluid = NodalAuth.resolveUser().uid;
        nodalid = NodalAuth.resolveUser().uid;
    };

       
    $scope.getemail = function(){
  
      var str = $location.path();
      var newemail = str.split(":");
      $scope.user.email  = newemail[1];
    };
    //Monthly session detail
    $scope.toggleSelection = function (mon) {
      var idx = $scope.month.indexOf(mon);
      $scope.showLoadButton1 = 'show';
      if (idx > -1) {
       $scope.month.splice(idx, 1);
      }
      else {
       $scope.month.push(mon);
      }
    };
    
    $scope.showLoadButton1 = 'show';
    
    $scope.spinner = false;

    $scope.getMonthlyDetails=function(year,month){
      $scope.sessionList=[];
      $scope.showLoadButton1 = 'hide';
      nodaluid = NodalAuth.resolveUser().uid;
      $scope.spinner = true;
      for(var i=0;i<$scope.month.length;i++){
        NodalTask.getMonthlyDetails(year,nodaluid,$scope,i);
      }
    };
     $scope.sortSessionsByDate = function(session) {
    //console.log(session);
    
    var dateobj = new Date(session.date);
    var newdate = $filter('date')(dateobj,'dd MMMM yyyy')
    var dateobj2 = new Date(newdate);
    var newdate2 = $filter('date')(dateobj2,'yyyy MM dd');  
  return newdate2;
 };

    $scope.hideLoadButton1 = function() {
        $scope.showLoadButton1 = 'show';
    };

    $scope.hideLoadButton2 = function() {
       $scope.showLoadButton1 = 'show';
    };

    $scope.doThisForStudent1 = function(studentEmail1) { 
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        $scope.student1nodalstatus = "";
        if(($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else {
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result;
          if($scope.student1Uid !== "user doesnot exists") {
           $scope.student1IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
           if(resultnew.referredByNodalAdmin === nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student1nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student1nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student1nodalstatus = "Not Done";   
            }
            else{
              $scope.student1nodalstatus = "Other";
            }
           });              
          }
          else{
            $scope.student1IdFlag = "Not Done";
            $scope.student1nodalstatus = "";
            if(($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent2 = function(studentEmail2) {
      if(!studentEmail2){
        $scope.student2IdFlag = "";
        $scope.student2nodalstatus = "";
        $scope.student2Uid = "";
        if(($scope.student1nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail2).then ( function ( result ) {
          $scope.student2Uid = result;
          if($scope.student2Uid !== "user doesnot exists") {
           $scope.student2IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student2nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student2nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student2nodalstatus = "Not Done";  
            }
            else{
              $scope.student2nodalstatus = "Other";
            }
           });              
        }
          else{
            $scope.student2IdFlag = "Not Done";
            $scope.student2nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student2IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent3 = function(studentEmail3) {
      if(!studentEmail3){
        $scope.student3IdFlag = "";
        $scope.student3Uid = "";
        $scope.student3nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") ||  ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail3).then ( function ( result ) {
          $scope.student3Uid = result;
          if($scope.student3Uid !== "user doesnot exists") {
           $scope.student3IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student3nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student3nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student3nodalstatus = "Not Done";   
            }
            else{
              $scope.student3nodalstatus = "Other";
            }
          });              
        }
      else{
            $scope.student3IdFlag = "Not Done";
            $scope.student3nodalstatus = "";
           if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") ||  ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student3IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent4 = function(studentEmail4) {
      if(!studentEmail4) {
        $scope.student4IdFlag = "";
        $scope.student4Uid = "";
        $scope.student4nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done")  || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail4).then ( function ( result ) {
          $scope.student4Uid = result;
          if($scope.student4Uid !== "user doesnot exists") {
           $scope.student4IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student4nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student4nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student4nodalstatus = "Not Done";   
            }
            else{
              $scope.student4nodalstatus = "Other";
            }
           });              
          }
          else{
            $scope.student4IdFlag = "Not Done";
            $scope.student4nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done")  || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student4IdFlag = "Not Done";
            console.log(error);
        });
      } 
    };

    $scope.doThisForStudent5 = function(studentEmail5) {
      if(!studentEmail5) {
        $scope.student5IdFlag = "";
        $scope.student5Uid = "";
        $scope.student5nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done")  || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail5).then ( function ( result ) {
          $scope.student5Uid = result;
          if($scope.student5Uid !== "user doesnot exists") {
           $scope.student5IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student5nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student5nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student5nodalstatus = "Not Done";   
            }
            else{
              $scope.student5nodalstatus = "Other";
            }
           });              
          }
          else{
            $scope.student5IdFlag = "Not Done";
            $scope.student5nodalstatus ="";
            if(($scope.student1nodalstatus == "Done") || ($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student5IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent6 = function(studentEmail6) {
      if(!studentEmail6) {
        $scope.student6IdFlag = "";
        $scope.student6Uid = "";
        $scope.student6nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done")  || ($scope.student5nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail6).then ( function ( result ) {
          $scope.student6Uid = result;
          if($scope.student6Uid !== "user doesnot exists") {
           $scope.student6IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student6nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student6nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student6nodalstatus = "Not Done";   
            }
            else{
              $scope.student6nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student6IdFlag = "Not Done";
            $scope.student6nodalstatus="";
            if(($scope.student1nodalstatus == "Done") || ($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student6IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent7 = function(studentEmail7) { 
      if(!studentEmail7) {
        $scope.student7IdFlag = "";
        $scope.student7Uid = "";
        $scope.student7nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail7).then ( function ( result ) {
          $scope.student7Uid = result;
          if($scope.student7Uid !== "user doesnot exists") {
           $scope.student7IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student7nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student7nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student7nodalstatus = "Not Done";   
            }
            else{
              $scope.student7nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student7IdFlag = "Not Done";
            $scope.student7nodalstatus="";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done")  || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student7IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent8 = function(studentEmail8) { 
      if(!studentEmail8) {
        $scope.student8IdFlag = "";
        $scope.student8Uid = "";
        $scope.student8nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail8).then ( function ( result ) {
          $scope.student8Uid = result;
          if($scope.student8Uid !== "user doesnot exists") {
           $scope.student8IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student8nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student8nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student8nodalstatus = "Not Done";   
            }
            else{
              $scope.student8nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student8IdFlag = "Not Done";
            $scope.student8nodalstatus="";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student8IdFlag = "Not Done";
            console.log(error);
        });
      }  
    };

    $scope.doThisForStudent9 = function(studentEmail9) { 
      if(!studentEmail9) {
        $scope.student9IdFlag = "";
        $scope.student9Uid = "";
        $scope.student9nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done")  || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail9).then ( function ( result ) {
          $scope.student9Uid = result;
          if($scope.student9Uid !== "user doesnot exists") {
           $scope.student9IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student9nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student9nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student9nodalstatus = "Not Done";   
            }
            else{
              $scope.student9nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student9IdFlag = "Not Done";
            $scope.student9nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done")  || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student9IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent10 = function(studentEmail10) { 
      if(!studentEmail10) {
        $scope.student10IdFlag = "";
        $scope.student10Uid = "";
        $scope.student10nodalstatus = "";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done")  || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
     else {
        Search.getStudentIdByEmail(studentEmail10).then ( function ( result ) {
          $scope.student10Uid = result;
          if($scope.student10Uid !== "user doesnot exists") {
           $scope.student10IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student10nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student10nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student10nodalstatus = "Not Done";   
            }
            else{
              $scope.student10nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student10IdFlag = "Not Done";
            $scope.student10nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done")  || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student10IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent11 = function(studentEmail11) { 
      if(!studentEmail11) {
        $scope.student11IdFlag = "";
        $scope.student11Uid = "";
        $scope.student11nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done")  || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else {
          $scope.submitdisabled = true;
        }
      }
      else {2
        Search.getStudentIdByEmail(studentEmail11).then ( function ( result ) {
          $scope.student11Uid = result;
          if($scope.student11Uid !== "user doesnot exists") {
           $scope.student11IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student11nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student11nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student11nodalstatus = "Not Done";   

            }
            else{
              $scope.student11nodalstatus = "Other";
            }
           });              
          }
          else{
            $scope.student11IdFlag = "Not Done";
            $scope.student11nodalstatus ="";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done")  || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent12 = function(studentEmail12) {
      if(!studentEmail12){
        $scope.student12IdFlag = "";
        $scope.student12Uid = "";
        $scope.student12nodalstatus ="";
      if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") ||  ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail12).then ( function ( result ) {
          $scope.student12Uid = result;
          if($scope.student12Uid !== "user doesnot exists") {
           $scope.student12IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student12nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student12nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student12nodalstatus = "Not Done";   
            }
            else{
              $scope.student12nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student12IdFlag = "Not Done";
            $scope.student12nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done")  || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student12IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent13 = function(studentEmail13) {
      if(!studentEmail13){
        $scope.student13IdFlag = "";
        $scope.student13Uid = "";
        $scope.student13nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done")  || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail13).then ( function ( result ) {
          $scope.student13Uid = result;
          if($scope.student13Uid !== "user doesnot exists") {
           $scope.student13IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student13nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student13nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student13nodalstatus = "Not Done";   
            }
            else{
              $scope.student13nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student13IdFlag = "Not Done";
            $scope.student13nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done")  || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student13IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent14 = function(studentEmail14) {
      if(!studentEmail14) {
        $scope.student14IdFlag = "";
        $scope.student14Uid = "";
        $scope.student14nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done")  || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail14).then ( function ( result ) {
          $scope.student14Uid = result;
          if($scope.student14Uid !== "user doesnot exists") {
           $scope.student14IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student14nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student14nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student14nodalstatus = "Not Done";   

            }
            else{
              $scope.student14nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student14IdFlag = "Not Done";
            $scope.student14nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done")  || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student14IdFlag = "Not Done";
            console.log(error);
        });
      } 
    };

    $scope.doThisForStudent15 = function(studentEmail15) {
      if(!studentEmail15) {
        $scope.student15IdFlag = "";
        $scope.student15Uid = "";
        $scope.student15nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done")  || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail15).then ( function ( result ) {
          $scope.student15Uid = result;
          if($scope.student15Uid !== "user doesnot exists") {
           $scope.student15IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student15nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student15nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student15nodalstatus = "Not Done";   
            }
            else{
              $scope.student15nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student15IdFlag = "Not Done";
            $scope.student15nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student15IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent16 = function(studentEmail16) { 
      if(!studentEmail16){
        $scope.student16IdFlag = "";
        $scope.student16Uid = "";
        $scope.student16nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
            $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail16).then ( function ( result ) {
          $scope.student16Uid = result;
          if($scope.student16Uid !== "user doesnot exists") {
           $scope.student16IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student16nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student16nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student16nodalstatus = "Not Done";   
            }
            else{
              $scope.student16nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student16IdFlag = "Not Done";
            $scope.student16nodalstatus = "";
            
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done")  || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student16IdFlag = "Not Done";
            console.log(error);
        });
      }  
    };

    $scope.doThisForStudent17 = function(studentEmail17) { 
      if(!studentEmail17) {
        $scope.student17IdFlag = "";
        $scope.student17Uid = "";
        $scope.student17nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") ||  ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail17).then ( function ( result ) {
          $scope.student17Uid = result;
          if($scope.student17Uid !== "user doesnot exists") {
            $scope.student17IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student17nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{

                  $scope.student17nodalstatus = "emailfalse";    
              } 
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student17nodalstatus = "Not Done";   
            }
            else{
              $scope.student17nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student17IdFlag = "Not Done";
            $scope.student17nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done")  || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student17IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent18 = function(studentEmail18) { 
      if(!studentEmail18) {
        $scope.student18IdFlag = "";
        $scope.student18Uid = "";
        $scope.student18nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") ||  ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail18).then ( function ( result ) {
          $scope.student18Uid = result;
          if($scope.student18Uid !== "user doesnot exists") {
           $scope.student18IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student18nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student18nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student18nodalstatus = "Not Done";   
            }
            else{
              $scope.student18nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student18IdFlag = "Not Done";
            $scope.student18nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done")  || ($scope.student19nodalstatus == "Done") || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student18IdFlag = "Not Done";
            console.log(error);
        });
      }  
    };

    $scope.doThisForStudent19 = function(studentEmail19) { 
      if(!studentEmail19) {
        $scope.student19IdFlag = "";
        $scope.student19Uid = "";
        $scope.student19nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done")  || ($scope.student20nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        Search.getStudentIdByEmail(studentEmail19).then ( function ( result ) {
          $scope.student19Uid = result;
          if($scope.student19Uid !== "user doesnot exists") {
           $scope.student19IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student19nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student19nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student19nodalstatus = "Not Done";   
            }
            else{
              $scope.student19nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student19IdFlag = "Not Done";
            $scope.student19nodalstatus = "";          
            if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done")  || ($scope.student20nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student19IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent20 = function(studentEmail20) { 
      if(!studentEmail20) {
        $scope.student20IdFlag = "";
        $scope.student20Uid = "";
        $scope.student20nodalstatus ="";
        if(($scope.student1nodalstatus == "Done") ||($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done")) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
     else {
        Search.getStudentIdByEmail(studentEmail20).then ( function ( result ) {
          $scope.student20Uid = result;
          if($scope.student20Uid !== "user doesnot exists") {
           $scope.student20IdFlag = "Done";
           Search.getStudentNodalReferred(result).then( function (resultnew){
            if(resultnew.referredByNodalAdmin == nodalid){
              if(resultnew.emailverificationstatus === 'true'){
              $scope.student20nodalstatus = "Done";   
              $scope.submitdisabled = false;
              }
              else{
                  $scope.student20nodalstatus = "emailfalse";    
              }
            }
            else if(typeof resultnew.referredByNodalAdmin == 'undefined'){
              $scope.student20nodalstatus = "Not Done";   
            }
            else{
              $scope.student20nodalstatus = "Other";
            }
           });              
            //$scope.student1Name = Search.getStudentName($scope.student1Uid);
          }
          else{
            $scope.student20IdFlag = "Not Done";
            $scope.student20nodalstatus = "";
            if(($scope.student1nodalstatus == "Done") || ($scope.student2nodalstatus == "Done") || ($scope.student3nodalstatus == "Done") || ($scope.student4nodalstatus == "Done") || ($scope.student5nodalstatus == "Done") || ($scope.student6nodalstatus == "Done") || ($scope.student7nodalstatus == "Done") || ($scope.student8nodalstatus == "Done") || ($scope.student9nodalstatus == "Done") || ($scope.student10nodalstatus == "Done") || ($scope.student11nodalstatus == "Done") || ($scope.student12nodalstatus == "Done") || ($scope.student13nodalstatus == "Done") || ($scope.student14nodalstatus == "Done") || ($scope.student15nodalstatus == "Done") || ($scope.student16nodalstatus == "Done") || ($scope.student17nodalstatus == "Done") || ($scope.student18nodalstatus == "Done") || ($scope.student19nodalstatus == "Done")) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student20IdFlag = "Not Done";
            console.log(error);
        });
      }
  };


  $scope.verificationmail1 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student1IdFlag = 'Done';
          $scope.student1nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student1nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail2 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student2IdFlag = 'Done';
          $scope.student2nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student2nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail3 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student3IdFlag = 'Done';
          $scope.student3nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student3nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail4 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student4IdFlag = 'Done';
          $scope.student4nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student4nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail5 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student5IdFlag = 'Done';
          $scope.student5nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student5nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail6 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student6IdFlag = 'Done';
          $scope.student6nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student6nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail7 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student7IdFlag = 'Done';
          $scope.student7nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student7nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail8 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student8IdFlag = 'Done';
          $scope.student8nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student8nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail9 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student9IdFlag = 'Done';
          $scope.student9nodalstatus = "Done";
          $scope.submitdisabled = false;
          }        
        else{
            
        $scope.student9nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail10 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student10IdFlag = 'Done';
          $scope.student10nodalstatus = "Done";
          $scope.submitdisabled = false;
          }   
        else{
            
        $scope.student10nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail11 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student11IdFlag = 'Done';
          $scope.student11nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student11nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail12 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student12IdFlag = 'Done';
          $scope.student12nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student12nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail13 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student13IdFlag = 'Done';
          $scope.student13nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student13nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail14 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student14IdFlag = 'Done';
          $scope.student14nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student14nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail15 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student15IdFlag = 'Done';
          $scope.student15nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student15nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail16 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student16IdFlag = 'Done';
          $scope.student16nodalstatus = "Done";
          $scope.submitdisabled = false;
          }       
        else{
            
        $scope.student16nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail17 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student17IdFlag = 'Done';
          $scope.student17nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student17nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail18 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student18IdFlag = 'Done';
          $scope.student18nodalstatus = "Done";
          $scope.submitdisabled = false;
          }       
        else{
            
        $scope.student18nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail19 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student19IdFlag = 'Done';
          $scope.student19nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student19nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };

  $scope.verificationmail20 = function (studentid) {
    var str = studentid;
    var urlId = str.split(":");
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    NodalTask.viewChanges(studentid).then(function(result) { 
         var email=  result.email;
         var studentname=  result.studentname;
         var password =  result.password;
         var md5_hash=  result.md5_hash;
         if(result.emailverificationstatus === 'true'){
          toaster.clear();
          $scope.student20IdFlag = 'Done';
          $scope.student20nodalstatus = "Done";
          $scope.submitdisabled = false;
          }
          
        

        else{
            
        $scope.student20nodalstatus = "resendemail";
        var dataToPost = {
                                to: email, 
                                pass: password, 
                                sname: studentname,
                                hashkey : md5_hash,
                                urlId : urlId[1]
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId
                        }
                }).success(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                }).error(function(serverResponse) {
                    toaster.clear();
                    toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                });
            }    
        });        
  };


  $scope.mailforStudent1 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student1IdFlag = 'Done';
          $scope.student1nodalstatus = "Done";
          $scope.submitdisabled = false;          
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student1nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student1nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student1IdFlag = 'Done';
                    $scope.student1nodalstatus = "Other";
                }
              });

  };

  $scope.mailforStudent2 = function(studentuid){
    
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student2IdFlag = 'Done';
          $scope.student2nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student2nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student2nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student2IdFlag = 'Done';
                    $scope.student2nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent3 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student3IdFlag = 'Done';
          $scope.student3nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student3nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student3nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student3IdFlag = 'Done';
                    $scope.student3nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent4 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
        
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student4IdFlag = 'Done';
          $scope.student4nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student4nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student4nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student4IdFlag = 'Done';
                    $scope.student4nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent5 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
        
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student5IdFlag = 'Done';
          $scope.student5nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student5nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student5nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student5IdFlag = 'Done';
                    $scope.student5nodalstatus = "Other";
                }
              });    
        
  };

  $scope.mailforStudent6 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student6IdFlag = 'Done';
          $scope.student6nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student6nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student6nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student6IdFlag = 'Done';
                    $scope.student6nodalstatus = "Other";
                }
              });        
  };

  $scope.mailforStudent7 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student7IdFlag = 'Done';
          $scope.student7nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student7nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student7nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student7IdFlag = 'Done';
                    $scope.student7nodalstatus = "Other";
                }
              });        
  };

  $scope.mailforStudent8 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student8IdFlag = 'Done';
          $scope.student8nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student8nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student8nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student8IdFlag = 'Done';
                    $scope.student8nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent9 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student9IdFlag = 'Done';
          $scope.student9nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student9nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student9nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student9IdFlag = 'Done';
                    $scope.student9nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent10 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student10IdFlag = 'Done';
          $scope.student10nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student10nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student10nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student10IdFlag = 'Done';
                    $scope.student10nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent11 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student11IdFlag = 'Done';
          $scope.student11nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student11nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student11nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student11IdFlag = 'Done';
                    $scope.student11nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent12 = function(studentuid){
    
   toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student12IdFlag = 'Done';
          $scope.student12nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student12nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student12nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student12IdFlag = 'Done';
                    $scope.student12nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent13 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student13IdFlag = 'Done';
          $scope.student13nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student13nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student13nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student13IdFlag = 'Done';
                    $scope.student13nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent14 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student14IdFlag = 'Done';
          $scope.student14nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student14nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student14nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student14IdFlag = 'Done';
                    $scope.student14nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent15 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student15IdFlag = 'Done';
          $scope.student15nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student15nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student15nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student15IdFlag = 'Done';
                    $scope.student15nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent16 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student16IdFlag = 'Done';
          $scope.student16nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student16nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student16nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student16IdFlag = 'Done';
                    $scope.student16nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent17 = function(studentuid){
    
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student17IdFlag = 'Done';
          $scope.student17nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student17nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student17nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student17IdFlag = 'Done';
                    $scope.student17nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent18 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student18IdFlag = 'Done';
          $scope.student18nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student18nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student18nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student18IdFlag = 'Done';
                    $scope.student18nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent19 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student19IdFlag = 'Done';
          $scope.student19nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student19nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student19nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student19IdFlag = 'Done';
                    $scope.student19nodalstatus = "Other";
                }
              });
        
  };

  $scope.mailforStudent20 = function(studentuid){
    toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
    var currentuser = NodalAuth.resolveUser().uid;
    var data = currentuser.split(":");
    var str2 = data[1];
    var referredBy = str2;
    var studentid = studentuid;
    var id = studentid.split(":");
    var str3 = id[1];
    NodalTask.viewChanges(studentid).then(function(result) { 
         if(result.referredByNodalAdmin == referredBy){
          toaster.clear();
          $scope.student20IdFlag = 'Done';
          $scope.student20nodalstatus = "Done";
          $scope.submitdisabled = false;
         }
         else if(typeof result.referredByNodalAdmin == 'undefined'){
          var dataToPost = {
                                  to: result.email, 
                                  referredBy: referredBy, 
                                  sname: result.studentname,
                                  hashkey : result.md5_hash,
                                  urlId : str3,
                                  adminName : $scope.usern.profile.nodalAdminName,
                                  adminEmail : $scope.usern.profile.nodalAdminEmail,
                                  adminPhone : $scope.usern.profile.nodalPhone,
                                  centerName : $scope.usern.profile.nodalCenterName,
                                  centerCity : $scope.usern.profile.nodalCity,
                                  centerState : $scope.usern.profile.nodalState,
                                  centerCountry : $scope.usern.profile.nodalCountry


                              };
                  $http({
                  url: "/sendstudentnodalmail", 
                  method: "GET",
                  params: {   to: dataToPost.to,
                              sname: dataToPost.sname,
                              referredBy: dataToPost.referredBy,
                              hashkey : dataToPost.hashkey,
                              urlId : dataToPost.urlId,
                              adminName : dataToPost.adminName,
                              adminEmail : dataToPost.adminEmail,
                              adminPhone : dataToPost.adminPhone,
                              centerName : dataToPost.centerName,
                              centerCity : dataToPost.centerCity,
                              centerState : dataToPost.centerState,
                              centerCountry : dataToPost.centerCountry
                          }
                  }).success(function(serverResponse) {
                        $scope.student20nodalstatus = "Sent";
                        toaster.clear();
                        toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                        console.log(serverResponse);
                  }).error(function(serverResponse) { 
                        $scope.student20nodalstatus = "Not Sent";
                        toaster.clear();
                        toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                        console.log(serverResponse);
                  });
                }
                else{
                    toaster.clear();
                    $scope.student20IdFlag = 'Done';
                    $scope.student20nodalstatus = "Other";
                }
              });
        
  };



  $scope.doforStudent1 = function(){
    $scope.student1IdFlag = ""; 
    $scope.student1nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email1= "";
        
  };

  $scope.doforStudent2 = function(){
    
    $scope.student2IdFlag = ""; 
    $scope.student2nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email2= "";
        
  };

  $scope.doforStudent3 = function(){
    $scope.student3IdFlag = ""; 
    $scope.student3nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email3= "";
        
  };

  $scope.doforStudent4 = function(){
   
    $scope.student4IdFlag = ""; 
    $scope.student4nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email4= "";
        
  };

  $scope.doforStudent5 = function(){
    $scope.student5IdFlag = ""; 
    $scope.student5nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email5= "";
        
  };

  $scope.doforStudent6 = function(){
    $scope.student6IdFlag = ""; 
    $scope.student6nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email6= "";
        
  };

  $scope.doforStudent7 = function(){
    
    $scope.student7IdFlag = ""; 
    $scope.student7nodalstatus = "";
   $scope.usern.profile.studentEmailList.Email7= "";
        
  };

  $scope.doforStudent8 = function(){
    $scope.student8IdFlag = ""; 
    $scope.student8nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email8= "";
        
  };

  $scope.doforStudent9 = function(){
    $scope.student9IdFlag = ""; 
    $scope.student9nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email9= "";
        
  };

  $scope.doforStudent10 = function(){
    $scope.student10IdFlag = ""; 
    $scope.student10nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email10= "";    
  };

  $scope.doforStudent11 = function(){
    $scope.student11IdFlag = ""; 
    $scope.student11nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email11= "";
        
  };

  $scope.doforStudent12 = function(){
    
    $scope.student12IdFlag = ""; 
    $scope.student12nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email12= "";
        
  };

  $scope.doforStudent13 = function(){
    $scope.student13IdFlag = ""; 
    $scope.student13nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email13= "";    
  };

  $scope.doforStudent14 = function(){
    $scope.student14IdFlag = ""; 
    $scope.student14nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email14= "";
        
  };

  $scope.doforStudent15 = function(){
    $scope.student15IdFlag = ""; 
    $scope.student15nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email15= "";
        
  };

  $scope.doforStudent16 = function(){
    $scope.student16IdFlag = ""; 
    $scope.student16nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email16= "";
        
  };

  $scope.doforStudent17 = function(){
    $scope.student17IdFlag = ""; 
    $scope.student17nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email17= "";
        
  };

  $scope.doforStudent18 = function(){
    $scope.student18IdFlag = ""; 
    $scope.student18nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email18= "";
        
  };

  $scope.doforStudent19 = function(){
    $scope.student19IdFlag = ""; 
    $scope.student19nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email19= "";
        
  };

  $scope.doforStudent20 = function(){
    $scope.student20IdFlag = ""; 
    $scope.student20nodalstatus = "";
    $scope.usern.profile.studentEmailList.Email20= "";
        
  };
  
  
  $scope.sendnodallink = function() {
  toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
  var currentuser = NodalAuth.resolveUser().uid;
  var data = currentuser.split(":");
  var str2 = data[1];
  var referredBy = str2;

  var studentid = $scope.student1Uid;
  var id = studentid.split(":");
  var str3 = id[1];

    NodalTask.viewChanges(studentid).then(function(result) { 
        var dataToPost = {
                                to: result.email, 
                                referredBy: referredBy, 
                                sname: result.studentname,
                                hashkey : result.md5_hash,
                                urlId : str3,
                                adminName : $scope.usern.profile.nodalAdminName,
                                adminEmail : $scope.usern.profile.nodalAdminEmail,
                                adminPhone : $scope.usern.profile.nodalPhone,
                                centerName : $scope.usern.profile.nodalCenterName,
                                centerCity : $scope.usern.profile.nodalCity,
                                centerState : $scope.usern.profile.nodalState,
                                centerCountry : $scope.usern.profile.nodalCountry


                          };
                $http({
                url: "/sendstudentnodalmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            referredBy: dataToPost.referredBy,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId,
                            adminName : dataToPost.adminName,
                            adminEmail : dataToPost.adminEmail,
                            adminPhone : dataToPost.adminPhone,
                            centerName : dataToPost.centerName,
                            centerCity : dataToPost.centerCity,
                            centerState : dataToPost.centerState,
                            centerCountry : dataToPost.centerCountry
                        }
                }).success(function(serverResponse) {
                    if(serverResponse =='sent'){
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                      console.log(serverResponse);
                    }
                    else if(serverResponse =='error') {
                      toaster.clear();
                      toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                      console.log(serverResponse);  
                    }
                    else
                    {
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                      console.log(serverResponse);
                    }
                }).error(function(serverResponse) {
                    if(serverResponse =='sent'){
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                      console.log(serverResponse);
                    }
                    else if(serverResponse =='error') {
                      toaster.clear();
                      toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                      console.log(serverResponse);  
                    }
                    else
                    { 
                      toaster.clear();
                      toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                      console.log(serverResponse);
                    }
                });
              });

  };

  
  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
  };

  $scope.login = function () {
    NodalTask.login($scope.user).then(function () {
      var usertype = NodalTask.resolveUser().uid;  
    });
  };


    $scope.doThisForStudent = function(studentEmail1) {
    studentEmail1 = angular.lowercase(studentEmail1); 
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        $scope.refBysameNodal="";
        //$scope.submitdisabled = true;
      }
      else {
        Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result;
          /*console.log("result :" +result);
          console.log("studentId :"+$scope.student1Uid);*/
          if($scope.student1Uid !== "user doesnot exists") {
            /*console.log("studentId :"+$scope.student1Uid);*/
            $scope.student1IdFlag = "Done";
            $scope.student1Name = Search.getStudentName($scope.student1Uid);
            $scope.studentPic = Search.getStudentPhoto($scope.student1Uid);
            Search.getNodalRefer($scope.student1Uid).then(function(result) {
              $scope.student1nodalstatus= result;
              /*console.log($scope.student1nodalstatus);*/
              var currentuser = NodalAuth.resolveUser().uid;
              /*console.log("current user :"+currentuser);
              console.log('simplelogin:' + $scope.student1nodalstatus.$value);*/
              if(('simplelogin:' + $scope.student1nodalstatus.$value) === currentuser)
                $scope.refBysameNodal="yes";
              else
                $scope.refBysameNodal="no";
            });
          }
          else{
            $scope.student1IdFlag = "Not Done";
            //$scope.submitdisabled = true;
          }

        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

  $scope.sendMail = function () {
        var currentuser = NodalTask.resolveUser().uid;
        if($scope.student1nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email1, "Email1",currentuser);
        }
        else{
          $scope.deleteEmail('Email1');
        }
        if($scope.student2nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email2, "Email2",currentuser);
        }
        else{
          $scope.deleteEmail('Email2');
        }
        if($scope.student3nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email3, "Email3",currentuser);
        }
        else{
          $scope.deleteEmail('Email3');
        }
        if($scope.student4nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email4, "Email4",currentuser);
        }
        else{
          $scope.deleteEmail('Email4');
        }
        if($scope.student5nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email5, "Email5",currentuser);
        }
        else{
          $scope.deleteEmail('Email5');
        }
        if($scope.student6nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email6, "Email6",currentuser);
        }
        else{
          $scope.deleteEmail('Email6');
        }
        if($scope.student7nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email7, "Email7",currentuser);
        }
        else{
          $scope.deleteEmail('Email7');
        }
        if($scope.student8nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email8, "Email8",currentuser);
        }
        else{
          $scope.deleteEmail('Email8');
        }
        if($scope.student9nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email9, "Email9",currentuser);
        }
        else{
          $scope.deleteEmail('Email9');
        }
        if($scope.student10nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email10, "Email10",currentuser);
        }
        else{
          $scope.deleteEmail('Email10');
        }
        if($scope.student11nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email11, "Email11",currentuser);
        }
        else{
          $scope.deleteEmail('Email11');
        }
        if($scope.student12nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email12, "Email12",currentuser);
        }
        else{
          $scope.deleteEmail('Email12');
        }
        if($scope.student13nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email13, "Email13",currentuser);
        }
        else{
          $scope.deleteEmail('Email13');
        }
        if($scope.student14nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email14, "Email14",currentuser);
        }
        else{
          $scope.deleteEmail('Email14');
        }
        if($scope.student15nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email15, "Email15",currentuser);
        }
        else{
          $scope.deleteEmail('Email15');
        }
        if($scope.student16nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email16, "Email16",currentuser);
        }
        else{
          $scope.deleteEmail('Email16');
        }
        if($scope.student17nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email17, "Email17",currentuser);
        }
        else{
          $scope.deleteEmail('Email17');
        }
        if($scope.student18nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email18, "Email18",currentuser);
        }
        else{
          $scope.deleteEmail('Email18');
        }
        if($scope.student19nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email19, "Email19",currentuser);
        }
        else{
          $scope.deleteEmail('Email19');
        }
        if($scope.student20nodalstatus == "Done") {
          NodalTask.sendEmail($scope.usern.profile.studentEmailList.Email20, "Email20",currentuser);
        }
        else{
          $scope.deleteEmail('Email20');
        }
        $scope.getemaillist();
    };  

  $scope.register = function () {
    if($scope.term !== true) {
      $scope.error = "Please agreed 'Terms of Services' and 'Privacy Policy'.";
      return;
    }
    else {
        var referredBy = NodalAuth.resolveUser().uid;
        $scope.submitbuttondisabled = true;
        $scope.modalShown = true;
        var check4 = true;
        var check2 = true;
        if(($scope.user.masterPGText !== null )){
          check4 = !($scope.uSerA.rolesA == null);
          $scope.uSer.roles = null;
        }
        else {
         
          $scope.uSerA.rolesA = null;
          check2 = !($scope.uSer.roles == null); 
        }
        var check = !(($scope.student_reg.confirm_password.$dirty) && ($scope.student_reg.confirm_password.$error.validator));
        var check1 = !(($scope.student_reg.confirm_email.$dirty) && ($scope.student_reg.confirm_email.$error.validator));
        if (check && check1 && check2 && check4) {
          NodalTask.register($scope.user).then(function(user) {
              user.md5_hash = md5.createHash($scope.user.email || '');
              user.studentname = $scope.user.studentname;
              user.studentphoto = $scope.user.studentphoto.url;
              user.studentdocument = $scope.user.studentdocument.url;
              user.studentmobile = $scope.user.studentmobile;
              user.email = angular.lowercase($scope.user.email); 
              user.fathername = $scope.user.fathername;
              user.gender = $scope.user.gender;
              user.occupation = $scope.user.occupation;
              user.fathernumber = $scope.user.fathernumber;
              user.coursesinterestedinUG = $scope.uSer.roles;
              user.coursesinterestedinPG = $scope.uSerA.rolesA;

              user.academicrecord12th = $scope.user.master12th;
              user.academicrecord12thText = $scope.user.master12thText;
              user.academicrecordUG = $scope.user.masterUG;
              user.academicrecordUGText = $scope.user.masterUGText;
              user.academicrecordPG = $scope.user.masterPG;
              user.academicrecordPGText = $scope.user.masterPGText;
              user.studentfacebook = $scope.user.studentfacebook;
              user.referredBy = $scope.user.referredBy;
              user.referredByNodalAdmin = referredBy;
              user.dateOfApplying = $filter('date')(new Date(),'d MMMM yyyy');
              if(typeof $scope.user.studentabout !== 'undefined'){
                user.studentabout = $scope.user.studentabout;
              }
                   
              user.password = $scope.user.password;
              user.profiletype = $scope.user.profiletype;
              user.studentAvailability = $scope.user.studentAvailability;
              user.studentstatus = $scope.user.studentstatus;
              user.emailverificationstatus = $scope.user.emailverificationstatus;
               NodalTask.createProfile(user); 
              $scope.modalShown = false;
              var urlId = user.uid;
              NodalTask.createAdminForStudent(user);
              NodalTask.saveEntry(referredBy, user.uid);
              var dataToPost = {
                                    to: user.email, 
                                    pass: $scope.user.password, 
                                    sname: $scope.user.studentname,
                                    hashkey : user.md5_hash,
                                    urlId : urlId
                                };
                    $http({
                    url: "/sendstudentmail", 
                    method: "GET",
                    params: {   to: dataToPost.to,
                                sname: dataToPost.sname,
                                pass : dataToPost.pass,
                                hashkey : dataToPost.hashkey,
                                urlId : dataToPost.urlId
                            }
                    }).success(function(serverResponse) {
                        console.log(serverResponse);
                    }).error(function(serverResponse) {
                        console.log(serverResponse);
                    });
              $location.path('/nodalstudent-success');
          }, function(error) {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.error = error.toString();
          });
          $scope.message = "";
          $scope.error ="";
        }
        else if (!check1 && !check)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check emails & passwords";
        }
        else if (!check)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check passwords";
        }
        else if (!check4)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please Select PG courses";
        }
        else if (!check2)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please Select UG courses";
         }
         else {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check emails";
        }
    }
  };

  $scope.deleteAllEmail = function() {
    var currentuser = NodalAuth.resolveUser().uid;
    NodalTask.deleteAllEmail(currentuser); 
  };

  $scope.deleteEmail = function(studentId) {
    var currentuser = NodalAuth.resolveUser().uid;
    NodalTask.deleteEmail(studentId,currentuser);
  };

  $scope.checkemaillist = function (){
      var currentuser = NodalAuth.resolveUser().uid;
      Search.getStudentEmailsFromNodal(currentuser).then(function(result){
        if(result.$value === null){
        $scope.cancelmail();  
        $scope.usern.profile.studentEmailList =  false;
        }
        else if(typeof result.$value == 'undefined'){
        $scope.cancelmail();
        $scope.usern.profile.studentEmailList.Email21 =  true;
        }
        else{
        $scope.usern.profile.studentEmailList.Email21 =  true;        
        }
      });
  };   

  $scope.getemaillist = function (){
    var currentuser = NodalAuth.resolveUser().uid;
    Search.getStudentEmailsFromNodal(currentuser).then(function(result){
      if(typeof $scope.usern.profile.studentEmailList.Email1 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email1 =  result.Email1;
      }
      else{
      $scope.usern.profile.studentEmailList.Email1  =  "";        
      $scope.student1IdFlag = ""; 
      $scope.student1nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email2 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email2 =  result.Email2;
      }
      else{
      $scope.usern.profile.studentEmailList.Email2 =  "";        
      $scope.student2IdFlag = ""; 
      $scope.student2nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email3 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email3 =  result.Email3;
      }
      else{
      $scope.usern.profile.studentEmailList.Email3 =  "";        
      $scope.student3IdFlag = ""; 
      $scope.student3nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email4 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email4 =  result.Email4;
      }
      else{
      $scope.usern.profile.studentEmailList.Email4 =  "";        
      $scope.student4IdFlag = ""; 
      $scope.student4nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email5 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email5 =  result.Email5;
      }
      else{
      $scope.usern.profile.studentEmailList.Email5 =  "";        
      $scope.student5IdFlag = ""; 
      $scope.student5nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email6 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email6 =  result.Email6;
      }
      else{
      $scope.usern.profile.studentEmailList.Email6 =  "";        
      $scope.student6IdFlag = ""; 
      $scope.student6nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email7 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email7 =  result.Email7;
      }
      else{
      $scope.usern.profile.studentEmailList.Email7 =  "";        
      $scope.student7IdFlag = ""; 
      $scope.student7nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email8 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email8 =  result.Email8;
      }
      else{
      $scope.usern.profile.studentEmailList.Email8 =  "";        
      $scope.student8IdFlag = ""; 
      $scope.student8nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email9 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email9 =  result.Email9;
      }
      else{
      $scope.usern.profile.studentEmailList.Email9 =  "";        
      $scope.student9IdFlag = ""; 
      $scope.student9nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email10 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email10 =  result.Email10;
      }
      else{
      $scope.usern.profile.studentEmailList.Email10 =  "";        
      $scope.student10IdFlag = ""; 
      $scope.student10odalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email20 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email20 =  result.Email20;
      }
      else{
      $scope.usern.profile.studentEmailList.Email20 =  "";        
        $scope.student20IdFlag = ""; 
        $scope.student20nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email11 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email11 =  result.Email11;
      }
      else{
      $scope.usern.profile.studentEmailList.Email11 =  "";        
      $scope.student11IdFlag = ""; 
      $scope.student11nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email12 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email12 =  result.Email12;
      }
      else{
      $scope.usern.profile.studentEmailList.Email12 =  "";        
      $scope.student12IdFlag = ""; 
      $scope.student12nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email13 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email13 =  result.Email13;
      }
      else{
      $scope.usern.profile.studentEmailList.Email13 =  "";        
      $scope.student13IdFlag = ""; 
      $scope.student13nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email14 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email14 =  result.Email14;
      }
      else{
      $scope.usern.profile.studentEmailList.Email14 =  "";        
      $scope.student14IdFlag = ""; 
      $scope.student14nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email15 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email15 =  result.Email15;
      }
      else{
      $scope.usern.profile.studentEmailList.Email15 =  "";        
      $scope.student15IdFlag = ""; 
      $scope.student15nodalstatus = "";  
      }
      if(typeof $scope.usern.profile.studentEmailList.Email16 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email16 =  result.Email16;
      }
      else{
      $scope.usern.profile.studentEmailList.Email16 =  "";        
      $scope.student16IdFlag = ""; 
      $scope.student16nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email17 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email17 =  result.Email17;
      }
      else{
      $scope.usern.profile.studentEmailList.Email17 =  "";        
      $scope.student17IdFlag = ""; 
      $scope.student17nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email18 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email18 =  result.Email18;
      
      }
      else{
      $scope.usern.profile.studentEmailList.Email18 =  "";        
      $scope.student18IdFlag = ""; 
      $scope.student18nodalstatus = "";
      }
      if(typeof $scope.usern.profile.studentEmailList.Email19 !== 'undefined'){
      $scope.usern.profile.studentEmailList.Email19 =  result.Email19;
      }
      else{
      $scope.usern.profile.studentEmailList.Email19 =  "";        
      $scope.student19IdFlag = ""; 
      $scope.student19nodalstatus = "";
      }

    });
  };

  $scope.allkeyup = function(){

    if(typeof $scope.usern.profile.studentEmailList.Email1 !== 'undefined'){
      $scope.doThisForStudent1($scope.usern.profile.studentEmailList.Email1);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email2 !== 'undefined'){
      $scope.doThisForStudent2($scope.usern.profile.studentEmailList.Email2);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email3 !== 'undefined'){
      $scope.doThisForStudent3($scope.usern.profile.studentEmailList.Email3);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email4 !== 'undefined'){
      $scope.doThisForStudent4($scope.usern.profile.studentEmailList.Email4);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email5 !== 'undefined'){
      $scope.doThisForStudent5($scope.usern.profile.studentEmailList.Email5);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email6 !== 'undefined'){
      $scope.doThisForStudent6($scope.usern.profile.studentEmailList.Email6);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email7 !== 'undefined'){
      $scope.doThisForStudent7($scope.usern.profile.studentEmailList.Email7);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email8 !== 'undefined'){
      $scope.doThisForStudent8($scope.usern.profile.studentEmailList.Email8);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email9 !== 'undefined'){
      $scope.doThisForStudent9($scope.usern.profile.studentEmailList.Email9);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email10 !== 'undefined'){
      $scope.doThisForStudent10($scope.usern.profile.studentEmailList.Email10);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email11 !== 'undefined'){
      $scope.doThisForStudent11($scope.usern.profile.studentEmailList.Email11);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email12 !== 'undefined'){
      $scope.doThisForStudent12($scope.usern.profile.studentEmailList.Email12);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email13 !== 'undefined'){
      $scope.doThisForStudent13($scope.usern.profile.studentEmailList.Email13);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email14 !== 'undefined'){
      $scope.doThisForStudent14($scope.usern.profile.studentEmailList.Email14);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email15 !== 'undefined'){
      $scope.doThisForStudent15($scope.usern.profile.studentEmailList.Email15);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email16 !== 'undefined'){
      $scope.doThisForStudent16($scope.usern.profile.studentEmailList.Email16);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email17 !== 'undefined'){
      $scope.doThisForStudent17($scope.usern.profile.studentEmailList.Email17);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email18 !== 'undefined'){
      $scope.doThisForStudent18($scope.usern.profile.studentEmailList.Email18);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email19 !== 'undefined'){
      $scope.doThisForStudent19($scope.usern.profile.studentEmailList.Email19);
    }
    if(typeof $scope.usern.profile.studentEmailList.Email20 !== 'undefined'){
      $scope.doThisForStudent20($scope.usern.profile.studentEmailList.Email20);
    }
  };

  $scope.cancelmail = function () {

    $scope.student1IdFlag = ""; 
    $scope.student1nodalstatus = "";
   
    $scope.student2IdFlag = ""; 
    $scope.student2nodalstatus = "";
    $scope.student3IdFlag = ""; 
    $scope.student3nodalstatus = "";

    $scope.student4IdFlag = ""; 
    $scope.student4nodalstatus = "";
   
    $scope.student5IdFlag = ""; 
    $scope.student5nodalstatus = "";
   

    $scope.student6IdFlag = ""; 
    $scope.student6nodalstatus = "";
   
    $scope.student8IdFlag = ""; 
    $scope.student8nodalstatus = "";
   
    $scope.student7IdFlag = ""; 
    $scope.student7nodalstatus = "";
   
    $scope.student9IdFlag = ""; 
    $scope.student9nodalstatus = "";
   
    $scope.student10IdFlag = ""; 
    $scope.student10nodalstatus = "";
   


    $scope.student11IdFlag = ""; 
    $scope.student11nodalstatus = "";
   
    $scope.student12IdFlag = ""; 
    $scope.student12nodalstatus = "";
   
    $scope.student13IdFlag = ""; 
    $scope.student13nodalstatus = "";
   
    $scope.student14IdFlag = ""; 
    $scope.student14nodalstatus = "";
   
    $scope.student15IdFlag = ""; 
    $scope.student15nodalstatus = "";
   

    $scope.student16IdFlag = ""; 
    $scope.student16nodalstatus = "";
   
    $scope.student18IdFlag = ""; 
    $scope.student18nodalstatus = "";
   
    $scope.student17IdFlag = ""; 
    $scope.student17nodalstatus = "";
   
    $scope.student19IdFlag = ""; 
    $scope.student19nodalstatus = "";
   
    $scope.student20IdFlag = ""; 
    $scope.student20nodalstatus = "";
    $scope.submitdisabled = true;
  };

  $scope.getStudentsEmailList = function() {
    var currentuser = NodalAuth.resolveUser().uid;
    return NodalTask.getStudentEmailListByNodal(currentuser);
  };

  $scope.getStudentsInfo = function() {
    var currentuser = NodalAuth.resolveUser().uid;
    return NodalTask.getReferredStudentsByNodal(currentuser);
  };

  $scope.getStudentDetail = function(studentId) {
    return Search.getStudentDetail(studentId);
  };
  $scope.getStudentInfo = function(studentId) {
    $scope.studentInfo=Search.getStudentDetail(studentId);
    $scope.$evalAsync();
  };

  $scope.totalSessionCount = [];
  $scope.sessionTillDateCount = [];
  $scope.allSessionCount = [];
  
  $scope.getStudentSessionDetailBeforeEnrollment = function(studentId, index) {
    //console.log(studentId);
    var currentuser = NodalAuth.resolveUser().uid;
  //  console.log(currentuser);
    $scope.sessionTillDateCount[index] = NodalTask.getStudentSessionDetailBeforeEnrollment(studentId,currentuser);
    /*console.log("index :" +index);*/
  //  console.log("sessionTillDateCount[index] :" +$scope.sessionTillDateCount[index]);
  };

  $scope.getStudentSessionDetail = function (studentId, index) {
    var ApprovedSessionCount = 0;
    var counter = 0;
    $scope.allSessionCount[index]=0;
    $scope.totalSessionCount[index] = 0;
    NodalTask.getStudentSessionDetail(studentId).then( function(value) {
      var sessions = value;
      var sessionArrayLength = sessions.length;
      angular.forEach(sessions, function(value,key) {
        counter = counter + 1;
        if(typeof value.incentiveAmountPerSession !== 'undefined') {
          ApprovedSessionCount = ApprovedSessionCount+1;
          //console.log(ApprovedSessionCount);
        }
        if(counter === sessionArrayLength) {
         // console.log(ApprovedSessionCount);
          $scope.totalSessionCount[index] = ApprovedSessionCount;
          $scope.allSessionCount[index]=counter;
        }
      });
    })
  };

  $scope.totalReferredStudents = [];
  $scope.totalReferredStudentsBeforeEnrollment = [];
  $scope.getStudentReferralBeforeEnrollment = function(studentId, index) {
    var currentuser = NodalAuth.resolveUser().uid;
    $scope.totalReferredStudents[index] = NodalTask.getTotalStudentReferral(studentId);
    $scope.totalReferredStudentsBeforeEnrollment[index] = NodalTask.getStudentReferralBeforeEnrollment(studentId, currentuser);
  }
}).value('duScrollOffset', 30);