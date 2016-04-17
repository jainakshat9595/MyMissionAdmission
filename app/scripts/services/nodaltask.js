'use strict';

app.factory('NodalTask', function ($firebaseAuth,  $filter, FIREBASE_URL, $rootScope, $q , $firebaseObject , $firebaseArray,Search) {
  var ref = new Firebase(FIREBASE_URL);
  var nodaltask = $firebaseAuth(ref);
  

  var NodalTask = {
    createProfile: function (user) {
      var useridref = new Firebase(FIREBASE_URL + '/' + 'currentUID' );
      useridref.once("value",function(snapshot){
        var currentCount = snapshot.val()+1;
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
        newprofileObj.referredByNodalAdmin = user.referredByNodalAdmin;
        newprofileObj.coursesUG = user.coursesinterestedinUG;
        newprofileObj.coursesPG = user.coursesinterestedinPG;

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
        newprofileObj.password = user.password;        
        newprofileObj.profiletype = user.profiletype;
        newprofileObj.dateOfRegistration = user.dateOfApplying;
        newprofileObj.studentAvailability = user.studentAvailability;
        newprofileObj.md5_hash = user.md5_hash;
        newprofileObj.studentstatus = user.studentstatus;
        newprofileObj.emailverificationstatus = user.emailverificationstatus;
        newprofileObj.studenturlid = currentCount;
        useridref.set(currentCount);
        var idTableRef = new Firebase(FIREBASE_URL + "customUserIdTable/studentCustomId/" + currentCount);
        idTableRef.set(user.uid);

      
        newprofileObj.$save().then(function(ref) {
        }, function(error) {
          console.log("Error:", error);
        });
      });
    },

    deleteAllEmail : function(NodalAdminUid) {
      var NodalReferredStudentsRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + NodalAdminUid + '/studentEmailList');
      (NodalReferredStudentsRef).remove();
    },

    deleteEmail : function(studentId,NodalAdminUid) {
      var NodalReferredStudentsRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + NodalAdminUid + '/studentEmailList/' + studentId);
      (NodalReferredStudentsRef).remove();
    },

    getStudentEmailListByNodal : function(NodalAdminUid) {
      var NodalReferredStudentsRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + NodalAdminUid + '/studentEmailList/');
      return $firebaseArray(NodalReferredStudentsRef);
    },
           

    sendEmail: function (studentemail,studentuid, currentuser) {
      (new Firebase(FIREBASE_URL + 'profileForNodalAdmins/'  + currentuser + '/studentEmailList/' + studentuid)).set(studentemail);
    },    


    saveEntry: function (student, newid) {
      var referstudent1 =  new Firebase(FIREBASE_URL + 'profileForNodalAdmins/'  + student + '/studentsRegistered/' + newid);
      var sync = (referstudent1);
      sync.update({numberOfSessionsTillDate: "0", allreadyRefferdStudent: "0"});
    },    

    viewChanges: function (student) {
          var deferred = $q.defer();
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student + '/');
          var view = $firebaseObject(ref);
          view.$loaded( function(view) {
            deferred.resolve(view);
            });
          return deferred.promise;
    },  
  
    createAdminForStudent: function (user) {
      var studentAdminSync = (ref.child('admin/studentUsers/' + user.uid ));
      studentAdminSync.set(user.email);
    },    

    register: function (user) {
       return nodaltask.$createUser({email:user.email, password:user.password}  );
    },

    login: function (user) {
      return nodaltask.$login('password', user);
    },

    logout: function () {
      nodaltask.$logout();
    },
    
    resolveUser: function() {
      return nodaltask.$getAuth();
    },
    
    signedIn: function() {
      return !!NodalTask.user.provider;
    },

    getMonthlyDetails:function(year,nid,$scope,i){
      var nodalref=new Firebase(FIREBASE_URL+'/nodalSessionRecordMonthWise/'+ year + '/' + $scope.month[i]+ '/' + nid);   
      nodalref.on('value',function(snapshot){
        snapshot.forEach(function(data){
          var len = data.numChildren();
          angular.forEach(data.val(),function(stuob,k){
            angular.forEach(stuob,function(value,key){
              NodalTask.loadMonthlyDetails(k,value.studenturl,$scope);
            })
          })
        });
      });
    },

    loadMonthlyDetails:function(cid,sid,$scope){
      var sessionref1=$firebaseObject(new Firebase(FIREBASE_URL+'collegeSessions/'+cid+'/'+sid+'/studentquery'));
      var sessionref2=$firebaseObject(new Firebase(FIREBASE_URL+'collegeSessions/'+cid+'/'+sid+'/sessionVerificationStatus'));
      var sessionref3=$firebaseObject(new Firebase(FIREBASE_URL+'collegeSessions/'+cid+'/'+sid+'/sessiondate'));
      var studentref1=$firebaseObject(new Firebase(FIREBASE_URL+'profileForStudents/'+sid+'/studentname'));
      var studentref2=$firebaseObject(new Firebase(FIREBASE_URL+'profileForStudents/'+sid+'/email'));
      var collegeref=$firebaseObject(new Firebase(FIREBASE_URL+'profileForCollege/'+cid+'/collegename'));
      sessionref1.$loaded(function(stuquery) {
        sessionref2.$loaded(function(Status) {
          sessionref3.$loaded(function(date){
            studentref1.$loaded(function(stuname) {
            studentref2.$loaded(function(mail) {
              collegeref.$loaded(function(clgname) {
                $scope.spinner = false;
                $scope.sessionList=
                $scope.sessionList.concat([{
                  sname:stuname.$value,
                  email:mail.$value,
                  cname:clgname.$value,
                  stuquery:stuquery.$value,
                  date:date.$value.slice(0,-5),
                  sStatus:Status.$value}]);
                });
              });
            });
          })
        });
      });
    },

    getReferredStudentsByNodal : function(NodalAdminUid) {
      var NodalReferredStudentsRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + NodalAdminUid + '/studentsRegistered/');
      return $firebaseArray(NodalReferredStudentsRef);
    },

    getStudentSessionDetail : function(studentId) {
      var deferred = $q.defer();
      var studentSessionRef = new Firebase(FIREBASE_URL + 'studentSessions/' + studentId);
      var sessions = $firebaseArray(studentSessionRef);
      sessions.$loaded(function() {
        deferred.resolve(sessions);
      })
      return deferred.promise;
    },

    getStudentSessionDetailBeforeEnrollment : function(studentId,currentuser) {
      var deferred = $q.defer();
      var sessionsTillDateRef = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + currentuser + '/studentsRegistered/'  + studentId + "/numberOfSessionsTillDate/");
      var sessionsTillDate = $firebaseObject(sessionsTillDateRef);
      return sessionsTillDate;
    },

    getTotalStudentReferral : function(studentId) {
      var ref = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId + '/referralIncentive/referredStudentsDetail/');
      var referredStuentArr = $firebaseArray(ref);
      return referredStuentArr;
    },

    getTotalStudentReferralLength : function(studentId) {
      var deferred = $q.defer();
      var ref = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId + '/referralIncentive/referredStudentsDetail/');
      var referredStuentArr = $firebaseArray(ref);
      referredStuentArr.$loaded(function() {
        deferred.resolve(referredStuentArr);
      })
      return deferred.promise;
    },

    getStudentReferralBeforeEnrollment : function(studentId,currentuser) {
      var ref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + currentuser + '/studentsRegistered/' + studentId + "/allreadyRefferdStudent/");
      var alreadyReferredStuentArr = $firebaseObject(ref);
      return alreadyReferredStuentArr;
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
  return NodalTask;
});
