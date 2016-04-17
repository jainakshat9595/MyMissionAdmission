'use strict';

app.factory('NodalAuth', function ($firebaseAuth, $location, FIREBASE_URL, $rootScope,  $firebaseObject , $firebaseArray , $q) {
  var ref = new Firebase(FIREBASE_URL);
  var nodalauth = $firebaseAuth(ref);

  var NodalAuth = {
    createProfileForAdmin: function (usern) {
      var profile = {
        Nodaladminname: usern.nodaladminname,
        Nodaladminemail: usern.nodaladminemail
      };

      var profileRef = (ref.child('profileForNodalAdmins/' + usern.uid));
      return profileRef.set(profile, function(ref) {          
          var newref = new Firebase(FIREBASE_URL + 'profileForNodalAdmins' + '/' + usern.uid);
          var newprofileObj = $firebaseObject(newref);
          var useridref = new Firebase(FIREBASE_URL + '/' + 'currentUID' );
          useridref.once("value",function(snapshot){
            var currentCount = snapshot.val()+1;
            newprofileObj.nodalCenterName = usern.nodalcentername;
            newprofileObj.nodalAdminName = usern.nodaladminname;
            newprofileObj.nodalAdminEmail = usern.nodaladminemail;
            newprofileObj.nodalPhone = usern.nodalphone;
            newprofileObj.dateOfApplying = usern.doa;
            newprofileObj.numberOfAsstets = usern.assetnumber;
            newprofileObj.nodalAddress = usern.nodaladdress;
            newprofileObj.nodalCity = usern.nodalcity;
            newprofileObj.nodalCountry = usern.nodalcountry;
            newprofileObj.nodalState = usern.nodalstate;
            newprofileObj.password = usern.adminpassword;
            newprofileObj.profiletype = "nodal";
            newprofileObj.privilege = "access_denied";
            newprofileObj.dateOfAccepting = "none";
            newprofileObj.nodalurlid = currentCount;
            useridref.set(currentCount);
            var idTableRef = new Firebase(FIREBASE_URL + "customUserIdTable/nodalCustomId/" + currentCount);
            idTableRef.set(usern.uid);
            newprofileObj.$save().then(function(ref) {
            }, function(error) {
              console.log("Error:", error);
            });
          });
        }), function(error) {
          console.log("Error:", error);
      };
    },
    
    createAdminForSpecialUsers: function (usern) {
      var studentAdminSync = (ref.child('admin/nodaladminUsers/' + usern.uid));
      studentAdminSync.set(usern.nodaladminemail);
    },    
    
    registerAdmin: function (usern) {
      return nodalauth.$createUser({email:usern.nodaladminemail, password:usern.adminpassword});
    },

    loginAdmin: function (usern, $scope) {
      var deferred = $q.defer();
      ref.authWithPassword({
          "email": usern.nodaladminemail,
          "password": usern.adminpassword
      }, function(error, authData) {
        if (error) {
          $scope.error = error.message;
          $scope.modalShown = false;
          $scope.$apply()
        } else {
          var usertype = NodalAuth.resolveUser().uid;
          deferred.resolve(usertype);
        }
      })
      return deferred.promise;
    },

    logout: function () {
      nodalauth.$unauth();
      if(NodalAuth.usern && NodalAuth.usern.profile) {
        NodalAuth.usern.profile.$destroy();
      }
      angular.copy({}, NodalAuth.usern);
    },

    resolveUser: function() {
      return nodalauth.$getAuth();
    },
    
    signedIn: function() {
      return !!NodalAuth.usern.provider;
    },
    usern: {}
  };

  nodalauth.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, NodalAuth.usern);
      NodalAuth.usern.profile = $firebaseObject(ref.child('profileForNodalAdmins').child(NodalAuth.usern.uid));
      NodalAuth.usern.sessions = $firebaseObject(new Firebase(FIREBASE_URL + 'profileForNodalAdmins/' + authData.uid + '/sessions' + '/'));
    } else {
      if(NodalAuth.usern && NodalAuth.usern.profile) {
        NodalAuth.usern.profile.$destroy();
      }
      angular.copy({}, NodalAuth.usern);
    }
  });

  return NodalAuth;
});

