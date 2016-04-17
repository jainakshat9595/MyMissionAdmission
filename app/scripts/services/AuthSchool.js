'use strict';

app.factory('AuthSchool', function ($firebaseAuth, $location, FIREBASE_URL, $rootScope,  $firebaseObject , $firebaseArray , $q) {
  var ref = new Firebase(FIREBASE_URL);
  var authschool = $firebaseAuth(ref);

  var AuthSchool = {
    createProfileForAdmin: function (users) {
      var profile = {
        schoolname: users.schoolname,
        schooladminname: users.schooladminname
      };

      var profileRef = (ref.child('profileForSchools/' + users.uid));
      return profileRef.set(profile, function(ref) {          
          var newref = new Firebase(FIREBASE_URL + 'profileForSchools' + '/' + users.uid);
          var newprofileObj = $firebaseObject(newref);
          var newprofileObj = $firebaseObject(newref);
          var useridref = new Firebase(FIREBASE_URL + '/' + 'currentUID' );
          useridref.once("value",function(snapshot){
            var currentCount = snapshot.val()+1;
            newprofileObj.schoolname = users.schoolname;
            newprofileObj.schoolAdminname = users.schooladminname;
            newprofileObj.schooladminemail = users.schooladminemail;
            newprofileObj.phonenumber = users.phonenumber;
            newprofileObj.dateOfApplying = users.doa;
            newprofileObj.schooladdress = users.schooladdress;
            newprofileObj.schoolcity = users.schoolcity;
            newprofileObj.schoolcountry = users.schoolcountry;
            newprofileObj.schoolstate = users.schoolstate;
            newprofileObj.schoolzipcode = users.schoolzipcode;
            newprofileObj.password = users.password;
            newprofileObj.profiletype = "School";
            newprofileObj.privilege = "access_denied";
            newprofileObj.dateOfAccepting = "none";
            newprofileObj.schoolurlid = currentCount;
            useridref.set(currentCount);
            var idTableRef = new Firebase(FIREBASE_URL + "customUserIdTable/schoolCustomId/" + currentCount);
            idTableRef.set(users.uid);
            newprofileObj.$save().then(function(ref) {
            }, function(error) {
              console.log("Error:", error);
            });
          });
        }), function(error) {
          console.log("Error:", error);
      };
    },
    
    createAdminForSpecialUsers: function (users) {
      var studentAdminSync = (ref.child('admin/SchoolUsers/' + users.uid));
      studentAdminSync.set(users.schooladminemail);
    },    
    
    registerAdmin: function (users) {
      return authschool.$createUser({email:users.schooladminemail, password:users.password});
    },

    loginAdmin: function (users, $scope) {
      var deferred = $q.defer();
      ref.authWithPassword({
          "email": users.schooladminemail,
          "password": users.password
      }, function(error, authData) {
        if (error) {
          $scope.error = error.message;
          $scope.modalShown = false;
          $scope.$apply()
        } else {
          var usertype = AuthSchool.resolveUser().uid;
          deferred.resolve(usertype);
        }
      })
      return deferred.promise;
    },

    logout: function () {
      authschool.$unauth();
      if(AuthSchool.users && AuthSchool.users.profile) {
        AuthSchool.users.profile.$destroy();
      }
      angular.copy({}, AuthSchool.users);
    },

    resolveUser: function() {
      return authschool.$getAuth();
    },
    
    signedIn: function() {
      return !!AuthSchool.users.provider;
    },
    users: {}
  };

  authschool.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, AuthSchool.users);
      AuthSchool.users.profile = $firebaseObject(ref.child('profileForSchools').child(AuthSchool.users.uid));
    }else {
      if(AuthSchool.users && AuthSchool.users.profile) {
        AuthSchool.users.profile.$destroy();
      }
      angular.copy({}, AuthSchool.users);
    }
  });

  return AuthSchool;
});

