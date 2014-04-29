/**
 * Created by Home on 4/27/2014.
 */
myApp.controller('gameCtrl', function($scope) {


    // First lets get our element
    var drawLocation = $('#mainDrawLocation');
    // Creating a child div just to render to. AngularJS will destroy the children when the parent scope gets deleted. So we want to render to a child so that everything gets reset when the user quits.
    var childContainer = document.createElement( 'div' );

    // This is just a helper that comes with ThreeJS to display some simple frame rate data.
    $scope.stats = new Stats();
    childContainer.appendChild( $scope.stats.domElement );

    drawLocation.append( childContainer );

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
    $scope.level = 1;

    var renderLevel1 = function() {
        for (var i2 = 0; i2 < 2; i2++) {
            for (var i = 0; i < 2; i++) {
                var tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial( { color: 0xf122f, map: tileTexture } )  );
                tempPlane.isActive = false;
                tempPlane.position.z = -50;
                tempPlane.position.x = startingPointX + (i * 200);
                tempPlane.position.y = startingPointY + (i2 * 200);
                tempPlane.name = i2 + "_" + i;
                tempPlane.geometry.dynamic = true;
                $scope.scene.add(tempPlane);
                planes.push(tempPlane);
            }
        }
    }

    switch ($scope.level) {
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
    var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x33ccff, wireframe: true} );
    $scope.playerSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
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
        if (anyNotActive) {
            console.log('Yay you won this round!!!');
        }
    }

//
//    window.addEventListener( 'resize', onWindowResize, false );
//
//
//    var camera, scene, renderer, objects;
//    var particleLight, pointLight;
//    var materials = [];
//    var defaultRotateSize = 0.01;
//    var rotateSize = defaultRotateSize;
//    var alpha, beta, gamma;
//    var alphaText;
//    var betaText;
//    var gammaText;
//    var sphere;
//    var roundedAlpha, roundedBeta, roundedGamma;
    var accelerationIncludingGravity;
//    var planes = new Array();
//
    var currentPlaneName = "0_0";
//
//
//
//    var line;
//
////init();
////
//
////document.getElementById('button').addEventListener('click', function () {
////    if (screenfull.enabled) {
////        screenfull.request();
////		$('#button').hide();
////    } else {
////        // Ignore or do something else
////    }
////});
////document.getElementById('movePlane').addEventListener('click', function () {
////    planes[0].position.z -= 10;
////	//camera.position.x += 10;
////	//camera.position.y += 10;
////
////	camera.rotation.x -= 0.01;
////	camera.updateProjectionMatrix();
////
////});
////
////document.getElementById('reset').addEventListener('click', function() {
////	sphere.position = new THREE.Vector3(0,0,0);
////});
//
    var deviceMotionLocal = function(eventData) {
        accelerationIncludingGravity = eventData.accelerationIncludingGravity;
    }
