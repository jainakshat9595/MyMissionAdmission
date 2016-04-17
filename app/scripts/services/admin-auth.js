'use strict';

app.factory('AdminAuth', function ($firebaseAuth, FIREBASE_URL, $rootScope, $firebaseObject, $firebaseArray,$q) {
  var ref = new Firebase(FIREBASE_URL);
  var adminauth = $firebaseAuth(ref);

  var AdminAuth = {
    createProfileForAdmin: function (usera) {
      var profile = {
        adminname: usera.adminname,
        adminemail: usera.adminemail,
        adminmobile: usera.adminmobile
      };

      var profileRef = ref.child('profileForAdmins/' + usera.uid);
      return profileRef.set(profile, function() {          
        var newref = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + usera.uid);
        var newprofileObj = $firebaseObject(newref);
        var useridref = new Firebase(FIREBASE_URL + '/' + 'currentUID' );
        useridref.once("value",function(snapshot){
          var currentCount = snapshot.val()+1;
          newprofileObj.adminname = usera.adminname;
          newprofileObj.adminemail = usera.adminemail;
          newprofileObj.adminmobile = usera.adminmobile;
          newprofileObj.role = "none";
          newprofileObj.profiletype = "admin";
          newprofileObj.privilege = "access_denied";  
          newprofileObj.adminurlid = currentCount;
          useridref.set(currentCount);
          var idTableRef = new Firebase(FIREBASE_URL + "customUserIdTable/adminCustomId/" + currentCount);
          idTableRef.set(usera.uid);
          newprofileObj.$save().then(function(ref) {
          }, function(error) {
            console.log("Error:", error);
          });
        });
      }), function(error) {
        console.log("Error:", error);
      };
    },
    createAdminForSpecialUsers: function (usera) {
      ref.child('admin/adminUsers/' + usera.uid).set(usera.adminemail);
    },    
    
    registerAdmin: function (usera) {
      return adminauth.$createUser({email:usera.adminemail, password:usera.adminpassword});
    },

    loginAdmin: function (usera, $scope) {
      var deferred = $q.defer();
      ref.authWithPassword({
          "email": usera.adminemail,
          "password": usera.adminpassword
      },function(error, authData) {
        if (error) {
          $scope.error = error.message;
          $scope.modalShown = false;
          $scope.$apply();
        } 
        else {
          var usertype = AdminAuth.resolveUser().uid;
          deferred.resolve(usertype);
        }
      })
      return deferred.promise;
    },

    logout: function () {
      if(AdminAuth.usera && AdminAuth.usera.profile) {
          AdminAuth.usera.profile.$destroy();
      }
      angular.copy({}, AdminAuth.usera);
      adminauth.unauth();
    },
    resolveUser: function() {
      var getAuth = adminauth.$getAuth();
      return getAuth;
    },
    signedIn: function() {
      return !!AdminAuth.usera.provider;
    },

    addLiveColleges : function(id,collegeEmail) {
      var currentUser = AdminAuth.resolveUser().uid;
      var ref = new Firebase(FIREBASE_URL + "liveColleges/" + id);
      var collegeRef = new Firebase(FIREBASE_URL + "profileForCollege/" + id + "/collegeLive");
      ref.update({collegeCounsellorEmail : collegeEmail});
      ref.update({AMId : currentUser});
      collegeRef.set("yes");
    },

    makeLiveCollegesByTotal : function(id,collegeEmail) {
      var currentUser = "simplelogin:944";
      var ref = new Firebase(FIREBASE_URL + "liveColleges/" + id);
      var collegeRef = new Firebase(FIREBASE_URL + "profileForCollege/" + id + "/collegeLive");
      ref.update({collegeCounsellorEmail : collegeEmail});
      ref.update({AMId : currentUser});
      collegeRef.set("yes");
    },

    showLiveColleges : function() {
      var ref = new Firebase(FIREBASE_URL + "liveColleges/");
      return $firebaseObject(ref);
    },

    getAMName : function(AMId) {
      var ref = new Firebase(FIREBASE_URL + "profileForAdmins/" + AMId + "/adminname");
      return $firebaseObject(ref);
    },

    removeCollege : function(freeCollege) {
      var ref = new Firebase(FIREBASE_URL + "liveColleges/" + freeCollege);
      var collegeRef = new Firebase(FIREBASE_URL + "profileForCollege/" + freeCollege + "/collegeLive");   
      ref.remove();
      collegeRef.remove();
     },
     usera: {}
    };

 
   adminauth.$onAuth(function(authData) {
          if (authData) {
           angular.copy(authData, AdminAuth.usera);
           AdminAuth.usera.profile = $firebaseObject(ref.child('profileForAdmins').child(AdminAuth.usera.uid));
              var currentUser = AdminAuth.resolveUser().uid;
              AdminAuth.usera.sessions = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForAdmins/' + currentUser.uid + '/sessions' + '/'));
          } else {
              if(AdminAuth.usera && AdminAuth.usera.profile) {
                  AdminAuth.usera.profile.$destroy();
              }
              angular.copy({}, AdminAuth.usera);
            }
    });

  return AdminAuth;
});