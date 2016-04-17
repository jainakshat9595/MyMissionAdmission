'use strict';

app.factory('CollegeReg', function ($firebaseAuth, $location, FIREBASE_URL, $firebaseObject, $firebaseArray) {
  var ref = new Firebase(FIREBASE_URL);
  var collegereg = $firebaseAuth(ref);

  var CollegeReg = {
    createProfileForCollege: function (userb) {
      var profile = {
        collegename: userb.collegename,
        collegeaffiliation: userb.collegeaffiliation,
        collegecountry: userb.collegecountry,
        collegestate: userb.collegestate,
        collegecity: userb.collegecity,
        collegeaddress: userb.collegeaddress, 
        collegelocation: userb.collegelocation,
        coursesofferedUG: userb.coursesofferedUG,
        coursesofferedPG: userb.coursesofferedPG,        
        collegewebsite: userb.collegewebsite,
        collegephoto: userb.collegephoto,
        counselloremail: userb.counselloremail,
        collegepassword: userb.collegepassword,
        profiletype: userb.profiletype, 
        collegetype: userb.collegetype,
        collegeAvailability : userb.collegeAvailability,
        verifiedcollege : userb.verifiedcollege,
        cId :  userb.collegeRank,
        sessionCount :  userb.sessionCount,
        collegemobile : userb.collegemobile,
        collegeId: userb.uid,
        md5_hash: userb.md5_hash
      };

      var collegeprofileRef = (ref.child('profileForCollege/'  + userb.uid));
      return collegeprofileRef.set(profile, function(ref) {
          var newRef = new Firebase(FIREBASE_URL);
          var collegeref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + userb.uid);
          var newprofileObj = $firebaseObject(collegeref);

          var useridref = new Firebase(FIREBASE_URL + '/' + 'currentUID' );
          useridref.once("value",function(snapshot){
            var currentCount = snapshot.val()+1;
            newprofileObj.collegename = userb.collegename;
            newprofileObj.collegeaffiliation = userb.collegeaffiliation;
            newprofileObj.collegecountry = userb.collegecountry;
            newprofileObj.collegestate = userb.collegestate;
            newprofileObj.collegecity = userb.collegecity;
            newprofileObj.collegeaddress = userb.collegeaddress;
            newprofileObj.collegelocation = userb.collegelocation;
            newprofileObj.coursesofferedUG = userb.coursesofferedUG;
            newprofileObj.coursesofferedPG = userb.coursesofferedPG;
            newprofileObj.collegewebsite = userb.collegewebsite;
            newprofileObj.collegephoto = userb.collegephoto;
            newprofileObj.counselloremail = userb.counselloremail;
            newprofileObj.collegepassword = userb.collegepassword;
            newprofileObj.profiletype = userb.profiletype;
            newprofileObj.collegetype = userb.collegetype;
            newprofileObj.collegeAvailability = userb.collegeAvailability;
            newprofileObj.verifiedcollege = userb.verifiedcollege;          
            newprofileObj.collegeId = userb.uid;
            newprofileObj.md5_hash = userb.md5_hash;
            newprofileObj.cId = userb.collegeRank;
            newprofileObj.sessionCount = userb.sessionCount;
            newprofileObj.collegemobile = userb.collegemobile;
            newprofileObj.dateOfAccepting = "none";
            newprofileObj.dateOfRegister = userb.dateOfRegister;
            newprofileObj.hasapprovedSessions = "no";
            newprofileObj.feedbacknotgivenCount = 0;
            newprofileObj.rejectedsessionCount = 0;
            newprofileObj.approvesessionCount = 0;
            newprofileObj.pendingsessionCount = 0;
            newprofileObj.collegeurlid = currentCount;
            useridref.set(currentCount);
            var idTableRef = new Firebase(FIREBASE_URL + "customUserIdTable/collegeCustomId/" + currentCount);
            idTableRef.set(userb.uid);
            newprofileObj.$save().then(function(ref) {
              $location.path('/success');
            }, function(error) {
              console.log("Error:", error);
            });
          });
        }), function(error) {
          console.log("Error:", error);
      };
    },

    createAdminForCollege: function (userb) {
      var collegeAdminSync = (ref.child('admin/collegeUsers/' + userb.uid));
      collegeAdminSync.set(userb.counselloremail);
    },

    registerForCollege: function (userb) {
      return collegereg.$createUser({ email:userb.counselloremail, password:userb.collegepassword });
    },

    userb: {}
  };
  return CollegeReg;
});