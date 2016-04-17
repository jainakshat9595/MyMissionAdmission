'use strict';
app.factory('Blog', function ($firebaseAuth, $location, FIREBASE_URL, $firebaseObject, $firebaseArray, $rootScope, $filter ,$timeout) {
            
  var Blog = 
  {
    savePost: function(post, postTitle, postCatagory, imageurl, $scope) {
      var temp = post.toString();
      var i = 0;
      var postNumber=0;
      var postDate = new Date();
      var date = $filter('date')(postDate,'yyyyMMdd');
      var postTime = (postDate.getHours()<10?'0':'') + postDate.getHours()+ ":" + (postDate.getMinutes()<10?'0':'') + postDate.getMinutes();
      var temporary = postTime.split(':');
      var timestamp = date.toString()+temporary[0].toString()+temporary[1].toString();
      var post = new Firebase(FIREBASE_URL + "posts/allPosts/");
      post.limitToLast(1).once("value" , function(snapshot) {
        var data = snapshot.val();
        for(i in data) {  
          postNumber=data[i].postNumber;
          var tempTitle1 = postTitle.replace(/[^a-zA-Z0-9]/g, " ");
          var tempTitle2 = tempTitle1.replace(/\s+/g, '-');
          var tempTitle = $filter('lowercase')(tempTitle2);
          var newPost = post.push({ postData : temp, likes : 0, shares : 0, comments : 0, timestamp : timestamp, postDate : date, postTime : postTime, postTitle : postTitle, postNumber:postNumber+1, featuredImage:imageurl });
          var postId = newPost.key();
          var sharingUrl = "http://www.mymissionadmission.com/#/post/" + tempTitle + postId ;
          var updateSharingUrlRef = new Firebase(FIREBASE_URL + "posts/allPosts/" + postId);
          updateSharingUrlRef.update({sharingUrl : sharingUrl});
          Blog.savePostCatagorywise(temp, postTitle, postCatagory, imageurl, date, postTime, sharingUrl, postId, timestamp); 
          var year = date.slice(0,4);
          var month = date.slice(4,6);
          var day = date.slice(6,8);
          Blog.savePostDatewise(temp, postTitle, postCatagory, imageurl, year, month, day, date, postTime, sharingUrl, postId, timestamp);
        }
      });
    },

    savePostCatagorywise: function(temp, postTitle, postCatagory, imageurl, date, postTime, sharingUrl, postId, timestamp) {
          var i = 0;
          var catagorywisePostNumber = 0;
          var post = new Firebase(FIREBASE_URL+"posts/catagories/" + postCatagory + "/");
          post.limitToLast(1).once("value" , function(snapshot) {
            var data = snapshot.val();
            if(snapshot.val()) {
              for(i in data) {
                catagorywisePostNumber=data[i].postNumber;
                var postCatagoryWiseRef = new Firebase(FIREBASE_URL+"posts/catagories/" + postCatagory + "/" + postId);
                postCatagoryWiseRef.set({ postData : temp, likes : 0, shares : 0, comments : 0, sharingUrl : sharingUrl,  timestamp : timestamp, postDate : date, postTime : postTime, postTitle : postTitle, postNumber : catagorywisePostNumber+1, featuredImage:imageurl });
              };
            }
            else if(!snapshot.val()) {
              catagorywisePostNumber=0;
              var postCatagoryWiseRef = new Firebase(FIREBASE_URL+"posts/catagories/" + postCatagory + "/" + postId);
              postCatagoryWiseRef.set({ postData : temp, likes : 0, shares : 0, comments : 0, sharingUrl : sharingUrl,  timestamp : timestamp, postDate : date, postTime : postTime, postTitle : postTitle, postNumber : catagorywisePostNumber+1, featuredImage:imageurl });
            }
          });
    },

    savePostDatewise: function(temp, postTitle, postCatagory, imageurl, year, month, day, date, postTime, sharingUrl, postId, timestamp) {
          var i = 0;
          var datewisePostNumber = 0;
          var post = new Firebase(FIREBASE_URL+"posts/dateWise/" + year + "/" + month + "/");
          post.limitToLast(1).once("value" , function(snapshot) {
            if(snapshot.val()) {
              var data = snapshot.val();
              for(i in data) {
                datewisePostNumber=data[i].postNumber;
                var postDateWiseRef = new Firebase(FIREBASE_URL+"posts/dateWise/" + year + "/" + month + "/" + postId);
                postDateWiseRef.set({ postData : temp, likes : 0, shares : 0, comments : 0, sharingUrl : sharingUrl,  timestamp : timestamp, postDate : date, postTime : postTime, postTitle : postTitle,postNumber : datewisePostNumber+1, featuredImage:imageurl });
              };
            }
            else if(!snapshot.val()) {
              datewisePostNumber=0;
              var postDateWiseRef = new Firebase(FIREBASE_URL+"posts/dateWise/" + year + "/" + month + "/" + postId);
              postDateWiseRef.set({ postData : temp, likes : 0, shares : 0, comments : 0, sharingUrl : sharingUrl,  timestamp : timestamp, postDate : date, postTime : postTime, postTitle : postTitle,postNumber : datewisePostNumber+1, featuredImage:imageurl });
            }
            
          });
    },

    getPost: function($scope) {
      $scope.post = [];
      var postRef = new Firebase(FIREBASE_URL+"posts/allPosts");
        $scope.post = $firebaseArray(postRef.limitToLast(2));
        $scope.$evalAsync();
    },

    loadMoreBlogs : function(postNumber, $scope) {
      var tempPostArr = [];
      if(($scope.starting !== postNumber-2) && ($scope.ending !== postNumber-1)) {
        $scope.starting = postNumber-2;
        $scope.ending = postNumber-1;
        if(($scope.ending > 0 || $scope.ending == 0) && ($scope.starting > 0 || $scope.starting == 0)) {
          var postRef = new Firebase(FIREBASE_URL+"posts/allPosts");
          var tempPost = $firebaseArray(postRef.orderByChild("postNumber").startAt($scope.starting).endAt($scope.ending));
          tempPost.$loaded(function(value,key) {
            tempPostArr = value;
            tempPostArr = tempPostArr.concat($scope.post);
            $scope.post = tempPostArr;
            $scope.$evalAsync();
          });  
        };
      };
    },

    getPostDetail: function(postId) {
      var postRef = new Firebase(FIREBASE_URL + "posts/allPosts/" + postId);
      return $firebaseObject(postRef); 
    },

    getCatagoryPosts: function(catagory, $scope) {
      $scope.post = [];
      var postCatagoryWiseRef = new Firebase(FIREBASE_URL+"posts/catagories/" + catagory);
      $scope.post = $firebaseArray(postCatagoryWiseRef.limitToLast(2));
      $scope.$evalAsync();
    },
      

    loadMoreCatagoryBlogs : function(catagory, postNumber, $scope) {
      var tempPostArr = [];
      if(($scope.starting !== postNumber-2) && ($scope.ending !== postNumber-1)) {
        $scope.starting = postNumber-2;
        $scope.ending = postNumber-1;
        if(($scope.ending > 0 || $scope.ending == 0) && ($scope.starting > 0 || $scope.starting == 0)) {
          var postCatagoryWiseRef = new Firebase(FIREBASE_URL+"posts/catagories/" + catagory);
          var tempPost = $firebaseArray(postCatagoryWiseRef.orderByChild("postNumber").startAt($scope.starting).endAt($scope.ending));
          tempPost.$loaded(function(value,key) {
            tempPostArr = value;
            tempPostArr = tempPostArr.concat($scope.post);
            $scope.post = tempPostArr;
            $scope.$evalAsync();
          });  
        };
      };
    },

    getYearlyPosts: function(year,$scope) {
      $scope.post=[];
      var postDateWiseRef = new Firebase(FIREBASE_URL+"posts/dateWise/" + year);
      postDateWiseRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key();
          angular.forEach(childSnapshot.val(), function(posts) {
            $scope.post=$scope.post.concat(posts);
            $scope.$evalAsync();
          });
        });
      });
    },

    getMonthlyPosts: function(year, month, $scope) {
      $scope.post=[];
      var postDateWiseRef = new Firebase(FIREBASE_URL+"posts/dateWise/" + year+ "/" +month);
      postDateWiseRef.on("value", function(snapshot) {
        angular.forEach(snapshot.val(), function(posts) {
          $scope.post=$scope.post.concat(posts);
          $scope.$evalAsync();
        });
      });
    },
  };
  return Blog;
});





















