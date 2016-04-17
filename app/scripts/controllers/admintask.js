'use strict';

app.controller('AdminTaskCtrl', function ($scope, $filter, $window, $document,$timeout, $http, $location, NodalAuth, Search, Session, AdminAuth, AdminTask, Update, $sce, toaster,NodalTask) {
  
  $scope.usera = AdminAuth.usera;
  $scope.collegetype = Search.allAsArray;
  $scope.signedIn = AdminAuth.signedIn;
  $scope.totalPendingSessions = 0;
    $scope.pendingCollege = [];
    $scope.rejectedColleges = [];
    $scope.videourl = [];
    $scope.chkToSaveCountryState = [];
    $scope.chkToSaveCollegePhoto = [];
    $scope.message = "ede";
    $scope.stu = AdminTask.getstudents(); 
    $scope.deleteCheck= "Not";
    $scope.admin = Search.getAdmins();
    $scope.approvedSessionsCount = 0;
    $scope.nod = AdminTask.getnodals();
    $scope.usern = NodalAuth.usern;
    $scope.emailList = [];
    $scope.List = [];

    $scope.bulkSessionFlag = "";
    $scope.deleteSessionFlag = "Not";
    $scope.count = [];
    $scope.pass="";
    $scope.showConfirmBlockPop = false;
    $scope.btndisabled=true;
    $scope.reason = "";

    $scope.student1Uid = "";
    $scope.student2Uid = "";
    $scope.student3Uid = "";
    $scope.student4Uid = "";
    $scope.student5Uid = "";
    $scope.student6Uid = "";
    $scope.student7Uid = "";
    $scope.student8Uid = "";
    $scope.student9Uid = "";
    $scope.student10Uid = "";
    $scope.collegeIdFlag = "";
    $scope.student1IdFlag = "";
    $scope.student2IdFlag = "";
    $scope.student4IdFlag = "";
    $scope.student5IdFlag = "";
    $scope.student6IdFlag = "";
    $scope.student7IdFlag = "";
    $scope.student8IdFlag = "";
    $scope.student9IdFlag = "";
    $scope.student3IdFlag = "";
    $scope.student10IdFlag = "";

    $scope.submitdisabled = true;
    $scope.demosubmitdisabled = true;
    $scope.emptyfield = "";
  
    

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

    $scope.getSchools = function () {   
      $scope.school = AdminTask.getSchools();
    };

    $scope.verifySchool = function (school) {   
     AdminTask.verifySchool(school);
    };



    $scope.totalsessionCount = 0;
    $scope.totalpendingsessionCount = 0;
    $scope.totalrejectedsessionCount = 0;
    $scope.totalfeedbacknotgivenCount = 0;
    $scope.totalapprovesessionCount = 0;
    $scope.totalfacetofacesessionCount = 0;
    $scope.totalextrasessionCount = 0;
    $scope.totalcontractsessionCount = 0;
    $scope.totalservicecount = 0;



  $scope.totalCount = function (sessioncount, pendingcount, rejectedsessionCount, feedbacknotgivenCount, approvesessionCount, facetofacesessioncount, extrasessioncount, contractsessionscount, collegetype ) {
    $scope.totalsessionCount = $scope.totalsessionCount +  sessioncount;
    $scope.totalpendingsessionCount = $scope.totalpendingsessionCount + pendingcount;
    $scope.totalrejectedsessionCount = $scope.totalrejectedsessionCount + rejectedsessionCount;
    $scope.totalfeedbacknotgivenCount = $scope.totalfeedbacknotgivenCount + feedbacknotgivenCount;
    $scope.totalapprovesessionCount = $scope.totalapprovesessionCount + approvesessionCount ;
    if(typeof facetofacesessioncount !== 'undefined' ){
      $scope.totalfacetofacesessionCount = $scope.totalfacetofacesessionCount + facetofacesessioncount;
    }
    if(typeof extrasessioncount !== 'undefined'  ){
      $scope.totalextrasessionCount = $scope.totalextrasessionCount + extrasessioncount;
    }
    if(typeof contractsessionscount !== 'undefined' && collegetype == 'paid'){
      $scope.totalcontractsessionCount = $scope.totalcontractsessionCount + contractsessionscount;
      if(typeof facetofacesessioncount === 'undefined'){
        facetofacesessioncount =0;
      }
      if(typeof extrasessioncount === 'undefined'){
        extrasessioncount =0;
      }
      if(typeof approvesessionCount === 'undefined'){
        approvesessionCount =0;
      }
      if(typeof contractsessionscount === 'undefined'){
        contractsessionscount =0;
      }

      if(typeof facetofacesessioncount === 'undefined'){
        facetofacesessioncount =0;
      }
      if(typeof extrasessioncount === 'undefined'){
        extrasessioncount =0;
      }
        if(contractsessionscount >= approvesessionCount + pendingcount + feedbacknotgivenCount + facetofacesessioncount + extrasessioncount){
          $scope.totalservicecount = $scope.totalservicecount + approvesessionCount + pendingcount + feedbacknotgivenCount + facetofacesessioncount + extrasessioncount  -  (contractsessionscount);
        }
    }

  };

    $scope.totalsessionCountpaid = 0;
    $scope.totalpendingsessionCountpaid = 0;
    $scope.totalrejectedsessionCountpaid = 0;
    $scope.totalfeedbacknotgivenCountpaid = 0;
    $scope.totalapprovesessionCountpaid = 0;
    $scope.totalfacetofacesessionCountpaid = 0;
    $scope.totalextrasessionCountpaid = 0;
    $scope.totalcontractsessionCountpaid = 0;
    $scope.totalservicecountpaid = 0;  

  $scope.totalCountForPaid = function (sessioncount, pendingcount, rejectedsessionCount, feedbacknotgivenCount, approvesessionCount, facetofacesessioncount, extrasessioncount, contractsessionscount ) {
    $scope.totalsessionCountpaid = $scope.totalsessionCountpaid +  sessioncount;
    $scope.totalpendingsessionCountpaid = $scope.totalpendingsessionCountpaid + pendingcount;
    $scope.totalrejectedsessionCountpaid = $scope.totalrejectedsessionCountpaid + rejectedsessionCount;
    $scope.totalfeedbacknotgivenCountpaid = $scope.totalfeedbacknotgivenCountpaid + feedbacknotgivenCount;
    $scope.totalapprovesessionCountpaid = $scope.totalapprovesessionCountpaid + approvesessionCount ;
    if(typeof facetofacesessioncount !== 'undefined' ){
      $scope.totalfacetofacesessionCountpaid = $scope.totalfacetofacesessionCountpaid + facetofacesessioncount;
    }
    if(typeof extrasessioncount !== 'undefined' ){
      $scope.totalextrasessionCountpaid = $scope.totalextrasessionCountpaid + extrasessioncount;
    }
    if(typeof contractsessionscount !== 'undefined' ){
      $scope.totalcontractsessionCountpaid = $scope.totalcontractsessionCountpaid + contractsessionscount;
    }
        if(typeof facetofacesessioncount === 'undefined'){
        facetofacesessioncount =0;
      }
      if(typeof extrasessioncount === 'undefined'){
        extrasessioncount =0;
      }
      if(typeof approvesessionCount === 'undefined'){
        approvesessionCount =0;
      }
      if(typeof contractsessionscount === 'undefined'){
        contractsessionscount =0;
      }

      if(typeof facetofacesessioncount === 'undefined'){
        facetofacesessioncount =0;
      }
      if(typeof extrasessioncount === 'undefined'){
        extrasessioncount =0;
      }
      
          if(contractsessionscount >= approvesessionCount + pendingcount + feedbacknotgivenCount + facetofacesessioncount + extrasessioncount){
            $scope.totalservicecountpaid  = $scope.totalservicecountpaid + (approvesessionCount + pendingcount + feedbacknotgivenCount + facetofacesessioncount + extrasessioncount) -  (contractsessionscount);
          }  
  };

  $scope.hidediv = "Not Done";

  $scope.paidcolleges = function (){
    $scope.hidediv = "Done";
  };

  $scope.allcolleges = function (){
    $scope.hidediv = "Not Done";
  };

  $scope.changeSubscription = function (college) {
    AdminTask.changeSubscription(college);
  };

  $scope.countSession = function (college,id) {
      AdminTask.countSession(college).then ( function ( result ) {
         $scope.count[id] = result;
        }); 
      AdminTask.countApprovedSession(college);
   };

  $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 2000).then(function() {
      });
    };

    $scope.enableBlockBtn = function(){
      $scope.btndisabled =false;

    };

    $scope.passStudentDetail = function(studentId) {
      $scope.stId = studentId;
    };

    $scope.verifyCollege = function (college) {
        AdminTask.verifyCollege(college, $filter('date')($scope.dt,'d MMMM yyyy'),$scope.roles,$scope.rolesA);
        


       


////////////////////////////////////////////////////////////////////
    };

    $scope.verifyStudent = function (student) {
        
        AdminTask.verifyStudent(student);
        
    }; 

    $scope.checkPercantage = function(id, email,check,contract,aprrovedsession,pendingsession,feedbacksesssion,face2face,extrasession){
        if(typeof face2face === 'undefined'){
              face2face =0;
          }
        else if(typeof extrasession === 'undefined' ){
             extrasession = 0; 
          }
    
    if((contract *10)/100 > 10 ){
          
          if(aprrovedsession+pendingsession+feedbacksesssion+face2face+extrasession >= contract + 10){
            AdminAuth.makeLiveCollegesByTotal(id, email);
          }
     }
     else{
           
            if(typeof face2face === 'undefined'){
              face2face =0;
            }
            else if(typeof extrasession === 'undefined' ){
             extrasession = 0; 
            }
            var ses = aprrovedsession+pendingsession+feedbacksesssion+face2face+extrasession;
            var ci = contract + (contract * 0.1);
            if(ses >= ci ){
                AdminAuth.makeLiveCollegesByTotal(id, email);
            }
     }
    };

    $scope.makelive = function(id, email){
      AdminAuth.addLiveColleges(id, email);
    };

    $scope.unverifyStudent = function (student) {
        
        AdminTask.unverifyStudent(student);
        
    };

    $scope.hideCollege = function (college) {
        AdminTask.hideCollege(college,$scope.roles,$scope.rolesA);
        
    };

    $scope.blockStudent = function (student) {

        AdminTask.blockStudent(student,$scope.reason);
        
    };

    $scope.unblockStudent = function (student) {
        
        AdminTask.unblockStudent(student);
        
    };


    $scope.changecounsellermail = function(){

         AdminTask.changecounsellermail($scope.user,$scope);
         
    };

    $scope.changeadminemail = function(usera){
         Search.getAdminIdByEmail($scope.user.email).then (function (result) {
            if(result !== "user doesnot exists") {
              Search.getAdminDetail(result).then ( function ( result11 ) {
                  AdminTask.changeadminemail($scope.user,$scope, usera,result11);                                                        
              });
            }  
          });
         
    };

    $scope.changenodalemail = function(usera){
         Search.getNodalIdByEmail($scope.user.email).then (function (result) {
            if(result !== "user doesnot exists") {
              Search.getNodalAdminDetail(result).then ( function ( result11 ) {
                  AdminTask.changenodalemail($scope.user,$scope, usera,result11);
                
              });
            }  
          });        
         
    };

    $scope.changestudentmail = function(){

         AdminTask.changestudentmail($scope.user,$scope);

    };
    
    $scope.changeRank = function (college, cid) {
        AdminTask.changeRank(college, cid, $scope);

    };

    $scope.verifyNodal = function (usern) {

        AdminTask.verifyNodal(usern, $filter('date')($scope.dt,'d MMMM yyyy'));

    };

    $scope.unverifyNodal = function (usern) {
        
        AdminTask.unverifyNodal(usern);
        
    };
    
    $scope.changestudentpassword = function(){

         AdminTask.changestudentpassword($scope.user,$scope);

    };

    $scope.changenodalpassword = function(usera){
         Search.getNodalIdByEmail($scope.user.email).then (function (result) {
            if(result !== "user doesnot exists") {
              Search.getNodalAdminDetail(result).then ( function ( result11 ) {
                  AdminTask.changenodalpassword($scope.user,$scope, usera,result11);
              });
            }  
          });
    };

    $scope.changecollegepassword = function(){

         AdminTask.changecollegepassword($scope.user,$scope);

    };

    $scope.changeadminpassword = function(usera){
         Search.getAdminIdByEmail($scope.user.email).then (function (result) {
            if(result !== "user doesnot exists") {

              Search.getAdminDetail(result).then ( function ( result11 ) {
                  AdminTask.changeadminpassword($scope.user, $scope, usera,result11);
              });
            }  
          });
    };

    $scope.doThisForadmin = function(adminEmail) {
    adminEmail = angular.lowercase(adminEmail);
      if(!adminEmail) {
        $scope.adminIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        Search.getAdminIdByEmail(adminEmail).then ( function ( result ) {
        $scope.adminUid = result;
        if($scope.adminUid !== "user doesnot exists") {
          $scope.adminIdFlag = "Done";
         Search.getAdminDetail($scope.adminUid).then ( function ( result11 ) { 
          $scope.adminname =result11.adminname;
          });
          $scope.submitdisabled = false;       
         }
        else{
          $scope.adminIdFlag = "Not Done";
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.adminIdFlag = "Not Done";
          $scope.submitdisabled = true;
          console.log(error);
        });
      }
    };

    $scope.getadminemail2 = function(adminId) {
     
      return Search.getAdminDetail2(adminId);

    };  

    $scope.updateoperation = function(college) {
     if(typeof college.accountmanagera != 'undefined' ){ 
          $scope.message = $scope.message + Update.updateOperationemail(college,college.accountmanagera,$scope);  
        }
    };

    $scope.trainingRequest = function (collegeid) {
      AdminTask.trainingRequest(collegeid);
    };

    $scope.TrainingDone = function (collegeid,counsellor,trainer,remarks,contact,successful) { 
      var datee = $filter('date')(new Date(),'yyyy-MM-dd');

     if(typeof counsellor === 'undefined' || typeof trainer === 'undefined' || typeof remarks === 'undefined' || typeof contact === 'undefined' ){
          $scope.emptyfield = "Please fill all the fields";
      }
      else{
          if(typeof successful === 'undefined' || successful === false){
            successful = "false";
          }
          else{
            successful = "true";
          }

          var s = contact;
          if (/[0-9]{3}-?[0-9]{6,12}$/.test(+s) && s.length <= 15) {
            $scope.emptyfield = "";
            AdminTask.trainingDone(collegeid,counsellor,trainer,remarks,contact,successful,datee); 
          }
          else{
            $scope.emptyfield = "Please enter correct contact number";
          }

          
      }
    };

    $scope.updateSessionContract = function (collegeId, college) {
      if(typeof college.contractsessions != 'undefined' ){
        Update.updateCollegecontractsessions($scope, collegeId, college, college.contractsessions);
        toaster.pop('success', "Sessions as per contract is successfully updated.");
      }
    };
      
    $scope.input = [];      

    $scope.inputDone = function(index) {
       $scope.input[index] = "done";
    };


    $scope.updateCollege = function (collegeId, college, dummyCountry, dummyState, dummyPhoto) {
        var collegename = college.collegename;
        var collegewebsite = college.collegewebsite;
        var collegeaffiliation = college.collegeaffiliation;
        var collegeaddress = college.collegeaddress;
        var collegecity = college.collegecity;
        var collegelocation = college.collegelocation;
        var facetofacesessions = college.facetofacesessions;
        var counsellornames = college.counsellornames;
        var counsellornumbers = college.counsellornumbers;
        var counselloremails = college.counselloremails;
        var higherauthoritynames = college.higherauthoritynames;
        var higherauthoritynumbers = college.higherauthoritynumbers;
        var higherauthorityemails = college.higherauthorityemails; 
        
        $scope.message = "";
        $scope.message = $scope.message + Update.updateCollegeName(college, collegename);
        $scope.message = $scope.message + Update.updateCollegeAffiliation(college, collegeaffiliation);
        $scope.message = $scope.message + Update.updateCollegeWebsite(college, collegewebsite);
        $scope.message = $scope.message + Update.updateCollegeAddress(college, collegeaddress);
        $scope.message = $scope.message + Update.updateCollegeCity(college, collegecity);
        $scope.message = $scope.message + Update.updateCollegeLocation(college, collegelocation);

        if(typeof college.facetofacesessions !== 'undefined' ){
        $scope.message = $scope.message + Update.updateCollegefacetofacesession(college, facetofacesessions);
        }     
        

        if(typeof counsellornames !== 'undefined' ){ 
          $scope.message = $scope.message + Update.updateCounsellorname(college, counsellornames);  
        }
        if(typeof counsellornumbers !== 'undefined' ){ 
          $scope.message = $scope.message + Update.updateCounsellorsnumber(college, counsellornumbers);
        }
        if(typeof counselloremails !== 'undefined' ){ 
          $scope.message = $scope.message + Update.updateCounsellorsemail(college, counselloremails);
        }
        if(typeof higherauthoritynames !== 'undefined' ){ 
          $scope.message = $scope.message + Update.updateHighername(college, higherauthoritynames);  
        }
        if(typeof higherauthoritynumbers !== 'undefined' ){ 
          $scope.message = $scope.message + Update.updateHighernumber(college, higherauthoritynumbers);
        }
        if(typeof higherauthorityemails !== 'undefined' ){ 
          $scope.message = $scope.message + Update.updateHigheremail(college, higherauthorityemails);
        }    
        
        if($scope.chkToSaveCountryState[collegeId]==='YES' && (typeof dummyCountry !== 'undefined') && (typeof dummyState !== 'undefined')){
            $scope.message = $scope.message + Update.updateCollegeCountry(college, dummyCountry);
            $scope.message = $scope.message + Update.updateCollegeState(college, dummyState);
        }
        if($scope.chkToSaveCollegePhoto[collegeId]==='YES' && (typeof dummyPhoto !== 'undefined')){
            $scope.message = $scope.message + Update.updateCollegePhoto(college, dummyPhoto.url);
        }

          $scope.message = $scope.message + " were successfully updated!";
    };


    $scope.preparecollegeUG = function(college) {
        $scope.submitsuccesstext = false;
        var test = [];
        Update.getUGCoursescollege(college).then ( function ( result ) {
        var test  = result;
            if (typeof test == 'undefined'){
                college.coursesofferedUG = [];  
                $scope.uSer.roles= college.coursesofferedUG;
            }
          else{
                Update.getUGCoursescollege(college).then ( function ( result ) {
                college.coursesofferedUG = result;
             
          }, function(error){
              console.log(error);
          });
        }             
          }, function(error){
              console.log(error);
          });
  };
  
  $scope.updateUGcollege = function(college) {
       
      $scope.submitsuccesstext = false;
      var ug = college.coursesofferedUG;
      Update.updateCollegeUG($scope,college,ug); 
       
    };

  $scope.preparecollegePG = function(college) {
        $scope.submitsuccesstext = false;
        var testb = [];
        Update.getPGCoursescollege(college).then ( function ( result ) {
        var testb  = result;
          if (typeof testb == 'undefined'){
                college.coursesofferedPG = [];  
                $scope.uSerA.rolesA= college.coursesofferedPG;
          }
          else{
                Update.getPGCoursescollege(college).then ( function ( result ) {
                college.coursesofferedPG = result;
             
          }, function(error){
              console.log(error);
          });
        }             
          }, function(error){
              console.log(error);
          });
  };

  $scope.updatePGcollege = function(college) {
      $scope.submitsuccesstext = false;
      var pg = college.coursesofferedPG;
      Update.updateCollegePG($scope,college,pg);
    
  };

  $scope.cancelcollege = function(college) {
     $scope.submitsuccesstext = false; 
     var test = [];
     Update.refershcollege(college).then( function ( result ) {
     var canceling  = result;
     college.coursesofferedPG = canceling.coursesofferedPG;
     college.coursesofferedUG = canceling.coursesofferedUG;
     },
     function(error){
       console.log(error);
     }); 
  };

    $scope.today = function() {
        $scope.dt = new Date();
    };
      
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

      // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = new Date();
    };
      
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };

    $scope.logoutcollege = function(email) {
       Search.getCollegeIdByEmail(email).then ( function ( result ) {
         AdminTask.logoutcollege(result);
        }, function(error){
          console.log(error);
        });
    };
    
    $scope.studentDetail = function (studentId) {
          $scope.studentobject = Search.getStudentDetail(studentId);
          //console.log($scope.studentobject);
    };

    $scope.nodalDetail = function (nodalId) {
          $scope.nodalobject = Search.getNodalDetail(nodalId);
          //console.log($scope.studentobject);
    };

    $scope.doThisForStdConfirmPassword = function(studentPassword1,studentPassword2) {
         if(!studentPassword1 || !studentPassword2)
         {
          $scope.StudentIdFlag1 = "";
         }
         else
         {
      if(studentPassword1==studentPassword2)
          $scope.StudentIdFlag1="Done";
        else
          $scope.StudentIdFlag1="Not Done";
      }

    };

    $scope.doThisForNodalConfirmPassword = function(nodalPassword1,nodalPassword2) {
         if(!nodalPassword1 || !nodalPassword2)
         {
          $scope.nodalIdFlag1 = "";
         }
         else
         {
      if(nodalPassword1==nodalPassword2)
          $scope.nodalIdFlag1="Done";
        else
          $scope.nodalIdFlag1="Not Done";
      }

    };

    $scope.doThisForAdminConfirmPassword = function(adminPassword1,adminPassword2) {
         if(!adminPassword1 || !adminPassword2)
         {
          $scope.adminIdFlag1 = "";
         }
         else
         {
      if(adminPassword1==adminPassword2)
          $scope.adminIdFlag1="Done";
        else
          $scope.adminIdFlag1="Not Done";
      }
    };

     $scope.doThisForClgConfirmPassword = function(clgPassword1,clgPassword2) {
         if(!clgPassword1 || !clgPassword2)
         {
          $scope.clgIdFlag1 = "";
         }
         else
         {
      if(clgPassword1==clgPassword2)
          $scope.clgIdFlag1="Done";
        else
          $scope.clgIdFlag1="Not Done";
      }

    };

    $scope.doThisForStdPassChange = function(studentEmail) {
      if(!studentEmail) {
        $scope.StudentIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        Search.getStudentIdByEmail(studentEmail).then ( function ( result ) {
        $scope.studentUid = result;
        if($scope.studentUid !== "user doesnot exists") {
          $scope.studentIdFlag = "Done";
          $scope.studentName = Search.getStudentName($scope.studentUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.studentIdFlag = "Not Done";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.studentIdFlag = "Not Done";
         
          console.log(error);
        });
      }
    };

    $scope.adminIdFlag = "";
    $scope.doThisForAdminPassChange = function(adminEmail) {
      if(!adminEmail) {
        $scope.adminIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        Search.getAdminIdByEmail(adminEmail).then ( function ( result ) {
        $scope.adminUid = result;
        if($scope.adminUid !== "user doesnot exists") {
          $scope.adminIdFlag = "Done";
          $scope.adminName = Search.getAdminName($scope.adminUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.adminIdFlag = "Not Done";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.adminIdFlag = "Not Done";
         
          console.log(error);
        });
      }
    };

    $scope.doThisForNodalPassChange = function(nodalEmail) {
      if(!nodalEmail) {
        $scope.nodalIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        Search.getNodalIdByEmail(nodalEmail).then ( function ( result ) {
        $scope.nodalUid = result;
        if($scope.nodalUid !== "user doesnot exists") {
          $scope.nodalIdFlag = "Done";
          $scope.nodalName = Search.getNodalName($scope.nodalUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.nodalIdFlag = "Not Done";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.nodalIdFlag = "Not Done";
         
          console.log(error);
        });
      }
    };

    $scope.doThisForClgPassChange = function(collegeEmail) {
      if(!collegeEmail) {
        $scope.collegeIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        Search.getCollegeIdByEmail(collegeEmail).then ( function ( result ) {
        $scope.collegeUid = result;
        if($scope.collegeUid !== "user doesnot exists") {
          $scope.collegeIdFlag = "Done";
          $scope.collegeName = Search.getCollegeName($scope.collegeUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.collegeIdFlag = "Not Done";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.collegeIdFlag = "Not Done";
        });
      }
    };

    $scope.doThisForStudent1 = function(studentEmail1) { 
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        $scope.student1Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student6IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else {
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";      
        Search.getStudentIdAndUrlidByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result.uid;
          $scope.student1urlId = result.urlId;
          if($scope.student1Uid !== "user doesnot exists") {
            $scope.student1IdFlag = "Done";
            $scope.student1Name = Search.getStudentName($scope.student1Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
          }
          else{
            $scope.student1IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student6IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent2 = function(studentEmail2) {
      if(!studentEmail2){
        $scope.student2IdFlag = "";
        $scope.student2Uid = "";
        $scope.student2Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";      
        Search.getStudentIdAndUrlidByEmail(studentEmail2).then ( function ( result ) {
          $scope.student2Uid = result.uid;
          $scope.student2urlId = result.urlId;
          if(($scope.student2Uid !== "user doesnot exists") && ($scope.student2Uid != $scope.student1Uid)) {
            $scope.student2IdFlag = "Done";
            $scope.student2Name = Search.getStudentName($scope.student2Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           //////// console.log("UserId in Controller :" +$scope.student2Uid);
          }
          else{
            $scope.student2IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student2IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent3 = function(studentEmail3) {
      if(!studentEmail3){
        $scope.student3IdFlag = "";
        $scope.student3Uid = "";
        $scope.student3Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";    
        Search.getStudentIdAndUrlidByEmail(studentEmail3).then ( function ( result ) {
          $scope.student3Uid = result.uid;
          $scope.student3urlId = result.urlId;
          if(($scope.student3Uid !== "user doesnot exists") && (($scope.student3Uid != $scope.student2Uid) && ($scope.student3Uid != $scope.student1Uid))) {
            $scope.student3IdFlag = "Done";
            $scope.student3Name = Search.getStudentName($scope.student3Uid);          
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student3Uid);
          }
          else{
            $scope.student3IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student3IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent4 = function(studentEmail4) {
      if(!studentEmail4) {
        $scope.student4IdFlag = "";
        $scope.student4Uid = "";
        $scope.student4Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";      
        Search.getStudentIdAndUrlidByEmail(studentEmail4).then ( function ( result ) {
          $scope.student4Uid = result.uid;
          $scope.student4urlId = result.urlId;
          if(($scope.student4Uid !== "user doesnot exists") && (($scope.student4Uid !== $scope.student1Uid) && ($scope.student4Uid !== $scope.student2Uid) && ($scope.student4Uid !== $scope.student3Uid) && ($scope.student4Uid !== $scope.student5Uid) && ($scope.student4Uid !== $scope.student6Uid) && ($scope.student4Uid !== $scope.student7Uid) && ($scope.student4Uid !== $scope.student8Uid) && ($scope.student4Uid !== $scope.student9Uid) && ($scope.student4Uid !== $scope.student10Uid))) {
            $scope.student4IdFlag = "Done";
            $scope.student4Name = Search.getStudentName($scope.student4Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;            
            }
           ////////// console.log("UserId in Controller :" +$scope.student4Uid);
          }
          else{
            $scope.student4IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student4IdFlag = "Not Done";
            console.log(error);
        });
      } 
    };

    $scope.doThisForStudent5 = function(studentEmail5) {
      if(!studentEmail5) {
        $scope.student5IdFlag = "";
        $scope.student5Uid = "";
        $scope.student5Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else { 
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";      
        Search.getStudentIdAndUrlidByEmail(studentEmail5).then ( function ( result ) {
          $scope.student5Uid = result.uid;
          $scope.student5urlId = result.urlId;
          if(($scope.student5Uid !== "user doesnot exists") && (($scope.student5Uid != $scope.student3Uid) && ($scope.student5Uid != $scope.student2Uid) && ($scope.student5Uid != $scope.student1Uid) && ($scope.student5Uid != $scope.student4Uid))) {
            $scope.student5IdFlag = "Done";
            $scope.student5Name = Search.getStudentName($scope.student5Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student5Uid);
          }
          else{
            $scope.student5IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student5IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent6 = function(studentEmail6) { 
      if(!studentEmail6){
        $scope.student6IdFlag = "";
        $scope.student6Uid = "";
        $scope.student6Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getStudentIdAndUrlidByEmail(studentEmail6).then ( function ( result ) {
          $scope.student6Uid = result.uid;
          $scope.student6urlId = result.urlId;
          if(($scope.student6Uid !== "user doesnot exists") && (($scope.student6Uid != $scope.student3Uid) && ($scope.student6Uid != $scope.student2Uid) && ($scope.student6Uid != $scope.student1Uid) && ($scope.student6Uid != $scope.student4Uid) && ($scope.student6Uid != $scope.student5Uid))) {
            $scope.student6IdFlag = "Done";
            $scope.student6Name = Search.getStudentName($scope.student6Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student6Uid);
          }
          else{
            $scope.student6IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student6IdFlag = "Not Done";
            console.log(error);
        });
      }  
    };

    $scope.doThisForStudent7 = function(studentEmail7) { 
      if(!studentEmail7) {
        $scope.student7IdFlag = "";
        $scope.student7Uid = "";
        $scope.student7Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getStudentIdAndUrlidByEmail(studentEmail7).then ( function ( result ) {
          $scope.student7Uid = result.uid;
          $scope.student7urlId = result.urlId;
          if(($scope.student7Uid !== "user doesnot exists") && (($scope.student7Uid != $scope.student3Uid) && ($scope.student7Uid != $scope.student2Uid) && ($scope.student7Uid != $scope.student1Uid) && ($scope.student7Uid != $scope.student4Uid) && ($scope.student7Uid != $scope.student5Uid) && ($scope.student7Uid != $scope.student6Uid))) {
            $scope.student7IdFlag = "Done";
            $scope.student7Name = Search.getStudentName($scope.student7Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student7Uid);
          }
          else{
            $scope.student7IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student7IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent8 = function(studentEmail8) { 
      if(!studentEmail8) {
        $scope.student8IdFlag = "";
        $scope.student8Uid = "";
        $scope.student8Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getStudentIdAndUrlidByEmail(studentEmail8).then ( function ( result ) {
          $scope.student8Uid = result.uid;
          $scope.student8urlId = result.urlId;
          if(($scope.student8Uid !== "user doesnot exists") && (($scope.student8Uid != $scope.student3Uid) && ($scope.student8Uid != $scope.student2Uid) && ($scope.student8Uid != $scope.student1Uid) && ($scope.student8Uid != $scope.student4Uid) && ($scope.student8Uid != $scope.student5Uid) && ($scope.student8Uid != $scope.student6Uid) && ($scope.student8Uid != $scope.student7Uid))) {
            $scope.student8IdFlag = "Done";
            $scope.student8Name = Search.getStudentName($scope.student8Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student8Uid);
          }
          else{
            $scope.student8IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student8IdFlag = "Not Done";
            console.log(error);
        });
      }  
    };

    $scope.doThisForStudent9 = function(studentEmail9) { 
      if(!studentEmail9) {
        $scope.student9IdFlag = "";
        $scope.student9Uid = "";
        $scope.student9Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getStudentIdAndUrlidByEmail(studentEmail9).then ( function ( result ) {
          $scope.student9Uid = result.uid;
          $scope.student9urlId = result.urlId;
          if(($scope.student9Uid !== "user doesnot exists") && (($scope.student9Uid != $scope.student3Uid) && ($scope.student9Uid != $scope.student2Uid) && ($scope.student9Uid != $scope.student1Uid) && ($scope.student9Uid != $scope.student4Uid) && ($scope.student9Uid != $scope.student5Uid) && ($scope.student9Uid != $scope.student6Uid) && ($scope.student9Uid != $scope.student7Uid) && ($scope.student9Uid != $scope.student8Uid))) {
            $scope.student9IdFlag = "Done";
            $scope.student9Name = Search.getStudentName($scope.student9Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student9Uid);
          }
          else{
            $scope.student9IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student10IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student9IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForStudent10 = function(studentEmail10) { 
      if(!studentEmail10) {
        $scope.student10IdFlag = "";
        $scope.student10Uid = "";
        $scope.student10Name = "";
        if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student10Uid !== $scope.student1Uid) && ($scope.student10Uid !== $scope.student2Uid) && ($scope.student10Uid !== $scope.student3Uid) && ($scope.student10Uid !== $scope.student4Uid) && ($scope.student10Uid !== $scope.student5Uid) && ($scope.student10Uid !== $scope.student6Uid) && ($scope.student10Uid !== $scope.student7Uid) && ($scope.student10Uid !== $scope.student8Uid) && ($scope.student10Uid !== $scope.student9Uid))) {
          $scope.submitdisabled = false;
        }
        else{
          $scope.submitdisabled = true;
        }
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";      
        Search.getStudentIdAndUrlidByEmail(studentEmail10).then ( function ( result ) {
          $scope.student10Uid = result.uid;
          $scope.student10urlId = result.urlId;
          if(($scope.student10Uid !== "user doesnot exists") && (($scope.student10Uid != $scope.student3Uid) && ($scope.student10Uid != $scope.student2Uid) && ($scope.student10Uid != $scope.student1Uid) && ($scope.student10Uid != $scope.student4Uid) && ($scope.student10Uid != $scope.student5Uid) && ($scope.student10Uid != $scope.student6Uid) && ($scope.student10Uid != $scope.student7Uid) && ($scope.student10Uid != $scope.student8Uid) && ($scope.student10Uid != $scope.student9Uid))) {
            $scope.student10IdFlag = "Done";
            $scope.student10Name = Search.getStudentName($scope.student10Uid);
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student10Uid);
          }
          else{
            $scope.student10IdFlag = "Not Done";
            if(($scope.collegeIdFlag == "Done") && ($scope.nodalIdFlag == "Done") && (($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student6IdFlag == "Done"))) {
              $scope.submitdisabled = false;
            }
            else{
              $scope.submitdisabled = true;
            }
          }
        }, function(error){
            $scope.student10IdFlag = "Not Done";
            console.log(error);
        });
      }
    };

    $scope.doThisForCollege = function(collegeEmail) {
      $scope.collegeVerify={};    
      $scope.collegeType={};
      if(!collegeEmail) {
        $scope.collegeIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getCollegeIdAndUrlidByEmail(collegeEmail).then ( function ( result ) {
        $scope.collegeUid = result.uid;
        $scope.collegeurlId = result.urlId;
        if($scope.collegeUid !== "user doesnot exists") {
          $scope.collegeIdFlag = "Done";
          $scope.collegeName = Search.getCollegeName($scope.collegeUid);
          $scope.collegeVerify=Search.getCollegeVerification($scope.collegeUid);
          $scope.collegeType=Search.getCollegeType($scope.collegeUid);
          if((($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done")) &&($scope.nodalIdFlag == "Done")) {
            $scope.submitdisabled = false;
          }
         ////////// console.log("UserId in Controller :" +$scope.collegeUid);
        }
        else{
          $scope.collegeIdFlag = "Not Done";
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.collegeIdFlag = "Not Done";
          console.log(error);
        });
      }
    };



/**************************************************DeleteEnquiry*********************************************************/

    

    $scope.doThisForCollegeToDeleteEnquiry = function(collegeEmail) {
      if(!collegeEmail) {
        $scope.collegeIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getCollegeIdByEmail(collegeEmail).then ( function ( result ) {
        $scope.collegeUid = result;
        if($scope.collegeUid !== "user doesnot exists") {
          $scope.collegeIdFlag = "Done";
          $scope.collegeName = Search.getCollegeName($scope.collegeUid);
          if($scope.student1IdFlag == "Done") {
            $scope.submitdisabled = false;
          }
         ////////// console.log("UserId in Controller :" +$scope.collegeUid);
        }
        else{
          $scope.collegeIdFlag = "Not Done";
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.collegeIdFlag = "Not Done";
          console.log(error);
        });
      }
    };


    $scope.doThisForStudentToDeleteEnquiry = function(studentEmail1) { 
      if(!studentEmail1) {
        $scope.student1IdFlag = "";
        $scope.student1Uid = "";
        $scope.submitdisabled = true;
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";      
        Search.getStudentIdByEmail(studentEmail1).then ( function ( result ) {
          $scope.student1Uid = result;
          if($scope.student1Uid !== "user doesnot exists") {
            $scope.student1IdFlag = "Done";
            $scope.student1Name = Search.getStudentName($scope.student1Uid);
            if(($scope.collegeIdFlag == "Done")){
              $scope.submitdisabled = false;
            }
           ////////// console.log("UserId in Controller :" +$scope.student1Uid);
          }
          else{
            $scope.student1IdFlag = "Not Done";
            $scope.submitdisabled = true;
          }
        }, function(error){
            $scope.student1IdFlag = "Not Done";
            console.log(error);
        });
      }
    };



/********************************************************************************************************************************/
    $scope.doThisForNodal = function(nodalId) {
      $scope.nodalIdFlag = "Not Done";
      if(!nodalId) {
        $scope.nodalIdFlag = "";
        $scope.submitdisabled = true;
      }
      else {
        $scope.bulkSessionFlag = "";
        var nodalid = angular.lowercase(nodalId);
        var posOfN = nodalid.indexOf("n");
        if(posOfN == 0) {
          var posOfO = nodalid.indexOf("o");
          if(posOfO == 1) {
            var posOfD = nodalid.indexOf("d");
            if(posOfD == 2) {
              var posOfA = nodalid.indexOf("a");
              if(posOfA == 3) {
                var posOfL = nodalid.indexOf("l");
                if(posOfL == 4) {
                  var Id = nodalid.replace('nodal','');
                  if((((Id*2)/2+4)-4) == Id) {
                    if (Id < 13000) {
                      var nodalSimLog = "simplelogin:" + Id;
                      Search.getNodalIdById(nodalSimLog).then ( function ( result ) {
                        $scope.nodalSimLog = result;
                        if($scope.nodalSimLog !== "user doesnot exists") {
                          $scope.nodalIdFlag = "Done";
                          $scope.nodalName = Search.getNodalName($scope.nodalSimLog);
                          if((($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done")) && ($scope.collegeIdFlag == "Done")){
                            $scope.submitdisabled = false;
                          }
                        }
                        else{
                          $scope.nodalIdFlag = "Not Done";
                          $scope.submitdisabled = true;
                        }
                      }, function(error){
                        $scope.nodalIdFlag = "Not Done";
                        console.log(error);
                      });
                    }
                    else if(Id > 13000) {
                      console.log(Id);
                      Search.getNodalHashKeyById(Id).then (function (hash) {
                        Search.getNodalIdById(hash).then ( function ( result ) {
                          $scope.nodalSimLog = result;
                          if($scope.nodalSimLog !== "user doesnot exists") {
                            $scope.nodalIdFlag = "Done";
                            $scope.nodalName = Search.getNodalName($scope.nodalSimLog);
                            if((($scope.student1IdFlag == "Done") || ($scope.student2IdFlag == "Done") || ($scope.student3IdFlag == "Done") || ($scope.student4IdFlag == "Done") || ($scope.student5IdFlag == "Done") || ($scope.student6IdFlag == "Done") || ($scope.student7IdFlag == "Done") || ($scope.student8IdFlag == "Done") || ($scope.student9IdFlag == "Done") || ($scope.student10IdFlag == "Done")) && ($scope.collegeIdFlag == "Done")){
                              $scope.submitdisabled = false;
                            }
                          }
                          else{
                            $scope.nodalIdFlag = "Not Done";
                            $scope.submitdisabled = true;
                          }
                        }, function(error){
                          $scope.nodalIdFlag = "Not Done";
                          console.log(error);
                        });  
                      })
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

/********************************************************************************************************************************/

    $scope.doThisForCounsellor = function(collegeEmail) {
      if(!collegeEmail) {
        $scope.collegeIdFlag = "";
        $scope.pass = "Not";
        $scope.submitdisabled = true;
      }
      else {
        Search.getCollegeIdByEmail(collegeEmail).then ( function ( result ) {
        $scope.collegeUid = result;
        if($scope.collegeUid !== "user doesnot exists") {
          $scope.collegeIdFlag = "Done";
          $scope.collegeName = Search.getCollegeName($scope.collegeUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.collegeIdFlag = "Not Done";
          $scope.pass = "Not";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.collegeIdFlag = "Not Done";
          $scope.pass = "Not";
          console.log(error);
        });
      }
    };    

    $scope.doThisForAdmin = function(adminEmail) {
      if(!adminEmail) {
        $scope.adminIdFlag = "";
        $scope.pass = "Not";
        $scope.submitdisabled = true;
      }
      else {
        Search.getAdminIdByEmail(adminEmail).then ( function ( result ) {
        $scope.adminUid = result;
        if($scope.adminUid !== "user doesnot exists") {
          $scope.adminIdFlag = "Done";
          $scope.adminName = Search.getAdminName($scope.adminUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.adminIdFlag = "Not Done";
          $scope.pass = "Not";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.adminIdFlag = "Not Done";
          $scope.pass = "Not";
          console.log(error);
        });
      }
    };

    $scope.doThisForNodalAdmin = function(nodalEmail) {
      if(!nodalEmail) {
        $scope.nodalIdFlag = "";
        $scope.pass = "Not";
        $scope.submitdisabled = true;
      }
      else {
        Search.getNodalIdByEmail(nodalEmail).then ( function ( result ) {
        $scope.nodalUid = result;
        if($scope.nodalUid !== "user doesnot exists") {
          $scope.nodalIdFlag = "Done";
          $scope.nodalName = Search.getNodalAdminName($scope.nodalUid); 
          $scope.submitdisabled = false;       
         }
        else{
          $scope.nodalIdFlag = "Not Done";
          $scope.pass = "Not";
          $scope.submitsuccesstext = false;
          $scope.submitdisabled = true;
        }
        }, function(error){
          $scope.nodalIdFlag = "Not Done";
          $scope.pass = "Not";
          console.log(error);
        });
      }
    }; 

    $scope.sendMail = function (collegeEmail, studentEmail, stdname, clgname, query) { 
        
        var dataToPostCollege =  {
                        to: collegeEmail, 
                        hour: $scope.mytime.getHours(), 
                        minute: $scope.mytime.getMinutes(), 
                        date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                        query: query, 
                        cname: clgname,
                        sname: stdname
                      };

                $http({
                url: "/sendsessionmailtocollege", 
                method: "GET",
                params: { to: dataToPostCollege.to, 
                          hour: dataToPostCollege.hour, 
                          minute: dataToPostCollege.minute, 
                          query: dataToPostCollege.query, 
                          cname: dataToPostCollege.cname,
                          sname: dataToPostCollege.sname, 
                          date: dataToPostCollege.date
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });

                var dataToPostStudent =  {
                        to: studentEmail, 
                        hour: $scope.mytime.getHours(), 
                        minute: $scope.mytime.getMinutes(), 
                        date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                        query: $scope.query, 
                        cname: clgname,
                        sname: stdname
                      };

                $http({
                url: "/sendsessionmailtostudent", 
                method: "GET",
                params: { to: dataToPostStudent.to, 
                          hour: dataToPostStudent.hour, 
                          minute: dataToPostStudent.minute, 
                          query: dataToPostStudent.query, 
                          cname: dataToPostStudent.cname,
                          sname: dataToPostStudent.sname, 
                          date: dataToPostStudent.date
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });
    };

    $scope.getSessionStatusForStudent1 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      var nodalId = angular.uppercase(NodalCode);
      if($scope.collegeVerify.$value=='notverified'|| $scope.collegeType.$value=='free'){
        return;   
      }
      if(studentEmail1) {
        Search.getCurrentSessionCount($scope.collegeUid, $scope);
        Search.getFeedbackNotGivenCount($scope.collegeUid, $scope);
        Search.getSessionStatus($scope.student1Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student1IdFlag = "Approved";
            $scope.getSessionStatusForStudent2(collegeEmail, nodalId, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student1IdFlag = "Rejected";
            $scope.getSessionStatusForStudent2(collegeEmail, nodalId, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student1IdFlag = "pending";
            $scope.getSessionStatusForStudent2(collegeEmail, nodalId, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student1IdFlag = "Done";
            $scope.getSessionStatusForStudent2(collegeEmail, nodalId, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail1) {
        Search.getCurrentSessionCount($scope.collegeUid, $scope);
        Search.getFeedbackNotGivenCount($scope.collegeUid, $scope);
        $scope.getSessionStatusForStudent2(collegeEmail, nodalId, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent2 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail2)  {
        Search.getSessionStatus($scope.student2Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student2IdFlag = "Approved";
            $scope.getSessionStatusForStudent3(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student2IdFlag = "Rejected";
            $scope.getSessionStatusForStudent3(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student2IdFlag = "pending";
            $scope.getSessionStatusForStudent3(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student2IdFlag = "Done";
            $scope.getSessionStatusForStudent3(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail2) {
        $scope.getSessionStatusForStudent3(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent3 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail3)  {
        Search.getSessionStatus($scope.student3Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student3IdFlag = "Approved";
            $scope.getSessionStatusForStudent4(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student3IdFlag = "Rejected";
            $scope.getSessionStatusForStudent4(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student3IdFlag = "pending";
            $scope.getSessionStatusForStudent4(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student3IdFlag = "Done";
            $scope.getSessionStatusForStudent4(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })        
      } else if(!studentEmail3) {
        $scope.getSessionStatusForStudent4(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent4 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail4)  {
        Search.getSessionStatus($scope.student4Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student4IdFlag = "Approved";
            $scope.getSessionStatusForStudent5(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student4IdFlag = "Rejected";
            $scope.getSessionStatusForStudent5(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student4IdFlag = "pending";
            $scope.getSessionStatusForStudent5(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student4IdFlag = "Done";
            $scope.getSessionStatusForStudent5(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail4) {
        $scope.getSessionStatusForStudent5(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent5 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail5)  {
        Search.getSessionStatus($scope.student5Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student5IdFlag = "Approved";
            $scope.getSessionStatusForStudent6(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student5IdFlag = "Rejected";
            $scope.getSessionStatusForStudent6(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student5IdFlag = "pending";
            $scope.getSessionStatusForStudent6(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student5IdFlag = "Done";
            $scope.getSessionStatusForStudent6(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail5) {
        $scope.getSessionStatusForStudent6(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent6 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail6)  {
        Search.getSessionStatus($scope.student6Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student6IdFlag = "Approved";
            $scope.getSessionStatusForStudent7(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student6IdFlag = "Rejected";
            $scope.getSessionStatusForStudent7(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student6IdFlag = "pending";
            $scope.getSessionStatusForStudent7(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student6IdFlag = "Done";
            $scope.getSessionStatusForStudent7(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail6) {
        $scope.getSessionStatusForStudent7(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent7 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail7)  {
        Search.getSessionStatus($scope.student7Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student7IdFlag = "Approved";
            $scope.getSessionStatusForStudent8(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student7IdFlag = "Rejected";
            $scope.getSessionStatusForStudent8(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student7IdFlag = "pending";
            $scope.getSessionStatusForStudent8(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student7IdFlag = "Done";
            $scope.getSessionStatusForStudent8(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail7) {
        $scope.getSessionStatusForStudent8(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent8 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail8)  {
        Search.getSessionStatus($scope.student8Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student8IdFlag = "Approved";
            $scope.getSessionStatusForStudent9(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student8IdFlag = "Rejected";
            $scope.getSessionStatusForStudent9(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student8IdFlag = "pending";
            $scope.getSessionStatusForStudent9(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student8IdFlag = "Done";
            $scope.getSessionStatusForStudent9(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail8) {
        $scope.getSessionStatusForStudent9(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent9 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail9)  {
        Search.getSessionStatus($scope.student9Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student9IdFlag = "Approved";
            $scope.getSessionStatusForStudent10(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student9IdFlag = "Rejected";
            $scope.getSessionStatusForStudent10(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student9IdFlag = "pending";
            $scope.getSessionStatusForStudent10(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student9IdFlag = "Done";
            $scope.getSessionStatusForStudent10(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail9) {
        $scope.getSessionStatusForStudent10(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };

    $scope.getSessionStatusForStudent10 = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
      if(studentEmail10) {
        Search.getSessionStatus($scope.student10Uid,$scope.collegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.student10IdFlag = "Approved";
            $scope.buildEnquiry(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.student10IdFlag = "Rejected";
            $scope.buildEnquiry(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.student10IdFlag = "pending";
            $scope.buildEnquiry(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
          else if(sessionVerStatus.$value === null) {
            $scope.student10IdFlag = "Done";
            $scope.buildEnquiry(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
          }
        })
      } else if(!studentEmail10) {
        $scope.buildEnquiry(collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query);
      }
    };


    $scope.buildEnquiry = function (collegeEmail, NodalCode, studentEmail1,studentEmail2,studentEmail3,studentEmail4,studentEmail5,studentEmail6,studentEmail7,studentEmail8,studentEmail9,studentEmail10,query) {
        var url = $location.path();
        var temp = url.split("Nid");
        if(temp[1] !== 'none') {
          var temp2 = temp[1].split("CEmail");
          var nodalCodeFromUrl = temp2[0];  
        }
        else{
          var nodalCodeFromUrl = 'none';  
        }
        
        if($scope.student1IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student1Uid, $scope.student1urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail1,$scope.student1Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student2IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student2Uid, $scope.student2urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail2,$scope.student2Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student3IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student3Uid, $scope.student3urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail3,$scope.student3Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student4IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student4Uid, $scope.student4urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail4,$scope.student4Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student5IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student5Uid, $scope.student5urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail5,$scope.student5Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student6IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student6Uid, $scope.student6urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail6,$scope.student6Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student7IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student7Uid, $scope.student7urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail7,$scope.student7Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student8IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student8Uid, $scope.student8urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail8,$scope.student8Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student9IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student9Uid, $scope.student9urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail9,$scope.student9Name.$value,$scope.collegeName.$value,query);
        }
        if($scope.student10IdFlag == "Done") {
            Session.bookSessionInBulk( $scope, nodalCodeFromUrl, $scope.collegeUid,$scope.collegeurlId, NodalCode, $scope.student10Uid, $scope.student10urlId, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, studentEmail10,$scope.student10Name.$value,$scope.collegeName.$value,query);
        }
        $scope.submitdisabled = true;
    }, function(error){
          $scope.bulkSessionFlag = "Not Done";
    };
    
    $scope.deleteEnquiry = function () {
            AdminTask.DeleteSessionFromCollege($scope.collegeUid, $scope.student1Uid,$scope);            
    }, function(error){
          $scope.deleteSessionFlag = "Not Done";
    };


    $scope.sessions = AdminTask.viewSessions();

    $scope.getPendingSessionDetails = function (){
       AdminTask.collegeShowWhenSessionPending().then (function (result){
        $scope.pendingCollege = result;
       });       
    };


    $scope.getRejectedSessionCollege = function (){
       AdminTask.collegeShowWhenSessionRejected().then (function (result){
        $scope.rejectedColleges = result;
       });       
    };
          

    $scope.getcollegedetail = function(collegeId) {
      return (Search.find(collegeId));
    };


    $scope.getnodaluid = function(){
      var str = $location.path();
      var nid = str.split("studentemails/");
      var nodalid = nid[1];
      $scope.nodaluid = nodalid;
      Search.getNodalAdminDetail(nodalid).then(function(result){
        $scope.nodalCenterName = result.nodalCenterName;
        $scope.nodalPhone = result.nodalPhone;
        $scope.nodalAdminName = result.nodalAdminName;
        $scope.nodalAdminEmail = result.nodalAdminEmail;
        if(typeof result.nodalurlid !== 'undefined' )
        $scope.nodalLoginId = result.nodalurlid;
        else if(typeof result.nodalurlid === 'undefined'){
          var newnodalid = nodalid.split(":");
          $scope.nodalLoginId = newnodalid[1];
        }
      });
    };

    $scope.getcollegesname = function(collegeurl){
      if(typeof collegeurl !== 'undefined'){
        return Search.getCollegeName(collegeurl);
      }
    };

    $scope.getnodalsname = function(nodaluid){
      if(typeof nodaluid !== 'undefined'){
       return Search.getNodalDetail(nodaluid);
      }
    };
    
    $scope.nameList = [];
    $scope.idList = [];

    $scope.makearray = function(id,email){
     $scope.idList = $scope.idList.concat([{email : email,
                                            id : id
                                            }]);
    };

    $scope.getStudentNameByEmail = function(){
      angular.forEach($scope.idList, function(value,key) {
        Search.getStudentNameByEmail(value.email).then(function(result) {
          $scope.nameList[value.id] = result; 
        });
      });
    };

    $scope.getStudentEmailLists = function(nodalid){
      $scope.List = [];
      var lists =  NodalTask.getStudentEmailListByNodal(nodalid);
      lists.$loaded(function(lists) { 
      angular.forEach(lists, function(key,value) {
        Search.getStudentIdByEmail(key.$value).then(function(result){
          Search.getNodalStudentDetail(result).then(function(newresult){
            $scope.List = $scope.List.concat([{ studentName: newresult.studentname,
                                                studentEmail: newresult.email,
                                                collegeurl:  newresult.lastSessionDoneWith,
                                                nodalurl:    newresult.lastSessionDoneFrom,
                                                Lastseen:    newresult.lastSessionDoneOn
                                                    }]);          
          });
        });
        });
      });
    };

    $scope.close = function(){
      $scope.List = [];
    };

    $scope.getStudentEmailList = function(nodalid){
      return NodalTask.getStudentEmailListByNodal(nodalid);
    };

    $scope.deleteAllEmail = function(nodalId) {
    
    NodalTask.deleteAllEmail(nodalId); 
    $location.path('/nodal-studentemails');
    };

     $scope.deleteEmail = function(nodalId,studentId) {
      NodalTask.deleteEmail(studentId,nodalId);
    };

    $scope.getSessionDetails = function() {
      var str = $location.path();
      $scope.collegeId = str.split("/sessions/");
      $scope.studentsId = AdminTask.getAdminSessionDetails($scope.collegeId[1]);      
    };

    $scope.getRejectedSessionDetails = function() {
      var str = $location.path();
      $scope.collegeId = str.split("/rejected-sessions/");
      $scope.studentsId = AdminTask.getAdminSessionDetails($scope.collegeId[1]);
    };
    
    $scope.actionTaken = function(cid,sid){
       return AdminTask.getActionTaken(cid,sid);
    };

    $scope.rejectedVideoUrl = function(cid,sid){
       return AdminTask.getRejectedVideoUrl(cid,sid);
    };
    
    $scope.getDetails = function(Id) {
      AdminTask.getCollegeSessionDetails(Id,$scope.collegeId[1]).then ( function ( result ) {
        $scope.collegeSessionDetails = result;
        $scope.studentdetail = Search.getStudentDetail(result.studenturl);
        $scope.studentmail = Search.getStudentEmail(result.studenturl);
      })
      AdminTask.getCollegeFeedbackDetails(Id,$scope.collegeId[1]).then ( function ( result ) {
        $scope.collegeFeedbackDetails = result;
        var videoString = result.videourl;
        var data = videoString.split("watch?v=");
        if(typeof (data[1]) !== 'undefined') {
          var Id = data[1].split("&");
          var vedioId = Id[0];
        }
        if(typeof (data[1]) == 'undefined')
        {
          Id = videoString.split(".be/");
          var vedioId = Id[1];
        }
        var videourl = "https://www.youtube.com/embed/"+vedioId+"?rel=0&amp;showinfo=0&modestbranding=1&autohide=1";
        $scope.video = {src:videourl, title:"This is our very ouwn url"};
      })  
    };



    $scope.approveSession = function(action,hours,minutes,seconds,studenturl,collegeurl,videourl,couponCode,chatDiscussion, nextStep, status) {
      if((typeof action !== 'undefined') && (typeof hours !== 'undefined') && (typeof minutes !== 'undefined') && (typeof seconds !== 'undefined')) {
        AdminTask.approveSession(action,hours,minutes,seconds,studenturl,collegeurl,videourl,couponCode,$scope.video.src,chatDiscussion, nextStep, status);
      }
    };

    $scope.rejectSession = function(action,hours,minutes,seconds,studenturl,collegeurl,videourl,chatDiscussion, nextStep, status) {
      if((typeof action !== 'undefined') && (typeof hours !== 'undefined') && (typeof minutes !== 'undefined') && (typeof seconds !== 'undefined')) {
        AdminTask.rejectSession(action,hours,minutes,seconds,studenturl,collegeurl,videourl,chatDiscussion, nextStep, status);
      }
    };

    $scope.showHead ="";


    $scope.getSessionDetail = function(sessionId) {
      $scope.showHead = true;
      var str = sessionId;
      var ID = str.split("IID");
      if(ID[0] > 12999 && ID[1] > 12999) {
        AdminTask.getIdFromCustomId(ID[0] , ID[1]).then(function(customId) {
          $scope.getDetailOfSession(customId.studentHash, customId.collegeHash)
        })
      }
      else if(ID[0] < 12999 && ID[1] > 12999) {
        var collegeId = "simplelogin:"+ID[0];
        AdminTask.getIdFromCustomId('none', ID[1]).then(function(customId) {
          $scope.getDetailOfSession(customId.studentHash, collegeId)
        })
      }
      else if(ID[0] > 12999 && ID[1] < 12999) {
        var studentId = "simplelogin:"+ID[1];
        AdminTask.getIdFromCustomId(ID[0] , 'none').then(function(customId) {
          $scope.getDetailOfSession(studentId, customId.collegeHash)
        })
      }
      else if(ID[0] < 12999 && ID[1] < 12999) {
        var collegeId = "simplelogin:"+ID[0];
        var studentId = "simplelogin:"+ID[1];
        $scope.getDetailOfSession(studentId, collegeId)
      }
      
    };


    $scope.getDetailOfSession = function(studentHash, collegeHash) {
      /*$scope.collegename  =  Search.getCollegeName(collegeHash);
      $scope.collegeemail  =  Search.getCollegeEmail(collegeHash);*/
      $scope.studentName  =  Search.getStudentName(studentHash);
      $scope.studentEmail = Search.getStudentEmail(studentHash);
      AdminTask.getSessionDetail(collegeHash,studentHash).then(function(sessionDetail) {
          $scope.sessionDetail = sessionDetail;
          $scope.collegeId = collegeHash;
          var videoString = sessionDetail.videourl;
          var data = videoString.split("watch?v=");
          if(typeof (data[1]) !== 'undefined') {
            var Id = data[1].split("&");
            var vedioId = Id[0];
          }
          if(typeof (data[1]) == 'undefined')
          {
            Id = videoString.split(".be/");
            var vedioId = Id[1];
          }
          $scope.showHead = false;
          var videourl = "https://www.youtube.com/embed/"+vedioId+"?rel=0&amp;showinfo=0&modestbranding=1&autohide=1";
          $scope.video = {src:videourl, title:"This is our very ouwn url"};
      });
    };


    $scope.getActionTaken = function(sessionId) {
      var str = sessionId;
      var ID = str.split("IID");
      var collegeId = "simplelogin:"+ID[0];
      var studentId = "simplelogin:"+ID[1];
      AdminTask.getActionTakenForApprovedSessions(collegeId,studentId).then(function(actionTaken) {
        $scope.actionTaken = actionTaken;
        Search.getcollegeDetail(collegeId).then(function(collegename) {
        $scope.collegename = collegename.collegename;
        $scope.collegeemail = collegename.counselloremail;
      });
      });
    };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.show_pop = function() {  
      $scope.reason = "";    
      $scope.showConfirmBlockPop = true;
    };  

    $scope.close_all_pop = function() {
      $scope.showConfirmBlockPop = false;
    };

    $scope.getStudentsInfo = function(nodalobject) {
      $scope.nodalReferredStudents = "";    
    $scope.nodalReferredStudents = AdminTask.getReferredStudentsByNodal(nodalobject);
  };

  $scope.getStudentDetail = function(studentId) {
    return Search.getStudentDetail(studentId);
  };

  $scope.totalSessionCount = [];
  $scope.sessionTillDateCount = [];
  
  $scope.getStudentSessionDetailBeforeEnrollment = function(studentId, index,currentuser) {    
    $scope.sessionTillDateCount[index] = AdminTask.getStudentSessionDetailBeforeEnrollment(studentId,currentuser);    
  };

  $scope.getStudentSessionDetail = function (studentId, index) {
    var ApprovedSessionCount = 0;
    var counter = 0;
    AdminTask.getStudentSessionDetail(studentId).then( function(value) {
      var sessions = value;
      var sessionArrayLength = sessions.length;
      angular.forEach(sessions, function(value,key) {
        counter = counter + 1;
        /*console.log("comming in loop");*/
        if(typeof value.incentiveAmountPerSession !== 'undefined') {
          ApprovedSessionCount = ApprovedSessionCount+1;
          /*console.log(ApprovedSessionCount);*/
        }
        if(counter === sessionArrayLength) {
          /*console.log(ApprovedSessionCount);*/
          $scope.totalSessionCount[index] = ApprovedSessionCount;
        }
      });
    })
  };

  $scope.totalReferredStudents = [];
  $scope.totalReferredStudentsBeforeEnrollment = [];
  $scope.getStudentReferralBeforeEnrollment = function(studentId, index,currentuser) {
    $scope.totalReferredStudents[index] = AdminTask.getTotalStudentReferral(studentId);
    $scope.totalReferredStudentsBeforeEnrollment[index] = AdminTask.getStudentReferralBeforeEnrollment(studentId, currentuser);
  };

  $scope.getTotalPendingSessions = function(pendingSessions) {
    $scope.totalPendingSessions = $scope.totalPendingSessions + pendingSessions;
  };

  $scope.getCollegeListOfDemoStudent = function() {
    $scope.collegeList = [];
     AdminTask.getCollegeListOfDemoStudent($scope);
  };

  $scope.deleteDemoStudent = function(collegeId,id) {
    AdminTask.deleteDemoStudent(collegeId,id,$scope);
  };

  $scope.nodalLoadingMessage = 'Retrieving Nodal centre...';

  $scope.getNodalDetails = function() {
     AdminTask.getNodalDetails($scope);
     
  };

  $scope.collegeLoadingMessage = 'Retrieving Colleges...';
  $scope.getCollegeListDetails = function() {
     AdminTask.getCollegeListDetails($scope);
  };


  $scope.collegeSelected = function() {
    AdminTask.getSelectedCollege($scope.selectedCollege,$scope);
  };
  
  $scope.selectMonth = 'Retrieving Month';
  $scope.year = '';
  $scope.month = '';
  $scope.disableDateandYear='';
  $scope.selectedNodal = '';
  $scope.spinner = false;
  
  $scope.getMonthlySession = function(month,year) {
    $scope.year = year;
    $scope.month = month;
    $scope.spinner = true;
    $scope.showLoadButton1 = 'hide';
    AdminTask.getMonthlySession($scope.month,$scope.year,$scope);
  };

  $scope.sortSessionsByDate = function(session) {
    if( session.sessiondate.indexOf(" +") >= 0 ){
      var dateSplitArray = session.sessiondate.split(" +");
    }
    else if( session.sessiondate.indexOf(" -") >= 0 ){
      var dateSplitArray = session.sessiondate.split(" -");
    }
    var dateobj = new Date(dateSplitArray[0]);
    var newdate = $filter('date')(dateobj,'dd MMMM yyyy')
    var dateobj2 = new Date(newdate);
    var newdate2 = $filter('date')(dateobj2,'yyyy MM dd');  
  return newdate2;
 };

 $scope.resetMonthCounter = 0;
 $scope.showSpinner = false;
 $scope.showLoadButton1 = 'show';
 
 $scope.calculateTotalSessionCount = function() {
  $scope.totalSessionDoneCount = 0;
    AdminTask.calculateTotalSessionCount($scope);
 };
 $scope.applyCollegeFilter = function() {
    if($scope.usera.college === null) { 
         $scope.usera.college = '';
    }
  };
  $scope.hideLoadButton1 = function() {
      $scope.showLoadButton1 = 'show';
  };

  $scope.hideLoadButton2 = function() {
     $scope.showLoadButton1 = 'show';
  };

  $scope.applyNodalFilter = function() {
    if($scope.usera.nodal === null) { 
         $scope.usera.nodal = '';
    }
  };
 $scope.totalCountForMonthlySession = 0;

  $scope.redirectToAlignSession = function(nodalSimLog,Ncode) {
    $window.open('http://www.mymissionadmission.com/#/align-sessions:'+nodalSimLog+"NCode"+Ncode);
  };

  $scope.getNodalid = function(usern,email) {
    Search.getNodalIdByEmail(email).then (function (result) {
             $scope.nod_id= result;
      AdminTask.updateNodalInfo(usern,$scope.nod_id);
      $scope.submitsuccess=true;
      $timeout(function() {
        $scope.submitsuccess=false;
        $scope.$evalAsync();
      }, 5000);
    });
  };

 $scope.getEnquiryDetailsInBuildEnquiry = function() {
  var temp = $location.path();
  var temp1 = temp.split('Nid');
  if(temp1[1] !== 'none') {
    var temp2 = temp1[1].split('CEmail');
    if(temp2[0] === 'TEMP')
      $scope.nodalId = "";
    else if(temp2[0] !== 'TEMP') 
      $scope.nodalId = temp2[0];
    $scope.collegeEmail = temp2[1];
    AdminTask.getStudentsEmail(temp2[0], $scope);
  }
 };



     /*===============================================demoStudent+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    $scope.demoSessionFlag = '';
    $scope.demonodalId = "NODAL1025";
    $scope.demoStudentEmail = "stu.anhad@gmail.com";
    $scope.demoQuery ='This is  a Demo Query.';
    $scope.demoStudentIdFlag = "Done";
    $scope.DemoNodalIdFlag = "Done";
    $scope.demoStudentUid = "simplelogin:41";
    $scope.DemoNodalSimLog = "simplelogin:1025";
    $scope.demoStudentName = "Demo Student";


    $scope.updateDemoCollegeEmail = function(collegeEmail) {
      $scope.demoCollegeEmail = collegeEmail;
      $scope.doThisForCollegeForDemoSession(collegeEmail);
    };

    $scope.doThisForDemoStudent = function(demoStudentEmail) {
      $scope.demoSessionFlag = '';
      $scope.demoQuery ='This is  a Demo Query.';
      $scope.demoStudentIdFlag = "Done";
      $scope.demoStudentUid = "simplelogin:41";
      $scope.demoStudentName = "Demo Student";
      $scope.doThisForCollegeForDemoSession($scope.demoCollegeEmail);
    };

    $scope.doThisForCollegeForDemoSession = function(collegeEmail) {
      $scope.DemoCollegeVerify={};    
      $scope.DemoCollegeType={};
      if(!collegeEmail) {
        $scope.DemoCollegeIdFlag = "";
        $scope.demosubmitdisabled = true;
      }
      else {
        $scope.deleteSessionFlag = "";
        $scope.bulkSessionFlag = "";
        Search.getCollegeIdByEmail(collegeEmail).then ( function ( result ) {
        $scope.DemoCollegeUid = result;
        if($scope.DemoCollegeUid !== "user doesnot exists") {
          $scope.DemoCollegeIdFlag = "Done";
          $scope.DemoCollegeName = Search.getCollegeName($scope.DemoCollegeUid);
          $scope.DemoCollegeVerify=Search.getCollegeVerification($scope.DemoCollegeUid);
          $scope.DemoCollegeType=Search.getCollegeType($scope.DemoCollegeUid);
          if(($scope.demoStudentIdFlag == "Done") && ($scope.DemoNodalIdFlag == "Done")) {
            $scope.demosubmitdisabled = false;
          }
         ////////// console.log("UserId in Controller :" +$scope.collegeUid);
        }
        else{
          $scope.DemoCollegeIdFlag = "Not Done";
          $scope.demosubmitdisabled = true;
        }
        }, function(error){
          $scope.DemoCollegeIdFlag = "Not Done";
          console.log(error);
        });
      }
    };



                                          /*==================DemoStudentSessionStatus=================*/

    $scope.getSessionStatusForDemoStudent = function (collegeEmail, NodalCode, demoStudentEmail,query) {
      var nodalId = angular.uppercase(NodalCode);
      if(demoStudentEmail) {
        Search.getCurrentSessionCount($scope.DemoCollegeUid, $scope);
        Search.getFeedbackNotGivenCount($scope.DemoCollegeUid, $scope);
        Search.getSessionStatus($scope.student1Uid,$scope.DemoCollegeUid).then(function(sessionVerStatus) {
          if(sessionVerStatus.$value === "approved") {
            $scope.demoStudentIdFlag = "Approved";
          } 
          else if(sessionVerStatus.$value === "Rejected") {
            $scope.demoStudentIdFlag = "Rejected";
          }
          else if(sessionVerStatus.$value === "pending") {
            $scope.demoStudentIdFlag = "pending";
          }
          else if(sessionVerStatus.$value === null) {
            $scope.demoStudentIdFlag = "Done";
            $scope.buildDemoEnquiry(collegeEmail, NodalCode, demoStudentEmail,query);
          }
        })
      } else if(!demoStudentEmail) {
        Search.getCurrentSessionCount($scope.DemoCollegeUid, $scope);
        Search.getFeedbackNotGivenCount($scope.DemoCollegeUid, $scope);
      }
    };

                                      /*==================DemoStudentSessionStatus=================*/


                                      /*==================buildDemoEnquiry=================*/


    $scope.buildDemoEnquiry = function (collegeEmail, NodalCode, demoStudentEmail,query) {
        if($scope.demoStudentIdFlag == "Done") {
            Session.bookDemoSession( $scope, $scope.DemoCollegeUid, NodalCode, $scope.demoStudentUid, query, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'));
            $scope.sendMail(collegeEmail, demoStudentEmail, $scope.demoStudentName,$scope.DemoCollegeName.$value,query);
        }
        $scope.demosubmitdisabled = true;
    }, function(error){
          $scope.bulkSessionFlag = "Not Done";
    };

    $scope.updateCollegeView = function(collegeId,viewCount,index) {
        AdminTask.updateCollegeView(collegeId,viewCount);
         toaster.pop('success', "CollegeView is successfully updated.");
    };

                                      /*==================buildDemoEnquiry=================*/


    /*===============================================EndDemoStudent+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/





}).value('duScrollOffset', 30);
