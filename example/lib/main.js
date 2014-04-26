'use strict';


// Declare app level module which has no dependencies.
// AngjularJS is a client side javascript MVC.
var myApp = angular.module('mainApp', []);
myApp.controller('mainCtrl', function($scope) {
    $scope.helloWorld = "helloWorld22";

    $scope.newGame = function() {
        alert('New Game');
    }

});







