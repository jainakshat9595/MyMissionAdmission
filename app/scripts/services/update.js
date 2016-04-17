'use strict';
 
app.factory('Update',
      function ($firebaseObject, $firebaseArray, FIREBASE_URL, Search, $rootScope,$q) {

            var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
            var collegeObj = $firebaseObject(ref);
            var collegeArray = $firebaseArray(ref);
            var Update = {
                  all: collegeObj,
                  allAsArray: collegeArray,

                  updateCollegeName: function (college, name) {
                        var nametxt = "Initial name";
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegename: name },function(ref) {
                              nametxt = "Name, ";                              
                         }),function(error) {
                              console.log("Error:", error);
                             }
                         return nametxt;
                  },

                  updateCollegeAffiliation: function (college, affiliation) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegeaffiliation: affiliation },function(ref) {
                              return "Affiliation, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                              }
                  },

                  updateCollegeWebsite: function (college, website) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         ref.update({ collegewebsite: website },function(ref) {
                              return "Website, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                              }
                  },

                  updateCollegeAddress: function (college, address) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegeaddress: address },function(ref) {
                              return "Address, ";
                         
                         }),  function(error) {
                               console.log("Error:", error);
                              }
                  },

                  updateCollegeCity: function (college, city) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegecity: city },function(ref) {
                              return "City, ";
                        
                         }),   function(error) {
                                 console.log("Error:", error);
                               }
                  },

                  updateCollegeLocation: function (college, location) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegelocation: location },function(ref) {
                              return "Location, ";
                         
                         }),  function(error) {
                               console.log("Error:", error);
                              }

                  },

                  updateCollegeCountry: function (college, country) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegecountry: country },function(ref) {
                              return "Country, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                             }
                  },

                  updateCollegeState: function (college, state) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegestate: state },function(ref) {
                              return "State, ";
                        }),function(error) {
                              console.log("Error:", error);
                        }
                  },

                  updateCollegePhoto: function (college, photo) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ collegephoto: photo },function(ref) {
                              return "Photo, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                             }
                  },
                  updateCollegeUG: function ($scope,College,ug) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + '/' + College.collegeId + '/' );
                         ref.update({ coursesofferedUG: ug });
                         $scope.submitsuccesstext = true;
                  },

                  getUGCoursescollege: function (College) {
                        var deferred = $q.defer();
                        var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + '/' + College.collegeId + '/');
                        var data = $firebaseObject(ref);
                        data.$loaded( function(data) {
                        deferred.resolve(data.coursesofferedUG);         
                      });
                      return deferred.promise;
                  },
                  getPGCoursescollege: function (College) {
                        var deferred = $q.defer();
                        var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + '/' + College.collegeId + '/');
                        var data = $firebaseObject(ref);
                        data.$loaded( function(data) {
                        deferred.resolve(data.coursesofferedPG);
                       });
                      return deferred.promise;
                  },
                  updateCollegePG: function ($scope,College,pg) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + '/' + College.collegeId + '/' );
                         ref.update({ coursesofferedPG: pg });
                         $scope.submitsuccesstext = true;
                  },
                  refershcollege: function (College) {
                         var deferred = $q.defer();
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + '/' + College.collegeId + '/');
                         var view = $firebaseObject(ref);
                         view.$loaded( function(view) {
                         deferred.resolve(view);           
                         });
                      return deferred.promise;
                },


                updateCollegefacetofacesession: function (college, face2facesessions) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ facetofacesessions: parseInt(face2facesessions) },function(ref) {
                              return "face2facesessions, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                            }
                  },

                  updateCollegecontractsessions: function ($scope, collegeId, college, contractsessionss) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ contractsessions: parseInt(contractsessionss)},function(ref) {
                              $scope.input[collegeId]="";
                              return "contractsessionss, ";
                         }), function(error) {
                              console.log("Error:", error);
                        }
                  },

                updateCounsellorname: function (college, counsellornewname) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ counsellornames: counsellornewname },function(ref) {
                              return "counsellornewname, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                             }
                  },

                  updateCounsellorsnumber: function (college, counsellorsnewnumber) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ counsellornumbers: counsellorsnewnumber },function(ref) {
                              return "counsellorsnewnumber, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                             }
                  },
                  updateCounsellorsemail: function (college, counsellorsnewemail) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ counselloremails: counsellorsnewemail },function(ref) {
                              return "counsellorsnewemail, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                            }
                  },

                  updateHighername: function (college, highername) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ higherauthoritynames: highername },function(ref) {
                              return "highername, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                            }
                  },

                  updateHighernumber: function (college, highernumber) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ higherauthoritynumbers: highernumber },function(ref) {
                              return "highernumber, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                          }
                  },
                  updateHigheremail: function (college, higheremail) {
                         
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ higherauthorityemails: higheremail },function(ref) {
                              return "Affiliation, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                             }
                  },
                  updateOperationemail: function (college, operationsemail,$scope) {
                         var simplelogin = Search.getAdminIdByEmail(operationsemail).then(function(result) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         //var sync = $firebase(ref);
                         ref.update({ accountmanager: result },function(ref) {
                              return "result, ";
                         
                         }), function(error) {
                              console.log("Error:", error);
                             }
                        });
                  },

            };     
        return Update;
      }
);