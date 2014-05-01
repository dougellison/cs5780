/**
 * Created by Home on 4/27/2014.
 */
myApp.controller('gameCtrl', function($scope) {


    // First lets get our element
    var drawLocation = $('#mainDrawLocation');
    // Creating a child div just to render to. AngularJS will destroy the children when the parent scope gets deleted. So we want to render to a child so that everything gets reset when the user quits.
    var childContainer = document.createElement( 'div' );

    //This is the count of frame drawn.  This is used to not try ray casting the first couple frames because no tiles or sphere is yet drawn.
    var frameCount = 0;

    var currentPlaneName = "0_0";



    // This is just a helper that comes with ThreeJS to display some simple frame rate data.
    $scope.stats = new Stats();
    childContainer.appendChild( $scope.stats.domElement );

    drawLocation.append( childContainer );


    // Start the game as a blank slate always.
    $scope.gameSettings.gameStatus = "";

    // We setup the renderer from the parent scope during calibration. For this purpose we'll just re-use that
    $scope.renderer.setSize( window.innerWidth, window.innerHeight );

    childContainer.appendChild( $scope.renderer.domElement );

    // Setup a new Camera
    $scope.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

    // Set some position that is slightly off directly above so that the 3D elements are apparent.
    $scope.camera.position.set( 0, -80, 500 );

    // Still focus and look at the center of the map
    $scope.camera.lookAt(new THREE.Vector3(0,0,0));
    // This tells ThreeJS to update the projection based on our new position and view.
    $scope.camera.updateProjectionMatrix();

    // We are going to use some generic places to start writing out tiles that make up our map.
    var startingPointX = -50;
    var startingPointY = -50;
    $scope.scene = new THREE.Scene();


    var tileTexture = THREE.ImageUtils.loadTexture( "lib/tiny_tileDeactivated.png" );
    var tileTextureActivated = THREE.ImageUtils.loadTexture( "lib/tiny_tile.png" );
    // This basically sets the direction and orientation of the texture on our tiles.
    tileTexture.anisotropy = $scope.renderer.getMaxAnisotropy();
    tileTextureActivated.anisotropy = $scope.renderer.getMaxAnisotropy();

    // Planes is the objects which will start all the tiles.  This will be used across all levels.
    var planes = []
    // We always start at Level 1
    $scope.gameSettings.level = 1;


    $scope.renderSizePlanes = {};
    var renderLevel1 = function() {
        var planeSize = {x: 200, y: 200};
        $scope.renderSizePlanes[1] = planeSize;
        for (var i2 = 0; i2 < 2; i2++) {
            for (var i = 0; i < 2; i++) {
                var tempPlane = null;
                if (i == 0 && i2 == 0) {

                    tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize.x, planeSize.y), new THREE.MeshPhongMaterial( { map: tileTextureActivated } )  );
                    tempPlane.isActive = true;
                    $scope.firstPlane = tempPlane;
                }
                else {
                    tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize.x, planeSize.y), new THREE.MeshPhongMaterial( { map: tileTexture } )  );
                    tempPlane.isActive = false;
                }


                tempPlane.position.z = -50;
                tempPlane.position.x = startingPointX + (i * planeSize.x);
                tempPlane.position.y = startingPointY + (i2 * planeSize.y);
                tempPlane.name = i2 + "_" + i;
                tempPlane.geometry.dynamic = true;
                $scope.scene.add(tempPlane);
                planes.push(tempPlane);
            }
        }
    }
    var renderLevel2 = function() {
        var planeSize = {x: 100, y: 100};
        $scope.renderSizePlanes[1] = planeSize;
        for (var i2 = 0; i2 < 3; i2++) {
            for (var i = 0; i < 3; i++) {
                var tempPlane = null;

                if (i == 0 && i2 == 0) {
                    tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize.x, planeSize.y), new THREE.MeshPhongMaterial( { map: tileTextureActivated } )  );
                    tempPlane.isActive = true;
                    $scope.firstPlane = tempPlane;

                }
                else {
                    tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize.x, planeSize.y), new THREE.MeshPhongMaterial( { map: tileTexture } )  );
                    tempPlane.isActive = false;
                }


                tempPlane.position.z = -50;
                tempPlane.position.x = startingPointX + (i * planeSize.x);
                tempPlane.position.y = startingPointY + (i2 * planeSize.y);
                tempPlane.name = i2 + "_" + i;
                tempPlane.geometry.dynamic = true;

                // Leave a blank hole in the middle.
                if (i2 == 1 && i == 1)
                    continue;

                $scope.scene.add(tempPlane);
                planes.push(tempPlane);
            }
        }
    }

    var renderLevel3 = function() {
        startingPointY = -150;
        startingPointX = -100;
        var planeSize = {x: 90, y: 90};
        $scope.renderSizePlanes[1] = planeSize;
        for (var i2 = 0; i2 < 5; i2++) {
            for (var i = 0; i < 5; i++) {
                var tempPlane = null;

                if (i2 == 0 && i == 2) {
                    tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize.x, planeSize.y), new THREE.MeshPhongMaterial( { map: tileTextureActivated } )  );
                    tempPlane.isActive = true;
                    $scope.firstPlane = tempPlane;
                    currentPlaneName = "0_2";
                }
                else {
                    tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize.x, planeSize.y), new THREE.MeshPhongMaterial( { map: tileTexture } )  );
                    tempPlane.isActive = false;
                }


                tempPlane.position.z = -50;
                tempPlane.position.x = startingPointX + (i * planeSize.x);
                tempPlane.position.y = startingPointY + (i2 * planeSize.y);
                tempPlane.name = i2 + "_" + i;
                tempPlane.geometry.dynamic = true;

                // We want to leave a number of holes.
                if (i2 == 0 && i != 2)
                    continue;

                if (i2 == 1 && i != 2)
                    continue;

                if (i2 == 2 && (i == 0 || i == 4))
                    continue;

                if (i2 == 3 && (i == 2))
                    continue;

                if (i2 == 4 && (i != 0))
                    continue;

                $scope.scene.add(tempPlane);
                planes.push(tempPlane);
            }
        }
    }

    //$scope.gameLevels = {1: renderLevel1, 2: renderLevel2};
    $scope.gameLevels = {1: renderLevel1, 2: renderLevel2, 3: renderLevel3};

    switch ($scope.gameSettings.level) {
        case 1:
            renderLevel1();
            break;
        case 2:
            renderLevel2();
            break;
        case 3:
            renderLevel3();
            break;
        default:
            renderFinished();
    }

    var sphereGeometry = new THREE.SphereGeometry( 20, 10, 10 );
    var sphereTexture = THREE.ImageUtils.loadTexture( 'lib/spheretest1.png' );
    sphereTexture.anisotropy = $scope.renderer.getMaxAnisotropy();


    var sphereMaterial = new THREE.MeshBasicMaterial( {map: sphereTexture} );
    $scope.playerSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    // We want the sphere to start at whatever the first tile is.
    $scope.playerSphere.position = new THREE.Vector3($scope.firstPlane.position.x, $scope.firstPlane.position.y, 0);
    $scope.playerSphere.geometry.dynamic = true;
    $scope.scene.add( $scope.playerSphere );

    var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
    pointLight.position.set( 0, 100, 90 );
    $scope.scene.add(pointLight);

    animate();

    $scope.checkForWin = function() {
        var anyNotActive = false;
        angular.forEach(planes, function(plane) {
            if (!plane.isActive) {
                anyNotActive = true;
            }
        });
        if (!anyNotActive) {
            $scope.$apply(function(){
                $scope.gameSettings.gameStatus = 'win';
                if ($scope.gameSettings.level == 3) {
                    $scope.winCondition();
                }
            })
        }
    }

    $scope.$on('resetLevel', function() {
        angular.forEach(planes, function(plane) {
            $scope.resetPlane(plane);
        })
        // Set the first tile to be active because thats where we start.
        $scope.firstPlane.material = new THREE.MeshPhongMaterial( { map: tileTextureActivated } );
        $scope.firstPlane.isActive = true
        $scope.firstPlane.isActive = true

        $scope.playerSphere.position = new THREE.Vector3($scope.firstPlane.position.x,$scope.firstPlane.position.y,0);
        $scope.gameSettings.gameStatus = "";
        currentPlaneName = $scope.firstPlane.name;

    });

    var accelerationIncludingGravity;


    var difficultyMap = {0: 2, 1 : 1, 2:.5, 3: .25, 4 : .1};
    var deviceMotionLocal = function(eventData) {

        var difficultyMultiplier = {};
        difficultyMultiplier.x = eventData.accelerationIncludingGravity.x / difficultyMap[$scope.gameSettings.difficulty];
        difficultyMultiplier.y = eventData.accelerationIncludingGravity.y / difficultyMap[$scope.gameSettings.difficulty];
        difficultyMultiplier.z = eventData.accelerationIncludingGravity.z / difficultyMap[$scope.gameSettings.difficulty];

        accelerationIncludingGravity = {};


        if ($scope.neutralLeveling.x > 0) {
            accelerationIncludingGravity.x = difficultyMultiplier.x - $scope.neutralLeveling.x / difficultyMap[$scope.gameSettings.difficulty];
        }
        else {
            accelerationIncludingGravity.x = difficultyMultiplier.x + $scope.neutralLeveling.x/ difficultyMap[$scope.gameSettings.difficulty];
        }

        if ($scope.neutralLeveling.y > 0) {
            accelerationIncludingGravity.y = difficultyMultiplier.y- $scope.neutralLeveling.y/ difficultyMap[$scope.gameSettings.difficulty];
        }
        else {
            accelerationIncludingGravity.y = difficultyMultiplier.y - $scope.neutralLeveling.y/ difficultyMap[$scope.gameSettings.difficulty];
        }

        if ($scope.neutralLeveling.z > 0) {
            accelerationIncludingGravity.z = difficultyMultiplier.z - $scope.neutralLeveling.z/ difficultyMap[$scope.gameSettings.difficulty];
        }
        else {
            accelerationIncludingGravity.z = difficultyMultiplier.z - $scope.neutralLeveling.z/ difficultyMap[$scope.gameSettings.difficulty];
        }

    }
