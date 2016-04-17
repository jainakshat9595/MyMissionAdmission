'use strict';

app.controller('CollegeDashCtrl', function ($routeParams, $scope, $route, $filter, $document, $location,$http, $firebaseArray, FIREBASE_URL,Search,Update,Auth, AdminAuth, $modal, AuthCollege, CollegeReg, Feedback,CollegeDashBookedHistory) {
   
     //$scope.user = Auth.user.profile;
     $scope.userc = AuthCollege.userc;
     $scope.usera = AdminAuth.usera;
     $scope.chatFeedback = [];
     $scope.videourl = [];
     $scope.chatdiscussion = [];
     $scope.nextstep = [];
     $scope.feedBackStatus = [];
     $scope.sessionVerificationStatus = "";
     $scope.onfeedbacksuccessful = false;
     $scope.submitsuccesstext2 = false;

      $scope.gender = [{
          name: "Male"
       },{  
          name: "Female"
      }];


     $(window).on('beforeunload',function(){
      if($location.path()=='/hang/'+$routeParams.email){
        var collegeurl = AuthCollege.resolveUser().uid;
         // (new Firebase(FIREBASE_URL+'/tempStudentRecordForActiveUser/' + collegeurl)).set(null);
      }
    });

      $scope.getEmail = function (){
      localStorage.removeItem('nodalemail');
      var str = $location.path();
      var data = str.split("/hang/:");
      if(typeof(data[1]) == 'undefined') 
        $scope.nodalemail = "";
      else {
        $scope.nodalemail = data[1];
      }  
    };
     
    $scope.checckk = function(){
      $scope.openHangout();
    };

       
    $scope.openHangout = function() {
      gapi.hangout.render('placeholder-div3', {
        'render': 'createhangout',
        'invites': [{ 'id' :  $scope.nodalemail, 'invite_type' : 'EMAIL' },
                    { 'id' : 'india.mymissionadmission@gmail.com', 'invite_type' : 'EMAIL' }],
        'hangout_type': 'onair',
        'initial_apps': [{'app_id' : '1088903491951' }],
        'widget_size': 175
      });
    };    

     $scope.getdata = function(adminmail) {
       if(typeof adminmail !== 'undefined') {
        var getadmin = Search.getAdminDetail(adminmail).then(function(result1) {
         $scope.adminname = result1.adminname;
         $scope.adminmobile = result1.adminmobile;
         $scope.adminemail = result1.adminemail;
       });
      }
      else{
        $scope.adminname = null;
      }  
     };

     $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };

    $scope.createFeedbackForCollege = function (studentQuery, studenturlId, collegeurlId, sessionDate, collegeURL, studentURL, sessionVerificationStatus, nodalId, hours, minutes) {
      $scope.chatdiscussion[studenturlId] = $scope.Feedback.chatdiscussion;
      $scope.videourl[studenturlId] = $scope.Feedback.videourl;
      $scope.nextstep[studenturlId] = $scope.Feedback.nextstep;
      var chatDiscussion = $scope.chatdiscussion[studenturlId];
      var videoURL = $scope.videourl[studenturlId];
      var nextStep = $scope.nextstep[studenturlId];  
      /*var str = collegeURL;
      var collegeIdArraySplit = str.split(":");*/
      var collegeurlId = collegeurlId;
      var interactionId = collegeurlId+"IID"+studenturlId;

      var a = sessionDate.split(" ");  
      var nCode = nodalId.split("NODAL");
      var sample = nCode[1]+"H"+hours+"MT"+minutes+"D"+a[0]+"M"+a[1]+"Y2015";
      var feedbackLengthRef = new Firebase(FIREBASE_URL + 'collegeFeedback/' + collegeURL);
      var feedbackLengthArray = $firebaseArray(feedbackLengthRef);
      feedbackLengthArray.$loaded(function(result) {
        $scope.feedbackLength = result.length;
        Feedback.writeFeedbackForCollege(studentQuery, chatDiscussion, videoURL, nextStep, sessionDate, collegeURL, studentURL, sessionVerificationStatus, interactionId, sample, $scope.feedbackLength, $scope);
        if($scope.studentGroupToGiveFeedback.length>0) {
          $scope.giveFeedbackToOtherStudentsInGroup(studentQuery, sessionDate, collegeURL, sessionVerificationStatus, chatDiscussion, videoURL, nextStep, collegeurlId, sample);      
        }
        else
          $scope.onfeedbacksuccessful = true;
        $scope.videourl = '';
        $scope.nextstep = '';
        $scope.chatDiscussion = '';
      });
    };

    $scope.giveFeedbackToOtherStudentsInGroup = function(studentQuery, sessionDate, collegeURL, sessionVerificationStatus, chatDiscussion, videoURL, nextStep, collegeurlId, sample) {
      angular.forEach($scope.studentGroupToGiveFeedback, function(value,key) {
        $scope.feedbackLength = $scope.feedbackLength+1;
        var studentURL = value.url;
        var str = value.url;
        var studentIdArraySplit = str.split(":");
        var studentUrlId = studentIdArraySplit[1];
        var interactionId = collegeurlId+"IID"+studentUrlId;
        Feedback.writeFeedbackForCollege(studentQuery, chatDiscussion, videoURL, nextStep, sessionDate, collegeURL, studentURL, sessionVerificationStatus, interactionId, sample, $scope.feedbackLength, $scope);
        $scope.onGroupfeedbacksuccessful = true;        
      });
    };

     $scope.open = function (size, nodaluid) {
        //console.log(nodaluid);
         var modalInstance = $modal.open({
           templateUrl: 'myModalContent2.html',
           controller: 'ModalInstanceCtrl2',
           size: size,
           resolve: {
               items: function () {
                      return nodaluid;
             }
          }
         });
     };

     $scope.getPreviousFeedbackOfStudents = function (studenturl, collegeurl, currentStudentName){
      $scope.currentStudentName = currentStudentName;
      $scope.onfeedbacksuccessful = false;
      $scope.Feedback = Feedback.getPreviousFeedbackOfStudents(studenturl, collegeurl);
    };

    //Edit college Profile
      $scope.updateClgProfile = function() {
     var college = AuthCollege.resolveUser().uid;
     $scope.submitsuccesstext1 = false;
     $scope.submitphotosuccesstext = false;
     AuthCollege.updateClgProfile($scope,college); 
    };
    $scope.updatePhoto = function(newphoto) {
     var collegeId = AuthCollege.resolveUser().uid;
     $scope.submitphotosuccesstext = false;
     AuthCollege.updateClgPhoto(collegeId, newphoto , $scope); 
    };
    $scope.cancel = function() {
       
     $scope.message= "";
     $scope.submitphotosuccesstext = false;
     $scope.submitsuccesstext1 = false;
     $scope.submitsuccesstext2 = false;
     $scope.submitdocumentsuccesstext = false;
     $scope.submitsuccesstext = false; 
     console.log("in cancel");
     var test = [];
     var college = AuthCollege.resolveUser().uid;
     AuthCollege.resetChanges(college).then( function ( result ) {
     var canceling  = result;
     $scope.userc.profile.collegename = canceling.collegename;
     $scope.userc.profile.collegemobile = canceling.collegemobile;
     $scope.userc.profile.collegeaffiliation = canceling.collegeaffiliation;
     $scope.userc.profile.collegeaddress = canceling.collegeaddress;
     $scope.userc.profile.collegewebsite = canceling.collegewebsite;
     $scope.userc.profile.collegephoto = canceling.collegephoto;
     $scope.userc.profile.collegeCounsellor1Name = canceling.collegeCounsellor1Name;
     $scope.userc.profile.collegeCounsellor1Email = canceling.collegeCounsellor1Email;
     $scope.userc.profile.collegeCounsellor1gender = canceling.collegeCounsellor1gender;
     $scope.userc.profile.collegeCounsellor1Number = canceling.collegeCounsellor1Number;
     $scope.userc.profile.collegeCounsellor1photo = canceling.collegeCounsellor1photo;
     },
     function(error){
       console.log(error);
     }); 
    };

    $scope.validation = "";

     $scope.sendCounsellorMail=function(){
      $scope.submitsuccesstext1 = false;
      $scope.submitsuccesstext2 = false;
      $scope.submitphotosuccesstext = false;
     if(typeof $scope.userc.profile.collegeCounsellor1Name !== 'undefined' && typeof $scope.userc.profile.collegeCounsellor1gender !== 'undefined' && typeof $scope.userc.profile.collegeCounsellor1Email !== 'undefined' && typeof $scope.userc.profile.collegeCounsellor1Number !== 'undefined' && typeof $scope.userc.profile.collegeCounsellor1photo !== 'undefined' ){
      $scope.validation = "";
      if(typeof $scope.userc.profile.collegeCounsellor1Number !== 'undefined'){
            var s = $scope.userc.profile.collegeCounsellor1Number;
              if (/[0-9]{3}-?[0-9]{6,12}$/.test(+s) && s.length <= 15) {
                $scope.validation = "";
                $( document ).on( "click", "#submit-btn-2", function( event ) {    
                $(".edit-field-2").hide();
                $(".non-edit-field-2").show();

              });
                 var college = AuthCollege.resolveUser().uid;
                 AuthCollege.updateCounsellorMail($scope,college);
                 var dataToPost = {
                                            cnames: $scope.userc.profile.collegeCounsellorName, 
                                            cemail: $scope.userc.profile.collegeCounsellorEmail,
                                            clgname: $scope.userc.profile.collegename
                                  };
                            $http({
                            url: "/sendcounsellordetailmail", 
                            method: "GET",
                            params: {   cname: dataToPost.cname,
                                        cemail: dataToPost.cemail,
                                        clgname: dataToPost.clgname
                                    }
                            }).success(function(serverResponse) {
                                console.log(serverResponse);
                            }).error(function(serverResponse) {
                                console.log(serverResponse);
                            });  
              
              }
              else{
                $scope.validation = "Please enter correct contact number";
              }
       }         
         }
         else{
          console.log("Wrong");
          if(typeof $scope.userc.profile.collegeCounsellor1Name === 'undefined' ){
            $scope.validation ="Please Enter Counsellor Name";
          }
          else if(typeof $scope.userc.profile.collegeCounsellor1gender === 'undefined' ){
             $scope.validation ="Please select Gender";
          }
          
          else if(typeof $scope.userc.profile.collegeCounsellor1Number === 'undefined' ){
             $scope.validation ="Please Enter Number";
          }
          else if(typeof $scope.userc.profile.collegeCounsellor1Email === 'undefined' ){
             $scope.validation ="Please Enter Counsellor Email";
          }
          else if(typeof $scope.userc.profile.collegeCounsellor1photo === 'undefined' ){
             $scope.validation ="Please Upload Photo";
          }
          else{
              $scope.validation ="Please fill all the fields"; 
          }

         }


             
    };


    $scope.getStudentGroup = function (collegeurl, nodalId, sessiondate, sessionminute, sessionhour ,studenturl) {
      var a = sessiondate.split(" ");  
      var nCode = nodalId.split("NODAL");
      if(nCode !== 1025) {
        var sample = nCode[1]+"H"+sessionhour+"MT"+sessionminute+"D"+a[0]+"M"+a[1]+"Y2015";
        Feedback.getStudentGroup(sample, collegeurl, $scope,studenturl);  
      }
    };

    $scope.studentGroupToGiveFeedback = [];
    $scope.master = [];

    $scope.checkAll = function () {
      if ($scope.selectedAll) {
          $scope.selectedAll = true;
          angular.forEach($scope.studentName, function (value,key) {
            $scope.studentGroupToGiveFeedback = $scope.studentGroupToGiveFeedback.concat([{
                                                                                          url :value.url,
                                                                                          Name : value.name.$value
                                                                                        }]);
          });
      } else {
          $scope.selectedAll = false;
          $scope.studentGroupToGiveFeedback = [];
      }
      angular.forEach($scope.studentName, function (value,key) {
          $scope.master[key] = $scope.selectedAll;
          $scope.$evalAsync();
      });
    };

    $scope.addStudentToGiveFeedback = function(studenturl,master,id,studentName) {
      if(master) {
        $scope.studentGroupToGiveFeedback = $scope.studentGroupToGiveFeedback.concat([{
                                                                                          url :studenturl,
                                                                                          Name : studentName
                                                                                    }]);
      }
      else if(!master) {
        angular.forEach($scope.studentGroupToGiveFeedback, function(value,key) {
          if(value.url === studenturl){
            $scope.studentGroupToGiveFeedback.splice(key,1);
          }
        })
      }
    };

    $scope.saveActiveStudentUrlIntempFirebase = function(studenturl,collegeurl,nodal,date,minutes,hour) {
         var ncode = nodal.split("NODAL")[1];
          var hour = hour;
          var minutes = minutes;
          var month = date.split(" ");
          var sample = ncode+"H"+hour+"MT"+minutes+"D"+month[0]+"M"+month[1]+"Y"+month[2];
          $scope.sample = sample;
          Feedback.saveActiveStudentUrlIntempFirebase(collegeurl,sample);

    };

    $scope.getStudentDataForParticipant = function(collegeurl,studenturl,temp) {
        if(temp == 1) {
          Feedback.getStudentDataForParticipant(collegeurl,studenturl,$scope);
        }
        temp = temp + 1
    };



    $scope.getActiveUserForHangout = function() {
           var collegeurl = AuthCollege.resolveUser().uid;
          Feedback.getActiveUserForHangout(collegeurl,$scope);
    }
     
}).value('duScrollOffset', 30);