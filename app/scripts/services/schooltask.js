'use strict';

app.factory('SchoolTask', function ($firebaseAuth,  $filter, $http, $location, FIREBASE_URL, $rootScope, $q , $firebaseObject , $firebaseArray,Search) {
  var ref = new Firebase(FIREBASE_URL);
  var schooltask = $firebaseAuth(ref);
  

  var SchoolTask = {
    createProfile: function (user, $scope) {
      var newref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + user.uid);
      var newprofileObj = $firebaseObject(newref);
      newprofileObj.studentname = user.studentname;
      newprofileObj.studentphoto = user.studentphoto;
      newprofileObj.studentdocument = user.studentdocument;
      newprofileObj.studentmobile = user.studentmobile;
      newprofileObj.email = user.email;
      newprofileObj.fathername = user.fathername;
      newprofileObj.gender = user.gender;
      newprofileObj.occupation = user.occupation;
      newprofileObj.fathernumber = user.fathernumber;
      newprofileObj.referredBy = user.referredBy;
      newprofileObj.referredBySchool = user.referredBySchool;
      newprofileObj.school = user.school;
      if((user.academicrecord12th==true)&&(typeof user.academicrecord12thText !== 'undefined')){
        newprofileObj.academicrecord12thMarks = user.academicrecord12thText;
         if((user.academicrecordUG==true)&&(typeof user.academicrecordUGText !== 'undefined')){
            newprofileObj.academicrecordUGMarks = user.academicrecordUGText;
            if((user.academicrecordPG==true)&&(typeof user.academicrecordPGText !== 'undefined')){
                newprofileObj.academicrecordPGMarks = user.academicrecordPGText;
            };
        };
      };
      if(typeof user.studentabout !== 'undefined'){
        newprofileObj.studentabout = user.studentabout;
      }
      if(typeof user.studentclass !== 'undefined'){
        newprofileObj.studentclass = user.studentclass;
      }
      if(typeof user.studentstream !== 'undefined'){
        newprofileObj.studentstream = user.studentstream;
      }  
      newprofileObj.password = user.password;        
      newprofileObj.profiletype = user.profiletype;
      newprofileObj.dateOfRegistration = user.dateOfApplying;
      newprofileObj.studentAvailability = user.studentAvailability;
      newprofileObj.md5_hash = user.md5_hash;
      newprofileObj.studentstatus = user.studentstatus;
      newprofileObj.emailverificationstatus = user.emailverificationstatus;
      newprofileObj.$save().then(function(ref) {
        SchoolTask.changestudentmail(user, $scope);
        SchoolTask.createStudentListForSchool(user);
      }, function(error) {
        console.log("Error:", error);
      });
    },

      
  
    createAdminForStudent: function (user) {
      var studentAdminSync = (ref.child('admin/studentUsers/' + user.uid ));
      studentAdminSync.set(user.email);
    },    

    createStudentListForSchool: function (user) {
      var sturef = (ref.child('SchoolStudentRecords/' + user.referredBySchool + '/' + user.uid));
      sturef.set(user.uid);
    },

    register: function (user) {
       return schooltask.$createUser({email:user.email, password:user.password}  );
    },

    login: function (user) {
      return schooltask.$login('password', user);
    },

    logout: function () {
      schooltask.$logout();
    },
    
    resolveUser: function() {
      return schooltask.$getAuth();
    },
    
    signedIn: function() {
      return !!SchoolTask.user.provider;
    },

    registerStudentsTemporarly : function(user, $scope) {
      var oldRegisteredStudentsUidRef = new Firebase(FIREBASE_URL + "/tempStudentSimpleLogin/");
      oldRegisteredStudentsUidRef.limitToFirst(1).once("value", function(snapshot) {
        angular.forEach(snapshot.val(), function(key, value) {
          user.uid = value;
          user.oldEmail = key;
          SchoolTask.createProfile(user, $scope);
          SchoolTask.createAdminForStudent(user);
        })
      });
    },

    changestudentmail : function (user, $scope) {
      var ref = new Firebase(FIREBASE_URL);
      ref.changeEmail({
        oldEmail : user.oldEmail,
        newEmail : user.email,
        password : user.oldPassword  
      },function(error) {
        if(error) {
          console.log(error);
        }
        else if(!error) {
          SchoolTask.changeStudentPassword(user, $scope);
        }
      });      
    },

    changeStudentPassword : function(user, $scope) {
      var ref = new Firebase(FIREBASE_URL);
      ref.changePassword({
          email : user.email,
          oldPassword : user.oldPassword,
          newPassword : user.password  
      },function(error) {
        if (error) {
          console.log(error);  
        } 
        else if(!error) {
          var deleteTempStuRef = new Firebase(FIREBASE_URL + "/tempStudentSimpleLogin/" + user.uid);
          deleteTempStuRef.set(null);
          SchoolTask.sendEmailOnStudentRegistration(user, $scope);
        }
      });
    },

    sendEmailOnStudentRegistration : function(user, $scope) {
        $scope.modalShown = false;
        var str = user.uid;
        var urlId = str.split(":");
        var dataToPost = {
                            to: user.email, 
                            pass: user.password, 
                            sname: user.studentname,
                            hashkey : user.md5_hash,
                            urlId : urlId[1]
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
        $location.path('/schoolstudent-success');
    },

    user: {}
  };

  /*$rootScope.$on('$firebaseAuth:login', function(e, user) {
    angular.copy(user, NodalTask.user);
    NodalTask.user.profile = $firebaseObject(ref.child('profileForStudents').child(NodalTask.user.uid));
    NodalTask.user.accept = $firebaseObject(ref.child('profileForStudents').child(NodalTask.user.uid).child('studentsRegistered'));
    var currentUser = nodaltask.$getCurrentUser();
    NodalTask.user.sessions = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForStudents/' + currentUser.uid + '/sessions' + '/'));
  });

  $rootScope.$on('$firebaseAuth:logout', function() {
    if(NodalTask.user && NodalTask.user.profile) {
      NodalTask.user.profile.$destroy();
    }
    angular.copy({}, NodalTask.user);
  });*/
  return SchoolTask;
});
