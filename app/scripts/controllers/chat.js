'use strict';

app.controller('chatCtrl', function ($scope,$document,chat,$timeout,NodalAuth,$interval,$firebaseArray,FIREBASE_URL) {
  $scope.myvalue=false;
  $scope.d='';
  $scope.n='xyz';
  $scope.name = [];
  $scope.date=[];
  $scope.scrolled=0;
  $scope.iterate=0;
  $scope.loader=false;
  $scope.loader1=true;
  $scope.alignDiv=[];
  $scope.inp_msg = '';
  $scope.list=[];
  $scope.stamp=0;
  $scope.loadInfo="Load Earlier Messages";
  $scope.len=0;
  $scope.nid = '';
  $scope.nodalStatus='';
  $scope.store=$scope.con=0;
  $scope.typingFlag=false;
  var tmpTyping=null;
  var rootRef=new Firebase(FIREBASE_URL);

  if($scope.usera){
      rootRef.child('profileForAdmins').child($scope.usera.uid).update({availability:"online"});
  }
  else{
    rootRef.child('profileForNodalAdmins').child($scope.usern.uid).update({availability:"online"});
  }
  if(!$scope.usera){
    rootRef.child('profileForAdmins').on('child_changed',function(changedAdminData){
      $scope.typingFlag=changedAdminData.val().isTyping;
      $scope.$evalAsync();
    });
  }
  else
  if(!$scope.usern.profile.nodalAdminName){
    rootRef.child('profileForNodalAdmins').on('child_changed',function(changedNodalData){
      $scope.typingFlag=changedNodalData.val().isTyping;
      $scope.$evalAsync();
    });
  }

  window.onbeforeunload=function(){
    if($scope.usera){
      rootRef.child('profileForAdmins').child($scope.usera.uid).update({availability:"offline"});
    }
    else{
      rootRef.child('profileForNodalAdmins').child($scope.usern.uid).update({availability:"offline"});
    }
  };
    
    $scope.keyPressed=function($event,adminID,nodalID){
      // console.log($event.keyCode);
      //48-57 65-90 8 96-111(!108) 186-191 219 221 222 32
      var keyCode=$event.keyCodeeyCode;
      if((keyCode>=65&&keyCode<=90)||
        (keyCode>=48&&keyCode<=57)||
        (keyCode===8)||
        (keyCode>=96&&keyCode<=111&&keyCode!==108)||
        (keyCode>=186&&keyCode<=191)||(keyCode===219)||
        (keyCode===220)||
        (keyCode===221)||
        (keyCode===32)){
        // console.log(adminID+'     '+nodalID);
        if(adminID){
          var adminRef=new Firebase(FIREBASE_URL+'/profileForAdmins/'+adminID);
          adminRef.update({isTyping:true});
          if(tmpTyping){
            // console.log('GotHereForCancellation');
            $timeout.cancel(tmpTyping);
          }
          tmpTyping=$timeout(function(){
            // console.log('GotHereForScheduling');
            adminRef.update({isTyping:false});
          },500);
        }
        else
        if(nodalID){
          var nodalRef=new Firebase(FIREBASE_URL+'/profileForNodalAdmins/'+nodalID);
          nodalRef.update({isTyping:true}); 
          if(tmpTyping){
            $timeout.cancel(tmpTyping);
          }
          tmpTyping=$timeout(function(){
            nodalRef.update({isTyping:false});
          },500);
        }
        }
    };

    $scope.getNodalId = function(){
      $scope.nid = NodalAuth.resolveUser().uid;
      //console.log($scope.nid);
    }

    $scope.showAlert = function(){
      $scope.myvalue = true;
      $(".dright").animate({height: 'toggle'});
      //$scope.toTheBottom(); 
      //console.log('Toggled'); 
     };
  $scope.loadMsg = function(nid,name) {
      chat.loadMsg($scope,nid,name);
      $scope.n='';
      $scope.d='';
      //$scope.toUp();
    };
    $scope.sendMsg = function(inp_message,sender,nid){
      if(inp_message===''){
        return;
      }
      else{
        chat.send_Msg(inp_message,sender,nid); 
        $scope.toTheBottom();
        /*if(!$scope.loader){
            $scope.loader=true;
        }*/
    }
  };

  $scope.checker=function(nid){

    chat.check($scope,nid);
  };

  $scope.toTheBottom = function() {
        
        $timeout(function() {$(".content").animate({scrollTop:900*$scope.iterate},500)});
        //$(".content").animate({scrollTop:$scope.scrolled},500);
        console.log("toTheBottom called");
  };
  $scope.scrollUp = function() {
        
        $(".content").animate({scrollTop:0},500);
        //$(".content").animate({scrollTop:$scope.scrolled},500);
        //console.log("to Up called");
  };
  $scope.toUp = function() {
         $timeout(function() {
          $scope.store=$scope.con;
          $scope.con=document.getElementById("content").scrollHeight;
          $scope.pos=$scope.con-$scope.store;
          //console.log($scope.con);
          //console.log($scope.store);
          $("#content").animate({scrollTop:$scope.pos},0)},0);

  };
  $scope.newMsg = function() {
        $("#note").css("display","block");
        var element = angular.element('#note');
          element.addClass('bigEntrance');
        $timeout(function(){$("#note").css("display","none");},4000);
  };
  $scope.addclass=function() {
          $scope.loadInfo="Loading";
          var element = angular.element('#loadMsg');
          //element.addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
          element.addClass('fa fa-spinner fa-pulse');
          $timeout(function() {element.removeClass('fa fa-spinner fa-pulse');
            $scope.loadInfo="Load Earlier Messages";
          },2000);
          
   };

  $scope.compare=function(nm,key,dt){
   // console.log($scope.n);

    if ($scope.d===dt||$scope.n===nm){
      if($scope.d===dt)
      {
        $scope.date[key] = "same";
      }
      if($scope.n===nm)
      {
        $scope.name[key] = "same";
      }
      
    }
  
      if($scope.d!==dt)
      {
          $scope.d=dt;
          $scope.date[key] = "not_same";
      }
      if($scope.n!==nm){
          $scope.n=nm;
          $scope.name[key] = "not_same";
        }
          
  };

  $scope.setNodalStatus=function(nid){
      $interval(function(){
      var nodalRef = new Firebase(FIREBASE_URL+'/profileForNodalAdmins/'+nid+'/'+'availability');
      nodalRef.on('value',function(data){ 
        $scope.nodalStatus=data.val();
        // console.log('interval');
        });

        },1000);
 };
 
$scope.checkAdminStatus=function(){
var ref = new Firebase(FIREBASE_URL+'/profileForAdmins/');
var usernobj = $firebaseArray(ref);
$interval(function(){
usernobj.$loaded(function(adminArray) {
              var flag = false;
              for(var i=0; i<adminArray.length; i++) 
               {
                  if(((adminArray[i].role) =='operationSubordinate' || (adminArray[i].role) =='operationHead') &&(adminArray[i].availability) =='online')
                    {
                        flag = true;
                  }
               }
               if(flag){
                $scope.adminStatus='online';
               }
               else{
                $scope.adminStatus='offline'
               }
          });
  },5000);
};

});