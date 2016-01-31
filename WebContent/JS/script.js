/**
 * 
 */
var app=angular.module("myApp",['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/",{
		templateUrl:'login.html',
		controller:"loginCtrl"
	})
	.when("/dashboard",{
		templateUrl:"dashboard.html",
		controller:"dashboardCtrl"
	})
	.when("/checking",{
		templateUrl:"checking.html",
		controller:"checkCtrl"
	})
	.when("/saving",{
		templateUrl:"saving.html",
		controller:"saveCtrl"
	})
	.when("/credit",{
		templateUrl:"credit.html",
		controller:"creditCtrl"
	})
})

app.service('loggedInStatus',function(){
	var loggedIn="";
	return{
		getStatus:function(){
			return loggedIn;
		},
		setStatus:function(value){
			loggedIn=value;
		}
	};
});
app.controller("checkCtrl",function($scope,$http){
	$http.get("checkingData.json").success(function(data){
		console.log(data);
		$scope.orderList=data;
	})
})
app.controller('headerCtrl', function ($scope, loggedInStatus) {  
	$scope.loggedIn = loggedInStatus.getStatus();
	if ($scope.loggedIn =="") {
			$scope.loggedOut = "true";
	} else {
			$scope.loggedOut = "";
	}

	$scope.stillLoggedIn = function() {
		loggedInStatus.setStatus("true");
	};
	});

app.controller("loginCtrl",function($scope, $rootScope, $location,loggedInStatus){
	$scope.submit=function(){
		if($scope.username=="admin" && $scope.password=="admin"){
			$rootScope.uname=$scope.username;
			$rootScope.pwd=$scope.password;
			//$scope.user=$scope.username;
			loggedInStatus.setStatus("true");
			$location.path("/dashboard")
		}
	}
})

app.controller("dashboardCtrl", function($scope, $rootScope){
	$scope.user=$rootScope.uname;
})


app.directive("header",function(){
	return{
		restrict:"E",
	 	templateUrl:"header.html",
	 	scope:true
	}
})

app.directive("footer",function(){
	return{
		restrict:"A",
	 	templateUrl:"footer.html",
	 	scope:true
	}
})