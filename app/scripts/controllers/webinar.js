'use strict';

app.controller('WebinarCtrl', function ($scope, $log, $document, $filter, $location, $modal, $sce, $interval,AuthSchool, $window, Webinar, toaster, Auth, AuthCollege) {

    $scope.webinar = [];
    $scope.user = Auth.user;
    $scope.signedIn = AuthSchool.signedIn;
    $scope.users = AuthSchool.users;
    $scope.gender = [{
                        name: "Male"
                    },
                    {  
                        name: "Female"
                    }];

    $scope.expandSlip = false;

    $scope.webinar_booking_success = [];                
    $scope.today = function() {
        $scope.dt = new Date();
    };
      
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };
    $scope.attendees = [];

      // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        var currentDate = new Date();
       $scope.minDate =  new Date(currentDate.getTime() + (15 * 24* 60 * 60 * 1000));
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

    $scope.toggleScheduleWebinarSuccessMsg = function() {
        $scope.schedule_webinar_success = '';
    }

    $scope.expand_schedule_webinar_panelBody = function() {
        if($('.schedule-webinar-panelBody').hasClass('schedule-webinar-panelBody-collapsed')) {
          $('.schedule-webinar-panelBody').removeClass('schedule-webinar-panelBody-collapsed');
          $('.schedule-webinar-panelBody').addClass('schedule-webinar-panelBody-expanded');
        }
        else if($('.schedule-webinar-panelBody').hasClass('schedule-webinar-panelBody-expanded')) {
          $('.schedule-webinar-panelBody').removeClass('schedule-webinar-panelBody-expanded');
          $('.schedule-webinar-panelBody').addClass('schedule-webinar-panelBody-collapsed');
        }
    };


    $scope.webinar.mentorPhoto = "http://cliparts.co/cliparts/pTo/54E/pTo54Eenc.jpg";

    $scope.scheduleWebinar = function() {
        var collegeId = AuthCollege.resolveUser().uid;
        var date = $filter('date')($scope.webinar.webinarDate,'yyyyMMdd');
        var date1 =  $filter('date')($scope.webinar.webinarDate,'yyyy MMM dd');
        var time = $filter('date')($scope.mytime,'shortTime');
        var postTime = ($scope.mytime.getHours()<10?'0':'') + $scope.mytime.getHours()+ ":" + ($scope.mytime.getMinutes()<10?'0':'') + $scope.mytime.getMinutes()+ ":" + ($scope.mytime.getSeconds()<10?'0':'') + $scope.mytime.getSeconds()+ ":" + ($scope.mytime.getMilliseconds()<10?'0':'') + $scope.mytime.getMilliseconds();
        var temporary = postTime.split(':');
        var webinarId = date.toString()+temporary[0].toString()+temporary[1].toString()+temporary[2].toString()+temporary[3].toString();
        webinarId = webinarId.toString();
        Webinar.scheduleWebinar($scope, $scope.webinar.mentorName,$scope.webinar.mentorEmail,$scope.webinar.mentorMobile,$scope.webinar.gender,$scope.webinar.mentorPhoto,$scope.webinar.webinarTopic,date1,time,$scope.webinar.webinarDescription,$scope.webinar.webinarDuration,collegeId,webinarId);
    };

    $scope.loadAllWebinars = function() {
        Webinar.getAllUpcomingWebinar($scope);
    };

    $scope.hideWebinar = [];

    /*$scope.bookWebinar = function(mentorName,mentorEmail,mentorMobile,gender,mentorPhoto,webinarTopic,webinarDate,webinarTime,webinarDescription,webinarDuration,collegeId,webinarId) {
        var studentId = Auth.resolveUser().uid;
        $scope.hideWebinar[webinarId] = 'hide';
        $scope.$evalAsync();
        Webinar.bookWebinar($scope,mentorName,mentorEmail,mentorMobile,gender,mentorPhoto,webinarTopic,webinarDate,webinarTime,webinarDescription,webinarDuration,collegeId,webinarId,studentId);
        $scope.studentBookedWebinar = [];
        $scope.studentWebinar = [];
    };*/

    $scope.getBookedWebinarForStudent = function() {
        $scope.studentBookedWebinar = [];
        $scope.studentWebinar = [];
        var studentId = Auth.resolveUser().uid;
        Webinar.getBookedWebinarForStudent(studentId,$scope);
    };

    $scope.onWebinarCompletion = function(webinarId,collegeId) {
        Webinar.onWebinarCompletion(webinarId,collegeId,$scope);
    };

    $scope.startWebinar = function(hangoutURL) {
        $window.open(hangoutURL);
    };

    $scope.getUpcomingWebinar = function() {
        var currentCollege = AuthCollege.resolveUser();
        Webinar.getUpcomingWebinar(currentCollege.uid, $scope);
    };

    $scope.studentsAttending = function(webinatId, $scope) {
        Webinar.studentsAttending(webinarId, $scope);
    };

    $scope.getCollegeWebinarsHistory = function() {
        var currentCollege = AuthCollege.resolveUser().uid;
        Webinar.getCollegeWebinarsHistory(currentCollege, $scope);
    };

    
    $scope.getAllUpcomingWebinar = function() {
        Webinar.getAllUpcomingWebinar($scope);
    };

    $scope.startChat = function(webinar) {
        $window.open("https://www.youtube.com/my_live_events");
    };

    $scope.WebinarChat = function(){
        var path = $location.path();
        var str = path.split(":");
        Webinar.getWebinarChat(str[1], $scope);
    };    

    $scope.save_urls = function(hangoutURL,liveStreamURL,collegeId,webinarId) {
        Webinar.save_urls(hangoutURL,liveStreamURL,collegeId,webinarId, $scope);
    };


    $scope.showTextBox = function(id)
    {
        $("#adminreply"+id).fadeIn();
        $("#replybtn"+id).fadeOut();
        $("#submitbtn"+id).fadeIn();
        $("#cancelbtn"+id).fadeIn();
    };

    $scope.cancelReply = function(id)
    {
        $("#adminreply"+id).fadeOut();
        $("#replybtn"+id).fadeIn();
        $("#submitbtn"+id).fadeOut();
        $("#cancelbtn"+id).fadeOut();
    };

    $scope.getWebinarDetail = function() {
        var path = $location.path();
        var str = path.split(":");
        Webinar.getWebinarDetailByWebinarId(str[1], $scope);
    };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.replyTheQuery = function(reply, questionKey, questionId) {
        var path = $location.path();
        var str = path.split(":");
        Webinar.replyTheQuery(str[1], reply, questionKey);
        $scope.cancelReply(questionId);
    };

    $scope.reportAbuse = function(chatId) {
        var path = $location.path();
        var str = path.split(":");
        Webinar.reportAbuse(str[1], chatId);
    };

    $scope.hideButtonsOnAdminWebinarChat = function() {
        $('#url_saved_Message').hide();
        $('#liveButton').hide();
        $('.webinarCompleted').hide();
    };
    $scope.liveTheWebinar = function(webinarDetails) {
        Webinar.liveTheWebinar(webinarDetails,$scope);
    };

    $scope.getCompletedWebinarsHistory = function() {
        var currentCollege = AuthCollege.resolveUser().uid;
        Webinar.getCompletedWebinarsHistory(currentCollege, $scope);
    };

    $scope.getWebinarFeedbacks = function(webinarId) {
        $scope.successmessage = "";
        $scope.errormessage = "";
        var currentCollege = AuthCollege.resolveUser().uid;
        Webinar.getWebinarFeedbacks(currentCollege, $scope,webinarId);
    };

    $scope.SaveWebinarFeedback = function(webinarId,webinarexperience,satisfaction,quality,problems,QNA, technicalProblem, recommendation) {
       $scope.successmessage = "";
       var currentCollege = AuthCollege.resolveUser().uid;
        $scope.errormessage = "";

        if(webinarexperience === null){
          $scope.errormessage = "Please fill all the fields.";
        }
        if(satisfaction === null){
            $scope.errormessage = "Please fill all the fields.";
        }
        if(quality === null){
            $scope.errormessage = "Please fill all the fields.";
        }
        if(problems === null){
            $scope.errormessage = "Please fill all the fields.";
        }
        if(QNA === null){
            $scope.errormessage = "Please fill all the fields.";
        }
    
        if(typeof webinarexperience !== 'undefined' && typeof satisfaction !== 'undefined' && typeof quality !== 'undefined' &&  typeof problems !== 'undefined' && typeof QNA !== 'undefined'){
                if(problems === 'Yes' &&  QNA === 'No'){
                    if(typeof technicalProblem !== 'undefined'){
                       Webinar.SaveWebinarFeedback(webinarId,currentCollege, $scope,webinarexperience,satisfaction,quality,problems,QNA, technicalProblem, recommendation);
                    }
                    else{
                        $scope.errormessage = "Please write the problems you faced";
                    }
                
                }
                else if(problems === 'No' &&  QNA === 'Yes'){
                    if(typeof recommendation !== 'undefined'){
                       Webinar.SaveWebinarFeedback(webinarId,currentCollege, $scope,webinarexperience,satisfaction,quality,problems,QNA, technicalProblem, recommendation);
                    }
                    else{
                        $scope.errormessage = "Please write the recommendation.";
                    }
                
                }
                else if(problems === 'Yes' && QNA === 'Yes'){
                    if(typeof technicalProblem !== 'undefined' && typeof recommendation !== 'undefined'){
                       Webinar.SaveWebinarFeedback(webinarId,currentCollege, $scope,webinarexperience,satisfaction,quality,problems,QNA, technicalProblem, recommendation);
                    }
                    else if(typeof technicalProblem === 'undefined'){
                        $scope.errormessage = "Please write the problems you faced";
                    }
                    else if(typeof recommendation === 'undefined'){
                        $scope.errormessage = "Please write the recommendation.";
                    }
                
                }
                else if(problems === 'No' &&  QNA === 'No'){
                    Webinar.SaveWebinarFeedback(webinarId,currentCollege, $scope,webinarexperience,satisfaction,quality,problems,QNA, technicalProblem, recommendation);
                }

        }
        else{
            $scope.errormessage = "Please fill all the fields";
        }
    };
    
    /*School Webinar Booking work*/

        $scope.goToBookWebinar = function(webinarId) {
             $window.open('http://www.mymissionadmission.com/#/school-book-webinar/:'+webinarId);
        };

        $scope.getSchoolRegisterStudentList = function() {
            var url = $location.path();
            var webinarId = url.split(":")[1];
           // console.log(webinarId);
            var currentuser = AuthSchool.resolveUser().uid;
           // console.log(currentuser);
          Webinar.getSchoolCode(currentuser).then(function(schoolCode) {
             $scope.studentList = [];
             $scope.schoolCode = schoolCode.$value;
             Webinar.getSchoolRegisterStudentList(schoolCode.$value,$scope);
           });

          Webinar.getWebinarDetail(webinarId).then(function(webinarDetail) {
                    $scope.webinarDetail = webinarDetail;
          });
           
        };
       
        $scope.schoolStudentForWebinarList = [];
       
        $scope.addSchoolStudentListForBookWebinar = function(studentName,studentChecked,studenturl) {
           
            if(studentChecked === true) {
                $scope.schoolStudentForWebinarList = $scope.schoolStudentForWebinarList.concat(studenturl);
            }
            else {
                $scope.schoolStudentForWebinarList.pop(studenturl);
            }

        };

        $scope.bookWebinarForSchoolStudent = function() {
             angular.forEach($scope.schoolStudentForWebinarList,function(studentId,key) {
                 Webinar.bookWebinarForSchoolStudent($scope,$scope.webinarDetail.mentorName,$scope.webinarDetail.mentorEmail,$scope.webinarDetail.mentorMobile,$scope.webinarDetail.mentorGender,$scope.webinarDetail.mentorPhoto,$scope.webinarDetail.webinarTopic,$scope.webinarDetail.webinarDate,$scope.webinarDetail.webinarTime,$scope.webinarDetail.webinarDescription,$scope.webinarDetail.webinarDuration,$scope.webinarDetail.collegeId,$scope.webinarDetail.webinarId,studentId,$scope.schoolCode,$scope.webinarDetail.studentsAttending);
                 $scope.webinarDetail.studentsAttending = $scope.webinarDetail.studentsAttending +1 ;   
             });   
        };


        $scope.resetStudentList = function() {
            $scope.master=[];
             $scope.schoolStudentForWebinarList = [];
              $scope.selectAllStudentMD5 = [];
        };

        $scope.selectAllStudentMD5 = [];

        /*$scope.addSelectAllStudent = function(md5) {
           console.log(md5);
        };*/

        $scope.selectAll = function(selectAllStudent) {
                if(selectAllStudent) {
                    angular.forEach($scope.selectAllStudentMD5,function(val,key) {
                    })
                }
        };

        $scope.updateStream = function(stream) {
            $scope.studentStream = stream;
            angular.forEach($scope.studentList,function(student,key) {
                if(typeof $scope.studentClass === 'undefined' || $scope.studentClass == '') {
                    if(stream === student.studentStream) {
                         $scope.schoolStudentForWebinarList = $scope.schoolStudentForWebinarList.concat(student.studenturl);
                    }
                    
                }
                else {
                    if(stream === student.studentStream && $scope.studentClass === student.studentClass) {
                         $scope.schoolStudentForWebinarList = $scope.schoolStudentForWebinarList.concat(student.studenturl);
                    }
                }

            })

        };
        $scope.updateClass = function(stdClass) {
            $scope.studentClass = stdClass;
            angular.forEach($scope.studentList,function(student,key) {
                if(typeof $scope.studentStream == 'undefined' || $scope.studentStream == '') {
                    if(stdClass === student.studentClass ) {
                         $scope.schoolStudentForWebinarList = $scope.schoolStudentForWebinarList.concat(student.studenturl);
                    } 
                    
                }
                else {
                    if(stdClass === student.studentClass && $scope.studentStream === student.studentStream ) {
                         $scope.schoolStudentForWebinarList = $scope.schoolStudentForWebinarList.concat(student.studenturl);
                    } 
                }
            })
        };

        $scope.commingSchoolWebinars = [];
        $scope.getBookedWebinarsBySchool = function(){
            var schoolID = Auth.resolveUser().uid;
            Webinar.getBookedWebinarsBySchool(schoolID,$scope);

        };

        $scope.attendWebinar = function(webinarDetail) {
            $scope.currentlyAttendingWebinar = webinarDetail;
            var Id = webinarDetail.liveStreamURL.split(".be/");
            var vedioId = Id[1];
            var videourl = "https://www.youtube.com/embed/" + vedioId + "?rel=0&amp;showinfo=0&modestbranding=1&autohide=1";
            $scope.video = {src:videourl, title:"LiveStreamUrl"};
            Webinar.attendWebinarByStudent(webinarDetail, $scope);
            $scope.getQNAdetails();
        };



        $scope.askQuestion = function(question) {
            $scope.question = '';
            $scope.$evalAsync();
            Webinar.studentAskedAQuestion($scope.user.uid, $scope.users.profile.schoolname, $scope.currentlyAttendingWebinar, question, $scope);
            Webinar.saveQuestionAsComment($scope.user.uid, $scope.users.profile.schoolname, $scope.currentlyAttendingWebinar, question);
        };

        $scope.getQNAdetails = function() {
            Webinar.getQNAdetails($scope.currentlyAttendingWebinar, $scope);
        };

        $scope.thisWebinarLive = [];
        $scope.isThisWebinarLive = function(webinarId) {
              $scope.thisWebinarLive[webinarId] = "notLiveYet";
              Webinar.isThisWebinarLive(webinarId, $scope);

        };

     /* End School Webinar Booking work*/   

  }).value('duScrollOffset', 30);
