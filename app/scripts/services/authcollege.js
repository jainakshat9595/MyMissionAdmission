'use strict';

app.factory('AuthCollege', function ($firebaseAuth, FIREBASE_URL, $rootScope, $firebaseObject, $firebaseArray, Session,Auth ,$q) {
  var ref = new Firebase(FIREBASE_URL);
  var authcollege = $firebaseAuth(ref);

  var AuthCollege = {

    login: function (userc, $scope) {
      var deferred = $q.defer();
      ref.authWithPassword({
          "email": userc.email,
          "password": userc.password
      }, function(error, authData) {
        if (error) {
          $scope.error = error.message;
          $scope.modalShown = false;
          $scope.$apply();
        } else {
          var usertype = Auth.resolveUser().uid;
         deferred.resolve(usertype);
        };
      }); 
      return deferred.promise;
    },

    logout: function () {
      if(AuthCollege.userc && AuthCollege.userc.profile) {
          AuthCollege.userc.profile.$destroy();
          angular.copy({}, AuthCollege.userc);
      }

      authcollege.unauth();
    },
    
    resolveUser: function() {
      var getAuth = authcollege.$getAuth();
      return getAuth;
    },
    
    signedIn: function() {
      return !!AuthCollege.userc.provider;
    },
    
    updateClgProfile: function ($scope,college) {
      $scope.submitsuccesstext1 = false;
      var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college + '/');
      //var sync = $firebase(ref);
      ref.update({ collegename: $scope.userc.profile.collegename  });
      ref.update({ collegemobile: $scope.userc.profile.collegemobile  });
      ref.update({ collegeaffiliation: $scope.userc.profile.collegeaffiliation  });
      ref.update({ collegeaddress: $scope.userc.profile.collegeaddress  });
      ref.update({ collegewebsite: $scope.userc.profile.collegewebsite  });
      $scope.submitsuccesstext1 = true;
      },
      updateClgPhoto: function (collegeId,newphoto,$scope) { 
                 $scope.submitphotosuccesstext = false; 
                 var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/' ); 
                 //var sync = $firebase(ref); 
                  ref.update({ collegephoto: newphoto }); 
                  $scope.submitphotosuccesstext = true; 
      },
      updateCounsellorMail : function ($scope,college) {
      $scope.submitsuccesstext2 = false;
      var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college + '/' );
      ref.update({ collegeCounsellor1Name: $scope.userc.profile.collegeCounsellor1Name  });
      ref.update({ collegeCounsellor1Email: $scope.userc.profile.collegeCounsellor1Email  });
      ref.update({ collegeCounsellor1gender: $scope.userc.profile.collegeCounsellor1gender  });
      ref.update({ collegeCounsellor1Number: $scope.userc.profile.collegeCounsellor1Number  });
      ref.update({ collegeCounsellor1photo: $scope.userc.profile.collegeCounsellor1photo  });
      console.log("hi");
      return $scope.submitsuccesstext2 = true;
      },

      resetChanges: function (college) {
        var deferred = $q.defer();
        var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college + '/');
        var view = $firebaseObject(ref);
        view.$loaded( function(view) {
          deferred.resolve(view);
        });
        return deferred.promise;
      },
    userc: {}
    };

  
   authcollege.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, AuthCollege.userc);
      AuthCollege.userc.profile = $firebaseObject(ref.child('profileForCollege').child(AuthCollege.userc.uid));
      AuthCollege.userc.collegeid_CollegeAvailability = (ref.child('profileForCollege').child(AuthCollege.userc.uid));
      AuthCollege.userc.studentid_StudentAvailability = (ref.child('profileForStudents').child(AuthCollege.userc.uid));    

      var collegeObj = $firebaseObject(ref.child('profileForCollege').child(AuthCollege.userc.uid));
      var collegesync = (ref.child('profileForCollege').child(AuthCollege.userc.uid));
      collegeObj.$loaded()
        .then(function(data) {
          if((typeof collegeObj.profiletype !== 'undefined')&&(collegeObj.profiletype=="college")){
              collegesync.update({collegeAvailability : "online"});
            }           
          })
          .catch(function(error) {
            console.error("Error:", error);
          });

      

      var studentObj = $firebaseObject(ref.child('profileForStudents').child(AuthCollege.userc.uid));
      var studentsync = (ref.child('profileForStudents').child(AuthCollege.userc.uid));
      studentObj.$loaded()
        .then(function(data) {
          if((typeof studentObj.profiletype !== 'undefined')&&(studentObj.profiletype=="student")){
              studentsync.update({studentAvailability : "online"});   
            }           
          })
          .catch(function(error) {
            console.error("Error:", error);
          });
       var adminObj = $firebaseObject(ref.child('profileForAdmins').child(AuthCollege.userc.uid));
      var adminsync = (ref.child('profileForAdmins').child(AuthCollege.userc.uid));
      adminObj.$loaded()
        .then(function(data) {
          if((typeof adminObj.profiletype !== 'undefined')&&(adminObj.profiletype=="admin")){
              adminsync.update({availability : "online"});   
            }           
          })
          .catch(function(error) {
            console.error("Error:", error);
          });
      var NodaladminObj = $firebaseObject(ref.child('profileForNodalAdmins').child(AuthCollege.userc.uid));
      var Nodaladminsync = (ref.child('profileForNodalAdmins').child(AuthCollege.userc.uid));
      NodaladminObj.$loaded()
        .then(function(data) {
          if((typeof NodaladminObj.profiletype !== 'undefined')&&(NodaladminObj.profiletype=="nodal")){
              Nodaladminsync.update({availability : "online"});   
            }           
          })
          .catch(function(error) {
            console.error("Error:", error);
          });
         
          
      AuthCollege.userc.sessions = Session.getSessionForCollege();
      AuthCollege.userc.sessionCount = Session.getSessionCountForCollege();
      AuthCollege.userc.feedback = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForCollege/' + AuthCollege.userc.uid + '/feedback' + '/'));
      AuthCollege.userc.feedbackCount = $firebaseArray(new Firebase(FIREBASE_URL + 'profileForCollege/' + AuthCollege.userc.uid + '/feedback' + '/'));
    } else {
      if(AuthCollege.userc && AuthCollege.userc.profile) {
            var collegeObj = $firebaseObject(ref.child('profileForCollege').child(AuthCollege.userc.uid));
            var collegesync = (ref.child('profileForCollege').child(AuthCollege.userc.uid));
            collegeObj.$loaded()
              .then(function(data) {
                   if((typeof collegeObj.profiletype !== 'undefined')&&(collegeObj.profiletype=="college")){
                      collegesync.update({collegeAvailability : "offline"});              
                  }           
              })
              .catch(function(error) {
                console.error("Error:", error);
              });
            var studentObj = $firebaseObject(ref.child('profileForStudents').child(AuthCollege.userc.uid));
            var studentsync = (ref.child('profileForStudents').child(AuthCollege.userc.uid));
            studentObj.$loaded()
              .then(function(data) {
                   if((typeof studentObj.profiletype !== 'undefined')&&(studentObj.profiletype=="student")){
                    studentsync.update({studentAvailability : "offline"});              
                  }           
              })
              .catch(function(error) {
                console.error("Error:", error);
              });
               var adminObj = $firebaseObject(ref.child('profileForAdmins').child(AuthCollege.userc.uid));
            var adminsync = (ref.child('profileForAdmins').child(AuthCollege.userc.uid));
            adminObj.$loaded()
            .then(function(data) {
              if((typeof adminObj.profiletype !== 'undefined')&&(adminObj.profiletype=="admin")){
                  adminsync.update({availability : "offline"});   
                }           
              })
              .catch(function(error) {
                console.error("Error:", error);
              });
            var NodaladminObj = $firebaseObject(ref.child('profileForNodalAdmins').child(AuthCollege.userc.uid));
            var Nodaladminsync = (ref.child('profileForNodalAdmins').child(AuthCollege.userc.uid));
            NodaladminObj.$loaded()
              .then(function(data) {
                if((typeof NodaladminObj.profiletype !== 'undefined')&&(NodaladminObj.profiletype=="nodal")){
                    Nodaladminsync.update({availability : "offline"});   
                  }           
                })
                .catch(function(error) {
                  console.error("Error:", error);
                });

            AuthCollege.userc.profile.$destroy();
      }
          angular.copy({}, AuthCollege.userc);
    }
  });
  return AuthCollege;
});