'use strict';
 
app.factory('chat',
      function ($firebaseObject, $firebaseArray, FIREBASE_URL, $rootScope, $filter,$timeout) {
            
            var chat = 
                  {
                        
                        loadMsg: function ($scope,nid,name){
                                    $scope.nid=nid;
                                    var initialData=false;
                                    $scope.iterate+=1;
                                    var myDataref = new Firebase(FIREBASE_URL+'/chat/'+nid);
                                    myDataref.off('child_added');
                                    myDataref.orderByChild("timestamp").limitToLast(30*($scope.iterate)).once("value", function(snapshot) {
                                    $scope.list=[];
                                          
                                    snapshot.forEach(function(data) {
                                          $scope.list=$scope.list.concat([{date:data.val().date,name:data.val().name,msg:data.val().msg,time:data.val().time}]);
                                          if(data.val().timestamp==$scope.stamp){
                                          $scope.loader1=false;
                                          }
                                    });
                                   if($scope.list.length >= 30){
                                          $scope.loader=true;
                                    }
                                    if($scope.list.length==0){
                                                initialData=true;
                                          }
                                    $scope.$evalAsync();
                                    $scope.toUp();
                                    
                              });
                                    myDataref.limitToLast(1).on('child_added', function(snapshot) {
                                          var data1=snapshot.val();
                                          if(initialData){
                                                $scope.list=$scope.list.concat([{date:data1.date,name:data1.name,msg:data1.msg,time:data1.time}]);
                                                if(data1.name!==name){
                                                      $scope.newMsg();
                                                      var pos=$(".content").scrollTop();
                                                      $timeout(function() {$(".content").animate({scrollTop:pos+100},500);
                                                },500);
                                          }
                                    }
                                          if(initialData==false){
                                                initialData=true;
                                          }
                                    
                              });
                                          
                        },  
                             check:function($scope,nid){
                              var i=0;
                              var ref = new Firebase(FIREBASE_URL+'/chat/'+nid);
                              ref.orderByChild('timestamp').limitToFirst(1).on('value',function(snapshot){
                              var data=snapshot.val();
                              for(i in data){
                               $scope.stamp=data[i].timestamp;
                              }
                         });
                        },  
                        
                        send_Msg:function(input,sender,nid){ 
                              var ref = new Firebase(FIREBASE_URL+'/chat/'+nid+ '/');
                              var time = new Date();
                              var date = $filter('date')(time,'yyyyMMdd');
                              var t=(time.getHours()<10?'0':'') + time.getHours()+ ":" + (time.getMinutes()<10?'0':'') + time.getMinutes(); 
                              
                              ref.push({msg:input,name:sender,time:t,date:date,timestamp:Firebase.ServerValue.TIMESTAMP});

                        }

                         
                  }      

                       
            return chat;

      
});