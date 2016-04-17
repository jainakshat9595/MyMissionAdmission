'use strict';
 
app.factory('Total',
  function (FIREBASE_URL, $rootScope, $q , $firebaseObject , $firebaseArray) {

    var ref = new Firebase('https://totalsession.firebaseio.com/profileForCollege/');
    var collegeArray = $firebaseArray(ref);

    var College = {
      allAsArray: collegeArray,

        find: function (collegeId) {
          return $firebaseObject(ref.child(collegeId));
        },
              
    };   
    return College;
  }
);

