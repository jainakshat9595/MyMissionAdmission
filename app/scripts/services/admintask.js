'use strict';
 
app.factory('AdminTask', function ($firebaseObject,$firebaseAuth , $firebaseArray, FIREBASE_URL, $rootScope, $http, Auth, NodalAuth, $q, Search) {

    
    //var sync = $firebase(ref.child(profileForCollege));
   var uSer = {
      roles: []
    };

   var uSerA = {
      rolesA: []
    };

    var AdminTask = {

        unverifyNodal: function (usern) {
          var ref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins' + '/' + usern.$id + '/');
          if((usern.privilege=="approved")){
            ref.update({ privilege: "access_denied" });
          }
        },

        verifyNodal: function (usern, date) {
          var ref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins' + '/' + usern.$id + '/');
          if((usern.privilege=="access_denied")){
            ref.update({ privilege: "approved" });
            if((usern.dateOfAccepting=="none")){
              ref.update({ dateOfAccepting: date});
            }
          }
        },

        getnodals : function () {
          var ref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/');
          var usernobj = $firebaseArray(ref);
          return usernobj;       
        },
        
        changeSubscription: function (college) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          if(college.collegetype === "free"){
            ref.update({ collegetype: "paid" });
            ref.update({ trainingDone: "no" });
          }
         else if(college.collegetype === "paid"){
            ref.update({ collegetype: "free" });
          }
        },

        trainingRequest: function (collegeId) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/');
          ref.update({ trainingDone: "no" });
        },

        trainingDone: function (collegeid,counsellor,trainer,remarks,contact,successful,datee){
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeid + '/');
          ref.update({ trainingDone: "yes" });
          ref.update({ trainingBy: trainer });
          ref.update({ remarks: remarks });
          ref.update({ traineePerson: counsellor });
          ref.update({ traineeContact: contact  });
          ref.update({ trainingStatus: successful });
          ref.update({ dateofTraining: datee });
        },

        countSession: function (college) {
          var deferred = $q.defer();
          var sessionCount;
          var ref = new Firebase(FIREBASE_URL + 'collegeSessions' + '/' + college.$id);
          var sessionObj = $firebaseArray(ref);
          sessionObj.$loaded(function(currentSessionCount){
              if(currentSessionCount.length == 0){
              sessionCount = 0;
              }
              else{
              sessionCount = currentSessionCount.length - 1;
              }
            deferred.resolve(sessionCount);
            var sessionCountRef1 = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.$id + '/');
                sessionCountRef1.update({ sessionCount: sessionCount });       
          });
            
          return deferred.promise;  
        },

        countApprovedSession: function (college) {
          var alen;
          var plen;
          var rlen;
          var flen;
           var totalref = $firebaseArray(new Firebase(FIREBASE_URL + 'collegeSessions/'  + college.$id));
          var approvedref = $firebaseArray(new Firebase(FIREBASE_URL + 'sessionStatus' + '/approvedSessions/' + college.$id + '/'));
          var pendingref = $firebaseArray(new Firebase(FIREBASE_URL + 'sessionStatus' + '/pendingSessions/' + college.$id + '/'));
          var rejectedref = $firebaseArray(new Firebase(FIREBASE_URL + 'sessionStatus' + '/rejectedSessions/' + college.$id + '/'));
            approvedref.$loaded(function(result1){
                if(result1.length == 0){
                  alen = 0;
                }else{  
                  alen = result1.length - 1;
                }
                    pendingref.$loaded(function(result2) {
                      plen = result2.length;
                      rejectedref.$loaded(function(result3) {
                          rlen = result3.length;
                          totalref.$loaded(function(total) {
                            if(total.length == 0){
                              flen = 0;
                            }
                            else{
                             flen = (total.length-(alen + plen +rlen) -1);
                            } 
                             var sessionCountRef1 = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.$id + '/');
                              sessionCountRef1.update({ approvesessionCount: alen });
                              sessionCountRef1.update({ pendingsessionCount: plen });
                              sessionCountRef1.update({ rejectedsessionCount: rlen });
                             sessionCountRef1.update({ feedbacknotgivenCount: flen });
                          });   
                    });
                });
            }); 
        },

        changecounsellermail: function (user,$scope) {     
          $scope.submitsuccesstext = false;    
          var collegeuserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/collegeUsers/"));
          collegeuserArray.$loaded(function(collegeuserArray) {
              var flag = false;
              for(var i=0; i<collegeuserArray.length; i++) 
               {
                  if((collegeuserArray[i].$value) == user.email)
                    {
                        flag = true;
                        var simpleuser = collegeuserArray.$keyAt(collegeuserArray[i]);
                        var ref = new Firebase(FIREBASE_URL);
                        ref.changeEmail({
                            oldEmail : user.email,
                            newEmail : user.nemail,
                            password : user.password  
                            },function(error) {
                                if (error === null) {
                                    
                                      var reff = new Firebase(FIREBASE_URL + "profileForCollege/" + simpleuser);
                                      reff.update({ counselloremail: user.nemail },function(reff) {
                                        var newref = new Firebase(FIREBASE_URL + 'admin/collegeUsers' + '/');
                                        //var sync2 = $firebase(newref);
                                        var cemail = {}; 
                                        cemail[simpleuser] = user.nemail;
                                        newref.update(cemail);
                                        $scope.submitsuccesstext = true;
                                        $scope.errorB = null;
                                        user.email= ""; 
                                        user.nemail= "";
                                        user.password="";
                                        }),  function(error) {
                                          $scope.errorB = error.message;
                                        }
                                   
                                 } else {
                                   switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        }
                                      
                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.errorB = "The old email is not a registered Counseller Email.";
                  }
          }
      );         
    }, 

    logoutcollege : function (id) {
      var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + id + '/');
      var authing = ($firebaseAuthref);
      authing.$logout();
    },

      changestudentmail:function(user,$scope) { 

      $scope.submitsuccesstext = false;    
          var collegeuserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/studentUsers/"));
          collegeuserArray.$loaded(function(collegeuserArray) {
              var flag = false;
              for(var i=0; i<collegeuserArray.length; i++) 
               {
                  if((collegeuserArray[i].$value) == user.stuemail)
                    {
                        flag = true;
                        var simpleuser = collegeuserArray.$keyAt(collegeuserArray[i]);
                        var ref = new Firebase(FIREBASE_URL);
                        ref.changeEmail({
                            oldEmail : user.stuemail,
                            newEmail : user.stunewemail,
                            password : user.stupassword  
                            },function(error) {
                                if (error === null) {

                                  var reff = new Firebase(FIREBASE_URL + "profileForStudents/" + simpleuser);
                                      //var sync = $firebase(reff);
                                      reff.update({ email: user.stunewemail},function(reff) {
                                        var newref = new Firebase(FIREBASE_URL + 'admin/studentUsers' + '/');
                                        //var sync2 = $firebase(newref);
                                        var studentemail = {}; 
                                        studentemail[simpleuser] = user.stunewemail;
                                        newref.update(studentemail);
                                        $scope.submitsuccesstext = true;
                                        $scope.errorA = null;
                                        user.stuemail= ""; 
                                        user.stunewemail= "";
                                        user.stupassword="";
                                        $scope.submitdisabled="true";
                                        $scope.studentIdFlag = "";
                                     
                                      }), 
                                      function(error) {
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                      }


                                    
                                 } else {
                                  switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        }

                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.errorA = "The old email is not a registered Student.";
                  }
              }
            );  
        },

      changeadminemail: function (user, $scope, usera, result) {     
          $scope.submitsuccesstext = false;    
          var adminuserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/adminUsers/"));
          adminuserArray.$loaded(function(adminuserArray) {
              var flag = false;
              for(var i=0; i<adminuserArray.length; i++) 
               {
                  if((adminuserArray[i].$value) == user.email)
                    {
                        flag = true;
                        var simpleuser = adminuserArray.$keyAt(adminuserArray[i]);
                        var ref = new Firebase(FIREBASE_URL);                        

                        ref.changeEmail({
                            oldEmail : user.email,
                            newEmail : user.nemail,
                            password : user.password  
                            },function(error) {
                                if (error === null) {

                                      var reff = new Firebase(FIREBASE_URL + "profileForAdmins/" + simpleuser);
                                      var dataToPost = {
                                                    preEmail: user.email, 
                                                    newEmail: user.nemail,
                                                    superEmail: usera.profile.adminemail,
                                                    superName: usera.profile.adminname,
                                                    adminName: result.adminname                                
                                        };
                                       
                                        $http({
                                        url: "/sendAdminEmailChangeInfoToadminmail", 
                                        method: "GET",
                                        params: {   preEmail: dataToPost.preEmail,
                                                    newEmail: dataToPost.newEmail,
                                                    superEmail: dataToPost.superEmail,
                                                    superName: dataToPost.superName,
                                                    adminName: dataToPost.adminName
                                                }
                                        }).success(function(serverResponse) {
                                            //console.log(serverResponse);
                                        }).error(function(serverResponse) {
                                            //console.log(serverResponse);
                                        });


                                      reff.update({ adminemail: user.nemail },function(reff) {
                                        var newref = new Firebase(FIREBASE_URL + 'admin/adminUsers' + '/');
                                        var cemail = {}; 
                                        cemail[simpleuser] = user.nemail;
                                        newref.update(cemail);
                                        $scope.submitsuccesstext = true;
                                        $scope.errorB = null;
                                        user.email= ""; 
                                        user.nemail= "";
                                        user.password="";
                                        $scope.submitdisabled="true";
                                        $scope.adminIdFlag = "";
                                      }), 
                                      function(error) {
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        }                                    
                                 } else {
                                      switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        }
                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.errorB = "The old email is not a registered Admin Email.";
                  }
            }
        );         
      },

      changenodalemail: function (user,$scope, usera, result) {   

          $scope.submitsuccesstext = false;    
          var noadluserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/nodaladminUsers/"));
          noadluserArray.$loaded(function(noadluserArray) {
              var flag = false;
              for(var i=0; i<noadluserArray.length; i++) 
               {
                  if((noadluserArray[i].$value) == user.email)
                    {
                        flag = true;
                        var simpleuser = noadluserArray.$keyAt(noadluserArray[i]);
                        var ref = new Firebase(FIREBASE_URL);                      

                        ref.changeEmail({
                            oldEmail : user.email,
                            newEmail : user.nemail,
                            password : user.password
                            },function(error) {
                                if (error  === null) {

                                    var reff = new Firebase(FIREBASE_URL + "profileForNodalAdmins/" + simpleuser);
                                      //var sync = $firebase(reff);

                                      var dataToPost = {
                                                    preEmail: user.email, 
                                                    newEmail: user.nemail,
                                                    adminEmail: usera.profile.adminemail,
                                                    nodalCenter: result.nodalCenterName,
                                                    nodalPhone: result.nodalPhone,
                                                    nodalAddress: result.nodalAddress,
                                                    nodalCity: result.nodalCity,
                                                    nodalState: result.nodalState                                
                                        };
                                       
                                        $http({
                                        url: "/sendNodalEmailChangeInfoToadminmail", 
                                        method: "GET",
                                        params: {   adminEmail: dataToPost.adminEmail,
                                                    nodalCenter: dataToPost.nodalCenter,
                                                    nodalPhone: dataToPost.nodalPhone,
                                                    preEmail: dataToPost.preEmail,
                                                    newEmail: dataToPost.newEmail,
                                                    nodalAddress: dataToPost.nodalAddress,
                                                    nodalCity: dataToPost.nodalCity,
                                                    nodalState: dataToPost.nodalState
                                                }
                                        }).success(function(serverResponse) {
                                            //console.log(serverResponse);
                                        }).error(function(serverResponse) {
                                            //console.log(serverResponse);
                                        });



                                      reff.update({ nodalAdminEmail: user.nemail },function(reff) {
                                        var sync2 = new Firebase(FIREBASE_URL + 'admin/nodaladminUsers' + '/');
                                      //  var sync2 = $firebase(newref);
                                        var cemail = {};                                        
                                        cemail[simpleuser] = user.nemail;
                                        sync2.update(cemail);
                                        $scope.submitsuccesstext = true;
                                        $scope.errorB = null;
                                        user.email= ""; 
                                        user.nemail= "";
                                        user.password="";
                                        $scope.submitdisabled="true";
                                        $scope.nodalIdFlag = "";


                                      }),
                                      function(error) {
                                        $scope.errorB = error.message;
                                        }


                                    
                                 } else {
                                  switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.errorB = error.message;
                                        $scope.$apply();
                                        }
                                      
                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.errorB = "The old email is not a registered Nodal Admin Email.";
                  }
            }
        );         
      },

      changestudentpassword:function(user,$scope) { 

      $scope.submitsuccesstext = false;    
          var collegeuserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/studentUsers/"));
          collegeuserArray.$loaded(function(collegeuserArray) {
              var flag = false;
              for(var i=0; i<collegeuserArray.length; i++) 
               {
                  if((collegeuserArray[i].$value) == user.stuemail)
                    {
                        flag = true;
                        var simpleuser = collegeuserArray.$keyAt(collegeuserArray[i]);
                        var newref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + simpleuser);
                        $scope.studentIdFlag = "";
                         var ref = new Firebase(FIREBASE_URL);
                         ref.changePassword({
                            email : user.stuemail,
                           oldPassword : user.stupassword,
                          newPassword : user.stunewpassword,  
                            },function(error) {
                                if (error === null) {
                                  var reff = new Firebase(FIREBASE_URL + "profileForStudents/" + simpleuser);
                                      //var sync = $firebase(reff);
                                      reff.update({ password: user.stunewpassword},function(reff){
                                        $scope.submitsuccesstext = true;
                                        $scope.studentIdFlag = "";
                                        $scope.errorA = null;
                                        $scope.user.stuemail = ""; 
                                        $scope.user.stupassword = "";
                                        $scope.user.stunewpassword ="";
                                        $scope.user.stunewConfirmpassword ="";
                                        $scope.StudentIdFlag1 = "";
                                        $scope.submitdisabled = true;
                                        $scope.$apply();
                                      }), 
                                      function(error) {
                                        $scope.studentIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                      }
                                    
                                 } else {
                                  switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.studentIdFlag = "";
                                        $scope.errorA = error.message;
                                         $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.studentIdFlag = "";0
                                        $scope.errorA = error.message;
                                         $scope.$apply();
                                        break;
                                      default:
                                        $scope.studentIdFlag = "";
                                        $scope.errorA = error.message;
                                         $scope.$apply();
                                        }
                                      
                                 }
                        });
                    }
                }
                if(flag === false){
                  $scope.studentIdFlag = "";
                  $scope.errorA = "The old email is not a registered Student.";
                  }
              }
            );  
        },

      changenodalpassword:function(user, $scope, usera, result) { 

      $scope.submitsuccesstext = false;    
          var nodaluserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/nodaladminUsers/"));
          nodaluserArray.$loaded(function(nodaluserArray) {
              var flag = false;
              for(var i=0; i<nodaluserArray.length; i++) 
               {
                  if((nodaluserArray[i].$value) == user.email)
                    {
                        flag = true;
                        var simpleuser = nodaluserArray.$keyAt(nodaluserArray[i]);
                        var newref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins' + '/' + simpleuser);
                        $scope.nodalIdFlag = "";
                         var ref = new Firebase(FIREBASE_URL);

                         ref.changePassword({
                              email : user.email,
                              oldPassword : user.password,
                              newPassword : user.newpassword,  
                            },function(error) {
                                if (error === null) {
                                    var reff = new Firebase(FIREBASE_URL + "profileForNodalAdmins/" + simpleuser);
                                      reff.update({ password: user.newpassword},function(reff){                                     
                                        $scope.submitsuccesstext = true;
                                        $scope.nodalIdFlag = "";
                                        $scope.errorA = null;
                                        user.email= ""; 
                                        user.password= "";
                                        user.newpassword="";
                                        user.newConfirmpassword="";
                                        $scope.nodalIdFlag1 = "";
                                        $scope.submitdisabled ="true";

                                        var dataToPost = { 
                                                    nodalEmail: result.nodalAdminEmail,
                                                    adminEmail: usera.profile.adminemail,
                                                    adminMobile: usera.profile.adminmobile,
                                                    adminName: usera.profile.adminname,                                                    
                                                    supportEmail: "support@mymissionadmission.com",
                                                    nodalCenter: result.nodalCenterName
                                        };
                                       
                                        $http({
                                        url: "/sendNodalPasswordChangeInfoToadminmail", 
                                        method: "GET",
                                        params: {   nodalEmail: dataToPost.nodalEmail,
                                                    adminEmail: dataToPost.adminEmail,
                                                    adminMobile: dataToPost.adminMobile,
                                                    adminName: dataToPost.adminName,
                                                    nodalCenter: dataToPost.nodalCenter,
                                                    supportEmail: dataToPost.supportEmail                                                   
                                                }
                                        }).success(function(serverResponse) {
                                            console.log(serverResponse);
                                        }).error(function(serverResponse) {
                                            console.log(serverResponse);
                                        });

                                      }), 
                                      function(error) {
                                        $scope.nodalIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                      }
                                    
                                 } else {
                                      switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.nodalIdFlag = "";                                        
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.nodalIdFlag = "";0
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.nodalIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        }                                      
                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.nodalIdFlag = "";
                  $scope.errorA = "The old email is not a registered Nodal.";
                  }
              }
            );  
        },

        changeadminpassword:function(user, $scope, usera, result) { 
                     $scope.submitsuccesstext = false; 
                     $scope.adminpassword = false;
                      var ref = new Firebase(FIREBASE_URL);
                          ref.changePassword({
                              email : user.email,
                              oldPassword : user.password,
                              newPassword : user.adminnewpassword,  

                            },function(error) {
                                if (error) {

                                    switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        /*console.log("Invaild password");*/
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        /*console.log("Invaild user");*/
                                        break;
                                      default:
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        /*console.log("else");*/
                                        }                                                                             
                                 } 
                                 else {

                                      $scope.adminIdFlag = "";
                                      $scope.$apply();
                                      $scope.submitdisabled =true;
                                      $scope.$apply();
                                      $scope.submitsuccesstext = true;
                                      $scope.$apply();
                                      $scope.user.adminnewpassword = "";
                                      $scope.$apply();
                                      $scope.errorA = null;
                                      $scope.$apply();
                                      user.email= ""; 
                                      user.password= "";
                                      $scope.adminpassword = true;
                                      $scope.$apply();
                                      user.adminnewpassword="";
                                      user.adminnewConfirmpassword="";
                                      $scope.adminIdFlag1 = "";
                                      $scope.$apply();
                                      $scope.submitdisabled ="true";
                                      $scope.$apply();
                                      /*console.log("password changed sucessfully");*/ 

                                            var dataToPost = {                                                     
                                                        adminEmail: result.adminemail,
                                                        adminName: result.adminname,
                                                        superName: usera.profile.adminname,
                                                        superEmail: usera.profile.adminemail,                                                    
                                            };
                                           
                                            $http({
                                            url: "/sendAdminPasswordChangeInfoToadminmail", 
                                            method: "GET",
                                            params: {   adminEmail: dataToPost.adminEmail,
                                                        adminName: dataToPost.adminName,
                                                        superEmail: dataToPost.superEmail,
                                                        superName: dataToPost.superName                                                   
                                                    }
                                            }).success(function(serverResponse) {
                                                console.log(serverResponse);
                                            }).error(function(serverResponse) {
                                                console.log(serverResponse);
                                            });
                                                                                              
                                 }
        });    
      },



        changecollegepassword:function(user,$scope) { 

      $scope.submitsuccesstext = false;    
          var collegeuserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/collegeUsers/"));
          collegeuserArray.$loaded(function(collegeuserArray) {
              var flag = false;
              for(var i=0; i<collegeuserArray.length; i++) 
               {
                  if((collegeuserArray[i].$value) == user.clgemail)
                    {
                        flag = true;
                        /*console.log(user.clgpassword);*/
                        var simpleuser = collegeuserArray.$keyAt(collegeuserArray[i]);
                        var newref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + simpleuser);
                        $scope.collegeIdFlag = "";
                         var ref = new Firebase(FIREBASE_URL);
                         ref.changePassword({
                            email : user.clgemail,
                           oldPassword : user.clgpassword,
                          newPassword : user.clgnewpassword,  
                            },function(error) {
                                if (error === null) {

                                  var reff = new Firebase(FIREBASE_URL + "profileForCollege/" + simpleuser);
                                      //var sync = $firebase(reff);
                                      reff.update({ collegepassword: user.clgnewpassword},function(reff){
                                        $scope.collegeIdFlag = "";
                                        $scope.submitsuccesstext = true;
                                        $scope.errorA = null;
                                        $scope.user.clgemail= ""; 
                                        $scope.user.clgpassword= "";
                                        $scope.user.clgnewpassword="";
                                        $scope.user.clgnewConfirmpassword="";
                                        $scope.clgIdFlag1 = "";
                                        $scope.submitdisabled ="true";
                                        $scope.$apply();
                                      
                                      }), 
                                      function(error) {
                                        $scope.collegeIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                      }
                                    
                                 } else {
                                  switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.collegeIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.collegeIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.collegeIdFlag = "";
                                        $scope.errorA = error.message;
                                        $scope.$apply();
                                        }

                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.collegeIdFlag = "";
                  $scope.errorA = "The old email is not a registered College.";
                  }
              }
            );  
              
        },    

       verifyCollege: function (college, date,roles,rolesA) {
                var currentStateCode = '';
                var currentStateName = '';
                var firebaseStateListref = $firebaseObject(new Firebase(FIREBASE_URL + 'stateList/states/'));
                    firebaseStateListref.$loaded(function(firebaseStateList) {
                        angular.forEach(firebaseStateList,function(key,value) {
                             if(key === college.collegestate) {
                              currentStateName = key;
                              currentStateCode = value;
                             }
                        });
                    });
                var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
                if(college.verifiedcollege=="notverified") {
                       ref.update({ verifiedcollege: "verified" });
                      if((college.dateOfAccepting == "none") || (typeof college.dateOfAccepting == 'undefined')) {
                       ref.update({ dateOfAccepting: date });
                      }
                       var newRef = new Firebase(FIREBASE_URL);
                       var collegeref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id);
                       var stateListArray = $firebaseArray(newRef.child('stateList'));     
                       var statesRef = $firebaseObject(newRef.child('stateList/states'));
                       // college Search Changes 
                       var stateCollegeArray = $firebaseObject(newRef.child('StateCollegeSearch'));
                      stateCollegeArray.$loaded(function () {
                         var checkStateAvailability = 0;
                          (new Firebase(FIREBASE_URL + 'StateCollegeSearch/' + college.collegestate + '/' + college.collegeId)).set(college.counselloremail);
                          
                      });
                      ///////////////////////////////////////////////////////////
                      stateListArray.$loaded( function () {
                          statesRef.$loaded().then(function() {
                            var temp=0;
                            angular.forEach(statesRef, function(value,key) {
                                if(value == college.collegestate) { temp= temp+1; }
                            });
                            if(temp == 0) {
                              var currentStateCount = stateListArray.$getRecord('stateCount');
                              var stateIndex = currentStateCount.$value + 1;
                                (new Firebase(FIREBASE_URL + 'stateList/states/'+stateIndex)).set(college.collegestate);
                                              var sync = (newRef.child('stateList'));
                                            sync.update({ stateCount: currentStateCount.$value + 1});
                                
                            }
                          });
                      });
                  }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////
                      var count = 0;
                      var newRef = new Firebase(FIREBASE_URL);
                      var sync1 = (newRef.child('courseList/courses'));
                      var courseListArray = $firebaseArray(new Firebase(FIREBASE_URL+"courseList/courses/"));
                      uSer.roles= college.coursesofferedUG;
                      uSerA.rolesA = college.coursesofferedPG;
                      var abc = roles;
                      var abc1 = rolesA;
                      if(!college.coursesofferedPG)
                        var tempRolesA = [];
                      else
                          var tempRolesA = uSerA.rolesA;
                      if(!college.coursesofferedUG)
                          var tempRoles = [];
                      else
                          var tempRoles = uSer.roles;
                      courseListArray.$loaded(function(courseListArray) { 
                        //console.log(courseListArray);
                          if(typeof courseListArray[0] !== 'undefined') {
                            var currentCourseCount = $firebaseObject(new Firebase(FIREBASE_URL+"courseList/courseCount/"));
                            currentCourseCount.$loaded(function(currentCourseCount){
                                count = currentCourseCount.$value + 1;
                            }).then(function() {
                                for(var i=0;(i < tempRoles.length);i++) {
                                       var flag = 0;
                                       var courseNameForFirebase = abc[tempRoles[i]].text;
                                      for(var j=0; j < courseListArray.length; j++) {
                                          if(courseListArray[j].$value === courseNameForFirebase) {
                                             flag = 1;
                                             break;
                                          }
                                      }
                                      if(flag === 0) {
                                           (new Firebase(FIREBASE_URL + 'courseList/courses/' + (count))).set(courseNameForFirebase);
                                           courseListArray = courseListArray.concat([
                                              {
                                                $value : courseNameForFirebase,
                                                $id : count
                                              },
                                            ]);
                                           count = count + 1;
                                      }
                                      if(i=== tempRoles.length-1) {
                                           var sync = (newRef.child('courseList'));
                                            sync.update({ courseCount: count-1});
                                            AdminTask.updatePGCourses(tempRolesA,courseListArray,count,abc1,newRef);

                                      }
                                };
                            })
                          }
                          else if(typeof courseListArray[0] === 'undefined')  {
                              var currentCourseCount = $firebaseObject(new Firebase(FIREBASE_URL+"courseList/courseCount/"));
                             currentCourseCount.$loaded(function(currentCourseCount){
                                  count = currentCourseCount.$value + 1;
                              }).then(function () {
                                    for(var i=0; i< tempRoles.length; i++) {
                                          var courseNameForFirebase = abc[tempRoles[i]].text;
                                          (new Firebase(FIREBASE_URL + 'courseList/courses/' + (count))).set(courseNameForFirebase);
                                          count = count + 1;
                                        }
                                      var courseListArray = $firebaseArray(new Firebase(FIREBASE_URL+"courseList/courses/"));
                                      courseListArray.$loaded(function(courseListArray) {
                                         for(var k=0;(k < tempRolesA.length);k++) {
                                             var flag1 = 0;
                                             var    courseNameForFirebase1 = abc1[tempRolesA[k]].textA;
                                            for(var j=0; j < courseListArray.length; j++) {
                                                  if(courseListArray[j].$value === courseNameForFirebase1)  {
                                                       flag1 = 1;
                                                       break;
                                                   }
                                             }
                                             if(flag1 === 0 && j== courseListArray.length) {
                                                  (new Firebase(FIREBASE_URL + 'courseList/courses/' + (count))).set(courseNameForFirebase1);
                                                  count = count + 1;
                                               }
                                          }
                                        var sync = (newRef.child('courseList'));
                                        sync.update({ courseCount: count-1});
                                      })
                                    })
                          }
                      })
      ////////////////////////////////////////////////////////////////////////////
                    angular.forEach(roles, function (key1,value1) {
                          var id = key1.id;
                          var courseName = key1.text;
                          angular.forEach(uSer.roles,function (key,value) {
                            if(id == key) {
                               (new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName + '/' + college.collegeId)).set(college.counselloremail);
                             }
                          })
                    })
                    angular.forEach(rolesA, function (key1,value1)  {
                      var id = key1.idA;
                      var courseName = key1.textA;
                      var checkCourseStatusInForge = 0;
                      angular.forEach(uSerA.rolesA,function (key,value) {
                         if(id == key) {
                            (new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName + '/' + college.collegeId)).set(college.counselloremail);
                          }
                        })
                    })
      },

        updatePGCourses: function (tempRolesA,courseListArray,count,abc1,newRef) {
            for(var i=0;(i < tempRolesA.length);i++) {
                 var flag1 = 0;
                 var courseNameForFirebase1 = abc1[tempRolesA[i]].textA;
                 for(var j=0; j < courseListArray.length; j++) {
                      if(courseListArray[j].$value === courseNameForFirebase1)  {
                          flag1 = 1;
                          break;
                      }
                  }
                  if(flag1 === 0) {
                        (new Firebase(FIREBASE_URL + 'courseList/courses/' + (count))).set(courseNameForFirebase1);
                        count = count + 1;
                  }
              }
           var sync = (newRef.child('courseList'));
           sync.update({ courseCount: count-1});

        },
        
        hideCollege: function (college,roles,rolesA) {
          var newRef = new Firebase(FIREBASE_URL);
          var currentStateName = '';
          var currentStateCode = '';
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          var firebaseStateListref = $firebaseObject(new Firebase(FIREBASE_URL + 'stateList/states/'));
          firebaseStateListref.$loaded(function(firebaseStateList) {
              angular.forEach(firebaseStateList,function(key,value) {
                   if(key === college.collegestate) {
                    currentStateName = key;
                    currentStateCode = value;
                   }
              });
          });

          var stateListArray = $firebaseArray(newRef.child('stateList'));  
          var len = 0;
          if(college.verifiedcollege=="verified") {
                ref.update({ verifiedcollege: "notverified" });
                var stateCollegeArray = $firebaseObject(newRef.child('StateCollegeSearch/'+ college.collegestate + "/"));
                  stateCollegeArray.$loaded(function (stateCollegeArray) {
                      angular.forEach(stateCollegeArray, function(value,key){
                           len = len + 1;
                      });
                      if(len === 1) {
                          (new Firebase(FIREBASE_URL + 'StateCollegeSearch/' + college.collegestate + '/' + college.collegeId)).set(null); // new  added
                          (new Firebase(FIREBASE_URL + 'stateList/states/'+currentStateCode)).set(null);
                      }
                      else if(len > 1){
                          (new Firebase(FIREBASE_URL + 'StateCollegeSearch/' + college.collegestate + "/" + college.collegeId )).set(null);
                      }
                  });
                   uSer.roles= college.coursesofferedUG;
                   uSerA.rolesA = college.coursesofferedPG;
                    angular.forEach(roles, function (key1,value1) {
                      var id = key1.id;
                      var courseName = key1.text;
                      angular.forEach(uSer.roles,function (key,value) {
                          if(id == key) {
                              var courseArray = $firebaseArray(new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName +'/'));
                              courseArray.$loaded(function (courseArray) {
                                  var len = 0;
                                  if(courseArray.length === 1) {
                                       var courseFirebaseArray = $firebaseObject(newRef.child('courseList/courses/'));
                                        courseFirebaseArray.$loaded(function (courseFirebaseArray) {
                                          angular.forEach(courseFirebaseArray,function(key,value) {
                                              if(key === courseName) {
                                                (new Firebase(FIREBASE_URL + 'courseList/courses/' + (value))).set(null);
                                              }
                                          });
                                        });
                                      (new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName + '/' + college.collegeId)).set(null);
                                  }
                                  else
                                    (new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName + '/' + college.collegeId)).set(null);
                              });
                          }  
                      });
                      angular.forEach(rolesA, function (key1,value1) {
                          var id1 = key1.idA;
                          var courseName = key1.textA;
                          angular.forEach(uSerA.rolesA,function (key,value) {
                              if(id1 == key) {
                                  var courseArray = $firebaseArray(new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName +'/'));
                                  courseArray.$loaded(function (courseArray) {
                                      if(courseArray.length === 1) {
                                          var courseFirebaseArray = $firebaseObject(newRef.child('courseList/courses'));
                                          courseFirebaseArray.$loaded(function(courseFirebaseArray){
                                              angular.forEach(courseFirebaseArray,function(key,value){
                                                  if(key === courseName) {
                                                     // console.log(courseName);
                                                      (new Firebase(FIREBASE_URL + 'courseList/courses/' + (value))).set(null);
                                                  }
                                              });
                                          });
                                            (new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName + '/' + college.collegeId)).set(null);
                                      }
                                    else {
                                          (new Firebase(FIREBASE_URL + 'CourseCollegeSearch/' + courseName + '/' + college.collegeId)).set(null);
                                    }
                                  });
                              }
                          });
                      });
                  });
          }
      },

        blockStudent: function (student,reason) {

          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          //var sync = $firebase(ref);
          if((student.studentstatus=="verified") || (student.studentstatus=="notverified"))
          {
            ref.update({ studentstatus: "block" });
            if(reason=="")
              ref.update({studentsBlockingReason: "no comment given by admin"});
            else
            ref.update({studentsBlockingReason: reason});
          }
        },

        

        unblockStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          //var sync = $firebase(ref);
          if((student.studentstatus=="notverified") || (student.studentstatus=="block"))
          {
            ref.update({ studentstatus: "verified" });
            ref.update({studentsBlockingReason: null});
          }
        },

        unverifyStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          //var sync = $firebase(ref);
          if((student.studentstatus=="verified") || (student.studentstatus=="block")){
            ref.update({ studentstatus: "notverified" });
            ref.update({studentsBlockingReason: null});
          }
        },

        verifyStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          //var sync = $firebase(ref);
          if((student.studentstatus=="notverified") || (student.studentstatus=="block")){
            ref.update({ studentstatus: "verified" });
            ref.update({studentsBlockingReason: null});
          }
        },

        getstudents : function () {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents/');
          var studentobj = $firebaseArray(ref);
          return studentobj;                          
        },

        verifySchool: function (school) {
          var id = school.$id;
          var ref = new Firebase(FIREBASE_URL + 'profileForSchools' + '/' + school.$id + '/');
          if((school.privilege=="access_denied")){
            ref.update({ privilege: "approved" });
          }
          var reflist = new Firebase(FIREBASE_URL + 'SchoolList' + '/');
          var refset = new Firebase(FIREBASE_URL + 'SchoolList' + '/' + school.$id + '/');
          var reflistObj = $firebaseArray(reflist);         
            reflistObj.$loaded(reflistObj).then(function(reflistObj) { 
              console.log(reflistObj.length);
              var schoolString = school.schoolname + ' ,' + school.schooladdress + ' ,' + school.schoolcity + ' ' + school.schoolzipcode; 
              var Schoollen = reflistObj.length + 1;
              ref.update({schoolCode:"SCHOOL" +Schoollen});
              new Firebase(FIREBASE_URL + 'SchoolList' + '/' + Schoollen).set(schoolString);    
            });
        },

        getSchools : function () {
          var ref = new Firebase(FIREBASE_URL + 'profileForSchools/');
          var schoolobj = $firebaseArray(ref);
          return schoolobj;                          
        },

        getActionTaken : function (collegeurl,studenturl) {
          var ref = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail/' + collegeurl + '/' + studenturl + '/ActionTaken');
          var actionobj = $firebaseObject(ref);
          return actionobj;
                          
        },

        getRejectedVideoUrl : function (collegeurl,studenturl) {
          var ref = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail/' + collegeurl + '/' + studenturl + '/studentFoundURL');
          var actionobj = $firebaseObject(ref);
          return actionobj;                         
        },

        changeRank: function (college, cid,$scope) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          //var sync = $firebase(ref);
          if(cid==null || cid > 2000)
            $scope.errorC= "Invalid Rank: Please Enter only numeric values between 1 to 2000";
            else         
            {
              ref.update({ cId: cid });
              $scope.errorC="";
            } 
        },    

        DeleteSessionFromCollege: function (collegeId, studentId, $scope) {
            var sessionsstatus = '';
            var sessionno = 999999999;
            var delSesFrmClg = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + studentId);
            var delSesFrmClgObj = $firebaseObject(delSesFrmClg);         
            delSesFrmClgObj.$loaded().then(function(data) {
                  if(typeof delSesFrmClgObj.sessiondate !== 'undefined') { 
                    var tempNodalCode =  delSesFrmClgObj.nodalId;
                    var temp = tempNodalCode.split("NODAL");
                    var nodalCode = "simplelogin:" + temp[1];
                    var sessionDate = delSesFrmClgObj.sessiondate;
                    var temp = sessionDate.split(' ');
                    var sessionMonth = temp[1];
                    if(delSesFrmClgObj.sessionVerificationStatus == "approved") {
                      $scope.deleteCheck = "";
                      $scope.sessionstatus = "approved";
                    }
                    else if(delSesFrmClgObj.sessionVerificationStatus == "pending") {
                      $scope.deleteCheck = "";
                      $scope.sessionstatus = "pending";
                    }
                    else if(delSesFrmClgObj.sessionVerificationStatus == "rejected") {
                      $scope.deleteCheck = "";
                      $scope.sessionstatus = "rejected";
                    }
                    else{                
                      if(delSesFrmClgObj.sessionVerificationStatus == 'rejected'){
                        var sessionsstatus = 'rejected';
                      }
                      else{
                            sessionsstatus = ''; 
                      }
                      var sessionNumberRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + studentId + '/sessionNumber');
                      var StudentSessionNumberObj = $firebaseObject(sessionNumberRef);
                      StudentSessionNumberObj.$loaded(function(StSessNum) {
                        var StudentSessionNumber = StSessNum.$value;
                        var currentSessionCountRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + '/currentSessionCount');
                        var currentSessionCountObj = $firebaseObject(currentSessionCountRef);
                        currentSessionCountObj.$loaded(function(currentSessionCount) {
                          var currSessCount = currentSessionCount.$value;
                          var newCurrentSessionCount = currSessCount - 1;
                          var sessionRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId );
                          sessionRef.orderByChild("sessionNumber").startAt(StudentSessionNumber+1).endAt(currSessCount).on("child_added", function(sessions) {
                            var newSessionNumber = ((sessions.val().sessionNumber)-1);
                            new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + sessions.val().studenturl + '/').update({sessionNumber:newSessionNumber});
                          });
                          new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId).update({currentSessionCount:newCurrentSessionCount});
                        });
                        (delSesFrmClg).remove(function() {
                          $scope.deleteSessionFlag = "Done";
                          $scope.deleteCheck="";
                          $scope.sessionstatus = "";
                          var sessionCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
                          var sync = $firebaseObject(sessionCountRef);
                          sync.$loaded(function(sync){
                            var sessionno =sync.sessionCount;
                            var feedbacknocount =sync.feedbacknotgivenCount;
                            var rejectednocount =sync.rejectedsessionCount;                                                                                                    
                            var sessionCountRef1 = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
                            if(sessionsstatus == 'rejected'){
                              sessionCountRef1.update({ sessionCount: sessionno - 1 });  
                               sessionCountRef1.update({ rejectedsessionCount: rejectednocount - 1 });  
                            }
                            else {
                             sessionCountRef1.update({ sessionCount: sessionno - 1 });  
                             sessionCountRef1.update({ feedbacknotgivenCount: feedbacknocount - 1 }); 
                            }
                          });
                        }), function(error) {
                           console.log("Error:", error);
                        };
                        AdminTask.DeleteSessionFromStudent($scope.collegeUid, $scope.student1Uid, nodalCode, sessionMonth, $scope);
                      });                    
                    }
                  }
                  else
                  {
                    $scope.sessionstatus = "";
                    $scope.deleteSessionFlag = "";
                    $scope.deleteCheck="Done";
                  }
            });
        },

        DeleteSessionFromStudent: function (collegeId, studentId, nodalCode, sessionMonth, $scope) {
            var delSesFrmStu = new Firebase(FIREBASE_URL + 'studentSessions/' + studentId + '/' + collegeId);
            var delSesFrmStuObj = $firebaseObject(delSesFrmStu);
            delSesFrmStuObj.$loaded().then(function(data) {
                 if(typeof delSesFrmStuObj.sessiondate !== 'undefined') {                                                
                      (delSesFrmStu).remove(function() {
                        AdminTask.DeleteSessionFromMonthlySession(collegeId, studentId, nodalCode, sessionMonth, $scope);
                        $scope.deleteCheck="";
                        $scope.deleteSessionFlag = "Done";
                       }), function(error) {
                        /* console.log("Error:", error);*/
                      };
                  }
                  else
                  {
                    $scope.deleteSessionFlag = "";
                    $scope.deleteCheck="Done";
                  }
            });
        },
        

        DeleteSessionFromMonthlySession : function (collegeId, studentId, nodalCode, sessionMonth, $scope) {
            var collegeMonthlySessionRef = new Firebase(FIREBASE_URL + "collegeSessionRecordMonthWise/2015/" +sessionMonth+ "/college/" +collegeId+ "/" +studentId);
            var collegeAllSessionRef = new Firebase(FIREBASE_URL + "collegeSessionRecordMonthWise/allSessions/" +collegeId+ "/" +studentId);
            var nodalMonthlySessionRef = new Firebase(FIREBASE_URL + "nodalSessionRecordMonthWise/2015/" +sessionMonth+ "/" +nodalCode+ "/college/" +collegeId+ "/" +studentId);
            var nodalAllSessionRef = new Firebase(FIREBASE_URL + "nodalSessionRecordMonthWise/allSessions/" +nodalCode+ "/" +collegeId+ "/" +studentId);
            collegeAllSessionRef.set(null);
            collegeMonthlySessionRef.set(null);
            nodalMonthlySessionRef.set(null);
            nodalAllSessionRef.set(null);
        },

        viewSessions: function () {
            var sessionDetailsRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail');
            var sessionDetailsObj = $firebaseObject(sessionDetailsRef);
            return sessionDetailsObj;
        },


        collegeShowWhenSessionPending : function () {
          var deferred = $q.defer();
          var flag = 0;
          var counter = 0;
          var length = 0;
          var pendingCollege = [];
           var sessionDetailsRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail');
            var sessionDetailsObj = $firebaseArray(sessionDetailsRef);
            sessionDetailsObj.$loaded(function(sessionDetailsObj){
              length = sessionDetailsObj.length;
              angular.forEach(sessionDetailsObj, function(value,key) {
                var collegeId = value.$id;
                var allvalue = value;
                var collegeDetailsRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail' + '/' + collegeId);
                var collegeDetailsObj = $firebaseArray(collegeDetailsRef);
                collegeDetailsObj.$loaded(function(collegeDetailsObj){
                  counter =counter+1;
                  var flag = 0;
                  angular.forEach(collegeDetailsObj, function(value,key) {
                    if((value.sessionVerificationStatus=="pending") && (flag !== 1))
                    {
                      flag=1;
                    }
                  })
                  if(flag == 1) {
                     pendingCollege = pendingCollege.concat([
                                        {
                                          values : allvalue
                                        },
                                      ]);
                     }
                  if(counter == length) {
                    deferred.resolve(pendingCollege);
                  }
                })
              })
           })
           return deferred.promise;
          },

          collegeShowWhenSessionRejected : function () {
                var deferred = $q.defer();
                var flag = 0;
                var counter = 0;
                var length = 0;
                var rejectedCollege = [];
                var sessionDetailsRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail');
                var sessionDetailsObj = $firebaseArray(sessionDetailsRef);
                sessionDetailsObj.$loaded(function(sessionDetailsObj){
                length = sessionDetailsObj.length;
                  angular.forEach(sessionDetailsObj, function(value,key) {
                            var collegeId = value.$id;
                            var allvalue = value;
                            var collegeDetailsRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail' + '/' + collegeId);
                            var collegeDetailsObj = $firebaseArray(collegeDetailsRef);
                                collegeDetailsObj.$loaded(function(collegeDetailsObj){
                                  counter =counter+1;
                                    var flag = 0;
                            angular.forEach(collegeDetailsObj, function(value,key) {
                                      if((value.sessionVerificationStatus=="rejected") && (flag !== 1))
                                        {
                                             flag=1;
                                          }
                          })
                        if(flag == 1) {
                          rejectedCollege = rejectedCollege.concat([
                                        {
                                          values : allvalue
                                        },
                                      ]);
                        }
                       if(counter == length) {
                          deferred.resolve(rejectedCollege);
                      }
                    })
                  })
              })
           return deferred.promise;
          },

        getAdminSessionDetails: function(id) {
          var adminSessionRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail/' +id);
          return $firebaseObject(adminSessionRef);
        },

        getCollegeSessionDetails: function(studentId,collegeId) {
          var deferred = $q.defer();
          var collegeSessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' +collegeId+ '/' +studentId);
          var collegeSessionObj = $firebaseObject(collegeSessionRef);
          collegeSessionObj.$loaded(function(collegeSessionObj){
            deferred.resolve(collegeSessionObj);
          })
          return deferred.promise;
        },

        getCollegeFeedbackDetails: function(studentId,collegeId) {
          var deferred = $q.defer();
          var collegeFeedbackRef = new Firebase(FIREBASE_URL + 'collegeFeedback/' +collegeId+ '/' +studentId);
          var collegeFeedbackObj = $firebaseObject(collegeFeedbackRef);
          collegeFeedbackObj.$loaded(function(collegeFeedbackObj){
            deferred.resolve(collegeFeedbackObj);
          })
          return deferred.promise;
        },

        updateApproveCount: function(collegeId,status) {
          var approvesessionCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/' );
          var approveobj = $firebaseObject(approvesessionCountRef);
          approveobj.$loaded(function(approveobj) {  
            var approvedsessionno =approveobj.approvesessionCount;
            var pendingsessionno =approveobj.pendingsessionCount;
            var rejectedsessionno =approveobj.rejectedsessionCount;  
            var approveCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
            if(status == 'pending'  ){
              approveCountRef.update({ approvesessionCount: approvedsessionno + 1 });
              approveCountRef.update({ pendingsessionCount: pendingsessionno - 1 }); 
            }
            else if(status == 'rejected' ){
              approveCountRef.update({ approvesessionCount: approvedsessionno + 1 });
              approveCountRef.update({ rejectedsessionCount: rejectedsessionno - 1 }); 
            }
            else{
            }
          });           
        },

        approveSession: function(action,hours,minutes,seconds,studenturl,collegeurl,videourl,couponCode,newVideoSrc,chatDiscussion, nextStep,status){
          var approveSessionRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail/'+collegeurl+"/"+studenturl);
          var approveClgSessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/'+collegeurl+'/'+studenturl);
          var sessionStatusApprovedRef = new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeurl + "/" + studenturl + '/studenturl');
          var sessionStatusPendingRef = new Firebase(FIREBASE_URL + "sessionStatus/pendingSessions/" + collegeurl + "/" + studenturl);
          var sessionStatusRejectedRef = new Firebase(FIREBASE_URL + "sessionStatus/rejectedSessions/" + collegeurl + "/" + studenturl);
          var approvedSessionsCountInSessionStatusObj = $firebaseObject(new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeurl + "/" + 'currentApprovedSessionCount'));
          var sessionNumberForApprovedSessionObj = $firebaseObject(new Firebase(FIREBASE_URL + 'collegeSessions/'+collegeurl+'/'+studenturl +'/sessionNumber'));
          var str = newVideoSrc;
          var data = str.split("/embed/");
          var videoId = data[1].split("?");

          var newvideourl = data[0]+ "/watch?v=" +videoId[0]+"&t="+hours+"h"+minutes+"m"+seconds+"s";
          approveSessionRef.update({ sessionVerificationStatus: "approved" , ActionTaken: action , videourl : videourl, studentFoundURL : newvideourl, chatDiscussion : chatDiscussion, nextStep : nextStep});
          approveClgSessionRef.update({ sessionVerificationStatus: "approved"}, function() {
          sessionStatusPendingRef.set(null);
          sessionStatusRejectedRef.set(null);
          approvedSessionsCountInSessionStatusObj.$loaded(function(approvedSessionsCountInSessionStatus){
            (new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeurl + "/" + 'currentApprovedSessionCount')).set(approvedSessionsCountInSessionStatus.$value + 1);
          });
            sessionStatusApprovedRef.set(studenturl);
            sessionNumberForApprovedSessionObj.$loaded(function(sessionNumberForApprovedSession){
                (new Firebase(FIREBASE_URL + "sessionStatus/approvedSessions/" + collegeurl + "/" + studenturl + '/sessionNumber')).set(sessionNumberForApprovedSession.$value);
            });


            AdminTask.updateApproveCount(collegeurl,status);            
            var sessionCouponAmount = 100;
            var referralCouponAmount = 100;
            var referredByRef = new Firebase(FIREBASE_URL + "profileForStudents/" +studenturl+ "/referredBy");
            var referredByObj = $firebaseObject(referredByRef);
            referredByObj.$loaded( function () {

                                          /*condition When referredBy field doesnot exists*/                                                        

              if (referredByObj.$value == null) {
              } 

                                          /*condition When referredBy is nobody*/              

              else if (referredByObj.$value == "nobody") { 
                var approvedSessionsCount = 0;
                var loopCounter = 0;
                var studentSessionRef = new Firebase(FIREBASE_URL + 'studentSessions/' +studenturl);
                var studentSessionArr = $firebaseArray(studentSessionRef);
                studentSessionArr.$loaded( function () {
                  var arrayLength = (studentSessionArr.length);
                  angular.forEach(studentSessionArr, function(value,key) {
                    var collegeId = value.$id;
                    if(value.$id !== "totalIncentiveForSessions") {
                      var collegeSessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' +collegeId+ '/' +studenturl);
                      var collegeSessionObj =  $firebaseObject(collegeSessionRef);
                      collegeSessionObj.$loaded( function(){
                        loopCounter = loopCounter + 1;
                        if(collegeSessionObj.sessionVerificationStatus === "approved") {
                          approvedSessionsCount = approvedSessionsCount + 1;                              
                        }
                        if((loopCounter === arrayLength) && ((approvedSessionsCount < 50) || (approvedSessionsCount == 50))) {
                          AdminTask.incentifyForSessions(studenturl,collegeurl,couponCode,sessionCouponAmount,referredByObj.$value);
                        }
                      })
                    } 
                  })
                })        
              } 

                                          /*condition When referredBy is somebody*/              

              else
              {
                var approvedSessionsCount = 0;
                var loopCounter = 0;
                if(angular.isNumber(referredByObj.$value)) {
                  var simlog = "simplelogin:"+referredByObj.$value;
                  var validStudentIdRef = new Firebase(FIREBASE_URL + 'profileForStudents/'+simlog+ "/profiletype");
                  var validStudentIdObj = $firebaseObject(validStudentIdRef);
                  validStudentIdObj.$loaded( function() {
                    if(validStudentIdObj.$value !== null && validStudentIdObj.$value == "student") {
                      var studentSessionRef = new Firebase(FIREBASE_URL + 'studentSessions/' +studenturl);
                      var studentSessionArr = $firebaseArray(studentSessionRef);
                      studentSessionArr.$loaded( function () {
                        var arrayLength = (studentSessionArr.length);
                        angular.forEach(studentSessionArr, function(value,key) {
                          var collegeId = value.$id;
                          if(value.$id !== "totalIncentiveForSessions") {
                            var collegeSessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/' +collegeId+ '/' +studenturl);
                            var collegeSessionObj =  $firebaseObject(collegeSessionRef);
                            collegeSessionObj.$loaded( function(){
                              loopCounter = loopCounter + 1;
                              if(collegeSessionObj.sessionVerificationStatus === "approved") {
                                approvedSessionsCount = approvedSessionsCount + 1;                              
                              }
                              if((loopCounter === arrayLength) && (approvedSessionsCount === 3) && (approvedSessionsCount !== 0)) {
                                AdminTask.incentifyForReferrals(studenturl,collegeurl,couponCode,referralCouponAmount,sessionCouponAmount,referredByObj.$value);
                              } 
                              else if((loopCounter === arrayLength) && (approvedSessionsCount !== 3) && (approvedSessionsCount !== 0) && ((approvedSessionsCount < 50) || (approvedSessionsCount == 50))) {
                                AdminTask.incentifyForSessions(studenturl,collegeurl,couponCode,sessionCouponAmount,referredByObj.$value);
                              }
                            });
                          }
                        });
                      });                  
                    }
                  });
                }
              };
            });
          });
        },
        
        incentifyForSessions: function(studenturl,collegeurl,couponCode,sessionCouponAmount,referredBy) {
          AdminTask.generateCouponForSessions(studenturl,collegeurl,couponCode,sessionCouponAmount,referredBy);
        },

        incentifyForReferrals: function(studenturl,collegeurl,couponCode,referralCouponAmount,sessionCouponAmount,referredBy) {
          var referredById = "simplelogin:" +referredBy;
          var referredByIdRef = new Firebase(FIREBASE_URL + "profileForStudents/" +studenturl+ "/referredBy");
          var referredByIdObj = $firebaseObject(referredByIdRef);
          referredByIdObj.$loaded( function () {
            if(referredByIdObj.$value !== null) {
              AdminTask.generateCouponForReferrals(studenturl,collegeurl,couponCode,referralCouponAmount,sessionCouponAmount,referredByIdObj.$value);                  
            }
            else {
            }
          });
        },

        generateCouponForSessions : function (studenturl,collegeurl,couponCode,sessionCouponAmount,referredBy) {
          var incentiveSchemeRef = new Firebase(FIREBASE_URL + "incentiveScheme/incentivePlan/couponTable/" + couponCode);
          incentiveSchemeRef.update({sessionIncentive:sessionCouponAmount , studenturl: studenturl , validity : "not used" , incentiveType : "session" , referredBy: referredBy},
            AdminTask.awardCoupon(studenturl,collegeurl,couponCode,sessionCouponAmount,0,referredBy));
        },

        generateCouponForReferrals : function (studenturl,collegeurl,couponCode,referralCouponAmount,sessionCouponAmount,referredBy) {
          var incentiveSchemeRef = new Firebase(FIREBASE_URL + "incentiveScheme/incentivePlan/couponTable/" + couponCode);
          incentiveSchemeRef.update({sessionIncentive:sessionCouponAmount , referralIncentive:referralCouponAmount , studenturl: studenturl , validity : "not used" , incentiveType : "session_referral" , referredBy: referredBy},
            AdminTask.awardCoupon(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,referredBy));
        },

        awardCoupon: function(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,referredBy) {
          var couponTableRef = new Firebase(FIREBASE_URL + "incentiveScheme/incentivePlan/couponTable/" +couponCode);
          var couponTableObj = $firebaseObject(couponTableRef);
          couponTableObj.$loaded( function() {
            if( couponTableObj.$value !== null && couponTableObj.incentiveType == "session") {
              AdminTask.awardCouponBasedOnSession(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,couponTableObj.sessionIncentive,couponTableObj.validity);
            }
            else if(couponTableObj.$value !== null && couponTableObj.incentiveType == "session_referral") {
              AdminTask.awardCouponBasedOnReferral(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,couponTableObj.referralIncentive,couponTableObj.sessionIncentive,couponTableObj.validity,referredBy);
            }
          })
        },


        awardCouponBasedOnSession: function(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,sessionIncentive,couponValidity) {
          if(sessionIncentive == sessionCouponAmount) {
            if(couponValidity == "not used") {
              var stuIncentiveDetailBasedOnSessionRef = new Firebase(FIREBASE_URL + "incentiveScheme/studentIncentiveDetail/basedOnSessions/" + studenturl + "/" + collegeurl);
              stuIncentiveDetailBasedOnSessionRef.update({couponCode: couponCode , addingAmount : sessionCouponAmount }, function(){
                var stuBalanceRef = new Firebase(FIREBASE_URL + "incentiveScheme/studentIncentiveDetail/basedOnSessions/" + studenturl + "/totalIncentiveForSessions");
                var stuBalanceObj = $firebaseObject(stuBalanceRef);
                var newBalanceRef = new Firebase(FIREBASE_URL + "incentiveScheme/studentIncentiveDetail/basedOnSessions/" + studenturl);
                stuBalanceObj.$loaded( function () {
                  if (stuBalanceObj.$value == null) {
                    newBalanceRef.update({ totalIncentiveForSessions: sessionCouponAmount},
                      AdminTask.updateSessionAwardInStudentForge(studenturl,collegeurl,sessionCouponAmount));
                  } 
                  else { 
                    var newBalance = stuBalanceObj.$value + sessionCouponAmount;
                    newBalanceRef.update({ totalIncentiveForSessions: newBalance},
                      AdminTask.updateSessionAwardInStudentForge(studenturl,collegeurl,sessionCouponAmount,couponCode));
                  }
                })
              })
            }
            else if(couponValidity == "used") {
              AdminTask.somethingWentWrongSendMailToAdmin(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,"Coupon already used");
            }
          }
          else {
            AdminTask.somethingWentWrongSendMailToAdmin(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,"Default Amount conflicts with the saved value in database");
          }
        },


        awardCouponBasedOnReferral: function(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,referralIncentive,sessionIncentive,couponValidity,referredBy) {
          if(referralIncentive == referralCouponAmount) {
            if(couponValidity == "not used") {
              var stuIncentiveDetailBasedOnReferralRef = new Firebase(FIREBASE_URL + "incentiveScheme/studentIncentiveDetail/basedOnSessionReferral/" + studenturl + "/" + collegeurl);
              stuIncentiveDetailBasedOnReferralRef.update({couponCode: couponCode , addingAmount : referralCouponAmount }, function(){
                var stuBalanceRef = new Firebase(FIREBASE_URL + "incentiveScheme/studentIncentiveDetail/basedOnSessionReferral/" + studenturl + "/totalIncentiveForReferral");
                var stuBalanceObj = $firebaseObject(stuBalanceRef);
                var newBalanceRef = new Firebase(FIREBASE_URL + "incentiveScheme/studentIncentiveDetail/basedOnSessionReferral/" + studenturl);
                stuBalanceObj.$loaded( function () {
                  if (stuBalanceObj.$value == null) {
                    newBalanceRef.update({ totalIncentiveForReferral: referralCouponAmount},
                      AdminTask.updateReferralAwardInStudentForge(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,referredBy));
                  } 
                  else { 
                    var newBalance = stuBalanceObj.$value + referralCouponAmount;
                    newBalanceRef.update({ totalIncentiveForReferral: newBalance},
                      AdminTask.updateReferralAwardInStudentForge(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,referredBy));
                  }
                })
              })
              AdminTask.awardCouponBasedOnSession(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,sessionIncentive,couponValidity);
            }
            else if(couponValidity == "used") {
              AdminTask.somethingWentWrongSendMailToAdmin(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,"Coupon already used");
            }
          }
          else {
            AdminTask.somethingWentWrongSendMailToAdmin(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,"Default Amount conflicts with the saved value in database");
          }
        },



        updateSessionAwardInStudentForge: function(studenturl,collegeurl,sessionCouponAmount,couponCode) {
          var sessionIncentiveRef = new Firebase(FIREBASE_URL + "studentSessions/" + studenturl + "/" + collegeurl + "/incentiveAmountPerSession");
          sessionIncentiveRef.update({ addingAmount : sessionCouponAmount });
          var totalIncentiveForSessionsRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studenturl + "/totalIncentiveForSessions");
          var totalIncentiveForSessionsObj = $firebaseObject(totalIncentiveForSessionsRef);
          var sessionsRef = new Firebase(FIREBASE_URL + "profileForStudents/" + studenturl);
          totalIncentiveForSessionsObj.$loaded( function() {
            if(totalIncentiveForSessionsObj.$value == null) {
              sessionsRef.update({ totalIncentiveForSessions : sessionCouponAmount },
                AdminTask.updateCouponValidity(studenturl,collegeurl,couponCode,sessionCouponAmount,0));
            }
            else if(totalIncentiveForSessionsObj.$value !== null) {
              var newAmount = totalIncentiveForSessionsObj.$value + sessionCouponAmount;
              sessionsRef.update({ totalIncentiveForSessions : newAmount },
                AdminTask.updateCouponValidity(studenturl,collegeurl,couponCode,sessionCouponAmount,0));
            }
          })
        },

        updateReferralAwardInStudentForge: function(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,referredBy) {
          var referringStudent = "simplelogin:" + referredBy;
          var referralIncentiveRef = new Firebase(FIREBASE_URL + "profileForStudents/" + referringStudent + "/referralIncentive/referredStudentsDetail/" + studenturl);
          referralIncentiveRef.update({ addingAmount : referralCouponAmount });
          var totalIncentiveForReferralRef = new Firebase(FIREBASE_URL + "profileForStudents/" + referringStudent + "/referralIncentive/totalIncentiveForReferral");
          var totalIncentiveForReferralObj = $firebaseObject(totalIncentiveForReferralRef);
          var referralRef = new Firebase(FIREBASE_URL + "profileForStudents/" + referringStudent + "/referralIncentive");
          totalIncentiveForReferralObj.$loaded( function() {
            if(totalIncentiveForReferralObj.$value == null) {
              referralRef.update({ totalIncentiveForReferral : referralCouponAmount }, function() { 
                AdminTask.updateThreeApprovedSessionsStatus(studenturl,referredBy);
              })
            }
            else {
              var newAmount = totalIncentiveForReferralObj.$value + referralCouponAmount;
              referralRef.update({ totalIncentiveForReferral : newAmount }, function() { 
                AdminTask.updateThreeApprovedSessionsStatus(studenturl,referringStudent);
              })
            }
          })
        },

        updateCouponValidity: function(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount) {
          var couponCodeRef = new Firebase(FIREBASE_URL + "incentiveScheme/incentivePlan/couponTable/" + couponCode); 
          var couponCodeObj = $firebaseObject(couponCodeRef);
          couponCodeObj.$loaded( function () {
            if(couponCodeObj.validity == "not used") {
              couponCodeRef.update({ validity : "used" });
            }
            else if(couponCodeObj.validity == "used"){
              couponCodeRef.update({ validity : "blacklist" });
              AdminTask.somethingWentWrongSendMailToAdmin(studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,"Coupon already used");
            }
          })  
        },

        somethingWentWrongSendMailToAdmin: function (studenturl,collegeurl,couponCode,sessionCouponAmount,referralCouponAmount,issue) {
          if(issue === "Default Amount conflicts with the saved value in database") {
            var dataToPost = {
                                clgurl: collegeurl, 
                                stdurl: studenturl,
                                coupCode : couponCode,
                                sessionCouponAmt : sessionCouponAmount  
                              };
            $http({
            url: "/couponAmountConflictInDatabase", 
            method: "GET",
            params: {   
                        collegeurl: dataToPost.clgurl,
                        studenturl : dataToPost.stdurl,
                        couponCode : dataToPost.coupCode,
                        sessionCouponAmount : dataToPost.sessionCouponAmt
                    }
            }).success(function(serverResponse) {
                console.log(serverResponse);
            }).error(function(serverResponse) {
                console.log(serverResponse);
            });
          } 
          else if(issue === "Coupon already used") {
            var dataToPost = {
                                clgurl: collegeurl, 
                                stdurl: studenturl,
                                coupCode : couponCode,
                                sessionCouponAmt : sessionCouponAmount  
                              };
            $http({
            url: "/couponIsAlreadyUsed", 
            method: "GET",
            params: {   
                        collegeurl: dataToPost.clgurl,
                        studenturl : dataToPost.stdurl,
                        couponCode : dataToPost.coupCode,
                        sessionCouponAmount : dataToPost.sessionCouponAmt
                    }
            }).success(function(serverResponse) { 
                console.log(serverResponse);
            }).error(function(serverResponse) {
                console.log(serverResponse);
            });
          }
        },

        updateThreeApprovedSessionsStatus : function(studenturl,referredBy) {
          var referredBySimLog = "simplelogin:" +referredBy;
          var referredByRef = new Firebase(FIREBASE_URL + "profileForStudents/" +referredBySimLog+ "/acceptedInvites/");
          //var referredBySync =  $firebase(referredByRef);
          var statusRef = new Firebase(FIREBASE_URL + "profileForStudents/" +referredBySimLog+ "/acceptedInvites/" +studenturl);
          var statusObj = $firebaseObject(statusRef);
          statusObj.$loaded(function() {
            if(statusObj.$value === 'Not Done') {
              referredByRef.set("done");
            }
          })
        },

        updateRejectCount: function(collegeId) {
          var approvesessionCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/' );
          var approveobj = $firebaseObject(approvesessionCountRef);
          approveobj.$loaded(function(approveobj){
            var pendingsessionno =approveobj.pendingsessionCount;
            var rejectedsessionno =approveobj.rejectedsessionCount;  
            var approveCountRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/');
            approveCountRef.update({ pendingsessionCount: pendingsessionno - 1 });
            approveCountRef.update({ rejectedsessionCount: rejectedsessionno + 1 }); 
          });           
        },

        rejectSession: function(action,hours,minutes,seconds,studenturl,collegeurl,videourl,chatDiscussion, nextStep){
          var rejectSessionRef = new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail/'+collegeurl+"/"+studenturl);
          var rejectClgSessionRef = new Firebase(FIREBASE_URL + 'collegeSessions/'+collegeurl+'/'+studenturl);
          var newvideourl = videourl+"&t="+hours+"h"+minutes+"m"+seconds+"s";
          rejectSessionRef.update({ sessionVerificationStatus: "rejected" , ActionTaken: action , videourl : videourl, studentFoundURL : newvideourl, chatDiscussion : chatDiscussion, nextStep : nextStep});
          rejectClgSessionRef.update({ sessionVerificationStatus: "rejected"});
          var sessionStatusRejectedRef = new Firebase(FIREBASE_URL + "sessionStatus/rejectedSessions/" + collegeurl + "/" + studenturl);
          var sessionStatusPendingRef = new Firebase(FIREBASE_URL + "sessionStatus/pendingSessions/" + collegeurl + "/" + studenturl);
          sessionStatusPendingRef.set(null);
          sessionStatusRejectedRef.set(studenturl);
          AdminTask.updateRejectCount(collegeurl);
        },

        getSessionDetail: function(collegeId,studentId) {
          var deferred = $q.defer();
          var sesionRef = new Firebase(FIREBASE_URL+ "collegeFeedback/" + collegeId + "/" + studentId);
          var sessionObj = $firebaseObject(sesionRef);
          sessionObj.$loaded(function(sessionObj) {
            deferred.resolve(sessionObj);
          })
          return deferred.promise; 
        },

        getActionTakenForApprovedSessions: function(collegeId,studentId)  {
          var deferred = $q.defer();
          var ActionTakenRef = new Firebase(FIREBASE_URL+ "admin/QualityAssurance/sessionDetail/" +collegeId+ "/" + studentId+ "/ActionTaken");
          var ActionTakenObj = $firebaseObject(ActionTakenRef);
          ActionTakenObj.$loaded(function(ActionTakenObj) {
            deferred.resolve(ActionTakenObj);
          })
          return deferred.promise; 
        },

        getReferredStudentsByNodal : function(NodalAdminUid) {
          var NodalReferredStudentsRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + NodalAdminUid + '/studentsRegistered/');
         /* console.log($firebase(NodalReferredStudentsRef).$asArray());*/
          return $firebaseArray(NodalReferredStudentsRef);
        },

        getStudentSessionDetail : function(studentId) {
          var deferred = $q.defer();
          //console.log(studentId);
          var studentSessionRef = new Firebase(FIREBASE_URL + 'studentSessions/' + studentId);
          var sessions = $firebaseArray(studentSessionRef);
          //console.log(sessions);
          sessions.$loaded(function() {
            deferred.resolve(sessions);
          })
          return deferred.promise;
        },
        
        getStudentSessionDetailBeforeEnrollment : function(studentId,currentuser) {
          var deferred = $q.defer();
          var sessionsTillDateRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + currentuser + '/studentsRegistered/'  + studentId + "/numberOfSessionsTillDate/");
         /* console.log(sessionsTillDateRef);*/
          var sessionsTillDate = $firebaseObject(sessionsTillDateRef);
          return sessionsTillDate;
        },

        getTotalStudentReferral : function(studentId) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId + '/referralIncentive/referredStudentsDetail/');
          var referredStuentArr = $firebaseArray(ref);
         /* console.log(referredStuentArr);*/
          return referredStuentArr;
        },
        
        getCollegeListOfDemoStudent : function($scope) {
              $scope.sessionCountObj = [];
              var ref = $firebaseObject(new Firebase(FIREBASE_URL + 'studentSessions' + '/' + 'simplelogin:41' + '/'));
              ref.$loaded(function () {
              angular.forEach(ref,function(key,value){
                $scope.sessionCountObj[key.collegeurlId] = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + value + '/sessionCount'));
                var collegename = Search.getCollegeName(value);
                collegename.$loaded(function(clgname){
                  //console.log(clgname);
                  $scope.collegeList = $scope.collegeList.concat([
                                                  { collegeId : value,
                                                    collegeurlId : key.collegeurlId,
                                                     displayCheck : '0',
                                                      name : clgname.$value
                                                  },
                                                  ]);
                });
              });
            });
        },


        
        deleteDemoStudent : function(collegeId,id,$scope) {
          var delSesFrmClg = new Firebase(FIREBASE_URL + 'collegeSessions/' + collegeId + '/' + 'simplelogin:41');
            var delSesFrmClgObj = $firebaseObject(delSesFrmClg);         
            delSesFrmClgObj.$loaded().then(function(data) {
                  if(typeof delSesFrmClgObj.sessiondate !== 'undefined') { 
                    var tempNodalCode =  delSesFrmClgObj.nodalId;
                    var temp = tempNodalCode.split("NODAL");
                    var nodalCode = "simplelogin:" + temp[1];
                    var sessionDate = delSesFrmClgObj.sessiondate;
                    var temp = sessionDate.split(' ');
                    var sessionMonth = temp[1];
                    AdminTask.DeleteSessionFromMonthlySession(collegeId, 'simplelogin:41', nodalCode, sessionMonth, $scope);  
                  }
                });  
          

          (new Firebase(FIREBASE_URL + 'studentSessions' + '/' + 'simplelogin:41' + '/' + collegeId)).set(null);
          (new Firebase(FIREBASE_URL + 'studentFeedback' + '/' + 'simplelogin:41' + '/' + collegeId)).set(null);
          (new Firebase(FIREBASE_URL + 'admin/QualityAssurance/sessionDetail' + '/' + collegeId + '/simplelogin:41')).set(null);

                              /* For updating sessionObjectCount in collge forge*/
          
          var sessionCountObj = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' + 'sessionCount'));
          sessionCountObj.$loaded(function(sessionCountObj) {
            var collegeRef1 = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' );
            collegeRef1.update({ sessionCount: sessionCountObj.$value - 1});
          });
         
                              /*for pendingSessionCount update in college forge*/
          
          var pendingRef = (new Firebase(FIREBASE_URL + 'sessionStatus' + '/' + 'pendingSessions' + '/' + collegeId));
          pendingRef.child('simplelogin:41').once('value', function(snapshot) {
            if(snapshot.val() !== null) {
              (new Firebase(FIREBASE_URL+ "sessionStatus/pendingSessions/" + collegeId + "/" + 'simplelogin:41')).set(null);
              var pendingsessionCountObj = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' + 'pendingsessionCount'));
              pendingsessionCountObj.$loaded(function(pendingsessionCountObj){
                if(pendingsessionCountObj.$value !== 0) {
                  var collegeRef = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' );
                  collegeRef.update({ pendingsessionCount: pendingsessionCountObj.$value - 1});
                }
              });
            }
          });

                                  /*for feedbacknotgivencount update in college forge*/

          var feedbacknotgivenRef = (new Firebase(FIREBASE_URL + 'collegeSessions' + '/' + collegeId + '/simplelogin:41'));
          feedbacknotgivenRef.child('sessionVerificationStatus').once('value', function(snapshot) {
               if(snapshot.val() === null) {
                var feedbackNotGivenCountObj = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' + 'feedbacknotgivenCount'));
                feedbackNotGivenCountObj.$loaded(function(feedbackNotGivenCountObj) {
                    if(feedbackNotGivenCountObj.$value !== 0) {
                        var collegeRef = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' );
                        collegeRef.update({ feedbacknotgivenCount: feedbackNotGivenCountObj.$value - 1});
                    }
                });
              }
          });

                                      /*for approvedSessionCount update in college forge*/
          
          var approvedRef = (new Firebase(FIREBASE_URL + 'sessionStatus' + '/' + 'approvedSessions' + '/' + collegeId));
          approvedRef.child('simplelogin:41').once('value', function(snapshot) {
               if(snapshot.val() !== null) {
                (new Firebase(FIREBASE_URL+ "sessionStatus/approvedSessions/" + collegeId + "/" + 'simplelogin:41')).set(null);
                var approvedSessionCountObj = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' + 'approvesessionCount'));
                approvedSessionCountObj.$loaded(function(approvedSessionCount) {
                    if(approvedSessionCount.$value !== 0) {
                      var collegeRef = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' );
                      collegeRef.update({ approvesessionCount: approvedSessionCount.$value - 1});
                    }
                });
              }
          });

                            /*for rejectedSessionCount update in college forge*/
          
          var rejectedRef = (new Firebase(FIREBASE_URL + 'sessionStatus' + '/' + 'rejectedSessions' + '/' + collegeId));
          rejectedRef.child('simplelogin:41').once('value', function(snapshot) {
               if(snapshot.val() !== null) {
                (new Firebase(FIREBASE_URL+ "sessionStatus/rejectedSessions/" + collegeId + "/" + 'simplelogin:41')).set(null);
                var rejectedSessionCountObj = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' + 'rejectedsessionCount'));
                rejectedSessionCountObj.$loaded(function(rejectedSessionCountObj) {
                    if(rejectedSessionCountObj.$value !== 0) {
                        var collegeRef = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + collegeId + '/' );
                        collegeRef.update({ rejectedsessionCount: rejectedSessionCountObj.$value - 1});
                    }
                });
              }
          });
          
                            /*Updating SessionNUmber and CurrentSessionCount*/

          var sessionNumberRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + 'simplelogin:41/sessionNumber');
          var demoStudentSessionNumberObj = $firebaseObject(sessionNumberRef);
          demoStudentSessionNumberObj.$loaded(function(demoStSessNum) {
            var demoStudentSessionNumber = demoStSessNum.$value;
            var currentSessionCountRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + '/currentSessionCount');
            var currentSessionCountObj = $firebaseObject(currentSessionCountRef);
            currentSessionCountObj.$loaded(function(currentSessionCount) {
              var currSessCount = currentSessionCount.$value;
              var newCurrentSessionCount = currSessCount - 1;
              var sessionRef = new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId );
              sessionRef.orderByChild("sessionNumber").startAt(demoStudentSessionNumber+1).endAt(currSessCount).on("child_added", function(sessions) {
                var newSessionNumber = ((sessions.val().sessionNumber)-1);
                new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + sessions.val().studenturl + '/').update({sessionNumber:newSessionNumber});
              });
              new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId).update({currentSessionCount:newCurrentSessionCount});
            });
            new Firebase(FIREBASE_URL + "collegeSessions/" + collegeId + "/" + 'simplelogin:41').set(null);
          });

          


                            /*Updating FeedbackNUmber and CurrentFeedbackCount*/

          var feedbackNumberRef = new Firebase(FIREBASE_URL + "collegeFeedback/" + collegeId + "/" + 'simplelogin:41/feedbackNumber');
          var demoStudentFeedbackNumberObj = $firebaseObject(feedbackNumberRef);
          demoStudentFeedbackNumberObj.$loaded(function(demoStFeedNum) {
            var demoStudentFeedbackNumber = demoStFeedNum.$value;
            var currentFeedbackCountRef = new Firebase(FIREBASE_URL + "collegeFeedback/" + collegeId + '/currentFeedbackCount');
            var currentFeedbackCountObj = $firebaseObject(currentFeedbackCountRef);
            currentFeedbackCountObj.$loaded(function(currentFeedbackCount) {
              var currFeedCount = currentFeedbackCount.$value;
              var newCurrentFeedbackCount = currFeedCount - 1;
              var feedbackRef = new Firebase(FIREBASE_URL + "collegeFeedback/" + collegeId );
              feedbackRef.orderByChild("feedbackNumber").startAt(demoStudentFeedbackNumber+1).endAt(currFeedCount).on("child_added", function(Feedback) {
                var newFeedbackNumber = ((Feedback.val().feedbackNumber)-1);
                new Firebase(FIREBASE_URL + "collegeFeedback/" + collegeId + "/" + Feedback.val().studenturl + '/').update({feedbackNumber:newFeedbackNumber});
              });
              new Firebase(FIREBASE_URL + "collegeFeedback/" + collegeId).update({currentFeedbackCount:newCurrentFeedbackCount});
            });
            new Firebase(FIREBASE_URL + "collegeFeedback/" + collegeId + "/" + 'simplelogin:41').set(null);
          });
          $scope.collegeList[id].displayCheck = 1;
        },

        getStudentReferralBeforeEnrollment : function(studentId,currentuser) {
          var ref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + currentuser + '/studentsRegistered/' + studentId + "/allreadyRefferdStudent/");
          var alreadyReferredStuentArr = $firebaseObject(ref);
         /* console.log(alreadyReferredStuentArr);*/
          return alreadyReferredStuentArr;
        },


        getNodalDetails : function($scope) {
          $scope.nodalList = [];
          var nodalCentre = $firebaseObject(new Firebase(FIREBASE_URL + '/admin/nodaladminUsers'));
          nodalCentre.$loaded(function(nodals) {
             angular.forEach(nodals, function(value,key) {
              var name = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForNodalAdmins/' + key +'/nodalCenterName'));
              var privilege = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForNodalAdmins/' + key +'/privilege'));
                 name.$loaded(function(name) {
                    privilege.$loaded(function (privilege) {
                      if(privilege.$value === 'approved')
                       $scope.nodalList = $scope.nodalList.concat([{id:key,name :name.$value}]);
                    });
                 });
              });
             $scope.nodalLoadingMessage = 'Select nodal centre';
             $scope.$evalAsync();
          })
        },

        getCollegeListDetails : function($scope) {
          $scope.collegeListForNodal = [];
          var colleges = $firebaseObject(new Firebase(FIREBASE_URL + '/admin/collegeUsers'));
          colleges.$loaded(function(colleges) {
             angular.forEach(colleges, function(value,key) {
              var name = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForCollege/' + key +'/collegename'));
              var privilege = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForCollege/' + key +'/verifiedcollege'));
                 name.$loaded(function(name) {
                    privilege.$loaded(function (privilege) {
                      if(privilege.$value === 'verified')
                       $scope.collegeListForNodal = $scope.collegeListForNodal.concat([{
                                                                                        id:key,
                                                                                        name :name.$value
                                                                                      }]);
                    });
                 });
              });
             $scope.collegeLoadingMessage = 'Select college';
             $scope.selectYear = 'Select Year';
             $scope.selectMonth = 'Select Month';
             $scope.$evalAsync();
          })
        },

        getMonthlySession : function(month,year,$scope) {
          $scope.lengthForSpinner = 0;
          $scope.temp = 0;
          $scope.notFountMessage = null;

          if(typeof month!=="undefined" && month !=='ALL') {
            $scope.sessionDetailForMonthlySession = [];
            var studentArray = $firebaseArray(new Firebase(FIREBASE_URL + '/collegeSessionRecordMonthWise/' + year + "/" +  month + '/college'));
            studentArray.$loaded(function(collegeList) {
              if(studentArray.length === 0) {
                $scope.spinner = false;
                $scope.notFountMessage = "No Record found in " + month;
              }
              angular.forEach(collegeList, function(value,key1){
                 $scope.notFountMessage = '';
                angular.forEach(value, function(id,key) {
                  AdminTask.loadSessionDetails(id,value.$id,$scope);
                });
                if($scope.lengthForSpinner === $scope.sessionDetailForMonthlySession.length) {
                                 $scope.spinner = false; 
                  }

                $scope.$evalAsync();
              });
            });
          }
          if(month === 'ALL') {
            $scope.notFountMessage = null;
            $scope.$evalAsync();
            $scope.sessionDetailForMonthlySession = [];
               var allSession = $firebaseObject(new Firebase(FIREBASE_URL+ 'collegeSessionRecordMonthWise/allSessions/'));
                      allSession.$loaded(function(allSession) {
                        angular.forEach(allSession,function(value,key1) {
                          angular.forEach(value,function(studentRecord,id){
                            $scope.temp = $scope.temp + 1;
                             AdminTask.loadSessionDetails(studentRecord,key1,$scope);
                          });
                          if($scope.lengthForSpinner === $scope.sessionDetailForMonthlySession.length) {
                                 $scope.spinner = false; 
                              }
                           $scope.$evalAsync();

                        });
                      });
                     
                  }
        },


        getSelectedCollege : function(collegeurl,$scope) {
          $scope.studentListForNodal = [];
          $scope.nodalList = [];
          var studentRef = (new Firebase(FIREBASE_URL + '/collegeSessions/' + collegeurl));
          studentRef.orderByKey().on("value", function(snapshot) {
            snapshot.forEach(function(data) {
            });
          });
        },
        loadSessionDetails : function(id,collegeurl,$scope) {
          if(id !== null && id !== collegeurl) {
            var sessionDate = $firebaseObject(new Firebase(FIREBASE_URL + '/collegeSessions/' + collegeurl + "/" + id.studenturl + "/" + 'sessiondate'));
            var sessionQuery = $firebaseObject(new Firebase(FIREBASE_URL + '/collegeSessions/' + collegeurl + "/" + id.studenturl + "/" + 'studentquery'));
            var studentName = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForStudents/' + id.studenturl + "/" + 'studentname'));
            var studentEmail = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForStudents/' + id.studenturl + "/" + 'email'));
            var collegeName = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForCollege/' + collegeurl + "/" + 'collegename'));
            var nodalName = $firebaseObject(new Firebase(FIREBASE_URL + '/profileForNodalAdmins/' + id.nodalurl + "/" + 'nodalCenterName'));
            var sessionStatus = $firebaseObject(new Firebase(FIREBASE_URL + '/collegeSessions/' + collegeurl + "/" + id.studenturl + "/" + 'sessionVerificationStatus'));
            studentName.$loaded(function(studentName) {
              studentEmail.$loaded(function(studentEmail) {
                collegeName.$loaded(function(collegeName) {
                  nodalName.$loaded(function(nodalName) {
                    sessionDate.$loaded(function(sessionDate) {
                      sessionQuery.$loaded(function(sessionQuery) {
                        nodalName.$loaded(function(nodalName) {
                          sessionStatus.$loaded(function(sessionStatus) {
                            $scope.sessionDetailForMonthlySession = 
                              $scope.sessionDetailForMonthlySession.concat([{
                                      studentname : studentName.$value,
                                      studentemail : studentEmail.$value,
                                      collegename : collegeName.$value,
                                      sessiondate : sessionDate.$value,
                                      sessionquery : sessionQuery.$value,
                                      nodalname : nodalName.$value,
                                      sessionstatus : sessionStatus.$value
                              }]);  
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          } 
        },

        getNodalStudentList : function(nodalSimLog,nodalurlid, $scope) {
          var studentEmailListArr = $firebaseArray(new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + nodalSimLog + '/studentEmailList/'));
          studentEmailListArr.$loaded(function(studentEmailListArr) {
            if(typeof studentEmailListArr[0] !== 'undefined') {
              $scope.studentEmail1 = studentEmailListArr[0].$value;
            };
            if(typeof studentEmailListArr[1] !== 'undefined') {
              $scope.studentEmail2 = studentEmailListArr[1].$value;
            };
            if(typeof studentEmailListArr[2] !== 'undefined') {
              $scope.studentEmail3 = studentEmailListArr[2].$value;
            };
            if(typeof studentEmailListArr[3] !== 'undefined') {
              $scope.studentEmail4 = studentEmailListArr[3].$value;
            }
            if(typeof studentEmailListArr[4] !== 'undefined') {
              $scope.studentEmail5 = studentEmailListArr[4].$value;
            }
            if(typeof studentEmailListArr[5] !== 'undefined') {
              $scope.studentEmail6 = studentEmailListArr[5].$value;
            }
            if(typeof studentEmailListArr[6] !== 'undefined') {
              $scope.studentEmail7 = studentEmailListArr[6].$value;
            }
            if(typeof studentEmailListArr[7] !== 'undefined') {
              $scope.studentEmail8 = studentEmailListArr[7].$value;
            }
            if(typeof studentEmailListArr[8] !== 'undefined') {
              $scope.studentEmail9 = studentEmailListArr[8].$value;
            }
            if(typeof studentEmailListArr[9] !== 'undefined') {
              $scope.studentEmail10 = studentEmailListArr[9].$value;
            }
            if(typeof studentEmailListArr[10] !== 'undefined') {
              $scope.studentEmail11 = studentEmailListArr[10].$value;
            }
            if(typeof studentEmailListArr[11] !== 'undefined') {
              $scope.studentEmail12 = studentEmailListArr[11].$value;
            }
            if(typeof studentEmailListArr[12] !== 'undefined') {
              $scope.studentEmail13 = studentEmailListArr[12].$value;
            }
            if(typeof studentEmailListArr[13] !== 'undefined') {
              $scope.studentEmail14 = studentEmailListArr[13].$value;
            }
            if(typeof studentEmailListArr[14] !== 'undefined') {
              $scope.studentEmail15 = studentEmailListArr[14].$value;
            }
            if(typeof studentEmailListArr[15] !== 'undefined') {
              $scope.studentEmail16 = studentEmailListArr[15].$value;
            }
            if(typeof studentEmailListArr[16] !== 'undefined') {
              $scope.studentEmail17 = studentEmailListArr[16].$value;
            }
            if(typeof studentEmailListArr[17] !== 'undefined') {
              $scope.studentEmail18 = studentEmailListArr[17].$value;
            }
            if(typeof studentEmailListArr[18] !== 'undefined') {
              $scope.studentEmail19 = studentEmailListArr[18].$value;
            }
            if(typeof studentEmailListArr[19] !== 'undefined') {
              $scope.studentEmail20 = studentEmailListArr[19].$value;
            }
          });
        },  
        updateNodalInfo:function(usern,usernID){
          var nodalRef = new Firebase(FIREBASE_URL + "profileForNodalAdmins/" + usernID);
          nodalRef.update({ nodalAdminName:usern.nodalAdminName,
                            nodalCenterName:usern.nodalCenterName,
                            nodalPhone:usern.nodalPhone,
                            nodalAddress:usern.nodalAddress,
                            nodalCity:usern.nodalCity,
                            nodalState:usern.nodalState,
                            nodalCountry:usern.nodalCountry,
                            numberOfAsstets:usern.numberOfAsstets
                        });

        },

        saveStudentList : function(studentDetail, nodalCode) {
          var currentuser = Auth.resolveUser().uid;          
          angular.forEach(studentDetail, function(value, key) {
            var mail = $firebaseObject(new Firebase(FIREBASE_URL + "admin/studentUsers/" + value));
            mail.$loaded(function(mail) {
              var studentEmail = mail.$value;
              new Firebase(FIREBASE_URL + "studentsForBuildEnquiry/"+currentuser+"/"+nodalCode+"/"+key).set(studentEmail);          
            })
          })
        },

        getStudentsEmail : function(nodalCode, $scope) {
          var currentuser = Auth.resolveUser().uid;  
          var studentEmails = $firebaseArray(new Firebase(FIREBASE_URL + "studentsForBuildEnquiry/"+currentuser+"/"+nodalCode));
          studentEmails.$loaded(function(studentEmails) {
            if(studentEmails[0]) {
              $scope.studentEmail1 = studentEmails[0].$value;
            };
            if(studentEmails[1]) {
              $scope.studentEmail2 = studentEmails[1].$value;
            };
            if(studentEmails[2]) {
              $scope.studentEmail3 = studentEmails[2].$value;
            }
            if(studentEmails[3]) {
              $scope.studentEmail4 = studentEmails[3].$value;
            }
            if(studentEmails[4]) {
              $scope.studentEmail5 = studentEmails[4].$value;
            }
            if(studentEmails[5]) {
              $scope.studentEmail6 = studentEmails[5].$value;
            }
            if(studentEmails[6]) {
              $scope.studentEmail7 = studentEmails[6].$value;
            }
            if(studentEmails[7]) {
              $scope.studentEmail8 = studentEmails[7].$value;
            }
            if(studentEmails[8]) {
              $scope.studentEmail9 = studentEmails[8].$value;
            }
            if(studentEmails[9]) {
              $scope.studentEmail10 = studentEmails[9].$value;
            }
          })          
        },
        updateCollegeView : function(collegeId,viewCount) {
          (new Firebase(FIREBASE_URL + "profileForCollege/"+collegeId)).update({collegeView: parseInt(viewCount)});
        },


        getIdFromCustomId : function(collegeCustomId, studentCustomId) {
            var deferred = $q.defer();
            var customId = {};
            if(collegeCustomId !== 'none' && studentCustomId !== 'none') {
              var collegeCustomIdRef = new Firebase(FIREBASE_URL + "customUserIdTable/collegeCustomId/" + collegeCustomId);
              collegeCustomIdRef.once("value", function(snapshot) {
                customId.collegeHash = snapshot.val();
                var studentCustomIdRef = new Firebase(FIREBASE_URL + "customUserIdTable/studentCustomId/" + studentCustomId);
                studentCustomIdRef.once("value", function(stusnapshot) {
                  customId.studentHash = stusnapshot.val();
                  deferred.resolve(customId);
                });
              });
            }
            else if(collegeCustomId !== 'none' && studentCustomId == 'none') {
              var collegeCustomIdRef = new Firebase(FIREBASE_URL + "customUserIdTable/collegeCustomId/" + collegeCustomId);
              collegeCustomIdRef.once("value", function(snapshot) {
                customId.collegeHash = snapshot.val();
                deferred.resolve(customId);
              });
            }
            else if(collegeCustomId == 'none' && studentCustomId !== 'none') {
              var studentCustomIdRef = new Firebase(FIREBASE_URL + "customUserIdTable/studentCustomId/" + studentCustomId);
              studentCustomIdRef.once("value", function(stusnapshot) {
                customId.studentHash = stusnapshot.val();
                deferred.resolve(customId);
              });
            }
            return deferred.promise;
        }
    };   
    return AdminTask;
  }
);

