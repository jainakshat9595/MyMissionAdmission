'use strict';
 
app.factory('Webinar',
  function (FIREBASE_URL, $rootScope, $q , $filter, $firebaseObject , $firebaseArray, $window,Auth) {
    var Webinar = {
        scheduleWebinar : function($scope, mentorName,mentorEmail,mentorMobile,gender,mentorPhoto,webinarTopic,webinarDate,webinarTime,webinarDescription,webinarDuration,collegeId,webinarId) {
            var onComplete = function() {
                $scope.schedule_webinar_success = "done";
                $scope.webinar.mentorName = "";
                $scope.webinar.mentorEmail = "";
                $scope.webinar.mentorMobile = "";
                $scope.webinar.gender = "";
                $scope.webinar.mentorPhoto = "";
                $scope.webinar.webinarTopic = "";
                $scope.webinar.webinarDescription = "";
                $scope.webinar.webinarDuration = "";
                $scope.webinar.webinarDate = "";
                $scope.$evalAsync();
            };

            var updateCollegeWebinarSync = new Firebase(FIREBASE_URL + 'collegeWebinar/upcomingWebinar/' + collegeId + '/' + webinarId );
            updateCollegeWebinarSync.update({ mentorName: mentorName,
                                        mentorEmail : mentorEmail,
                                        mentorMobile : mentorMobile,
                                        mentorGender : gender,
                                        mentorPhoto : mentorPhoto,
                                        webinarTopic : webinarTopic,
                                        webinarDate : webinarDate,
                                        webinarTime : webinarTime,
                                        webinarDescription : webinarDescription,
                                        webinarDuration : webinarDuration,
                                        collegeId : collegeId,
                                        webinarId : webinarId,
                                        studentsAttending : 0
                                     });
             var updateAllWebinarSync = new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId  );
             updateAllWebinarSync.update({ mentorName: mentorName,
                                        mentorEmail : mentorEmail,
                                        mentorMobile : mentorMobile,
                                        mentorGender : gender,
                                        mentorPhoto : mentorPhoto,
                                        webinarTopic : webinarTopic,
                                        webinarDate : webinarDate,
                                        webinarTime : webinarTime,
                                        webinarDescription : webinarDescription,
                                        webinarDuration : webinarDuration,
                                        collegeId : collegeId,
                                        webinarId : webinarId,
                                        studentsAttending : 0
                                     }, onComplete);

            
      },

        getUpcomingWebinar : function(collegeId, $scope) {
            var upcommingWebRef = new Firebase(FIREBASE_URL + 'collegeWebinar/upcomingWebinar/' + collegeId + '/');
            $scope.commingWebinars = $firebaseArray(upcommingWebRef);
            $scope.$evalAsync();
        },

        getUpcomingWebinarOnMainPage : function($scope) {
            var deferred = $q.defer();
            var  upcomingWebinar = new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/');
            var upcomingWebinarArray = ($firebaseArray(upcomingWebinar));
            deferred.resolve(upcomingWebinarArray);
            return deferred.promise;
        },

        getAllUpcomingWebinar : function($scope) {
            var allUpcommingWebRef = new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/');
            $scope.allCommingWebinars = $firebaseObject(allUpcommingWebRef);
            $scope.$evalAsync();
        },

        save_urls : function(hangoutURL,liveStreamURL,collegeId,webinarId,$scope) {
            var onComplete = function() {
                var webinarWiseRecordForSchoolRef = new Firebase(FIREBASE_URL + 'WebinarWiseRecordForSchool/' +  '/' + webinarId);
                var webinarWiseRecordForSchoolObj = $firebaseObject(webinarWiseRecordForSchoolRef);
                webinarWiseRecordForSchoolObj.$loaded(function(schoolsList) {
                    angular.forEach(schoolsList, function(value,key) {
                        var schoolBookedWebinarRef = new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/bookedWebinar/' + value + '/' + webinarId);
                        schoolBookedWebinarRef.update({hangoutURL:hangoutURL,liveStreamURL:liveStreamURL});
                    });
                });
                var Id = liveStreamURL.split(".be/");
                var vedioId = Id[1];
                var videourl = "https://www.youtube.com/embed/" + vedioId + "?rel=0&amp;showinfo=0&modestbranding=1&autohide=1";
                $scope.video = {src:videourl, title:"LiveStreamUrl"};
                $('#url_saved_Message').show();
                $('#liveButton').show();
                $('#url_saved_Message').fadeOut(5000);
                $('#hangUrl').hide();
                $('#liveUrl').hide();
                $('#save_webinar_url').hide();
                $('#start_webinar').show();
                $('.webinarCompleted').show();
                $scope.$evalAsync();
            };   

            var allWebinarRef = new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId);
            allWebinarRef.update({hangoutURL:hangoutURL,liveStreamURL:liveStreamURL});
            var collegeWebinarRef = new Firebase(FIREBASE_URL + 'collegeWebinar/upcomingWebinar/' + collegeId +'/' +webinarId);
            collegeWebinarRef.update({hangoutURL:hangoutURL,liveStreamURL:liveStreamURL});  
            var webinarWiseRecordRef = new Firebase(FIREBASE_URL + 'WebinarWiseRecord/' + webinarId);
            var webinarWiseDataObj = $firebaseObject(webinarWiseRecordRef);
            webinarWiseDataObj.$loaded( function(webinarWiseDataObj) {
                angular.forEach(webinarWiseDataObj, function(value,key) {
                    var studentBookedWebinarRef = new Firebase(FIREBASE_URL + 'studentWebinar/bookedWebinar/' + value + '/' + webinarId);
                    studentBookedWebinarRef.update({hangoutURL:hangoutURL,liveStreamURL:liveStreamURL}, onComplete);
                });
            });
        },

        getCollegeWebinarsHistory : function(currentCollege, $scope) {
            var collegeWebinarHistoryRef = new Firebase(FIREBASE_URL + 'collegeWebinar/completedWebinar/');
            $scope.collegeCompletedWebinar = $firebaseObject(collegeWebinarHistoryRef);
            $scope.$evalAsync();
        },

        /*loadAllWebinars : function() {
            return $firebaseArray(new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/'));
        },*/

        bookWebinar : function($scope,mentorName,mentorEmail,mentorMobile,gender,mentorPhoto,webinarTopic,webinarDate,webinarTime,webinarDescription,webinarDuration,webinarAttendees,collegeId,webinarId,studentId) {
            $scope.webinarBooked = "notDone";
            var bookWebinarSync = new Firebase(FIREBASE_URL + 'studentWebinar/bookedWebinar/' + studentId + '/' + webinarId );
            
            bookWebinarSync.once("value", function(snapshot) {
                var a = snapshot.exists();
                if(a === false) {

                    var oncomplete = function() {
                        (new Firebase(FIREBASE_URL + 'WebinarWiseRecord/' +  '/' + webinarId + '/' + studentId)).set(studentId);
                        (new Firebase(FIREBASE_URL + 'collegeWebinar/upcomingWebinar/' + collegeId + '/' + webinarId + '/studentsAttending')).set(webinarAttendees+1);
                        (new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId + '/studentsAttending')).set(webinarAttendees+1);
                        $scope.webinar_booking_success[webinarId] = "done";
                        $scope.$evalAsync();
                    };

                    bookWebinarSync.update({ 
                                        mentorName: mentorName,
                                        mentorEmail : mentorEmail,
                                        mentorMobile : mentorMobile,
                                        mentorGender : gender,
                                        mentorPhoto : mentorPhoto,
                                        webinarTopic : webinarTopic,
                                        webinarDate : webinarDate,
                                        webinarTime : webinarTime,
                                        webinarDescription : webinarDescription,
                                        webinarDuration : webinarDuration,
                                        collegeId : collegeId,
                                        webinarId : webinarId,
                                        studentsAttending : webinarAttendees+1
                                     }, oncomplete);
                }
                else if(a === true) {
                    $scope.webinarAlreadyBooked[webinarId] = "yes";
                    $scope.$evalAsync();
                }
            });
            
        },

        bookWebinarForSchoolStudent : function($scope,mentorName,mentorEmail,mentorMobile,gender,mentorPhoto,webinarTopic,webinarDate,webinarTime,webinarDescription,webinarDuration,collegeId,webinarId,studentId,schoolCode,webinarAttendees) {
            var schoolID = Auth.resolveUser().uid;
            var bookWebinarSync = new Firebase(FIREBASE_URL + 'studentWebinar/bookedWebinar/' + studentId + '/' + webinarId );
            var oncomplete = function() {
                        (new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/webinarHistoryBySchoolId/' +  '/' + schoolID +  '/' + webinarId + '/'+ studentId)).set(studentId); 
                        (new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/webinarHistoryByWebinarId/' +  '/' + webinarId +  '/' + schoolCode + '/'+ studentId)).set(studentId);
                        (new Firebase(FIREBASE_URL + 'WebinarWiseRecord/' +  '/' + webinarId + '/' + studentId)).set(studentId);
                        (new Firebase(FIREBASE_URL + 'WebinarWiseRecordForSchool/' +  '/' + webinarId + '/' + schoolID)).set(schoolID);
                        (new Firebase(FIREBASE_URL + 'collegeWebinar/upcomingWebinar/' + collegeId + '/' + webinarId + '/studentsAttending')).set(webinarAttendees+1);
                        (new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId + '/studentsAttending')).set(webinarAttendees+1);
                        /*$scope.webinar_booking_success[webinarId] = "done";
                        $scope.$evalAsync();*/
                        var bookschoolWebinarSync = new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/bookedWebinar/' + schoolID + '/' + webinarId );    
                        bookschoolWebinarSync.update({ mentorName: mentorName,
                                        mentorEmail : mentorEmail,
                                        mentorMobile : mentorMobile,
                                        mentorGender : gender,
                                        mentorPhoto : mentorPhoto,
                                        webinarTopic : webinarTopic,
                                        webinarDate : webinarDate,
                                        webinarTime : webinarTime,
                                        webinarDescription : webinarDescription,
                                        webinarDuration : webinarDuration,
                                        collegeId : collegeId,
                                        webinarId : webinarId,
                                        schoolCode : schoolCode,
                                        studentsAttending : webinarAttendees+1
                                     });  

                    };
            bookWebinarSync.update({ mentorName: mentorName,
                                        mentorEmail : mentorEmail,
                                        mentorMobile : mentorMobile,
                                        mentorGender : gender,
                                        mentorPhoto : mentorPhoto,
                                        webinarTopic : webinarTopic,
                                        webinarDate : webinarDate,
                                        webinarTime : webinarTime,
                                        webinarDescription : webinarDescription,
                                        webinarDuration : webinarDuration,
                                        collegeId : collegeId,
                                        webinarId : webinarId,
                                        schoolCode : schoolCode,
                                        studentsAttending : webinarAttendees+1
                                     },oncomplete);
          //  (new Firebase(FIREBASE_URL + 'WebinarWiseRecord/' +  '/' + webinarId + '/' + studentId)).set(studentId);     
        },
        
        getBookedWebinarForStudent : function(studentId,$scope) {
            $scope.studentBookedWebinar = [];
            $scope.studentWebinar = [];
            var studentWebinar = new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar');
            studentWebinar.once("value", function(studentSnapshot) {
               studentSnapshot.forEach(function(studentWebinarRecords) {
                    var ref = new Firebase(FIREBASE_URL + 'studentWebinar/bookedWebinar/' + studentId + '/' + studentWebinarRecords.key());
                        ref.on("value", function(snapshot) {
                        var a = snapshot.exists();
                        if(a === true) {
                            $scope.studentBookedWebinar = $scope.studentBookedWebinar.concat(studentWebinarRecords.val());
                            $scope.$evalAsync();
                        }
                        else {
                            $scope.studentWebinar = $scope.studentWebinar.concat(studentWebinarRecords.val());
                            $scope.$evalAsync();
                        }
                    });
               });
            });
        },

        onWebinarCompletion : function(webinarId,collegeId,$scope) {
            var allWebinarObject = $firebaseObject(new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId  ));
            allWebinarObject.$loaded(function (webinarDetail) {
                
                var afterUpdatingCompletedWebinarInAllWebinar = function() {
                    var  completeCollegeWebinarSync = (new Firebase(FIREBASE_URL + 'collegeWebinar/completedWebinar/' + collegeId + '/' + webinarId  ));
                    completeCollegeWebinarSync.update({ 
                                            mentorName: webinarDetail.mentorName,
                                            mentorEmail : webinarDetail.mentorEmail,
                                            mentorMobile : webinarDetail.mentorMobile,
                                            mentorGender : webinarDetail.mentorGender,
                                            mentorPhoto : webinarDetail.mentorPhoto,
                                            webinarTopic : webinarDetail.webinarTopic,
                                            webinarDate : webinarDetail.webinarDate,
                                            webinarTime : webinarDetail.webinarTime,
                                            webinarDescription : webinarDetail.webinarDescription,
                                            webinarDuration : webinarDetail.webinarDuration,
                                            collegeId : webinarDetail.collegeId,
                                            webinarId : webinarDetail.webinarId,
                                            hangoutURL : webinarDetail.hangoutURL,
                                            liveStreamURL : webinarDetail.liveStreamURL,
                                            studentsAttending : webinarDetail.studentsAttending
                    },afterUpdatingCompletedWebinarInCollegeWebinar);
                };

                var afterUpdatingCompletedWebinarInCollegeWebinar = function() { 
                    var  completeCollegeWebinarSync = (new Firebase(FIREBASE_URL + 'collegeWebinar/upcomingWebinar/' + collegeId + '/' + webinarId));
                    completeCollegeWebinarSync.remove();
                    var  schoolListRef = new Firebase(FIREBASE_URL + 'WebinarWiseRecordForSchool/' + webinarId  );
                    schoolListRef.once("value", function(snapshot) {
                        snapshot.forEach( function (schoolList) {
                        
                            var  bookedSchoolWebinarSync = new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/bookedWebinar/' + schoolList.val() + '/' + webinarId);
                            bookedSchoolWebinarSync.remove();

                            var  completeSchoolWebinarSync = new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/completedWebinar/' + schoolList.val() + '/' + webinarId);
                            completeSchoolWebinarSync.update({ 
                                                    mentorName: webinarDetail.mentorName,
                                                    mentorEmail : webinarDetail.mentorEmail,
                                                    mentorMobile : webinarDetail.mentorMobile,
                                                    mentorGender : webinarDetail.mentorGender,
                                                    mentorPhoto : webinarDetail.mentorPhoto,
                                                    webinarTopic : webinarDetail.webinarTopic,
                                                    webinarDate : webinarDetail.webinarDate,
                                                    webinarTime : webinarDetail.webinarTime,
                                                    webinarDescription : webinarDetail.webinarDescription,
                                                    webinarDuration : webinarDetail.webinarDuration,
                                                    collegeId : webinarDetail.collegeId,
                                                    webinarId : webinarDetail.webinarId,
                                                    hangoutURL : webinarDetail.hangoutURL,
                                                    liveStreamURL : webinarDetail.liveStreamURL,
                                                    studentsAttending : webinarDetail.studentsAttending
                            },afterUpdatingCompletedWebinarInSchoolWebinar);
                        });
                    });
                };

                var afterUpdatingCompletedWebinarInSchoolWebinar = function() {
                    
                    var  studentWebinarList = (new Firebase(FIREBASE_URL + 'WebinarWiseRecord/' + webinarId  ));
                    studentWebinarList.once("value", function(snapshot) {
                        var numberOfAttendes = snapshot.numChildren();
                        var counter = 0;
                        snapshot.forEach( function (studentList) {
                            counter = counter+1;
                            var  completeStudentWebinarSync = (new Firebase(FIREBASE_URL + 'studentWebinar/completedWebinar/'  + studentList.val() + '/' + webinarId  ));
                                        completeStudentWebinarSync.update({
                                                    mentorName: webinarDetail.mentorName,
                                                    mentorEmail : webinarDetail.mentorEmail,
                                                    mentorMobile : webinarDetail.mentorMobile,
                                                    mentorGender : webinarDetail.mentorGender,
                                                    mentorPhoto : webinarDetail.mentorPhoto,
                                                    webinarTopic : webinarDetail.webinarTopic,
                                                    webinarDate : webinarDetail.webinarDate,
                                                    webinarTime : webinarDetail.webinarTime,
                                                    webinarDescription : webinarDetail.webinarDescription,
                                                    webinarDuration : webinarDetail.webinarDuration,
                                                    collegeId : webinarDetail.collegeId,
                                                    webinarId : webinarDetail.webinarId,
                                                    hangoutURL : webinarDetail.hangoutURL,
                                                    liveStreamURL : webinarDetail.liveStreamURL,
                                                    studentsAttending : webinarDetail.studentsAttending
                                        },function(){
                                                    
                                                    var liveWebinarRef = new Firebase(FIREBASE_URL + "liveWebinars/" + webinarId);
                                                    liveWebinarRef.remove();
                                                    var  completeStudentWebinarSync = (new Firebase(FIREBASE_URL + 'studentWebinar/bookedWebinar/'  + studentList.val() + '/' + webinarId  ));
                                                    completeStudentWebinarSync.remove();
                                                    if(counter === numberOfAttendes) {
                                                        var  completeWebinarSync = (new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId  ));
                                                        completeWebinarSync.remove();
                                                    }
                                        });
                        });
                        window.history.back();
                        $('#webinarCompleted').show();
                    });
                };

                var  completeWebinarSync = (new Firebase(FIREBASE_URL + 'allWebinar/completedWebinar/' + webinarId  ));
                completeWebinarSync.update({ 
                                        mentorName: webinarDetail.mentorName,
                                        mentorEmail : webinarDetail.mentorEmail,
                                        mentorMobile : webinarDetail.mentorMobile,
                                        mentorGender : webinarDetail.mentorGender,
                                        mentorPhoto : webinarDetail.mentorPhoto,
                                        webinarTopic : webinarDetail.webinarTopic,
                                        webinarDate : webinarDetail.webinarDate,
                                        webinarTime : webinarDetail.webinarTime,
                                        webinarDescription : webinarDetail.webinarDescription,
                                        webinarDuration : webinarDetail.webinarDuration,
                                        collegeId : webinarDetail.collegeId,
                                        webinarId : webinarDetail.webinarId,
                                        hangoutURL : webinarDetail.hangoutURL,
                                        liveStreamURL : webinarDetail.liveStreamURL,
                                        studentsAttending : webinarDetail.studentsAttending
                }, afterUpdatingCompletedWebinarInAllWebinar);
            });
        },

        attendWebinarByStudent : function(webinarDetail, $scope) {
            var studentsAttendingWebinarRef = new Firebase(FIREBASE_URL + "/studentsClickingStartWebinarLink/" + 
                webinarDetail.webinarId + "/");
            var studentsAttendingWebinarObj = $firebaseObject(studentsAttendingWebinarRef);
            studentsAttendingWebinarObj.$loaded(function(studentsAttendingWebinar) {
                if(!studentsAttendingWebinar.$value) {
                    studentsAttendingWebinarRef.set(1);
                }
                else if(studentsAttendingWebinar.$value < 7) {
                    studentsAttendingWebinarRef.set(studentsAttendingWebinar.$value+1);
                }
                else if(studentsAttendingWebinar.$value > 7 || studentsAttendingWebinar.$value === 7) {
                    studentsAttendingWebinarRef.set(studentsAttendingWebinar.$value+1);
                }
                /*$scope.liveStreamURL = webinarDetail.liveStreamURL;
                $scope.$evalAsync();*/
            })
        },

        getStudentsWebinarHistory : function(studentId, $scope) {
            var  studentsCompletedWebinarRef = new Firebase(FIREBASE_URL + 'studentWebinar/completedWebinar/'  + studentId);
            var studentsCompletedWebinarObj = $firebaseArray(studentsCompletedWebinarRef);
            studentsCompletedWebinarObj.$loaded(function(studentsCompletedWebinar) {
                $scope.webinarHistory = studentsCompletedWebinar;
            })
        },

        studentAskedAQuestion : function(studentUid, studentname, webinarDetail, question, $scope) {
            var questionDate = new Date();
            var date = $filter('date')(questionDate,'yyyyMMdd');
            var postTime = (questionDate.getHours()<10?'0':'') + questionDate.getHours()+ ":" + (questionDate.getMinutes()<10?'0':'') + questionDate.getMinutes()+ ":" + (questionDate.getSeconds()<10?'0':'') + questionDate.getSeconds();
            var temporary = postTime.split(':');
            var timestamp = date.toString()+temporary[0].toString()+temporary[1].toString()+temporary[2].toString();
            var  questionFromStudentRef = new Firebase(FIREBASE_URL + 'QNADuringWebinar/'  + webinarDetail.webinarId + "/");
            questionFromStudentRef.push({studentId:studentUid, studentName:studentname, webinarId:webinarDetail.webinarId, question:question, timestamp:timestamp})
            $scope.question="";
        },

        saveQuestionAsComment : function(studentUid, studentname, webinarDetail, question) {
            //console.log("saveQuestionAsComment");
        },

        getWebinarChat: function(webinarid, $scope) {
          var chatref = new Firebase(FIREBASE_URL+'/QNADuringWebinar/' + webinarid );
          var chatrefobj =     $firebaseArray(chatref);
          chatrefobj.$loaded( function(chatrefobj) { 
            $scope.QuestionDetails = chatrefobj;
          });
        },

        getQNAdetails : function(webinarDetail, $scope) {
            var  QNARef = new Firebase(FIREBASE_URL + 'QNADuringWebinar/'  + webinarDetail.webinarId + "/");
            var QNAObj = $firebaseObject(QNARef);
            QNAObj.$loaded( function(QNAObj) {
                $scope.QNADetails = QNAObj;
            })
        },

        getWebinarDetailByWebinarId : function(webinarId, $scope) {
            var  webinarDetailRef = new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/'  + webinarId + "/");
            var webinarDetailObj = $firebaseObject(webinarDetailRef);
            webinarDetailObj.$loaded( function(webinarDetailObj) {
                $scope.specificWebinarDetail = webinarDetailObj;
                if($scope.specificWebinarDetail.liveStreamURL) {
                    var Id = $scope.specificWebinarDetail.liveStreamURL.split(".be/");
                    var vedioId = Id[1];
                    var videourl = "https://www.youtube.com/embed/" + vedioId + "?rel=0&amp;showinfo=0&modestbranding=1&autohide=1";
                    $scope.video = {src:videourl, title:"LiveStreamUrl"};    
                }
            });  
        },

        getWebinarDetail : function(webinarId) {
                var deferred = $q.defer();
                var allWebinarObject = $firebaseObject(new Firebase(FIREBASE_URL + 'allWebinar/upcomingWebinar/' + webinarId  ));
               allWebinarObject.$loaded(function(webinarDetail) {
                deferred.resolve(webinarDetail);
              });
                return deferred.promise; 
        },

        replyTheQuery : function(webinarId, reply, questionId) {
            var  QNARef = new Firebase(FIREBASE_URL + 'QNADuringWebinar/'  + webinarId + "/" + questionId + "/replyByAdmin");
            QNARef.set(reply);
        },

        reportAbuse : function(webinarId, chatId) {
            var  QNARef = new Firebase(FIREBASE_URL + 'QNADuringWebinar/'  + webinarId + "/" + chatId);
            QNARef.set(null);
        },

        studentsAttending : function(webinarId, $scope) {
            var  webinarStudentListRef = new Firebase(FIREBASE_URL + 'WebinarWiseRecord/' + webinarId);
            $scope.attendees[webinarId] = $firebaseObject(webinarStudentListRef);
        },

        liveTheWebinar : function(webinarDetails,$scope) {
            var onComplete = function(){
                $scope.Livebutton = "true";

            };

            var liveWebinarRef = new Firebase(FIREBASE_URL + "liveWebinars/" + webinarDetails.webinarId);
            liveWebinarRef.update({
                                webinarTopic : webinarDetails.webinarTopic,
                                mentorName: webinarDetails.mentorName,
                                mentorEmail : webinarDetails.mentorEmail,
                                mentorMobile : webinarDetails.mentorMobile,
                                mentorGender : webinarDetails.mentorGender,
                                mentorPhoto : webinarDetails.mentorPhoto,
                                webinarTopic : webinarDetails.webinarTopic,
                                webinarDate : webinarDetails.webinarDate,
                                webinarTime : webinarDetails.webinarTime,
                                webinarDescription : webinarDetails.webinarDescription,
                                webinarDuration : webinarDetails.webinarDuration,
                                collegeId : webinarDetails.collegeId,
                                webinarId : webinarDetails.webinarId,
                                hangoutURL : webinarDetails.hangoutURL,
                                liveStreamURL : webinarDetails.liveStreamURL,
                                studentsAttending : webinarDetails.studentsAttending+1
            },onComplete);
        },

        isAnyWebinarLive : function () {
            var liveWebinarRef = new Firebase(FIREBASE_URL + "liveWebinars/");
            return $firebaseArray(liveWebinarRef);
        },

        isThisWebinarLive : function (webinarId, $scope) {
            var liveWebinarRef = new Firebase(FIREBASE_URL + "liveWebinars/" + webinarId);
            $scope.thisWebinarLive[webinarId] = $firebaseArray(liveWebinarRef);
            $scope.$evalAsync();
        },

        getCompletedWebinarsHistory : function(currentCollege, $scope) {
            var completedWebinarHistoryRef = new Firebase(FIREBASE_URL + 'collegeWebinar/completedWebinar/' +currentCollege+ '/');
            $scope.feedbackWebinars = $firebaseArray(completedWebinarHistoryRef);
            $scope.$evalAsync();
        },

        getSchoolRegisterStudentList : function(schoolCode,$scope) {
              var studentList = new Firebase(FIREBASE_URL + 'SchoolStudentRecords/'  + schoolCode );
              studentList.once("value", function(snapshot) {
                snapshot.forEach(function(students) {
                 // console.log(students.val());
                 Webinar.getSchoolStudentDetail(students.val(),$scope);
                 $scope.$evalAsync();
                })
              });
         },
          
           getSchoolCode : function(schoolurl) {
             var deferred = $q.defer();
           // console.log("getSchoolCode");
            var studentCode = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForSchools/' + schoolurl + '/' + 'schoolCode' ));
             studentCode.$loaded(function(code){
               deferred.resolve(code);
             })
            return deferred.promise; 
           },
           
           getSchoolStudentDetail : function(studenturl,$scope) {
            var studentList = new Firebase(FIREBASE_URL + 'profileForStudents/'  + studenturl );
              studentList.once("value", function(snapshot) {
              //  console.log(snapshot.val());
                $scope.studentList=
                $scope.studentList.concat([{
                  studentName:snapshot.val().studentname,
                  studentEmail:snapshot.val().email,
                  studentClass:snapshot.val().studentclass,
                  studentStream:snapshot.val().studentstream,
                  studentPhoto:snapshot.val().studentphoto,
                  studentmd5_hash:snapshot.val().md5_hash,
                  studenturl:studenturl
                }]);
              //  console.log($scope.studentList);
                $scope.$evalAsync();
              });

           },




                                   /*  end of school work*/

        getWebinarFeedbacks : function(currentCollege, $scope, webinarId) {
            var completedRef = new Firebase(FIREBASE_URL + 'collegeWebinar/CollegeFeedbackForWebinar/' + currentCollege + '/' + webinarId + '/');
            $scope.Webinarsfeedback = $firebaseObject(completedRef);
            $scope.$evalAsync();
        },

        SaveWebinarFeedback : function(webinarId,currentCollege, $scope, webinarexperience, satisfaction,quality, problems, QNA, technicalProblem,recommendation) {
            var completedWebinarHistoryRef = new Firebase(FIREBASE_URL + 'collegeWebinar/CollegeFeedbackForWebinar/' + currentCollege + '/' + webinarId + '/');
            var feedbackObject = $firebaseObject(completedWebinarHistoryRef);
                feedbackObject.webinarExperience = webinarexperience;
                feedbackObject.satisfactionLevel = satisfaction;
                feedbackObject.QualityoFWebinar = quality;
                feedbackObject.TechnicalProblems = problems;
                feedbackObject.Recommendation = QNA;
                if(typeof technicalProblem !== 'undefined'){
                feedbackObject.TechnicalProblemsDetail = technicalProblem;
                }
                if(typeof recommendation !== 'undefined'){
                feedbackObject.RecommendationDetail = recommendation;
                }
                feedbackObject.$save().then(function() {
                    $scope.successmessage = "Your Details Submitted sucessfully";
                });
        },

        getstudentWebinarFeedbacks : function(webinarId,$scope) {
            var currentStudent = Auth.resolveUser().uid;
            var completedRef = new Firebase(FIREBASE_URL + 'studentWebinar/StudentFeedbackForWebinar/' + currentStudent + '/' + webinarId + '/');
            $scope.studentwebinarFeed = $firebaseObject(completedRef);
            $scope.$evalAsync();
        },


        SaveWebinarStudentFeedback : function(collegeId,webinarId,webinarSatisfaction,SpeakerInterested,Interested,InterestedArea,QNA, QuestionDetails,$scope) {
            var currentStudent = Auth.resolveUser().uid;
            var completedWebinarHistoryRef = new Firebase(FIREBASE_URL + 'studentWebinar/StudentFeedbackForWebinar/' + currentStudent + '/' + webinarId + '/');
            var feedbackObject = $firebaseObject(completedWebinarHistoryRef);
                feedbackObject.webinarSatisfaction = webinarSatisfaction;
                feedbackObject.Interested = Interested;
                feedbackObject.SpeakerQuality = SpeakerInterested;
                feedbackObject.AllQuestionAnswered = QNA;
                feedbackObject.collegeId = collegeId;
                if(typeof InterestedArea !== 'undefined'){
                feedbackObject.InterestedArea = InterestedArea;
                }
                if(typeof QuestionDetails !== 'undefined'){
                feedbackObject.QuestionDetails = QuestionDetails;
                }
                feedbackObject.$save().then(function() {
                    $scope.successmessage = "Your Details Submitted sucessfully";
                });
        },

        getBookedWebinarsBySchool : function(schoolId, $scope) {
            var upcommingWebRef = new Firebase(FIREBASE_URL + 'WebinarBookedBySchool/bookedWebinar/' + schoolId + '/');
            $scope.commingSchoolWebinars = $firebaseArray(upcommingWebRef);
            $scope.$evalAsync();

        },
    };
    return Webinar;
  }
);

