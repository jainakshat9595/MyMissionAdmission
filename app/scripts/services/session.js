'use strict';

app.factory('Session',function (FIREBASE_URL, $rootScope, Auth, $q, AdminAuth , $firebaseArray , $firebaseObject) {

    var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
    var collegeObj = $firebaseObject(ref);
    var collegeArray = $firebaseArray(ref);
   
    var Session = {

        all: collegeObj,
        allAsArray: collegeArray,

        sessionQuery: function(collegeId) {

            var currentUser = Auth.resolveUser();
            var sessionCollegeRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + currentUser.uid);
            var sessionCollegeObj = $firebaseObject(sessionCollegeRef);
            return sessionCollegeObj;
        },

        doesSessionExists: function(collegeId) {
            var deferred = $q.defer();
            var currentUser = Auth.resolveUser();
            var checksessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + currentUser.uid);
            var checksessionObj = $firebaseObject(checksessionRef);  
            checksessionObj.$loaded(function(checksessionObj) {
                if(typeof checksessionObj.sessiondate == 'undefined'){
                    deferred.resolve(false)
                }
                else deferred.resolve(true);
            })
            return deferred.promise;
        },

        booksession: function (collegeId, studenturlid, collegeurlid, hours, minutes, date, query) {
            var currentUser = Auth.resolveUser();
            var studentUrlId = '';
            var collegeurlId = '';
            var studentId = currentUser.uid;

            if(typeof studenturlid === 'undefined') {
                var data = currentUser.uid.split(":");
                studentUrlId = data[1];
            }
            else {
                studentUrlId = studenturlid;
            }

            if(typeof collegeurlid === 'undefined') {
                var str = collegeId;
                var collegeIdArraySplit = str.split(":");
                collegeurlId = collegeIdArraySplit[1];
            }
            else {
                collegeurlId = collegeurlid;
            }
            var sessionno = 999999999;
            
            var checksessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + currentUser.uid);
            var checksessionObj = $firebaseObject(checksessionRef);  
            checksessionObj.$loaded(function(checksessionObj) {
                if ((checksessionObj.sessionVerificationStatus === 'pending' || checksessionObj.sessionVerificationStatus === 'approved') && typeof checksessionObj.interactionId !== 'undefined' ) {
                    var sessionCollegeRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + currentUser.uid + '/');
                    var sessionCollegeSync = (sessionCollegeRef);
                    sessionCollegeSync.update({studentquery : query});
                    
                    
                    var sessionStudentRef = new Firebase(FIREBASE_URL + 'studentSessions/' + currentUser.uid + '/' + collegeId + '/');
                    var sessionStudentSync = (sessionStudentRef);
                    sessionStudentSync.update({studentquery : query});

                }
                else {
                    if (typeof checksessionObj.sessiondate== 'undefined' ) {
                        var sessionCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/' );
                        var sync = $firebaseObject(sessionCountRef);
                        sync.$loaded(function(sync) {
                            var sessionno =sync.sessionCount;
                            var feedbackno =sync.feedbacknotgivenCount;
                                                                      
                            var sessionCountRef1 = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
                            var sync1 = (sessionCountRef1);
                                sync1.update({ sessionCount: sessionno + 1 });
                                sync1.update({ feedbacknotgivenCount: feedbackno + 1 });
                            var currentSessionCountObj = $firebaseObject(new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/currentSessionCount'));
                            currentSessionCountObj.$loaded(function(count) {
                                var sessionCollegeRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + currentUser.uid + '/');
                                var sessionCollegeObj = $firebaseObject(sessionCollegeRef);
                                sessionCollegeObj.collegeurl = collegeId;
                                sessionCollegeObj.collegeurlId = collegeurlId;
                                sessionCollegeObj.studenturl = currentUser.uid;
                                sessionCollegeObj.studenturlId = studentUrlId;                         
                                sessionCollegeObj.sessionhour = hours;
                                sessionCollegeObj.sessionminute = minutes;
                                sessionCollegeObj.sessiondate = date;
                                sessionCollegeObj.studentquery = query;
                                sessionCollegeObj.nodalId = "NODAL1025";
                                sessionCollegeObj.sessionNumber = count.$value + 1;
                                sessionCollegeObj.$save().then(function(ref) {
                                          
                                }, function(error) {
                                    console.log("Error:", error);
                                });
                                /*monthy session record start*/
                                var a = date.split(" ");
                                var month = a[1];
                                var year = '2015';
                                var ClgStdSimlogRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/' +'2015/' + month + '/college/' + collegeId + '/' + studentId + '/studenturl');
                                var ClgnodalSimlogRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/' +'2015/' + month + '/college/' + collegeId + '/' + studentId +'/nodalurl');
                                var allSessionNodalRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/allSessions/'  + collegeId + '/' + studentId +'/nodalurl');
                                var allSessionStdRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/allSessions/'  + collegeId + '/' + studentId +'/studenturl');
                                var nodalRef = new Firebase(FIREBASE_URL + 'nodalSessionRecordMonthWise/2015/'  + month + '/' + "simplelogin:1025" + '/college/' + collegeId +'/' + studentId +'/studenturl');
                                var allNodalSessionRef = new Firebase(FIREBASE_URL + 'nodalSessionRecordMonthWise/allSessions/' + "simplelogin:1025" + "/" + collegeId + '/' + studentId +'/studenturl');
                                ClgnodalSimlogRef.set("simplelogin:1025");
                                ClgStdSimlogRef.set(studentId);
                                allSessionStdRef.set(studentId);
                                allSessionNodalRef.set("simplelogin:1025");
                                nodalRef.set(studentId);
                                allNodalSessionRef.set(studentId);

                                var currentSessionCountUpdate = (new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/'));
                                currentSessionCountUpdate.update({currentSessionCount : count.$value + 1});
                            });

                            var sessionStudentRef = new Firebase(FIREBASE_URL + 'studentSessions/' + currentUser.uid + '/' + collegeId + '/');
                            var sessionStudentObj = $firebaseObject(sessionStudentRef);
                            sessionStudentObj.collegeurl = collegeId;
                            sessionStudentObj.collegeurlId = collegeurlId;
                            sessionStudentObj.studenturl = currentUser.uid;
                            sessionStudentObj.studenturlId = studentUrlId;
                            sessionStudentObj.sessionhour = hours;
                            sessionStudentObj.sessionminute = minutes;
                            sessionStudentObj.sessiondate = date;
                            sessionStudentObj.studentquery = query;
                            sessionStudentObj.nodalId = "NODAL1025";
                            sessionStudentObj.$save().then(function(ref) {
                                var a = date.split(" ");  
                                var sample = "1025"+"H"+hours+"MT"+minutes+"D"+a[0]+"M"+a[1]+"Y2015";
                                var ref = new Firebase(FIREBASE_URL + 'allignedStudentGroup/' + collegeId + '/' + sample + "/" + studentId);
                                ref.set(studentId);

                            }, function(error) {
                                console.log("Error:", error);
                            });   
                        });
                    }
                    else {
                        var sessionCollegeRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId  + '/' + currentUser.uid + '/');
                        var sessionCollegeSync = (sessionCollegeRef);
                        sessionCollegeSync.update({studentquery : query});
                        
                        var sessionStudentRef = new Firebase(FIREBASE_URL + 'studentSessions/' + currentUser.uid  + '/' + collegeId + '/');
                        var sessionStudentSync = (sessionStudentRef);
                        sessionStudentSync.update({studentquery : query});

                    }
                }          
            })
        },

        bookSessionInBulk: function ($scope, nodalCodeFromUrl, collegeId,collegeurlid, NodalCode, studentId, studenturlid, query, hours, minutes, date) {
            var currentUser = Auth.resolveUser();
            var collegeurlId = '';
            var studenturlId = '';
            if(studenturlid === null) {
                var data = currentUser.uid.split(":");
                studenturlId = data[1];
            }
            else {
                studenturlId = studenturlid;
            }

            if(collegeurlid === null) {
                var str = collegeId;
                var collegeIdArraySplit = str.split(":");
                collegeurlId = collegeIdArraySplit[1];
            }
            else {
                collegeurlId = collegeurlid;
            }
            var sessionno = 999999999;
            var checksessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + studentId );
            var checksessionObj = $firebaseObject(checksessionRef);  
            checksessionObj.$loaded(function(checksessionObj){
            if (typeof checksessionObj.sessiondate== 'undefined' )
               {
                var sessionCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
                var sync = $firebaseObject(sessionCountRef);
                $scope.sessionno = $scope.sessionno+1;
                $scope.feedbacknum = $scope.feedbacknum+1;                       
                var sessionCountRef1 = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
                var sync1 = (sessionCountRef1);
                sync1.update({ sessionCount: $scope.sessionno });
                sync1.update({ feedbacknotgivenCount: $scope.feedbacknum }); 
                $scope.CurrentSessCount = $scope.CurrentSessCount+1;
                new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId).update({currentSessionCount : $scope.CurrentSessCount});
                var sessionCollegeRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + studentId);
                var sessionCollegeObj = $firebaseObject(sessionCollegeRef);
                sessionCollegeObj.collegeurl = collegeId;
                sessionCollegeObj.collegeurlId = collegeurlId;
                sessionCollegeObj.studenturl = studentId;
                sessionCollegeObj.studenturlId = studenturlId;                         
                sessionCollegeObj.sessionhour = hours;
                sessionCollegeObj.sessionminute = minutes;
                sessionCollegeObj.sessiondate = date;
                sessionCollegeObj.studentquery = query;
                sessionCollegeObj.nodalId = NodalCode;
                sessionCollegeObj.sessionNumber = ($scope.CurrentSessCount);
                sessionCollegeObj.$save().then(function(ref) {
                    var sessionStudentRef = new Firebase(FIREBASE_URL + 'studentSessions/' + studentId + '/' + collegeId);
                    var sessionStudentObj = $firebaseObject(sessionStudentRef);
                    sessionStudentObj.collegeurl = collegeId;
                    sessionStudentObj.collegeurlId = collegeurlId;
                    sessionStudentObj.studenturl = studentId;
                    sessionStudentObj.studenturlId = studenturlId;
                    sessionStudentObj.sessionhour = hours;
                    sessionStudentObj.sessionminute = minutes;
                    sessionStudentObj.sessiondate = date;
                    sessionStudentObj.studentquery = query;
                    sessionStudentObj.nodalId = NodalCode;
                    sessionStudentObj.$save().then(function(ref) {
                        var nodalUrlId = NodalCode.split("NODAL");
                        var nodalSimlog = "simplelogin:" + nodalUrlId[1];
                        var NodalRef = new Firebase(FIREBASE_URL + "/profileForNodalAdmins/" + nodalSimlog);
                        var nodalSync = (NodalRef);
                        var collegeRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId);
                        var collegeSync = (collegeRef);
                        var studentRef = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId);
                        var studentSync = (studentRef);
                        
                        /*console.log("currentDate :" +currentDate);
                        var date = currentDate*1;*/
                        
                        var currentDate = new Date(); 
                        currentDate = currentDate.toString();
                        collegeSync.update({"lastSessionDoneOn" : currentDate});
                        nodalSync.update({"lastSessionDoneOn" : currentDate});
                        studentSync.update({"lastSessionDoneOn" : currentDate}); 
                        studentSync.update({"lastSessionDoneWith":collegeId});
                        studentSync.update({"lastSessionDoneFrom": nodalSimlog});  

                        var a = date.split(" ");  
                        var nCode = NodalCode.split("NODAL");
                        var sample = nCode[1]+"H"+hours+"MT"+minutes+"D"+a[0]+"M"+a[1]+"Y2015";
                        var ref = new Firebase(FIREBASE_URL + 'allignedStudentGroup/' + collegeId + '/' + sample + "/" + studentId);
                        ref.set(studentId);


                        /*monthy session record start*/
                        var month = a[1];
                        var year = '2015';
                        var nodalurl = 'simplelogin:'+nCode[1];
                        var ClgStdSimlogRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/' +'2015/' + month + '/college/' + collegeId + '/' + studentId + '/studenturl');
                        var ClgnodalSimlogRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/' +'2015/' + month + '/college/' + collegeId + '/' + studentId +'/nodalurl');
                        var allSessionNodalRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/allSessions/'  + collegeId + '/' + studentId +'/nodalurl');
                        var allSessionStdRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/allSessions/'  + collegeId + '/' + studentId +'/studenturl');
                        var nodalRef = new Firebase(FIREBASE_URL + 'nodalSessionRecordMonthWise/2015/'  + month + '/' + nodalurl + '/college/' + collegeId +'/' + studentId +'/studenturl');
                        var allNodalSessionRef = new Firebase(FIREBASE_URL + 'nodalSessionRecordMonthWise/allSessions/' + nodalurl + "/" + collegeId + '/' + studentId +'/studenturl');
                         ClgnodalSimlogRef.set(nodalurl);
                         ClgStdSimlogRef.set(studentId);
                        allSessionStdRef.set(studentId);
                        allSessionNodalRef.set(nodalurl);
                        nodalRef.set(studentId);
                        allNodalSessionRef.set(studentId);
                        /*monthy session record end*/

                        if(nodalCodeFromUrl !== 'none') {
                            var currentuser = AdminAuth.resolveUser().uid;          
                            var ref = new Firebase(FIREBASE_URL + "studentsForBuildEnquiry/"+currentuser+"/"+nodalCodeFromUrl);
                            ref.set(null);    
                        }
                        
                                           

                        var collegeEmailRef = new Firebase(FIREBASE_URL + "/admin/collegeUsers/" + collegeId);
                        var collegeEmailObj = $firebaseObject(collegeEmailRef).$loaded().then( function(collegeEmailObj) {
                            var collegeEmail = collegeEmailObj.$value;
                            AdminAuth.addLiveColleges(collegeId,collegeEmail);
                            $scope.bulkSessionFlag = "Done";
                        });
                        if(studentId == $scope.student1Uid) {
                                $scope.student1IdFlag = "booked";
                        }
                        else if(studentId == $scope.student2Uid) {
                            $scope.student2IdFlag = "booked";
                        }
                        else if(studentId == $scope.student3Uid) {
                            $scope.student3IdFlag = "booked";
                        }
                        else if(studentId == $scope.student4Uid) {
                            $scope.student4IdFlag = "booked";
                        }
                        else if(studentId == $scope.student5Uid) {
                            $scope.student5IdFlag = "booked"
                        }
                        else if(studentId == $scope.student6Uid) {
                            $scope.student6IdFlag = "booked";
                        }
                        else if(studentId == $scope.student7Uid) {
                            $scope.student7IdFlag = "booked";
                        }
                        else if(studentId == $scope.student8Uid) {
                            $scope.student8IdFlag = "booked";
                        }
                        else if(studentId == $scope.student9Uid) {
                            $scope.student9IdFlag = "booked";
                        }
                        else if(studentId == $scope.student10Uid) {
                            $scope.student10IdFlag = "booked";
                        }
                    }, function(error) {
                        console.log("Error:", error);
                    });
                }, function(error) {
                    console.log("Error:", error);
                });                
            }
            else if (typeof checksessionObj.sessiondate !== 'undefined' )
                {       
                        if(studentId == $scope.student1Uid) {
                            $scope.student1IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student2Uid) {
                            $scope.student2IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student3Uid) {
                            $scope.student3IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student4Uid) {
                            $scope.student4IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student5Uid) {
                            $scope.student5IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student6Uid) {
                            $scope.student6IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student7Uid) {
                            $scope.student7IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student8Uid) {
                            $scope.student8IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student9Uid) {
                            $scope.student9IdFlag = "already booked";
                        }
                        else if(studentId == $scope.student10Uid) {
                            $scope.student10IdFlag = "already booked";
                        }
                }   
            });    
        },
        
        getSessionForCollege: function () {
            var currentUser = Auth.resolveUser();
            var sessionRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + currentUser.uid + '/sessions' + '/');
            return $firebaseObject(sessionRef);
        },
        getSessionCountForCollege: function () {
            var currentUser = Auth.resolveUser();
            var sessionRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + currentUser.uid + '/sessions' + '/');
            return $firebaseArray(sessionRef);
        },

        
        bookDemoSession: function ($scope, collegeId, NodalCode, studentId, query, hours, minutes, date) {
            var collegeString = collegeId;
            var collegeIdArraySplit = collegeString.split(":");
            var collegeurlId = collegeIdArraySplit[1];
            var studentString = studentId;
            var studentIdArraySplit = studentString.split(":");
            var studenturlId = studentIdArraySplit[1];
            var sessionno = 999999999;
            var checksessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + studentId );
            var checksessionObj = $firebaseObject(checksessionRef);  
            checksessionObj.$loaded(function(checksessionObj){
                if (typeof checksessionObj.sessiondate == 'undefined' ) {
                    $scope.sessionno = $scope.sessionno+1;
                    $scope.feedbacknum = $scope.feedbacknum+1;                       
                    var sessionCountRef1 = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
                    var sync1 = (sessionCountRef1);
                    sync1.update({ sessionCount: $scope.sessionno });
                    sync1.update({ feedbacknotgivenCount: $scope.feedbacknum }); 
                    $scope.CurrentSessCount = $scope.CurrentSessCount+1;
                    new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId).update({currentSessionCount : $scope.CurrentSessCount});
                    var sessionCollegeRef = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + studentId);
                    var sessionCollegeObj = $firebaseObject(sessionCollegeRef);
                    sessionCollegeObj.collegeurl = collegeId;
                    sessionCollegeObj.collegeurlId = collegeurlId;
                    sessionCollegeObj.studenturl = studentId;
                    sessionCollegeObj.studenturlId = studenturlId;                         
                    sessionCollegeObj.sessionhour = hours;
                    sessionCollegeObj.sessionminute = minutes;
                    sessionCollegeObj.sessiondate = date;
                    sessionCollegeObj.studentquery = query;
                    sessionCollegeObj.nodalId = NodalCode;
                    sessionCollegeObj.sessionNumber = ($scope.CurrentSessCount);
                    sessionCollegeObj.$save().then(function(ref) {
                        var sessionStudentRef = new Firebase(FIREBASE_URL + 'studentSessions/' + studentId + '/' + collegeId);
                        var sessionStudentObj = $firebaseObject(sessionStudentRef);
                        sessionStudentObj.collegeurl = collegeId;
                        sessionStudentObj.collegeurlId = collegeurlId;
                        sessionStudentObj.studenturl = studentId;
                        sessionStudentObj.studenturlId = studenturlId;
                        sessionStudentObj.sessionhour = hours;
                        sessionStudentObj.sessionminute = minutes;
                        sessionStudentObj.sessiondate = date;
                        sessionStudentObj.studentquery = query;
                        sessionStudentObj.nodalId = NodalCode;
                        sessionStudentObj.$save().then(function(ref) {
                            var nodalUrlId = NodalCode.split("NODAL");
                            var nodalSimlog = "simplelogin:" + nodalUrlId[1];
                            var NodalRef = new Firebase(FIREBASE_URL + "/profileForNodalAdmins/" + nodalSimlog);
                            var nodalSync = (NodalRef);
                            var collegeRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId);
                            var collegeSync = (collegeRef);
                            var studentRef = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId);
                            var studentSync = (studentRef);
                            
                            /*console.log("currentDate :" +currentDate);
                            var date = currentDate*1;*/
                            
                            var currentDate = new Date(); 
                            currentDate = currentDate.toString();
                            collegeSync.update({"lastSessionDoneOn" : currentDate});
                            nodalSync.update({"lastSessionDoneOn" : currentDate});
                            studentSync.update({"lastSessionDoneOn" : currentDate}); 
                            studentSync.update({"lastSessionDoneWith":collegeId});
                            studentSync.update({"lastSessionDoneFrom": nodalSimlog});  

                            
                            /*monthy session record start*/
                            var a = date.split(" ");
                            var nCode = NodalCode.split("NODAL");
                            var month = a[1];
                            var year = '2015';
                            var nodalurl = 'simplelogin:'+nCode[1];
                            var ClgStdSimlogRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/' +'2015/' + month + '/college/' + collegeId + '/' + studentId + '/studenturl');
                            var ClgnodalSimlogRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/' +'2015/' + month + '/college/' + collegeId + '/' + studentId +'/nodalurl');
                            var allSessionNodalRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/allSessions/'  + collegeId + '/' + studentId +'/nodalurl');
                            var allSessionStdRef = new Firebase(FIREBASE_URL + 'collegeSessionRecordMonthWise/allSessions/'  + collegeId + '/' + studentId +'/studenturl');
                            var nodalRef = new Firebase(FIREBASE_URL + 'nodalSessionRecordMonthWise/2015/'  + month + '/' + nodalurl + '/college/' + collegeId +'/' + studentId +'/studenturl');
                            var allNodalSessionRef = new Firebase(FIREBASE_URL + 'nodalSessionRecordMonthWise/allSessions/' + nodalurl + "/" + collegeId + '/' + studentId +'/studenturl');
                             ClgnodalSimlogRef.set(nodalurl);
                             ClgStdSimlogRef.set(studentId);
                            allSessionStdRef.set(studentId);
                            allSessionNodalRef.set(nodalurl);
                            nodalRef.set(studentId);
                            allNodalSessionRef.set(studentId);
                            $scope.demoSessionFlag = "Done";
                            /*monthy session record end*/
                            
                            if(studentId == $scope.demoStudentUid) {
                                    $scope.demoStudentIdFlag = "booked";
                            }
                        }, function(error) {
                            console.log("Error:", error);
                        });
                    }, function(error) {
                        console.log("Error:", error);
                    });                
                }
                else if (typeof checksessionObj.sessiondate !== 'undefined' )   {       
                    if(studentId == $scope.demoStudentUid) {
                        $scope.demoStudentIdFlag = "already booked";
                    }
                }
            });   
        },          
    };  
  return Session;
});

