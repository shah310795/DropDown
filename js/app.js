var app = angular.module("myApp", ['ngRoute',]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : 'views/root.html'
	})
	.when("/about", {
		templateUrl : 'views/about.html'
	})
	.when('/service', {
		templateUrl : 'views/service.html'
	})
	.otherwise({redirect : '/'})
});

app.filter("myFilter", function(){
	return function(str, isFemale){
		return (isFemale === true ? 'Mrs. ' + str : 'Mr. ' + str);
	}
});


app.controller("UserController", function($scope, userDataFactoryJSON){
	console.log("Controller loaded!!");
	$scope.users = []
	userDataFactoryJSON.getUsers().then(function(response){
					console.log(response.data.data)
					$scope.users = response.data.data;
				})
				.catch(function(err){
			 	console.log("Error :: " + err)
			 });
});

app.controller("SectionController", function($scope){
	$scope.tab = 1;
	$scope.isSelected = function(tabToCheck){
		return $scope.tab === tabToCheck;
	};
	$scope.selectedTab = function(val){
		$scope.tab = val;
	}
});

app.controller("formController", function($scope){
	$scope.comment ={};
	$scope.formSubmit = function(user){
		user.comments.push($scope.comment);
		alert("Form Submitted");
		$scope.comment = {};
	}

});

app.factory('userDataFactory', function(){
	var userData = [{
		firstName : "Bill",
		lastName : "Gates",
		company : "Microsoft Inc.",
		dob : new Date ("Dec 25 1965"),
		isWorking : true,
		income: 90909033945,
		image : "img/bill.jpg",
		isFemale : false,
		comments : [{
			author : "XYZ",
			body : "He is a fabulous guy"
		},
		{
			author : "ABC",
			body : "Is he still the richest guy?"
		}]
	}, {
		firstName : "Steve",
		lastName : "Jobs",
		company : "Apple",
		dob : new Date ("Dec 15 1968"),
		isWorking : false,
		income : 999999,
		image : "img/steve.jpg",
		isFemale : false,
		comments : [{
			author : "MNO",
			body : "Missing him"
		},
		{
			author : "LPO",
			body : "Apple fan boi here"
		}]
	}, {
		firstName : "Trump",
		lastName : "POS",
		company : "U to the ASS to the A",
		dob : new Date ("Jan 25 1965"),
		isWorking : true,
		income : 11111111,
		image : "img/trump.jpg",
		isFemale : true,
		comments : [{
			author : "LUKE",
			body : "Whu thes pos"
		},
		{
			author : "SABER",
			body : "OITNB"
		}]
	}
	];

	function getUserData(){
		return userData;
	}

	return {
		getUsers : getUserData
	}
});


app.directive("userDetail", function(){
	return {
		restrict : 'E', //A Attribute, M for comment, C for class
		templateUrl : 'views/userDetails.html'
	}
})

app.factory('userDataFactoryJSON', function($http){
	var userData = [];
	function getUserData(){
		return $http({method : "GET", url :"model/user-data.json", header : {"Content-type":"application/json"}})
	}

	return {
		getUsers : getUserData
	}
});
// app.controller("UserController", function($scope, userDataFactoryJSON){
// 	console.log("Controller loaded!!");
// 	$scope.users = []
// 	$scope.users = userDataFactoryJSON.getUsers();
// });

// app.factory('userDataFactoryJSON', function($http){
// 	var userData = [];
// 	function getUserData(){
// 		var promise = $http({method : "GET", url :"model/user-data.json", 
// 							header : {"Content-type":"application/json"}})
// 		promise.then(function(response){
// 			userData = response.data.data;
// 			return userData;
// 		});
// 		promise.catch(function(err){
// 			console.log("Error :: "+ err);
// 		})
// 	}
// 	return {
// 		getUsers : getUserData
// 	}
// });