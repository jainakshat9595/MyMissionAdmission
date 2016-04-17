'use strict';

app.controller('CollegeRegCtrl', function ($scope, $location, md5, $document, $http, $filter, CollegeReg, userb) {
  $scope.submitbuttondisabled = false;
  $scope.termsheck = false;
  if (userb) {
    $location.path('/');
  }

  $scope.roles = [
    {id: '0', text: 'Engineering'},
    {id: '1', text: 'Computer Applications / IT'},
    {id: '2', text: 'Biotechnology'},
    {id: '3', text: 'Microbiology'},
    {id: '4', text: 'Agriculture'},
    {id: '5', text: 'Food Technology'},
    {id: '6', text: 'Nutrition and Dietetics'},
    {id: '7', text: 'Arts (Humanities)'},
    {id: '8', text: 'Library Science'},
    {id: '9', text: 'Management'},
    {id: '10', text: 'Commerce'},
    {id: '11', text: 'Economics'},
    {id: '12', text: 'Hotel Management/Hospitality and Tourism'},
    {id: '13', text: 'Architecture'},
    {id: '14', text: 'Planning'},
    {id: '15', text: 'Fine Arts'},
    {id: '16', text: 'Performing Arts'},
    {id: '17', text: 'Pharmaceutical Sciences'},
    {id: '18', text: 'Ayurvedic Pharmaceutical Sciences'},
    {id: '19', text: 'Physiotherapy'},
    {id: '20', text: 'Paramedical Sciences'},
    {id: '21', text: 'Education'},    
    {id: '22', text: 'Physical Education'},
    {id: '23', text: 'Law'},
    {id: '24', text: 'Design'},
    {id: '25', text: 'Sciences'},
    {id: '26', text: 'Nursing'},
    {id: '27', text: 'Film & Television'},
    {id: '28', text: 'Media & Journalism'}
  ];
    $scope.uSer = {
      roles: []
    };

  $scope.rolesA = [
    {idA: '0', textA: 'Engineering'},
    {idA: '1', textA: 'Computer Applications / IT'},
    {idA: '2', textA: 'Biotechnology'},
    {idA: '3', textA: 'Microbiology'},
    {idA: '4', textA: 'Biochemistry'},
    {idA: '5', textA: 'Agriculture'},
    {idA: '6', textA: 'Food Technology'},
    {idA: '7', textA: 'Nutrition and Dietetics'},
    {idA: '8', textA: 'English and Foreign Languages'},
    {idA: '9', textA: 'Indian Languages'},
    {idA: '10', textA: 'Library Science'},
    {idA: '11', textA: 'Sociology'},
    {idA: '12', textA: 'Geography'},
    {idA: '13', textA: 'Management'},
    {idA: '14', textA: 'Commerce'},
    {idA: '15', textA: 'Economics'},
    {idA: '16', textA: 'Hotel Management/Hospitality and Tourism'},
    {idA: '17', textA: 'Architecture'},
    {idA: '18', textA: 'Planning'},
    {idA: '19', textA: 'Fine Arts'},
    {idA: '20', textA: 'Performing Arts'},
    {idA: '21', textA: 'Pharmaceutical Sciences'},
    {idA: '22', textA: 'Ayurvedic Pharmaceutical Sciences'},
    {idA: '23', textA: 'Physiotherapy'},
    {idA: '24', textA: 'Paramedical Sciences'},
    {idA: '25', textA: 'History'},
    {idA: '26', textA: 'Political Science'},
    {idA: '27', textA: 'Psychology'},
    {idA: '28', textA: 'Education'},    
    {idA: '29', textA: 'Physical Education'},
    {idA: '30', textA: 'Law'},
    {idA: '31', textA: 'Design'},
    {idA: '32', textA: 'Sciences'},
    {idA: '33', textA: 'Nursing'},
    {idA: '34', textA: 'Film & Television'},
    {idA: '35', textA: 'Media & Journalism'}
  ];
    $scope.uSerA = {
      rolesA: []
    };

    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };


    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.checkTerms = function() {
        $scope.termsheck = true;
    };

  $scope.registerForCollege = function () {
    if($scope.term !== true) {
      $scope.error = "Please agreed 'Terms of Services' and 'Privacy Policy'.";
      return;
    }
    else { 
        $scope.submitbuttondisabled = true;
        $scope.modalShown = true;
        var check = !(($scope.college_reg.confirm_password.$dirty) && ($scope.college_reg.confirm_password.$error.validator));
        var check1 = !(($scope.college_reg.confirm_email.$dirty) && ($scope.college_reg.confirm_email.$error.validator));
        if (check && check1) {
            CollegeReg.registerForCollege($scope.userb).then(function(userb) {
                userb.collegename = $scope.userb.collegename;
                userb.collegeaffiliation = $scope.userb.collegeaffiliation;
                userb.collegecountry = $scope.userb.collegecountry;
                userb.collegestate = $scope.userb.collegestate;
                userb.collegecity = $scope.userb.collegecity;
                userb.collegeaddress = $scope.userb.collegeaddress;
                userb.collegelocation = $scope.userb.collegelocation;
                userb.coursesofferedUG = $scope.uSer.roles;
                userb.coursesofferedPG = $scope.uSerA.rolesA;
                userb.collegewebsite = $scope.userb.collegewebsite;
                userb.collegephoto = $scope.userb.collegephoto.url;
                userb.counselloremail = angular.lowercase($scope.userb.counselloremail);
                userb.collegepassword = $scope.userb.collegepassword;
                userb.profiletype = $scope.userb.profiletype; 
                userb.collegetype = $scope.userb.collegetype;
                userb.collegId = $scope.userb.uid;
                userb.collegeAvailability = $scope.userb.collegeAvailability;
                userb.verifiedcollege = $scope.userb.verifiedcollege;
                userb.collegeRank = $scope.userb.collegeRank;
                userb.sessionCount= $scope.userb.sessionCount;
                userb.collegemobile= $scope.userb.collegemobile;
                userb.dateOfRegister = $filter('date')($scope.dt,'d MMMM yyyy');
                var md5_hash = md5.createHash($scope.userb.counselloremail || '');
                userb.md5_hash = md5_hash;
                

              CollegeReg.createProfileForCollege(userb);
              CollegeReg.createAdminForCollege(userb);
              var dataToPost = {
                                    to: userb.counselloremail, 
                                    pass: $scope.userb.collegepassword, 
                                    cname: $scope.userb.collegename,
                                    mobile: $scope.userb.collegemobile
                                };
                    $http({
                    url: "/sendcollegemail", 
                    method: "GET",
                    params: {   to: dataToPost.to,
                                cname: dataToPost.cname,
                                pass : dataToPost.pass
                            }
                    }).success(function(serverResponse) {
                        console.log(serverResponse);
                    }).error(function(serverResponse) {
                        console.log(serverResponse);
                    });

                    $http({
                    url: "/sendcollegeregistrationmailtoAdmin", 
                    method: "GET",
                    params: {   to: dataToPost.to,
                                cname: dataToPost.cname,
                                pass : dataToPost.pass,
                                mobile : dataToPost.mobile
                            }
                    }).success(function(serverResponse) {
                        console.log(serverResponse);
                    }).error(function(serverResponse) {
                        console.log(serverResponse);
                    });



            }, function(error){
                $scope.error = error.message;
                $scope.modalShown = false;
                $scope.submitbuttondisabled = false;
            });
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
         else {
            $scope.modalShown = false;
            $scope.submitbuttondisabled = false;
            $scope.message = "Please re-check emails";
        }
    }
  };
}).value('duScrollOffset', 30);