//    if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionLocal, false);

    $scope.resetPlane = function(plane) {
        plane.isActive = false;
        plane.material = new THREE.MeshPhongMaterial( { map: tileTexture } );
    }
    function animate() {

        requestAnimationFrame( animate );

        render();
        $scope.stats.update();
    }


    function render() {

        frameCount++;
        // If we've lost or won don't draw because game is over for now.
        if ($scope.gameSettings.gameStatus != "" || $scope.gameSettings.pause)
            return;

        if ($scope.gameSettings.gameState == 'wonLastLevel') {
            $scope.renderer.render( $scope.scene, $scope.camera );
            return;
        }

        if (accelerationIncludingGravity) {
            // Need to pick the direction based on what their up down coordinates were.

            // Stores a map {'tiltLeft' : {val: differenceInTiltForDirection, tilt: 'axis that was tiled most', endVal: 'positive/negative'
            if ($scope.biggestTilt['tiltLeft'].endVal < 0) {
                $scope.playerSphere.position.x += accelerationIncludingGravity[$scope.biggestTilt['tiltLeft'].tilt];
                $scope.playerSphere.rotation.y -= accelerationIncludingGravity[$scope.biggestTilt['tiltLeft'].tilt] / $scope.gameSettings.rotationConstant;
            }
            else {
                $scope.playerSphere.position.x -= accelerationIncludingGravity[$scope.biggestTilt['tiltLeft'].tilt];
                $scope.playerSphere.rotation.y += accelerationIncludingGravity[$scope.biggestTilt['tiltLeft'].tilt] / $scope.gameSettings.rotationConstant;
            }

            if ($scope.biggestTilt['tiltUp'].endVal > 0) {
                $scope.playerSphere.position.y += accelerationIncludingGravity[$scope.biggestTilt['tiltUp'].tilt];
                $scope.playerSphere.rotation.x -= accelerationIncludingGravity[$scope.biggestTilt['tiltUp'].tilt] / $scope.gameSettings.rotationConstant;
            }
            else {
                $scope.playerSphere.position.y -= accelerationIncludingGravity[$scope.biggestTilt['tiltUp'].tilt];
                $scope.playerSphere.rotation.x += accelerationIncludingGravity[$scope.biggestTilt['tiltUp'].tilt] / $scope.gameSettings.rotationConstant;
            }

        }
        var raycaster = new THREE.Raycaster( $scope.playerSphere.position, new THREE.Vector3(0,0,-1));
        var intersects = raycaster.intersectObjects(planes, false);
        if (intersects.length > 0) {
            for (var i = 0; i < intersects.length; i++) {
                if (currentPlaneName != intersects[i].object.name) {
                    if (intersects[i].object.isActive) {
                        $scope.resetPlane(intersects[i].object);
                    }
                    else {
                        intersects[i].object.isActive = true;
                        intersects[i].object.material =  new THREE.MeshPhongMaterial( { map: tileTextureActivated } )
                        $scope.checkForWin();
                    }
                    currentPlaneName = intersects[i].object.name;
                }
            }
        }
        else {
            if (frameCount > 2 && frameCount != NaN) {
                $scope.$apply(function() {
                    $scope.gameSettings.gameStatus = "lost";
                })
            }

        }
        $scope.renderer.render( $scope.scene, $scope.camera );

    }

    $scope.$on('nextLevel', function() {
        if ($scope.winText) {
            $scope.scene.remove($scope.winText);
            delete $scope.winText;
        }
        angular.forEach(planes, function(plane) {
            $scope.scene.remove(plane);
        })
        planes.length = 0;
        $scope.gameSettings.level++;
        if (angular.isUndefined($scope.gameLevels[$scope.gameSettings.level])) {
            $scope.gameSettings.level = 1;
        }
        $scope.gameLevels[$scope.gameSettings.level]();
        $scope.gameSettings.gameStatus = "";
        currentPlaneName = $scope.firstPlane.name;

        frameCount = 0;
        $scope.playerSphere.position = new THREE.Vector3($scope.firstPlane.position.x,$scope.firstPlane.position.y,0);
    });

    $scope.winCondition = function() {
        angular.forEach(planes, function(plane) {
            $scope.scene.remove(plane);
        })

        $scope.winText = createText("You won!",  {x: -100, y:0, z:0});
        $scope.scene.add($scope.winText);
        planes.length = 0;
    }

    function createText(text, location) {
        var
        height = 20,
            size = 70,
            hover = 30,

            curveSegments = 1,

            bevelThickness = 2,
            bevelSize = 1.5,
            bevelSegments = 3,
            bevelEnabled = true,

            font = "optimer",
            weight = "bold",
            style = "normal";


        var textGeo = new THREE.TextGeometry(text, {
            size: size,
            height: height,
            curveSegments: curveSegments,
            font: font,
            weight: weight,
            style: style,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled
        });

        var material = new THREE.MeshFaceMaterial( [
            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
        ] );

        var textMesh = new THREE.Mesh( textGeo, material );
        textMesh.position.x = location.x;
        textMesh.position.y = location.y;
        textMesh.position.z = location.z;
        return textMesh;

    }


})
