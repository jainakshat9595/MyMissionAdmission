'use strict';
 
app.factory('AdminDeligation',function ($firebaseObject, $firebaseArray, FIREBASE_URL, $rootScope, toaster) {

	var AdminDeligation = {

		approveAdmin : function(adminData) {
			var ref = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + adminData.$id + '/');
	        //var sync = $firebase(ref);
	        if((adminData.privilege=="access_denied")){
	          ref.update({ privilege: "approved" });
	        }
		},

		makeHimHead : function(adminData, adminType) {
			var ref = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + adminData.$id + '/');
	        //var sync = $firebase(ref);
	        if((adminData.role=="none")){
	          if(adminType === "operationHead") {	
	          	ref.update({ role: adminType });
	          	ref.update({features:
	          					({ allOperationsFeatures: "yes", allSalesFeatures: "no", allBusinessFeatures: "no"})
	          				});
	          }
	          else if(adminType === "salesHead") {	
	          	ref.update({ role: adminType });
	          	ref.update({features:
	          					({ allOperationsFeatures: "no", allSalesFeatures: "yes", allBusinessFeatures: "no"})
	          				});
	          }
	          else if(adminType === "businessHead") {	
	          	ref.update({ role: adminType });
	          	ref.update({features:
	          					({ allBusinessFeatures: "yes", allOperationsFeatures: "no", allSalesFeatures: "no"})
	          				});
	          }
	        }
		},

		updateHead : function(adminData, adminType) {
			var ref = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + adminData.$id + '/');
	        //var sync = $firebase(ref);
	        if((adminData.role=="operationHead") || (adminData.role=="salesHead") || (adminData.role=="businessHead") ){
	          
	          if(adminType === "operationHead") {	
	          	ref.update({ role: adminType });
	          	ref.update({features:
	          					({ allOperationsFeatures: "yes", allSalesFeatures: "no", allBusinessFeatures: "no"})
	          				});
	          	toaster.pop('success', "Done!", "Now User is Operation's Head");
	          }
	          else if(adminType === "salesHead") {	
	          	ref.update({ role: adminType });
	          	ref.update({features:
	          					({ allOperationsFeatures: "no", allSalesFeatures: "yes", allBusinessFeatures: "no"})
	          				});
	          	toaster.pop('success', "Done!", "Now User is Sales Head");
	          }
	          else if(adminType === "businessHead") {	
	          	ref.update({ role: adminType });
	          	ref.update({features:
	          					({ allBusinessFeatures: "yes", allOperationsFeatures: "no", allSalesFeatures: "no"})
	          				});
	          	toaster.pop('success', "Done!", "Now User is Business Head");
	          }
	        }
		},

		approveSubordinate : function(subId,featureList,currentUser)
		{
			var subordinateRef = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + subId + '/');
			var subordinateObj = $firebaseObject(subordinateRef);
			subordinateObj.$loaded(function() {
				var currentuserRef = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + currentUser + '/');
				var obj = $firebaseObject(currentuserRef);
				obj.$loaded( function(obj) {
					if(obj.role=="operationHead")
		      		subordinateRef.update({ role: "operationSubordinate" });
		      	if(obj.role=="salesHead")
		      		subordinateRef.update({ role: "salesSubordinate" });
		      	if(obj.role=="businessHead")
		      		subordinateRef.update({ role: "businessSubordinate" });

				})
				
				angular.forEach(featureList, function(key,value) {
					var featuresRef = new Firebase(FIREBASE_URL + 'profileForAdmins/' + subId + '/features/' + key);					
					featuresRef.set("yes");
				})
				
				if((subordinateObj.privilege=="access_denied"))
		          subordinateRef.update({ privilege: "approved" });
			})
	    },

	    updateapproveSubordinate : function(subId,featureList,currentUser)
		{
			var featuresRef = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + subId + '/features/');
			var subordinateRef = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + subId + '/');
			var subordinateObj = $firebaseObject(subordinateRef);
			subordinateObj.$loaded(function() {
				var currentuserRef = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + currentUser + '/');
				var obj = $firebaseObject(currentuserRef);
				obj.$loaded( function(obj) {
					if(obj.role=="operationHead")
		      		subordinateRef.update({ role: "operationSubordinate" });
		      	if(obj.role=="salesHead")
		      		subordinateRef.update({ role: "salesSubordinate" });
		      	if(obj.role=="businessHead")
		      		subordinateRef.update({ role: "businessSubordinate" });

				});
				var newobj = $firebaseObject(featuresRef);
				newobj.$remove().then(function() {
					angular.forEach(featureList, function(key,value) {
						var featuresRef = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + subId + '/features/' + key);
						featuresRef.set("yes");
					});
				});					
				
				if((subordinateObj.privilege=="access_denied"))
		          subordinateRef.update({ privilege: "approved" });
			});
	    }
		
	}
	return AdminDeligation;
});
