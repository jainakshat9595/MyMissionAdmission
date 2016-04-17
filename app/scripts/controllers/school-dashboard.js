'use strict';

app.controller('SchoolDashCtrl', function ($scope, $document,  $filter, $controller, md5,$interval, $http ,$location,SchoolTask , toaster, Search, reCAPTCHA, $window, AuthSchool) {
  
  $scope.users = AuthSchool.users;
  $scope.submitbuttondisabled = false;
  $scope.signedIn = AuthSchool.signedIn;
  
  $scope.submitdisabled = true;

  $scope.gender = [{
          name: "Male"
       },{  
          name: "Female"
  }];

  
  $scope.doThisForStudent = function(studentEmail1) {
    studentEmail1 = angular.lowercase(studentEmail1); 
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        $scope.refBysameNodal="";
        //$scope.submitdisabled = true;
      }
      else {
        Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result;
          if($scope.student1Uid !== "user doesnot exists") {
            $scope.student1IdFlag = "Done";
            $scope.student1Name = Search.getStudentName($scope.student1Uid);
            $scope.studentPic = Search.getStudentPhoto($scope.student1Uid);
            Search.getSchoolRefer($scope.student1Uid).then(function(result) {
              $scope.student1schoolstatus= result;
              if(($scope.student1schoolstatus.$value) === $scope.users.profile.schoolCode )
                $scope.refBysameNodal="yes";
              else
                $scope.refBysameNodal="no";
            });
          }
          else{
            $scope.student1IdFlag = "Not Done";
          }

        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

  $scope.go = function ( path ) {
      $location.path( path );
  };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
  };

  /*$scope.sendnodallink = function() {
  toaster.pop('wait', "Sending Invitation", 'Sending Email', 10000);
  var currentuser = NodalAuth.resolveUser().uid;
  var data = currentuser.split(":");
  var str2 = data[1];
  var referredBy = str2;

  var studentid = $scope.student1Uid;
  var id = studentid.split(":");
  var str3 = id[1];

    NodalTask.viewChanges(studentid).then(function(result) { 
        var dataToPost = {
                                to: result.email, 
                                referredBy: referredBy, 
                                sname: result.studentname,
                                hashkey : result.md5_hash,
                                urlId : str3,
                                adminName : $scope.usern.profile.nodalAdminName,
                                adminEmail : $scope.usern.profile.nodalAdminEmail,
                                adminPhone : $scope.usern.profile.nodalPhone,
                                centerName : $scope.usern.profile.nodalCenterName,
                                centerCity : $scope.usern.profile.nodalCity,
                                centerState : $scope.usern.profile.nodalState,
                                centerCountry : $scope.usern.profile.nodalCountry


                          };
                $http({
                url: "/sendstudentnodalmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            referredBy: dataToPost.referredBy,
                            hashkey : dataToPost.hashkey,
                            urlId : dataToPost.urlId,
                            adminName : dataToPost.adminName,
                            adminEmail : dataToPost.adminEmail,
                            adminPhone : dataToPost.adminPhone,
                            centerName : dataToPost.centerName,
                            centerCity : dataToPost.centerCity,
                            centerState : dataToPost.centerState,
                            centerCountry : dataToPost.centerCountry
                        }
                }).success(function(serverResponse) {
                      toaster.clear();
                      toaster.pop('success', "Thankyou!", "Your Invitation Link has been sent.");
                      console.log(serverResponse);
                }).error(function(serverResponse) {
                      toaster.clear();
                      toaster.pop('error', "Oops!", "Something went wrong please try after some time.");
                      console.log(serverResponse);
                    }
                });
              });

  };*/


  $scope.register = function () {
    if($scope.term !== true) {
      $scope.error = "Please agreed 'Terms of Services' and 'Privacy Policy'.";
      return;
    }
    else {
        $scope.submitbuttondisabled = true;
        $scope.modalShown = true;
        var check = !(($scope.student_reg.confirm_password.$dirty) && ($scope.student_reg.confirm_password.$error.validator));
        var check1 = !(($scope.student_reg.confirm_email.$dirty) && ($scope.student_reg.confirm_email.$error.validator));
        if (check && check1 ) {
              var user = {};
              user.md5_hash = md5.createHash($scope.user.email || '');
              user.studentname = $scope.user.studentname;
              user.studentphoto = $scope.user.studentphoto.url;
              user.studentdocument = $scope.user.studentdocument.url;
              user.studentmobile = $scope.user.studentmobile;
              user.email = angular.lowercase($scope.user.email); 
              user.fathername = $scope.user.fathername;
              user.gender = $scope.user.gender;
              user.occupation = $scope.user.occupation;
              user.fathernumber = $scope.user.fathernumber;
              user.academicrecord12th = $scope.user.master12th;
              user.academicrecord12thText = $scope.user.master12thText;
              user.academicrecordUG = $scope.user.masterUG;
              user.academicrecordUGText = $scope.user.masterUGText;
              user.school = $scope.users.profile.schoolname;
              user.academicrecordPGText = $scope.user.masterPGText;
              user.referredBySchool = $scope.users.profile.schoolCode;
              user.referredBy = "nobody";
              user.dateOfApplying = $filter('date')(new Date(),'d MMMM yyyy');
              if(typeof $scope.user.studentabout !== 'undefined'){
                user.studentabout = $scope.user.studentabout;
              }

              if(typeof $scope.user.studentclass !== 'undefined'){
                user.studentclass = $scope.user.studentclass;
              }
              if(typeof $scope.user.studentstream !== 'undefined'){
                  if($scope.user.standard === 'before' ){
                    user.studentstream = null;
                  }
                  else{
                    user.studentstream = $scope.user.studentstream;
                  }
              }
              user.password = $scope.user.password;
              user.oldPassword = $scope.user.oldPassword;
              user.profiletype = "student";
              user.studentAvailability = "offline";
              user.studentstatus = "notverified";
              user.emailverificationstatus = "false";
              SchoolTask.registerStudentsTemporarly(user, $scope);
          /*SchoolTask.register($scope.user).then(function(user) {
              user.md5_hash = md5.createHash($scope.user.email || '');
              user.studentname = $scope.user.studentname;
              user.studentphoto = $scope.user.studentphoto.url;
              user.studentdocument = $scope.user.studentdocument.url;
              user.studentmobile = $scope.user.studentmobile;
              user.email = angular.lowercase($scope.user.email); 
              user.fathername = $scope.user.fathername;
              user.gender = $scope.user.gender;
              user.occupation = $scope.user.occupation;
              user.fathernumber = $scope.user.fathernumber;
              user.academicrecord12th = $scope.user.master12th;
              user.academicrecord12thText = $scope.user.master12thText;
              user.academicrecordUG = $scope.user.masterUG;
              user.academicrecordUGText = $scope.user.masterUGText;
              user.school = $scope.users.profile.schoolname;
              user.academicrecordPGText = $scope.user.masterPGText;
              user.referredBySchool = $scope.users.profile.schoolCode;
              user.referredBy = "nobody";
              user.dateOfApplying = $filter('date')(new Date(),'d MMMM yyyy');
              if(typeof $scope.user.studentabout !== 'undefined'){
                user.studentabout = $scope.user.studentabout;
              }

              if(typeof $scope.user.studentclass !== 'undefined'){
                user.studentclass = $scope.user.studentclass;
              }
              if(typeof $scope.user.studentstream !== 'undefined'){
                  console.log($scope.user.standard);
                  if($scope.user.standard === 'before' ){
                    user.studentstream = null;
                    console.log("in before");
                  }
                  else{
                    user.studentstream = $scope.user.studentstream;
                  }
              }
              user.password = $scope.user.password;
              user.profiletype = "student";
              user.studentAvailability = "offline";
              user.studentstatus = "notverified";
              user.emailverificationstatus = "false";
               SchoolTask.createProfile(user); 
              $scope.modalShown = false;
              var str = user.uid;
              var urlId = str.split(":");
              SchoolTask.createAdminForStudent(user);
              SchoolTask.createStudentListForSchool(user);
              var dataToPost = {
                                    to: user.email, 
                                    pass: $scope.user.password, 
                                    sname: $scope.user.studentname,
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
          }, function(error) {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.error = error.toString();
          });*/
          $scope.message = "";
          $scope.error ="";
        }
        else if (!check1 && !check)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check emails & passwords";
        }
        else if (!check)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check passwords";
        }
        /*else if (!check4)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please Select PG courses";
        }*/
        /*else if (!check2)
          {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please Select UG courses";
         }*/
         else {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check emails";
        }
    }
  };
}).value('duScrollOffset', 30);
