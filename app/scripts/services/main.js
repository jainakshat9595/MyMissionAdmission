'use strict';

app.factory('dropdownFactory', function ($firebaseAuth, $location, FIREBASE_URL, $rootScope, $firebaseObject, $firebaseArray,$q) {
  var stateValue = '';
  var courseValue = '';
  return {
    getStateDropdownObject: function(key) {
      return $firebaseObject(new Firebase(FIREBASE_URL +"stateList/states/"+ key));
    },
    getAllStateDropdownObjects: function() {
      return $firebaseObject(new Firebase(FIREBASE_URL+"stateList/states/"));
    },
    getCourseDropdownObject: function(key) {
      return $firebaseObject(new Firebase(FIREBASE_URL +"courseList/courses/"+ key));
    },
    getAllCourseDropdownObjects: function() {
      return $firebaseObject(new Firebase(FIREBASE_URL+"courseList/courses/"));
    },
    getAllCollegeUsers: function() {
      return $firebaseObject(new Firebase(FIREBASE_URL+"admin/collegeUsers/"));
    },
    getCollegeData: function(counsellorEmail) {
      var collegeuserArray = $firebaseArray(new Firebase(FIREBASE_URL+"admin/collegeUsers/"));
      collegeuserArray.$loaded(
        function(x) {
          //var rec = list.$getRecord(counsellorEmail);
          var simpleuser = collegeuserArray.$keyAt(counsellorEmail);
        }, function(error) {
          console.error("Error:", error);
      });
    },
    sendState: function(state)
    {
      stateValue = state;
    },

    getStateValue: function(){
      return stateValue;
    },
    resetStateValue: function(){
      stateValue='';
    },

    sendCourse: function(course)
    {
      courseValue = course;
    },
    resetCourseValue: function(){
      courseValue='';
    },


    getCourseValue: function(){
      return courseValue;
    },
     saveAndroidRequest : function(email) {
        var deferred = $q.defer();

        var index = $firebaseObject(new Firebase(FIREBASE_URL +"requestForApp/indexForAndroid"));
        index.$loaded(function(index) {
          console.log(index.$value);
         (new Firebase(FIREBASE_URL +"requestForApp/android/"+ (index.$value + 1))).set(email);
         (new Firebase(FIREBASE_URL +"requestForApp/indexForAndroid")).set(index.$value + 1);
         deferred.resolve('view');
        })
         return deferred.promise;

         },
    forgotPassword : function(email,$scope) {
      //console.log(email);
        var ref = new Firebase(FIREBASE_URL);
        ref.resetPassword({
          email: email
        }, function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_USER":
                //console.log("The specified user account does not exist.");
                $scope.message = 'The specified user account does not exist.';
                $scope.sendSuccessFully = 'failure';
                $scope.$evalAsync();
                break;
              default:
                console.log("Error resetting password:", error);
            }
          } else {
            //console.log("Password reset email sent successfully!");
            $scope.message = 'Password reset email sent successfully! Please Check your email.';
            $scope.sendSuccessFully = 'Done';
            $scope.$evalAsync();
          }
        });
    },
    resetPassword : function(email,oldpassword,newpassword,$scope) {
      /*console.log(email);
      console.log(oldpassword);
      console.log(newpassword);
*/
      var ref = new Firebase(FIREBASE_URL);
      ref.changePassword({
        email: email,
        oldPassword: oldpassword,
        newPassword: newpassword
      }, function(error) {
        if (error) {
          switch (error.code) {
            case "INVALID_PASSWORD":
             // console.log("The specified user account password is incorrect.");
              $scope.message = "The specified user account password is incorrect.";
              $scope.$evalAsync();
              break;
            case "INVALID_USER":
             // console.log("The specified user account does not exist.");
               $scope.message = "The specified user account does not exist.";
                $scope.$evalAsync();
              break;
            default:
              console.log("Error changing password:", error);
          }
        } else {
                  $scope.message = "User password changed successfully!";
                // console.log("User password changed successfully!");
                 var studentreff = new Firebase(FIREBASE_URL + "admin/studentUsers");
                    studentreff.once("value", function(snapshot) {
                      snapshot.forEach(function(childSnapshot) {
                        if( childSnapshot.val() === email ) {
                          console.log('student' + childSnapshot.key());
                          var studentId = childSnapshot.key();
                        (new Firebase(FIREBASE_URL + "profileForStudents/" + studentId + "/")).update({password:newpassword});
                        $scope.$evalAsync();
                        return;
                       //$location.path('/login');
                        }
                       
                      });
                  });
                    var collegeref = new Firebase(FIREBASE_URL + "admin/collegeUsers");
                    collegeref.once("value", function(snapshot) {
                      snapshot.forEach(function(childSnapshot) {
                        if( childSnapshot.val() === email ){
                           var collegeId = childSnapshot.key();
                          console.log('college '+ childSnapshot.key());
                         (new Firebase(FIREBASE_URL + "profileForCollege/" + collegeId + "/")).update({collegepassword:newpassword});
                         $scope.$evalAsync();
                      // $location.path('/login-college');
                         return;
                         
                        }
                       
                      });
                    });
                    var nodalreff = new Firebase(FIREBASE_URL + "admin/nodaladminUsers");
                    nodalreff.once("value", function(snapshot) {
                      snapshot.forEach(function(childSnapshot) {
                        if( childSnapshot.val() === email ) {
                           var nodalId = childSnapshot.key();
                          console.log("nodal " + childSnapshot.key());
                        (new Firebase(FIREBASE_URL + "profileForNodalAdmins/" + nodalId + "/")).update({password:newpassword});
                        console.log("password change successfullllly");
                        $scope.$evalAsync();
                        return;
                      // $location.path('/login-nodal');
                        }
                       
                      });
                    });
                 $scope.$evalAsync();
          }
      });
    }
  };
});