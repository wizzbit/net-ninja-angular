var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider' function($routeProvider, $locationProvider){
$locationProvider.html5Mode(true);


  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'NinjaController'
  })

  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactController'
  })

  .when('/contact-success', {
    templateUrl: 'views/contact-success.html',
    controller: 'ContactController'
  })

  .when('/directory', {
    templateUrl: 'views/directory.html',
    controller: 'NinjaController'
  }).otherwise({
    redirectTo: '/home'
  });



}]);

myNinjaApp.directive('randomNinja', [function(){

  return {
    restrict: 'E',
    scope: {
      ninjas: '=',
      title: '='
    },
    templateUrl:  'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
    $scope.random = Math.floor(Math.random() * 4);
      }
  };

}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

$scope.removeNinja = function(ninja){

  var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
}

$scope.addNinja = function(){

  $scope.ninjas.push({
    name: $scope.newninja.name,
    belt:$scope.newninja.belt,
    rate: parseInt($scope.newninja.rate),
    available: true
  });

  $scope.newninja.name = ""
  $scope.newninja.belt = ""
  $scope.newninja.rate = ""

};

  $scope.removeAll = function(){

    $scope.ninjas = [];
  };

  $scope.message = "hey y'all peeps!";

 $http.get('data/ninjas.json').success(function(data){

   $scope.ninjas = data;
 });

}]);


myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('contact-success');
  };

}]);
