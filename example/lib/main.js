'use strict';


// Declare app level module which has no dependencies.
// AngjularJS is a client side javascript MVC.
var myApp = angular.module('mainApp', []);
myApp.controller('mainCtrl', function($scope, $filter) {

    $scope.accelerationData = null;
    $scope.isFullScreen = false;

    $scope.newGame = function() {
        $scope.gameStarted = true;
        $scope.gameState = "rendererSelection";

        if (!Detector.webgl ) {
            $scope.renderer = new THREE.CanvasRenderer();
            $scope.renderSupport = "Canvas"
        }
        else {
            $scope.renderer = new THREE.WebGLRenderer();
            $scope.renderSupport = "WebGL"
        }
    }

    $scope.setGameState = function(gameStateToSet) {
        $scope.gameState = gameStateToSet;
    }

    $scope.checkDeviceMotionSupport = function() {

        //TODO HACK JUMP!!!
        //$scope.gameState = 'gameLoaded';
        //$scope.gameRunning = true;
        //return;

        if (window.DeviceOrientationEvent) {
            $scope.deviceMotionSupport = true;
        }
        else {
            $scope.deviceMotionSupport = false;
        }
    }

    $scope.tiltOrder = ['tiltLeft', 'tiltRight', 'tiltUp', 'tiltDown'];
    $scope.tiltCount = 0;
    $scope.xTilt = [];
    $scope.yTilt = [];
    $scope.zTilt = [];


    $scope.biggestTilt = {}
    $scope.recordTilt = function(deviceMotion) {
        // Initialize as soon as they start moving
        if (angular.isUndefined($scope.startTime))
            $scope.startTime = moment().add('seconds', 3);

        if (angular.isNumber(deviceMotion.accelerationIncludingGravity.x))
            $scope.xTilt.push(deviceMotion.accelerationIncludingGravity.x);

        if (angular.isNumber(deviceMotion.accelerationIncludingGravity.y))
            $scope.yTilt.push(deviceMotion.accelerationIncludingGravity.y);


        if (angular.isNumber(deviceMotion.accelerationIncludingGravity.z))
            $scope.zTilt.push(deviceMotion.accelerationIncludingGravity.z);

        if ($scope.startTime.isBefore(moment()) || $scope.xTilt.length > 300) {
            var biggest = {val : 0, tilt : ''};

            var endValues = {x: $scope.xTilt[$scope.xTilt.length -1], y: $scope.yTilt[$scope.yTilt.length -1], z: $scope.zTilt[$scope.zTilt.length -1]};


            $scope.xTilt = $filter('orderBy')($scope.xTilt, function(num){return num}, true);
            $scope.yTilt = $filter('orderBy')($scope.yTilt, function(num){return num}, true);
            $scope.zTilt = $filter('orderBy')($scope.zTilt, function(num){return num}, true);

            // Arrays are now sorted.  Need to see what has the biggest difference.
            biggest.val = $scope.xTilt[0] - $scope.xTilt[$scope.xTilt.length -1];
            biggest.tilt = 'x';
            biggest.endVal = endValues.x;

            if ($scope.yTilt[0] - $scope.yTilt[$scope.yTilt.length -1] > biggest.val) {
                biggest.tilt = 'y';
                biggest.val = $scope.yTilt[0] - $scope.yTilt[$scope.yTilt.length -1];
                biggest.endVal = endValues.y;
            }

            if ($scope.zTilt[0] - $scope.zTilt[$scope.zTilt.length -1] > biggest.val) {
                biggest.tilt = 'z';
                biggest.val = $scope.zTilt[0] - $scope.zTilt[$scope.zTilt.length -1];
                biggest.endVal = endValues.z;
            }

            $scope.biggestTilt[$scope.gameState] = biggest.tilt;
            // Do Calculations here
            $scope.xTilt.length = 0
            $scope.yTilt.length = 0
            $scope.zTilt.length = 0


            $scope.$apply(function() {

                $scope.biggestTilt[$scope.gameState] = biggest;
                delete $scope.startTime;
                if ($scope.gameState == 'tiltDown') {
                    $scope.gameState = 'tiltCalibrationCompleted';
                    window.removeEventListener('devicemotion', $scope.recordTilt, false);
                    console.log($scope.biggestTilt);
                }
                else {
                    $scope.gameState = $scope.tiltOrder[$scope.tiltCount + 1];
                    $scope.tiltCount++;
                }
            })
        }
    };

    $scope.setLevelPosition = function() {
        window.removeEventListener('devicemotion', eventForLevelListen, false);
        $scope.neutralLeveling = $scope.accelerationData;
        delete $scope.accelerationData;
        $scope.gameState = 'calibrated';
    }



    // This is just for setting some base leveling data for the phone.  It will get added and then removed.
    var eventForLevelListen = function(eventData) {
        $scope.accelerationData = eventData.accelerationIncludingGravity;
    }

    $scope.startLevelEvent = function() {
        window.addEventListener('devicemotion', eventForLevelListen, false);
    }

    $scope.beginCalibration = function() {
        $scope.gameState = "tiltLeft";
        window.addEventListener('devicemotion', $scope.recordTilt, false);
    }

    $scope.startGame = function() {
//        if (screenfull.enabled) {
//            screenfull.request();
//            $scope.isFullScreen = true;
//        }

        $scope.gameRunning = true;
        $scope.gameState = 'gameLoaded';

    }

    $scope.pause = function() {
        alert('Pause Game');
    }

    $scope.quit = function() {
        delete $scope.gameState;
        $scope.gameRunning = false;
        $scope.gameStarted = false;
        $scope.isFullScreen = false;
        screenfull.exit();
        $scope.tiltCount = 0;
        //alert('Quit');
    }

    $scope.toggleFullscreen = function() {
        if ($scope.isFullScreen) {
            screenfull.exit();
        }
        else {
            screenfull.request();
        }
        $scope.isFullScreen = !$scope.isFullScreen;

    }

    $scope.resetLevel = function() {
        alert('Reset Level');
    }



});







