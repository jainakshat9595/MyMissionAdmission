'use strict';

app.factory('Feedback',function ($firebaseObject, $firebaseArray, FIREBASE_URL, $rootScope, Auth,AuthCollege) {

          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
          var ref1  = new Firebase(FIREBASE_URL);
          var collegeObj = $firebaseObject(ref);
          var collegeArray = $firebaseArray(ref);
         
        var Feedback = {

              all: collegeObj,
              allAsArray: collegeArray,

              writeFeedbackForCollege: function (studentQuery, chatDiscussion, videoURL, nextStep, sessionDate, collegeURL, studentURL, sessionVerificationStatus, interactionId, feedbackGroupId, feedbackNumber, $scope) {                    
                var feedbackRef = new Firebase(FIREBASE_URL + 'collegeFeedback/' + collegeURL + '/'+ studentURL + '/');
                var feedbackObject = $firebaseObject(feedbackRef);
                feedbackObject.studentquery = studentQuery;
                feedbackObject.chatdiscussion = chatDiscussion;
                feedbackObject.videourl = videoURL;
                feedbackObject.nextstep = nextStep;
                feedbackObject.sessiondate = sessionDate;
                feedbackObject.studenturl = studentURL;
                feedbackObject.feedbackNumber = feedbackNumber;
                feedbackObject.$save().then(function() {
                  var currentFeedbackCountRef = new Firebase(FIREBASE_URL + 'collegeFeedback/' + collegeURL + '/');
                  var currFeedCount = feedbackNumber;
                  currentFeedbackCountRef.update({currentFeedbackCount:currFeedCount});
                  var sessionInCollege = $firebaseObject(new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeURL + '/'+ studentURL + '/sessionVerificationStatus'));
                  sessionInCollege.$loaded().then(function(sessionInCollege) {
                    var sessionInAdmin = $firebaseObject(new Firebase(FIREBASE_URL + '/admin/QualityAssurance/sessionDetail/'+collegeURL+'/'+studentURL+'/sessionVerificationStatus'));
                    sessionInAdmin.$loaded().then(function(sessionInAdmin) {
                      if((sessionInAdmin.$value == 'pending' || sessionInAdmin.$value == 'rejected' || sessionInAdmin.$value == null) && (sessionInCollege.$value == 'pending' || sessionInCollege.$value == 'rejected' || sessionInCollege.$value == null)) {
                        var sessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeURL + '/'+ studentURL + '/');
                        var status =   sessionRef.update({ sessionVerificationStatus: sessionVerificationStatus , interactionId : interactionId  },function() {
                          var adminRef = (ref1.child('admin/QualityAssurance/sessionDetail').child(collegeURL).child(studentURL));
                          adminRef.set({sessionVerificationStatus : sessionVerificationStatus , ActionTaken : "none"});                         
                          var sessionStatusPendingRef = new Firebase(FIREBASE_URL + 'sessionStatus/pendingSessions/' + collegeURL + '/'+ studentURL + '/');
                          sessionStatusPendingRef.set(studentURL);
                          var deleteStudentFromSessionGroup = new Firebase(FIREBASE_URL + 'allignedStudentGroup/' + collegeURL + '/'+ feedbackGroupId + '/' + studentURL + '/');
                          deleteStudentFromSessionGroup.set(null);

                          if(sessionInCollege.$value == null || sessionInAdmin.$value == null){
                           var pendingsessionCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeURL + '/' );
                           var approveobj = $firebaseObject(pendingsessionCountRef);
                           approveobj.$loaded(function(approveobj){
                              var approvedsessionno =approveobj.approvesessionCount;
                              var pendingsessionno =approveobj.pendingsessionCount;
                              var rejectedsessionno =approveobj.rejectedsessionCount; 
                              var feedbackno =approveobj.feedbacknotgivenCount;

                              var approveCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeURL + '/');
                              approveCountRef.update({ feedbacknotgivenCount: feedbackno - 1 });
                              approveCountRef.update({ pendingsessionCount: pendingsessionno + 1 }); 
                                 
                            });
                          }      
                          else
                          {
                          }
                        });
                      }
                    }, function(error) {
                      console.log("Error:", error);
                    });
                  }, function(error) {
                    console.log("Error:", error);
                  });
                }, function(error) {
                  console.log("Error:", error);
                });
              },

              getPreviousFeedbackOfStudents : function (studentURL, collegeURL) {
                    var currentUser = Auth.resolveUser();
                    var previousFeedbackRef = new Firebase(FIREBASE_URL + 'collegeFeedback/' + collegeURL + '/'+ studentURL);
                    var previousFeedbackRefObj = $firebaseObject(previousFeedbackRef);
                    return previousFeedbackRefObj;
              },

              writeFeedbackForStudent: function (studentQuery, firstAnswer, secondAnswer, thirdAnswer, sessionDate, collegeURL, studentURL) {
                    var currentUser = Auth.resolveUser();
                    var feedbackRef = new Firebase(FIREBASE_URL + 'studentFeedback/' + studentURL + '/'+ collegeURL + '/');
                    var feedbackObject = $firebaseObject(feedbackRef);
                    feedbackObject.studentquery = studentQuery;
                    feedbackObject.firstAnswer = firstAnswer;
                    feedbackObject.secondAnswer = secondAnswer;
                    feedbackObject.thirdAnswer = thirdAnswer;
                    feedbackObject.sessiondate = sessionDate;
                  feedbackObject.$save().then(function(ref) {
                  }, function(error) {
                    console.log("Error:", error);
                  });                   
              },

              getStudentGroup : function(sample, collegeurl, $scope,studenturl) {
                $scope.studentName = [];
                var feedbackRef = new Firebase(FIREBASE_URL + 'allignedStudentGroup/' + collegeurl + '/'+ sample + '/');
                var studentsArray = $firebaseArray(feedbackRef);
                studentsArray.$loaded(function(result) {
                  $scope.studentsInGroup = result;
                  angular.forEach($scope.studentsInGroup, function(value,key) {
                    //console.log(value);
                    if(value.$id !== studenturl) {
                      var nameObj = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForStudents/' + value.$id + '/studentname'));
                      nameObj.$loaded(function(result) {
                        //console.log(result);
                        $scope.studentName = $scope.studentName.concat([{
                                                                         name:result,
                                                                         url:value.$id
                                                                      }]);
                        //console.log($scope.studentName);
                      });
                    }
                  });
                });
              },                             
        saveActiveStudentUrlIntempFirebase : function(collegeurl,sample) {
                new Firebase(FIREBASE_URL + 'tempStudentRecordForActiveUser/' + collegeurl + "/collegeurl").set(collegeurl);
                new Firebase(FIREBASE_URL + 'tempStudentRecordForActiveUser/' + collegeurl + "/sample").set(sample);
             
              },
             
              getActiveUserForHangout : function(collegeurl,$scope) { 
                  $scope.activeUsersLoaded=false;
                  var temp = 0;
                  $scope.studentDetailsForActiveUser= [];
                   var studentSampleRef = new Firebase(FIREBASE_URL + 'tempStudentRecordForActiveUser/' + collegeurl);
                   studentSampleRef.once('value', function(dataSnapshot) {
                      var studentsInGroupRef = new Firebase(FIREBASE_URL + '/tempStudentRecordForActiveUser/' + dataSnapshot.val().collegeurl);
                   studentsInGroupRef.once('value', function(dataSnapshot1) {
                    var collegeurl = dataSnapshot1.val().collegeurl;
                    var sample = dataSnapshot1.val().sample;
                        var groupRef = new Firebase(FIREBASE_URL + '/allignedStudentGroup/' + collegeurl + "/" + sample);
                        groupRef.once("value", function(studentList) { 
                          studentList.forEach(function (subchild)  {
                            temp = temp + 1;
                              Feedback.getStudentDetailForActiveUser(subchild.val(),collegeurl,$scope);
                              if(temp == studentList.numChildren() ) {
                                $scope.activeUsersLoaded=true;
                                $scope.$evalAsync();
                              }
                          })
                        });
                  });
                })
              },

              getStudentDetailForActiveUser : function(studenturl,collegeurl,$scope) {
                         var nameObjRef = (new Firebase(FIREBASE_URL + 'profileForStudents/' + studenturl));
                               nameObjRef.once('value', function(result) {
                                $scope.studentDetailsForActiveUser = $scope.studentDetailsForActiveUser.concat([{
                                                                         email:result.val().email,
                                                                         name:result.val().studentname,
                                                                         photo:result.val().studentphoto,
                                                                         studenturl:studenturl,
                                                                         collegeurl:collegeurl
                                                                      }]);
                                $scope.$evalAsync();
                      });
              },


              getStudentDataForParticipant : function(collegeurl,studenturl,$scope) {
                    var studentsInGroupRef = new Firebase(FIREBASE_URL + '/collegeSessions/' + collegeurl + "/" + studenturl);
                   studentsInGroupRef.once('value', function(dataSnapshot1) {
                    $scope.session = dataSnapshot1.val();
                    $scope.$evalAsync();

                  });
                    
              },


        };      
         return Feedback;      
    });      
