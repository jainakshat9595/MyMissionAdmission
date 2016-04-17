'use strict';

app.controller('MainCtrl', function ($window, $route, $scope,$http , $log, $document, $location, $sce, md5, AuthSchool, Auth, Search, NodalAuth, AdminAuth, AuthCollege, CollegeReg, dropdownFactory, toaster, Webinar) {
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;
  $scope.user = Auth.user;
  $scope.usera = AdminAuth.usera;
  $scope.userc = AuthCollege.userc;
  $scope.usern = NodalAuth.usern;
  $scope.users = AuthSchool.users;
  $scope.signedInForCollege = CollegeReg.signedInForCollege;
  $scope.logoutForCollege = CollegeReg.logoutForCollege;
  $scope.posTemp = "";
  $scope.successmessage = "";
  $scope.knowMoreClicked = 'false';
  $scope.webinar_booking_success = [];
  $scope.webinarAlreadyBooked = [];
  $scope.anyLiveWebinars = [];
    
    $scope.$route = $route;

    $scope.custom = {
        video: 'FXh6tuXPXGU',
        player: null,
        vars: {
            controls: 0,
            rel:0
        }
    };

    $scope.gender = [{
            name: "Male"
         },{  
            name: "Female"
    }];

                                                            /*webinar*/
    $scope.arrayIter = 0;

    $scope.getUpcomingWebinar = function() {
        Webinar.getUpcomingWebinarOnMainPage().then(function(upcomingWebinars){
          $scope.upcomingWebinars = upcomingWebinars;
        })
    };

    $scope.getDetailOfCurrentWebinar = function(index) {
        $scope.currentWebinar = $scope.upcomingWebinars[index];
    };
    
    /*$('#listOfLiveWebinar').hide();
    $('#LiveWebinar').hide();*/

  $scope.showWebinar = function(webinar) {
      $('#listOfLiveWebinar').hide();
      $scope.webinarDetailForNavigationBar = webinar;
      if(Auth.signedIn()) {
        $scope.bookThisWebinar(webinar);
        $scope.getQNAdetails();
        $scope.getVedioSrc(webinar.liveStreamURL)
        $('#LiveWebinar').show();
      }
      else {
        $(".navLiveIndicator-div_login").show();
      }
  };

  $scope.getVedioSrc = function(liveStreamURL) {
        var Id = liveStreamURL.split(".be/");
        var vedioId = Id[1];
        var videourl = "https://www.youtube.com/embed/" + vedioId + "?rel=0&amp;showinfo=0&modestbranding=1&autohide=1";
        $scope.video = {src:videourl, title:"LiveStreamUrl"};
  };

  $scope.getQNAdetails = function() {
    Webinar.getQNAdetails($scope.webinarDetailForNavigationBar, $scope);
  };

  $scope.askQuestion = function(question) {
    Webinar.studentAskedAQuestion($scope.user.uid, $scope.user.profile.studentname, $scope.webinarDetailForNavigationBar, question, $scope);
    Webinar.saveQuestionAsComment($scope.user.uid, $scope.user.profile.studentname, $scope.webinarDetailForNavigationBar, question);
    $scope.question = '';
    $scope.$evalAsync();
  };

  $scope.hideLiveWebinar = function(key) {
      $('#listOfLiveWebinar').show();
      $('#LiveWebinar').hide();
  };
  $scope.slide_navLiveIndicator_divOpen = function() {
    $('.navLiveIndicator-div').addClass('show');
    $('.navLiveIndicator').addClass('show');
    $('#listOfLiveWebinar').show();
  };

  $scope.slide_navLiveIndicator_divClose = function() {
    $('.navLiveIndicator-div').removeClass('show');
    $('.navLiveIndicator').removeClass('show');
    $('#listOfLiveWebinar').show();
    $('#LiveWebinar').hide();
    $(".navLiveIndicator-div_login").hide();
  };

  $scope.showRegisterBtn_webinar_Main = function(iden) {
    var x = "#webinar_main_btn_"+iden;
    $(x).css('transform', 'translate(0%, 0%)');
  };
  $scope.hideRegisterBtn_webinar_Main = function(iden) {
    var x = "#webinar_main_btn_"+iden;
    $(x).css('transform', 'translate(0%, -100%)');
  };

    $scope.arrayNext = function () {
      $scope.arrayIter++;
      if($scope.arrayIter>($scope.upcomingWebinars.length-4)) {
        $scope.arrayIter=0;
      }
      $scope.$evalAsync();
    };
    
    $scope.arrayPrev = function () {
      $scope.arrayIter--;
      if($scope.arrayIter<0) {
        $scope.arrayIter=$scope.upcomingWebinars.length-4;
      }
      $scope.$evalAsync();
    };

    $scope.bookThisWebinar = function(currentWebinar) {
      var currentStudent = Auth.resolveUser().auth.uid;
      Webinar.bookWebinar($scope ,currentWebinar.mentorName, currentWebinar.mentorEmail,currentWebinar.mentorMobile,currentWebinar.mentorGender,currentWebinar.mentorPhoto,currentWebinar.webinarTopic,currentWebinar.webinarDate,currentWebinar.webinarTime,currentWebinar.webinarDescription,currentWebinar.webinarDuration,currentWebinar.studentsAttending,currentWebinar.collegeId,currentWebinar.webinarId,currentStudent);
    };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.login = function () {
      $scope.modalShown = true;
      Auth.login($scope.user , $scope).then(function () {
        var usertype = Auth.resolveUser().auth.uid;
        $scope.modalShown = false;
        $scope.bookThisWebinar($scope.webinarDetailForNavigationBar);
        $scope.getQNAdetails();
        $scope.getVedioSrc($scope.webinarDetailForNavigationBar.liveStreamURL)
        $(".navLiveIndicator-div_login").hide();
        $('#LiveWebinar').show();
      });
    };

    $scope.register = function () {
      if($scope.term !== true) {
        $scope.error = "Please agreed 'Terms of Services' and 'Privacy Policy'.";
        return;
      }
      else {
          $scope.submitbuttondisabled = true;
          $scope.modalShown = true;
          var check = !(($scope.student_reg.confirm_password.$dirty) && ($scope.student_reg.confirm_password.$error.validator));
          var check1 = !(($scope.student_reg.confirm_email.$dirty) && ($scope.student_reg.confirm_email.$error.validator));
          if (check && check1) {
            Auth.register($scope.user).then(function(user) {
              return Auth.login($scope.user).then(function() {
                user.md5_hash = md5.createHash($scope.user.email || '');
                user.studentname = $scope.user.studentname;
                user.studentmobile = $scope.user.studentmobile;
                user.email = angular.lowercase($scope.user.email); 
                user.fathername = $scope.user.fathername;
                user.gender = $scope.user.gender;
                user.password = $scope.user.password;
                user.profiletype = 'student';
                user.studentAvailability = 'offline';
                user.studentstatus = 'notverified';
                user.emailverificationstatus = 'false';
                user.referredBy = 'nobody';
                user.studentphoto ='https://www.filepicker.io/api/file/EZCfLcpQwz74j4SuozGA';
                return Auth.createProfile(user);
              }).then(function() {
                $scope.modalShown = false;
                //var str = user.uid;
                var urlId = user.uid;
                Auth.createAdminForStudent(user);
                var dataToPost = {
                                      to: user.email, 
                                      pass: $scope.user.password, 
                                      sname: $scope.user.studentname,
                                      hashkey : user.md5_hash,
                                      semail : $scope.user.email,
                                      smobile : $scope.user.studentmobile,
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
                      $http({
                      url: "/sendstudentregistrationmail", 
                      method: "GET",
                      params: {   to: dataToPost.to,
                                  semail : dataToPost.semail,
                                  sname: dataToPost.sname,
                                  pass : dataToPost.pass,
                                  smobile : dataToPost.smobile,
                              }
                      }).success(function(serverResponse) {
                          console.log(serverResponse);
                      }).error(function(serverResponse) {
                          console.log(serverResponse);
                      });
                $scope.modalShown = false;
                $scope.bookThisWebinar($scope.webinarDetailForNavigationBar);
                $scope.getQNAdetails();
                $scope.getVedioSrc($scope.webinarDetailForNavigationBar.liveStreamURL)
                $(".navLiveIndicator-div_login").hide();
                $('#LiveWebinar').show();
              });
            }, function(error) {
              $scope.modalShown = false;
              $scope.submitbuttondisabled = false;
              $scope.error = error.message;
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
          
            else {
              $scope.modalShown = false;
              $scope.submitbuttondisabled = false;
              $scope.message = "Please re-check emails";
          }
      }
    };

    $scope.doThisForStudent = function(studentEmail1) {
      studentEmail1 = angular.lowercase(studentEmail1); 
        if(!studentEmail1) {
          $scope.student1IdFlag = "";
          $scope.student1Uid = "";
          //$scope.submitdisabled = true;
        }
        else {
            Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
            $scope.student1Uid = result;
            if($scope.student1Uid !== "user doesnot exists") {
              $scope.student1IdFlag = "Done";
              $scope.student1Name = Search.getStudentName($scope.student1Uid);
            //  $scope.submitdisabled = false;
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
    
                                                  /*End webinar*/


    $scope.setDefaults = function() {
      var s = window.document.querySelector('.main-page-feature-second-how-it-works-img-div');
      var q = window.document.querySelector('.main-page-feature-third');
      var pos=null;

      if(s&&q) {
        q.style.height = '477px';
        s.style.height = '1px';
      /*  pos = s.getBoundingClientRect(); */
      }
    };

    $(window).scroll(function() {

      var stickermax = 3650;
      var windowpos = $window.scrollY;

      var s = $('.main-page-feature-second-how-it-works-img-div');

      if(windowpos>=0 && windowpos < 2100) {
        $('.main-page-feature-second-how-it-works-desktop-img img').css("margin-top","-5px");
      }
      else if(windowpos >= 2100 && windowpos < 2650) {
        $('.main-page-feature-second-how-it-works-desktop-img img').css("margin-top","-220px");
      }
      else if (windowpos >= 2650 && windowpos < 3100 ) {
        $('.main-page-feature-second-how-it-works-desktop-img img').css("margin-top","-445px");
      }
      else if(windowpos >= 3100) {
        $('.main-page-feature-second-how-it-works-desktop-img img').css("margin-top","-670px");
      }

      

  /*    console.log("scroll trigg");
      if (windowpos >= $scope.posTemp && windowpos < stickermax) {

        console.log($scope.posTemp+"AS");
        $('.main-page-feature-second-how-it-works-img-div-right').addClass('col-md-offset-6');
        s.removeClass("set-bottom");
        s.addClass("stick-top");
      } else if (windowpos >= stickermax) {
        console.log('add bottom');
        s.removeClass("stick-top");
        s.addClass("set-bottom");
        $('.main-page-feature-second-how-it-works-img-div-right').removeClass('col-md-offset-6');
      } else {
        console.log('remove both');
        s.removeClass("set-bottom stick-top");
        //s.removeClass("stick-top");
        $('.main-page-feature-second-how-it-works-img-div-right').removeClass('col-md-offset-6');
      }*/

    });

    $scope.stateSelectedFromSiteMap = function(stateId) {
        $scope.stateToView = stateId;
        $scope.state = '';
        $scope.state = dropdownFactory.getStateDropdownObject($scope.stateToView);
        $scope.disableButton1 = false;
        dropdownFactory.sendState($scope.state);
     };

     $scope.courseSelectedFromSiteMap = function(courseId) {
        $scope.courseToView = courseId;
        $scope.course = '';
        $scope.course = dropdownFactory.getCourseDropdownObject($scope.courseToView);
        $scope.disableButton2 = false;
        dropdownFactory.sendCourse($scope.course);
    };


    $scope.state = '';

      $scope.go = function ( path ) {
        $location.path( path );
      };

     $scope.dropdownMessage = 'Retrieving Locations...';
     
     $scope.states = dropdownFactory.getAllStateDropdownObjects();
      $scope.stateSelected = function() {
        $scope.state = '';
        $scope.state = dropdownFactory.getStateDropdownObject($scope.stateToView);
        $scope.disableButton1 = false;
        dropdownFactory.sendState($scope.state);
     }

    $scope.states.$loaded().then(function(data) {
        $scope.dropdownMessage = 'Where you want to study?';
    });

    $scope.toTheTop = function() {
        $document.scrollTopAnimated(0, 2000).then(function() {
        });
    };

    $scope.dropdownMessageCourses = 'Retrieving Courses...';
    
    $scope.courses = dropdownFactory.getAllCourseDropdownObjects();
    
    $scope.courseSelected = function() {
        $scope.course = '';
        $scope.course = dropdownFactory.getCourseDropdownObject($scope.courseToView);
        $scope.disableButton2 = false;
        dropdownFactory.sendCourse($scope.course);
    };

    $scope.pop = function(){
       toaster.pop('success', "title", "text");
    };

    $scope.courses.$loaded().then(function(data) {
        $scope.dropdownMessageCourses = 'What you want to study?';
    });

    $scope.androidNotification = function () {
      dropdownFactory.saveAndroidRequest($scope.notify.email).then(function() {
       var dataToPost = {
                                      to: 'support@gmail.com', 
                                      email : $scope.notify.email,
                          };
                      $http({
                      url: "/sendandroidrequestmail", 
                      method: "GET",
                      params: {   to: dataToPost.to,
                                  email : dataToPost.email     
                              }
                      }).success(function(serverResponse) {
                        $scope.notify.email = null;
                        $scope.successmessage = "Your Email is Received Thank you for Showing Interest."
                          console.log(serverResponse);
                      }).error(function(serverResponse) {
                          $scope.successmessage = "Something Went Wrong Please Try After Sometime."
                          console.log(serverResponse);
                      });
      });
    };
    
    
    $scope.sendSuccessFully = 'Not Done';
    $scope.forgotPassword = function  () {
      $scope.message='';
        $scope.sendSuccessFully = 'Not Done';
        /*console.log("function called");
        console.log($scope.user.email);*/
        dropdownFactory.forgotPassword($scope.user.email,$scope);
        $scope.user.email='';
      };
    $scope.resetPassword = function(){
      $scope.message = '';
      var location=$location.path();
          var temp = location.split("abcd.xyz=");
          var token = temp[1].split('&')[0];
          var email =temp[1].split('&')[1].split('email=')[1];
          dropdownFactory.resetPassword(email,token,$scope.user.resetpassword,$scope);
          $scope.user.resetpassword='';
          $scope.user.confirm_password='';
    };

    $scope.isAnyWebinarLive = function() {
        $scope.anyLiveWebinars = Webinar.isAnyWebinarLive();
    };

  }).value('duScrollOffset', 30);
