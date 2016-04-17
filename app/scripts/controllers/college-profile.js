'use strict';
 
app.controller('CollegeProfileCtrl', function ($scope, $location, $document, $modal, $http, $filter, Webinar, AuthCollege, Auth, $log, AdminAuth, Search, Session, toaster) {

  var str = $location.path();
  var collegeIdArraySplit = str.split("/college-profile/");
  $scope.userc = AuthCollege.userc;
  $scope.user = Auth.user;
  $scope.usera = AdminAuth.usera;
  $scope.query = "";
  $scope.submitsuccesstext = false;
  $scope.emailNotVerified = false;
  $scope.sessionExists = 'undefined';
  $scope.webinar_booking_success = [];
  $scope.webinarAlreadyBooked = [];

  $scope.ugCourses=['Engineering','Computer Applications/IT' ,'Biotechnology','Microbiology','Agriculture','Food Technology','Nutrition and Dietetics','Arts (Humanities)','Library Science','Management','Commerce','Economics','Hotel Management/Hospitality and Tourism','Architecture','Planning','Fine Arts','Performing Arts','Pharmaceutical Sciences','Ayurvedic Pharmaceutical Sciences','Physiotherapy','Paramedical Sciences','Education','Physical Education','Law','Design','Sciences','Nursing','Film & Television','Media & Journalism'];
  $scope.pgCourses=['Engineering','Computer Applications / IT' ,'Biotechnology','Microbiology','Biochemistry','Agriculture','Food Technology','Nutrition and Dietetics','English and Foreign Languages','Indian Languages','Library Science','Sociology','Geography','Management','Commerce','Economics','Hotel Management/Hospitality and Tourism' ,'Architecture','Planning','Fine Arts','Performing Arts','Pharmaceutical Sciences','Ayurvedic Pharmaceutical Sciences','Physiotherapy','Paramedical Sciences','History','Political Science','Psychology','Education','Physical Education','Law','Design','Sciences','Nursing','Film & Television','Media & Journalism'];

  $scope.studentblocked = false;
  
  $scope.college = Search.find(collegeIdArraySplit[1]); 

  if ($location.path() === '/') {     
  }

  


                                                                /*webinar*/
  


  $('#bookSession_session').hide();
  $('#bookSession_webinar_btn').css('border-bottom','2px solid white');
  $scope.change_bookSessionView = function(viewTab) {
    if(viewTab === 'webinar') {
      $('#bookSession_webinar_btn').css('border-bottom','2px solid white');
      $('#bookSession_session_btn').css('border-bottom','');
      $('#bookSession_session').hide();
      $('#bookSession_webinar').show();
    }
    else if(viewTab === 'session') {
      $('#bookSession_session_btn').css('border-bottom','2px solid white');
      $('#bookSession_webinar_btn').css('border-bottom','');
      $('#bookSession_session').show();
      $('#bookSession_webinar').hide();
    }
  };
  
  $scope.getUpcommingWebinar = function(collegeId) {
    Webinar.getUpcomingWebinar(collegeId, $scope);
  };
  
  $scope.getCurrentWebinarDetails = function(webinarDetail) {
    $scope.currentWebinar = webinarDetail;
  };

  $scope.bookThisSession= function(currentWebinar) {
    var currentStudent = Auth.resolveUser().auth.uid;
    Webinar.bookWebinar($scope ,currentWebinar.mentorName, currentWebinar.mentorEmail,currentWebinar.mentorMobile,currentWebinar.mentorGender,currentWebinar.mentorPhoto,currentWebinar.webinarTopic,currentWebinar.webinarDate,currentWebinar.webinarTime,currentWebinar.webinarDescription,currentWebinar.webinarDuration,currentWebinar.studentsAttending,currentWebinar.collegeId,currentWebinar.webinarId,currentStudent);
  };



                                                            /*End webinar*/




  $scope.resendemail = function () {
    //var str = Auth.resolveUser().uid;
    var urlId = Auth.resolveUser().uid;
    toaster.pop('wait', "Email verification", 'Sending Email', 10000);
    var dataToPost = {
                                to: $scope.user.profile.email, 
                                pass: $scope.user.profile.password, 
                                sname: $scope.user.profile.studentname,
                                hashkey : $scope.user.profile.md5_hash,
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
                    if(serverResponse =='sent'){
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
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
                      toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
                      console.log(serverResponse);
                    }
                }).error(function(serverResponse) {
                    if(serverResponse =='sent'){
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Please check your email for the verification link.");
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
  };

  $scope.unblock = function () {
  toaster.pop('wait', "Unblock Request", 'Sending Email', 10000);
                var dataToPost = {  
                                sname: $scope.user.profile.studentname,
                                email: $scope.user.profile.email,
                            };
                $http({
                url: "/sendunblockmail", 
                method: "GET",
                params: {  
                            studentname: dataToPost.sname,
                            studentemail : dataToPost.email
                        }
                }).success(function(serverResponse) {
                    if(serverResponse =='sent'){
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Our team will review your request.");
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
                      toaster.pop('success', "Thankyou!", "Our team will review your request.");
                      console.log(serverResponse);
                    }
                }).error(function(serverResponse) {
                    if(serverResponse =='sent'){
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Our team will review your request.");
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
  }
 

  $scope.close_all_pop = function() {
    $scope.emailNotVerified = false;
  };

  $scope.sessionQuery = function (collegeId) {
    $scope.query = Session.sessionQuery(collegeId);
  };

 
  $scope.bookSession = function ( collegeId , studenturlid, collegeurlid, studentEmailVerificationStatus , sessions, studentStatus ) {
    $scope.studentblocked = true;

    Session.doesSessionExists(collegeId).then(function(result) {
      $scope.sessionExists = result;
      

      if($scope.sessionExists == true) {
        $scope.sessionQuery(collegeId);
      }
      else if($scope.sessionExists == false) {
        if(studentEmailVerificationStatus === 'false') {
          $scope.emailNotVerified = true;
        }
        else if(studentEmailVerificationStatus === 'true' && studentStatus !== 'block') {
          Session.booksession( collegeId, studenturlid, collegeurlid, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'), $scope.query );
          $scope.submitsuccesstext = true;

          var dataToPostCollege =  {
                              to: $scope.college.counselloremail, 
                              hour: $scope.mytime.getHours(), 
                              minute: $scope.mytime.getMinutes(), 
                              date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                              query: $scope.query, 
                              cname: $scope.college.collegename,
                              sname: $scope.user.profile.studentname
                            };

                      $http({
                      url: "/sendsessionmailtocollege", 
                      method: "GET",
                      params: { to: dataToPostCollege.to, 
                                hour: dataToPostCollege.hour, 
                                minute: dataToPostCollege.minute, 
                                query: dataToPostCollege.query, 
                                cname: dataToPostCollege.cname,
                                sname: dataToPostCollege.sname, 
                                date: dataToPostCollege.date
                              }
                      }).success(function(serverResponse) {
                          console.log(serverResponse);
                      }).error(function(serverResponse) {
                          console.log(serverResponse);
                      });

          var dataToPostSupport =  { 
                             hour: $scope.mytime.getHours(), 
                             minute: $scope.mytime.getMinutes(), 
                             date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                             query: $scope.query, 
                             cname: $scope.college.collegename,
                             sname: $scope.user.profile.studentname
                           };

                     $http({
                     url: "/sendsessionmailtosupport", 
                     method: "GET",
                     params: { hour: dataToPostCollege.hour, 
                               minute: dataToPostCollege.minute, 
                               query: dataToPostCollege.query, 
                               cname: dataToPostCollege.cname,
                               sname: dataToPostCollege.sname, 
                               date: dataToPostCollege.date
                             }
                     }).success(function(serverResponse) {
                         console.log(serverResponse);
                     }).error(function(serverResponse) {
                         console.log(serverResponse);
                     });

          var dataToPostStudent =  {
                              to: $scope.user.profile.email, 
                              hour: $scope.mytime.getHours(), 
                              minute: $scope.mytime.getMinutes(), 
                              date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                              query: $scope.query, 
                              cname: $scope.college.collegename,
                              sname: $scope.user.profile.studentname
                            };

                      $http({
                      url: "/sendsessionmailtostudent", 
                      method: "GET",
                      params: { to: dataToPostStudent.to, 
                                hour: dataToPostStudent.hour, 
                                minute: dataToPostStudent.minute, 
                                query: dataToPostStudent.query, 
                                cname: dataToPostStudent.cname,
                                sname: dataToPostStudent.sname, 
                                date: dataToPostStudent.date
                              }
                      }).success(function(serverResponse) {
                          console.log(serverResponse);
                      }).error(function(serverResponse) {
                          console.log(serverResponse);
                      });
        }
      }
    });
  };

  $scope.available = function() {
      if($scope.college.collegeAvailability == "online")
        return true;
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };

 
  $scope.notavailable = function() {
    if($scope.college.collegeAvailability == "offline")
      return true;
  };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = new Date();
  };
  
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };

  /*$scope.openModalCourseOffered = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };*/
}).value('duScrollOffset', 30);
