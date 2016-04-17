'use strict';

app.controller('BlogCtrl', function ($scope, $log, $document, $location, $interval, Blog, toaster) {

    $scope.imageurl = '';
    $scope.savePost = function(htmlVariable, postTitle, postCatagory) {
      if (htmlVariable.indexOf("img src") != -1){ 
        $scope.imageurl = ($('.imageLink')[0].value);
      }
      else if (htmlVariable.indexOf("img src") == -1){
        $scope.imageurl = "https://www.filepicker.io/api/file/8GywwiVVRyyHAsvx3sjB";
      }
      Blog.savePost(htmlVariable, postTitle, postCatagory, $scope.imageurl, $scope);
    };

    $scope.getPost = function () {
      $scope.numberOfPostsLoaded = 2;
      Blog.getPost($scope);
      $interval(function() {
        var temp = $location.path();
        var data = temp.split("/");
        if(data[1] === "blog") {
          Blog.loadMoreBlogs($scope.postNumber, $scope);
        }
      },5000,5);
    };

    $scope.loadMoreBlogs = function() {
      Blog.loadMoreBlogs($scope.postNumber, $scope);
    };

    $scope.getPostDetail = function() {
      var postUrl = $location.path();
      var postId = postUrl.slice(-20);;
      return Blog.getPostDetail(postId);
    };

    $scope.getCatagoryPosts = function() {
      var temp = $location.path();
      var data = temp.split("catagory/");
      var catagory = data[1];
      Blog.getCatagoryPosts(catagory, $scope);
      $interval(function() {
        var temp = $location.path();
        var data = temp.split("/catagory/");
        if(typeof data[1] !== 'undefined' && data[1] !== 'blog') {
          Blog.loadMoreCatagoryBlogs(catagory, $scope.postNumber, $scope);
        }
      },5000,5);
    };

    $scope.loadMoreCatagoryBlogs = function() {
      var temp = $location.path();
      var data = temp.split("catagory/");
      var catagory = data[1];
      Blog.loadMoreCatagoryBlogs(catagory, $scope.postNumber, $scope);
    };

    $scope.updateYear = function(year) {
      var path1="/blog/"+year;
      $location.path( path1 );
    };

    $scope.updateMonth = function(month) {
      var temp = $location.path();
      var data = temp.split("blog/");
      var data2 = data[1].split("/");
      var year = data2[0];
      var path = "/blog/"+year+"/"+month;
      $location.path( path );
    };

    $scope.getYearlyPosts = function() {
      var temp = $location.path();
      var data = temp.split("blog/");
      var year = data[1];
      Blog.getYearlyPosts(year,$scope);
    };
    
    $scope.getMonthlyPosts = function(month) {
      var temp = $location.path();
      var data = temp.split("blog/");
      var data2 = data[1].split("/");
      var year = data2[0];
      var month = data2[1];
      Blog.getMonthlyPosts(year, month, $scope);
      //$scope.monthlyPost = Blog.getMonthlyPosts(month, $scope.year);
    };

    $scope.updateTimestamp = function(postNumber) {
      $scope.postNumber = postNumber;
    };

  }).value('duScrollOffset', 30);
