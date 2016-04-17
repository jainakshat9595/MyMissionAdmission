/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name mmaApp
 * @description
 * # mmaApp
 *
 * Main module of the application.
 */
var pos=null;
var app = angular.module('mmaApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.utils',
    'checklist-model',
    'ui.bootstrap',
    'firebase',
    'reCAPTCHA',
    'angularFilepicker',
    'toaster',
    'youtube-embed',
    'duScroll',
    'angular-md5',
    'ngMap',
    'textAngular'
  ])
  app.constant('FIREBASE_URL', 'https://ashummaapp.firebaseio.com/');
  app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    if($location.path() == '/main') {
      $location.hash($routeParams.scrollTo);
      $anchorScroll(); 
    }
  });
});
  app.filter('convert', function(){
  return function(input){
  var months={'01':"Jan",'02':"Feb",'03':"Mar",'04':"Apr",'05':"May",'06':"Jun",'07':"Jul",'08':"Aug",'09':"Sep",'10':"Oct",'11':"Nov",'12':"Dec"};   
  var mm=String(input[4]+input[5]);
  var output=input[6]+input[7]+' '+months[mm]+' '+input[0]+input[1]+input[2]+input[3];
    return output; 
  };
   
});
  app.filter('change_time', function(){
   return function(input){
    var dd = "AM";
    var h = parseInt(input[0]+input[1]);
    if (h >= '12') {
        h = h-'12';
        dd = "PM";
    }
    if (h == '0') {
        h = '12';
    }
    var output=h+':'+input[3]+input[4]+dd;
      return output; 
    };
   
});
  app.controller('mapController', function($scope) {
    $('#mma-button').fadeOut();
    $scope.setMapCenterToMarker=function(){
      $scope.map.panTo({lat: 28.621398, lng: 77.081163});
      $scope.map.setZoom(16);
      $('#mma-button').fadeOut(100);
    };
    $scope.onDrag=function(){
      var MMAmarker=new google.maps.LatLng(28.621398,77.076163);
      if($scope.map.getBounds().contains(MMAmarker)){
        $('#mma-button').fadeOut(100);
        console.log('contains');
      }
      else{
        $('#mma-button').fadeIn(100);
      }
    };
  });
  app.directive('scrollTrigger', function($window) {
    return {
        link : function(scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function() {
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply(attrs.scrollTrigger);
                }
            });
        }
    };
  });

  app.directive('demoEditor', function(broadcastFactory) {
  return {
    restrict: 'AE',
    link: function(scope, elem, attrs) {
      scope.$watch('isEditable', function(newValue) {
        elem.attr('contenteditable', newValue);
      });
      elem.on('keyup keydown', function() {
        scope.$apply(function() {
          scope[attrs.model] = elem.html().trim();
        });
      });
    }
  };
  });

  app.directive('scroll', function($window, $route, $location){//, $cookies) {
    return {
      restrict: 'AE',
      link: function(scope, elem, attrs) {
        var pos=null;
        if($location.path() == '/main') {
          angular.element($window).unbind("scroll");
          angular.element($window).bind("scroll", function() {
            if($(window).width()>768&&$location.path() == '/main'){
              elem.removeClass("set-bottom");
              elem.removeClass("stick-top");
              $('.main-page-feature-second-how-it-works-img-div-right').removeClass('col-md-offset-6');
              pos = $('#howItWorks').position().top;//elem.position().top;
               pos = pos + 82;
              var windowpos = $window.scrollY;
              var stickermax = $('#howItWorks').position().top+$('#howItWorks').height()-($('#howItWorks').height()/10)*2.3;
              if (windowpos >= pos && windowpos < stickermax) {
                $('.main-page-feature-second-how-it-works-img-div-right').addClass('col-md-offset-6');
                elem.removeClass("set-bottom");
                elem.addClass("stick-top");
              }
              else if (windowpos >= stickermax) {
                elem.removeClass("stick-top");
                elem.addClass("set-bottom");
                $('.main-page-feature-second-how-it-works-img-div-right').removeClass('col-md-offset-6');
              }
              else {
                elem.removeClass("set-bottom");
                elem.removeClass("stick-top");
                $('.main-page-feature-second-how-it-works-img-div-right').removeClass('col-md-offset-6');
              }

              if($route.current.activePage == 'transNav') {
                if(windowpos >= 10) {
                  $('nav.navbar.navbar-default').removeClass('nav-signed-out');
                  $('nav.navbar.navbar-default').addClass('blue-dark nav-signed-in');
                }
                else {
                  $('nav.navbar.navbar-default').removeClass('blue-dark nav-signed-in');
                  $('nav.navbar.navbar-default').addClass('nav-signed-out');
                }
              }
              scope.$apply();
            }
          });
        }
        else if($location.path().indexOf('/college-profile/simplelogin:')+1) {
          angular.element($window).unbind("scroll");
          angular.element($window).bind("scroll", function() {
            var windowpos = $window.scrollY;
            if($route.current.activePage == 'transNav') {
              if(windowpos >= 10) {
                
                $('nav.navbar.navbar-default').removeClass('nav-signed-out');
                $('nav.navbar.navbar-default').addClass('blue-dark nav-signed-in');
              }
              else {
                $('nav.navbar.navbar-default').removeClass('blue-dark nav-signed-in');
                $('nav.navbar.navbar-default').addClass('nav-signed-out');
              }
            }
          });
          scope.$evalAsync();
        }
    }
  }
});

  app.directive("starRating", function() {
    return {
      restrict : "A",
      template : "<ul class='rating'>" +
                 "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                 "    <i class='fa fa-star anhadcust{{$index}}'></i>" + //&#9733
                 "  </li>" +
                 "</ul>",
      scope : {
        ratingValue : "=",
        max : "=",
        onRatingSelected : "&"
      },
      link : function(scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for ( var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
            rating : index + 1
          });
        };
        scope.$watch("ratingValue", function(oldVal, newVal) {
          if (newVal) { updateStars(); }
        });
      }
    };
  });
  app.filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });

  app.filter('slice', function() {
      return function(arr, start, end) {
            return arr.slice(start, end);
          };
  });

  app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

    app.filter('cut_phone', function () {
        return function (value) {
            if (!value) return '';
            
            var max = 6;
            var value_num;
            value_num = value.substr(max, 9);
            
            return 'xxxxxx' + value_num;
        };
    });
  
    app.config(function (reCAPTCHAProvider) {
      // required: please use your own key :) 6LdzWQETAAAAAHr42DnChnVK8z_FYRQMd0AUZ_eB
      reCAPTCHAProvider.setPublicKey('6LdyWQETAAAAAPdQPxFf0WfC5py1Q3CTqyRHTsyL');

      // optional: gets passed into the Recaptcha.create call
      reCAPTCHAProvider.setOptions({
        theme: 'clean'
      });
    });  

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl as registration',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        },
        activePage: 'normNav'
      })

     .when('/register/:email', {
        templateUrl: 'views/refer-register.html',
        controller: 'ReferCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        },
        activePage: 'normNav'
      }) 
     .when('/login/:email', {
        templateUrl: 'views/refer-login.html',
        controller: 'ReferCtrl',
        resolve: {
          user: function(Auth) {
          return Auth.resolveUser();
          }
        },
        activePage: 'normNav'
      })
     .when('/school', {
        templateUrl: 'views/register-school.html',
        controller: 'AuthSchoolCtrl',
        resolve: {
          users: function(AuthSchool) {
            return AuthSchool.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/login-school', {
        templateUrl: 'views/login-school.html',
        controller: 'AuthSchoolCtrl',
        resolve: {
          users: function(AuthSchool) {
            return AuthSchool.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/school-studentregister', {
        templateUrl: 'views/school-studentregister.html',
        controller: 'SchoolDashCtrl as registration',
        resolve: {
          user: function(SchoolTask) {
            return SchoolTask.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/verify-school', {
        templateUrl: 'views/verify-school.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/schoolstudent-success', {
        templateUrl: 'views/schoolstudent-regitration-success.html',
        controller: 'SchoolDashCtrl as registration',
        activePage: 'normNav'
      })
      .when('/school-webinar', { 
        templateUrl: 'views/allschoolwebinar.html',
        controller: 'WebinarCtrl',
        activePage: 'normNav'
      })
      .when('/school-webinar-history', { 
        templateUrl: 'views/booked-school-webinars.html',
        controller: 'WebinarCtrl',
        activePage: 'normNav'
      })
      .when('/school-book-webinar/:webinarId', { 
        templateUrl: 'views/school-bookwebinar.html',
        controller: 'WebinarCtrl',
        resolve: {
          user: function(SchoolTask) {
            return SchoolTask.resolveUser();
          }
        },
        activePage: 'noFoot'
      })
      .when('/register-admin', {
        templateUrl: 'views/register-admin.html',
        controller: 'AdminAuthCtrl',
        resolve: {
          usera: function(AdminAuth) {
            return AdminAuth.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
          return Auth.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/login-admin', {
        templateUrl: 'views/login-admin.html',
        controller: 'AdminAuthCtrl',
        resolve: {
          usera: function(AdminAuth) {
          return AdminAuth.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/college', {
        templateUrl: 'views/new-college.html',
        controller: 'CollegeRegCtrl',
        resolve: {
          userb: function(AuthCollege) {
            return AuthCollege.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/login-college', {
        templateUrl: 'views/login-college.html',
        controller: 'AuthCollegeCtrl',
        resolve: {
          userc: function(AuthCollege) {
            return AuthCollege.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/login-college/:clgMail', {
        templateUrl: 'views/login-college.html',
        controller: 'AuthCollegeCtrl',
        resolve: {
          userc: function(AuthCollege) {
            return AuthCollege.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/nodal-studentregister', {
        templateUrl: 'views/nodal-studentregister.html',
        controller: 'NodalTaskCtrl as registration',
        resolve: {
          user: function(NodalTask) {
            return NodalTask.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/nodal-studentregister/:email', {
        templateUrl: 'views/nodal-studentregister.html',
        controller: 'NodalTaskCtrl as registration',
        resolve: {
          user: function(NodalTask) {
            return NodalTask.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/nodal', {
        templateUrl: 'views/register-admin-nodal.html',
        controller: 'NodalAuthCtrl',
        resolve: {
          usern: function(NodalAuth) {
            return NodalAuth.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/login-nodal', {
        templateUrl: 'views/login-nodal-admin.html',
        controller: 'NodalAuthCtrl',
        resolve: {
          usern: function(NodalAuth) {
          return NodalAuth.resolveUser();
          }
        },
        activePage: 'normNav'
      })
      .when('/dashboard-school', {
        templateUrl: 'views/school-dashboard.html',
        controller: 'SchoolDashCtrl',
        activePage: 'noFoot'
      })
      .when('/nodalstudent-success', {
        templateUrl: 'views/nodalstudent-registeration-success.html',
        controller: 'NodalDashCtrl',
        activePage: 'normNav'
      })
      .when('/verify-nodalcenter', {
        templateUrl: 'views/verify-nodalcenter.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/unverify-nodalcenter', {
        templateUrl: 'views/unverify-nodalcenter.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/nodalcenterinfo', {
        templateUrl: 'views/nodal-center-info.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
       .when('/dashboard-nodal', {
        templateUrl: 'views/nodal-dashboard.html',
        controller: 'NodalDashCtrl',
        activePage: 'noFoot'
      })
       .when('/nodal-account', {
        templateUrl: 'views/nodal-account.html',
        controller: 'NodalTaskCtrl',
        activePage: 'normNav'
      })
      .when('/college-dashboard', {
        templateUrl: 'views/college-dashboarda.html',
        controller: 'CollegeDashCtrlA',
        activePage: 'normNav'
      })
      .when('/hang/:email', {
        templateUrl: 'views/hang.html',
        controller: 'CollegeDashCtrl',
        activePage: 'normNav'
      })
      .when('/success', {
        templateUrl: 'views/college-registeration-success.html',
        controller: 'CollegeAuthCtrl',
        activePage: 'normNav'
      })
      .when('/subscription', {
        templateUrl: 'views/upgrade-college-subscription.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })      
      .when('/verify-college', {
        templateUrl: 'views/verify-new-college.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      }) 
      .when('/verify-student', {
        templateUrl: 'views/verify-student.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/unverify-student', {
        templateUrl: 'views/unverify-student.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/block-student', {
        templateUrl: 'views/block-student.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/unblock-student', {
        templateUrl: 'views/unblock-student.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/client-status', {
        templateUrl: 'views/client-status.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/rejected-session', {
        templateUrl: 'views/rejected-session.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/rejected-sessions/:collegeId', {
        templateUrl: 'views/rejected-sessions.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/verify-session', {
        templateUrl: 'views/verify-session.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/sessions/:collegeId', {
        templateUrl: 'views/sessions.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/view-session', {
        templateUrl: 'views/view-session.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })  
      .when('/hide-college', {
        templateUrl: 'views/hide-college.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })     
      .when('/edit-college', {
        templateUrl: 'views/edit-college.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })      
      .when('/edit-student', {
        templateUrl: 'views/edit-student.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/edit-college-profile', {
        templateUrl: 'views/edit-college-profile.html',
        controller: 'CollegeDashCtrl',
        activePage: 'normNav'
      })      
      .when('/build-enquiry/:Nid', {
        templateUrl: 'views/build-enquiry.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })      
      .when('/change-counsellor', {
        templateUrl: 'views/change-counsellor.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/change-student-email', {
        templateUrl: 'views/change-studentemail.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      }) 
      .when('/change-adminemail', {
        templateUrl: 'views/change-adminemail.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/change-nodalemail', {
        templateUrl: 'views/change-nodalemail.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/delete-enquiry', {
        templateUrl: 'views/delete-enquiry.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      }) 
      .when('/logout-users', {
        templateUrl: 'views/logout-users.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      }) 
      .when('/change-collegerank', {
        templateUrl: 'views/change-collegerank.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })  
      .when('/change-student-password',{
        templateUrl: 'views/change-studentpassword.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/change-college-password',{
        templateUrl: 'views/change-collegepassword.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/change-admin-password',{
        templateUrl: 'views/change-adminpassword.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })   
      .when('/nodal-studentemails',{
        templateUrl: 'views/nodal-studentemails.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/studentemails/:studentId', {
        templateUrl: 'views/studentemailList.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/change-nodal-password',{
        templateUrl: 'views/change-nodalpassword.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        activePage: 'normNav'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activePage: 'transNav'
      })
      .when('/about', {
        templateUrl: 'views/about-us.html',
        controller: 'AboutCtrl',
        activePage: 'normNav'
      })
      .when('/college-profile/:collegeId', {
        templateUrl: 'views/college-profile.html',
        controller: 'CollegeProfileCtrl',
        activePage: 'transNav'
      })
      .when('/dashboard', {
        templateUrl: 'views/student-dashboard.html',
        controller: 'StudentDashCtrl',
        activePage: 'normNav'
      })
      .when('/dashboard-college', {
        templateUrl: 'views/college-dashboard.html',
        controller: 'CollegeDashCtrl',
        activePage: 'noFoot'
      })
      .when('/dashboard-admin', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'AdminDashCtrl',
        activePage: 'noFoot'
      })
      .when('/nav-dash', {
        templateUrl: 'views/nav-dash.html',
        controller: 'Nav-dashCtrl',
        activePage: 'normNav'
      })
     .when('/error', {
        templateUrl: 'views/err.html',
        controller: 'Nav-dashCtrl',
        activePage: 'normNav'
      })
      .when('/sales', {
        templateUrl: 'views/sales.html',
        controller: 'CollegeDashCtrl',
        activePage: 'normNav'
      }) 
      .when('/verify/:userId', {
        templateUrl: 'views/verify.html',
        controller: 'VerifyCtrl',
        activePage: 'normNav'
      }) 
      .when('/ReferNodalVerify/:userId', {
        templateUrl: 'views/refernodalverify.html',
        controller: 'VerifyReferNodalCtrl',
        activePage: 'normNav'
      })     
      .when('/refer', {
        templateUrl: 'views/student-dashboard-incentive.html',
        controller: 'StudentDashCtrl',
        activePage: 'normNav'
      })
      .when('/align-sessions:nodalId', {
        templateUrl: 'views/align-sessions.html',
        controller: 'AlignSessionsCtrl',
        activePage: 'normNav'
      }) 
      .when('/giveFeedback', {
        templateUrl: 'views/adminGiveFeedback.html',
        controller: 'AdminFeedbackCtrl',
        activePage: 'normNav'
      })
      .when('/pendingSessions', {
        templateUrl: 'views/pendingSessions.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/workDeligation', {
        templateUrl: 'views/admin-delegation.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })
      .when('/updateAdminDeligation', {
        templateUrl: 'views/update-admindelegation.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })
      .when('/SelectFeatureForOperationsSub:ID', {
        templateUrl: 'views/SelectOpeartionsFeature.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })
      .when('/UpdateFeatureForOperationsSub:ID', {
        templateUrl: 'views/updateOperationFeatures.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })  
      .when('/SelectFeatureForSalesSub:ID', {
        templateUrl: 'views/SelectSalesFeature.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })
      .when('/UpdateFeatureForSalesSub:ID', {
        templateUrl: 'views/updateSalesFeatures.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })
      .when('/SelectFeatureForBusinessSub:ID', {
        templateUrl: 'views/SelectBusinessFeature.html',
        controller: 'AdminDeligationCtrl',
        activePage: 'normNav'
      })
      .when('/deleteDemoStudent', {
        templateUrl: 'views/deleteDemoStudent.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/total-sessions', {
        templateUrl: 'views/total-sessions.html',
        controller: 'TotalCtrl',
        activePage: 'normNav'
      })
      .when('/contact', {
        templateUrl: 'views/contact-us.html',
        controller: 'ContactCtrl',
        activePage: 'normNav'
      })
      .when('/monthly-session-detail', {
        templateUrl: 'views/monthly-session-detail.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/nodal-monthly-session', {
        templateUrl: 'views/nodal-monthly-session.html',
        controller: 'NodalTaskCtrl',
        activePage: 'normNav'
      })
      .when('/edit-nodal', {
        templateUrl: 'views/edit-nodal.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav'
      })
      .when('/nodal-send-email', {
        templateUrl: 'views/nodal-send-email.html',
        controller: 'NodalTaskCtrl',
        activePage: 'normNav'      
      })
      .when('/upgraded-college', {
        templateUrl: 'views/upgraded-college.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav' 
      })
      .when('/trained-college', {
        templateUrl: 'views/trained-college.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav' 
      })
      .when('/postBlog', {
        templateUrl: 'views/postBlog.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/blog/:Year', {
        templateUrl: 'views/yearlyData.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/blog/:Year/:Month', {
        templateUrl: 'views/monthlyData.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/post/:postId', {
        templateUrl: 'views/post.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/catagory/English', {
        templateUrl: 'views/blogCatagory.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/catagory/Random', {
        templateUrl: 'views/blogCatagory.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/catagory/Science', {
        templateUrl: 'views/blogCatagory.html',
        controller: 'BlogCtrl',
        activePage: 'normNav' 
      })
      .when('/sitemap',{
        templateUrl: 'views/sitemap.html',
        controller: 'MainCtrl',
        activePage: 'normNav' 
      })
      .when('/mobile', {
        templateUrl: 'views/android.html',
        controller: 'MainCtrl',
        activePage: 'normNav' 
      })
      .when('/faq', {
        templateUrl: 'views/faq.html',
        controller: 'MainCtrl',
        activePage: 'normNav' 
      })
      .when('/college-view',{
        templateUrl: 'views/college-view.html',
        controller: 'AdminTaskCtrl',
        activePage: 'normNav' 
      })
      .when('/forgotpassword', {
        templateUrl: 'views/forgotpassword.html',
        controller: 'MainCtrl',
        activePage: 'normNav'
      })
      .when('/resetpassword/:url', {
        templateUrl: 'views/reset-password.html',
        controller: 'MainCtrl',
        activePage: 'normNav'
      })
      .when('/account-settings', {
        templateUrl: 'views/account-settings.html',
        controller: 'StudentDashCtrl',
        activePage: 'normNav'
      })
      .when('/align-webinar',{
        templateUrl: 'views/align-webinar.html',
        controller: 'WebinarCtrl',
        activePage: 'normNav' 
      })
      .when('/all-webinar',{
        templateUrl: 'views/all-webinar.html',
        controller: 'WebinarCtrl',
        activePage: 'normNav' 
      })
      .when('/admin-webinar:webinarId',{
        templateUrl: 'views/adminwebinarchat.html',
        controller: 'WebinarCtrl',
        activePage: 'normNav' 
      })
      .otherwise({
        redirectTo: '/main'
      });
  });