//    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionLocal, false);
//    }
//
//    window.addEventListener('deviceorientation', function(event) {
//
//        roundedAlpha = Math.round(event.alpha);
//        roundedBeta = Math.round(event.beta);
//        roundedGamma = Math.round(event.gamma);
//
//
//
//        if (roundedAlpha != alpha) {
//            alpha = roundedAlpha
//
//
//            /*if (alphaText) {
//             scene.remove(alphaText);
//             }
//             alphaText = createText(roundedAlpha, 50);
//             scene.add(alphaText);
//             */
//        }
//
//        if (roundedBeta != beta) {
//
//            beta = roundedBeta;
//            /*
//             if (betaText) {
//             scene.remove(betaText);
//             }
//             betaText = createText(roundedBeta, 125);
//             scene.add(betaText);
//             */
//
//
//        }
//
//        if (roundedGamma != gamma) {
//            gamma = roundedGamma;
//
//            /*
//             if (gammaText) {
//             scene.remove(gammaText);
//             }
//             gammaText = createText(roundedGamma, 200);
//             scene.add(gammaText);
//             */
//
//        }
//    },false);
//
//    function init() {
//
//
//    }
//    function generateTexture() {
//
//        var canvas = document.createElement( 'canvas' );
//        canvas.width = 256;
//        canvas.height = 256;
//
//        var context = canvas.getContext( '2d' );
//        var image = context.getImageData( 0, 0, 256, 256 );
//
//        var x = 0, y = 0;
//
//        for ( var i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ ) {
//
//            x = j % 256;
//            y = x == 0 ? y + 1 : y;
//
//            image.data[ i ] = 255;
//            image.data[ i + 1 ] = 255;
//            image.data[ i + 2 ] = 255;
//            image.data[ i + 3 ] = Math.floor( x ^ y );
//
//        }
//
//        context.putImageData( image, 0, 0 );
//
//        return canvas;
//
//    }
//
//    function onWindowResize() {
//
//        camera.aspect = window.innerWidth / window.innerHeight;
//        camera.updateProjectionMatrix();
//
//        renderer.setSize( window.innerWidth, window.innerHeight );
//
//    }
//
////
//
    function animate() {

        requestAnimationFrame( animate );

        render();
        $scope.stats.update();
    }

    function render() {

        //var timer = 0.0001 * Date.now();

        //camera.lookAt( sphere.position );

        //if (roundedBeta && roundedBeta != 0)
        //	sphere.position.z += roundedBeta / 10;

        //if (roundedGamma && roundedGamma != 0)
        //	sphere.position.x += roundedGamma / 10;
        if (accelerationIncludingGravity) {
            // Need to pick the direction based on what their up down coordinates were.

            // Stores a map {'tiltLeft' : {val: differenceInTiltForDirection, tilt: 'axis that was tiled most', endVal: 'positive/negative'
            if ($scope.biggestTilt['tiltLeft'].endVal < 0) {
                $scope.playerSphere.position.x += accelerationIncludingGravity[$scope.biggestTilt['tiltLeft'].tilt];
            }
            else {
                $scope.playerSphere.position.x -= accelerationIncludingGravity[$scope.biggestTilt['tiltLeft'].tilt];
            }

            if ($scope.biggestTilt['tiltUp'].endVal > 0) {
                $scope.playerSphere.position.y += accelerationIncludingGravity[$scope.biggestTilt['tiltUp'].tilt];
            }
            else {
                $scope.playerSphere.position.y -= accelerationIncludingGravity[$scope.biggestTilt['tiltUp'].tilt];
            }


            //$scope.playerSphere.position.x += accelerationIncludingGravity.y /.5;
            //$scope.playerSphere.rotation.y -= accelerationIncludingGravity.y /100;
            //$scope.playerSphere.rotation.x -= accelerationIncludingGravity.x /100;
            //$scope.playerSphere.position.y -= accelerationIncludingGravity.x /.5;
            //sphere.rotation.y -= accelerationIncludingGravity.x /3.5;
            //sphere.position.x -= accelerationIncludingGravity.x /.5;
            //sphere.position.z += accelerationIncludingGravity.y /.5;
        }
        var raycaster = new THREE.Raycaster( $scope.playerSphere.position, new THREE.Vector3(0,0,-1));
        var intersects = raycaster.intersectObjects(planes, false);
        if (intersects.length > 0) {
            for (var i = 0; i < intersects.length; i++) {
                console.log(intersects[i].object.name);
                if (currentPlaneName != intersects[i].object.name) {
                    if (intersects[i].object.isActive) {
                        intersects[i].object.material =  new THREE.MeshPhongMaterial( { map: tileTexture } )
                        intersects[i].object.isActive = false;
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
            for (var i = 0; i < planes.length; i++) {
                planes[i].material.color.setRGB(1,1,1);
            }
            $scope.playerSphere.position = new THREE.Vector3(0,0,0);
        }
        //var material = new THREE.LineBasicMaterial({
        //color: 0x0000ff
        //});

        //scene.remove(line);
        //var geometry = new THREE.Geometry();
        //geometry.vertices.push( sphere.position );
        //geometry.vertices.push( new THREE.Vector3( 0, 0, -1 ) );


        //line = new THREE.Line( geometry, material );
        //scene.add( line );


        //plane.rotation.x += .01;


        $scope.renderer.render( $scope.scene, $scope.camera );

    }
//    function createText(text, location) {
//        var blah = "" + text;
//        height = 20,
//            size = 70,
//            hover = 30,
//
//            curveSegments = 1,
//
//            bevelThickness = 2,
//            bevelSize = 1.5,
//            bevelSegments = 3,
//            bevelEnabled = true,
//
//            font = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
//            weight = "bold", // normal bold
//            style = "normal"; // normal italic
//
//
//        var textGeo = new THREE.TextGeometry(blah, {
//            size: size,
//            height: height,
//            curveSegments: curveSegments,
//            font: font,
//            weight: weight,
//            style: style,
//            bevelThickness: bevelThickness,
//            bevelSize: bevelSize,
//            bevelEnabled: bevelEnabled
//        });
//
//        var material = new THREE.MeshFaceMaterial( [
//            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
//            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
//        ] );
//
//        var textMesh = new THREE.Mesh( textGeo, material );
//        textMesh.position.y = location;
//        return textMesh;
//
//    }
//







})
