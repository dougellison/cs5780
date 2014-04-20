var container, stats;

var camera, scene, renderer, objects;
var particleLight, pointLight;

var materials = [];
var defaultRotateSize = 0.01;
var rotateSize = defaultRotateSize;
var alpha, beta, gamma;
var alphaText;
var betaText;
var gammaText;
var sphere;
var roundedAlpha, roundedBeta, roundedGamma;
var accelerationIncludingGravity;
var planes = new Array();

init();
animate();

document.getElementById('button').addEventListener('click', function () {
    if (screenfull.enabled) {
        screenfull.request();
		$('#button').hide();
    } else {
        // Ignore or do something else
    }
});
document.getElementById('movePlane').addEventListener('click', function () {
    planes[0].position.x -= 10;
});

document.getElementById('reset').addEventListener('click', function() {
	sphere.position = new THREE.Vector3(0,0,0);
});

var deviceMotionLocal = function(eventData) {
	accelerationIncludingGravity = eventData.accelerationIncludingGravity;
}
if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionLocal, false);
}

window.addEventListener('deviceorientation', function(event) {
	
	roundedAlpha = Math.round(event.alpha);
	roundedBeta = Math.round(event.beta);
	roundedGamma = Math.round(event.gamma);
	
	
	
	if (roundedAlpha != alpha) {
		alpha = roundedAlpha
		
		
			/*if (alphaText) {
				scene.remove(alphaText);
			}
			alphaText = createText(roundedAlpha, 50);
			scene.add(alphaText);
			*/
	}
	
	if (roundedBeta != beta) {
	
		beta = roundedBeta;
		/*
		if (betaText) {
			scene.remove(betaText);
		}
		betaText = createText(roundedBeta, 125);
		scene.add(betaText);
		*/


	}
	
	if (roundedGamma != gamma) {
		gamma = roundedGamma;
		
		/*
		if (gammaText) {
			scene.remove(gammaText);
		}
		gammaText = createText(roundedGamma, 200);
		scene.add(gammaText);
		*/

	}
},false);

function init() {

	container = document.createElement( 'div' );
	stats = new Stats();
	container.appendChild( stats.domElement );
	
	document.body.appendChild( container );

	//camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	camera.position.set( 0, 0, 200 );
	camera.lookAt(new THREE.Vector3(0,0,0));
	var startingPointX = -50;
	var startingPointY = -50;
	scene = new THREE.Scene();
	
	
	
	for (var i2 = 0; i2 < 2; i2++) {
		for (var i = 0; i < 2; i++) {
			var tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial({color: 'green', wireframe:true}));
			//tempPlane.rotation.x = 4.8
			tempPlane.position.z = -20;
			tempPlane.position.x = startingPointX + (i * 200);
			tempPlane.position.y = startingPointY + (i2 * 200);
			tempPlane.geometry.dynamic = true;
			scene.add(tempPlane);
			planes.push(tempPlane);
		}
	}
	

	
	


	
	// Grid

	var line_material = new THREE.LineBasicMaterial( { color: 0x303030 } ),
		geometry = new THREE.Geometry(),
		floor = -75, step = 25;

	for ( var i = 0; i <= 40; i ++ ) {

		geometry.vertices.push( new THREE.Vector3( - 500, floor, i * step - 500 ) );
		geometry.vertices.push( new THREE.Vector3(   500, floor, i * step - 500 ) );

		geometry.vertices.push( new THREE.Vector3( i * step - 500, floor, -500 ) );
		geometry.vertices.push( new THREE.Vector3( i * step - 500, floor,  500 ) );

	}

	var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
	//scene.add( line );

	
	var geometry, material;
	
	//textMesh = createText()
	//scene.add(textMesh);
	var geometry = new THREE.SphereGeometry( 20, 10, 10 );
	var material = new THREE.MeshBasicMaterial( {color: 0x33ccff, wireframe: true} );
	sphere = new THREE.Mesh( geometry, material );
	sphere.geometry.dynamic = true;
	scene.add( sphere );

	//particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	
	//var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
	//pointLight.position.set( 0, 100, 90 );
	//pointLight.color.setHSL( Math.random(), 1, 0.5 );
	//scene.add(pointLight);
	//scene.add( particleLight );

	// Lights

	//scene.add( new THREE.AmbientLight( 0x111111 ) );

	//var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.125 );

	//directionalLight.position.x = Math.random() - 0.5;
	//directionalLight.position.y = Math.random() - 0.5;
	//directionalLight.position.z = Math.random() - 0.5;

	//directionalLight.position.normalize();

	//scene.add( directionalLight );

	//pointLight = new THREE.PointLight( 0xffffff, 1 );
	//scene.add( pointLight );

	//
	if ( ! Detector.webgl ) {
		renderer = new THREE.CanvasRenderer();
	}
	else {
		renderer = new THREE.WebGLRenderer();
	}
	
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );


	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();
}

function render() {

	//var timer = 0.0001 * Date.now();

	//camera.lookAt( sphere.position );

	//if (roundedBeta && roundedBeta != 0)
	//	sphere.position.z += roundedBeta / 10;

	//if (roundedGamma && roundedGamma != 0)
	//	sphere.position.x += roundedGamma / 10;	
	if (accelerationIncludingGravity) {
		sphere.position.x -= accelerationIncludingGravity.x /3.5;
		sphere.position.y -= accelerationIncludingGravity.y /3.5;
		//sphere.position.x -= accelerationIncludingGravity.x /.5;
		//sphere.position.z += accelerationIncludingGravity.y /.5;
		
		
	}
	//plane.rotation.x += .01;
	
	
	renderer.render( scene, camera );

}
function createText(text, location) {
	var blah = "" + text;
	height = 20,
	size = 70,
	hover = 30,

	curveSegments = 1,

	bevelThickness = 2,
	bevelSize = 1.5,
	bevelSegments = 3,
	bevelEnabled = true,

	font = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
	weight = "bold", // normal bold
	style = "normal"; // normal italic

	
	var textGeo = new THREE.TextGeometry(blah, {
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
	textMesh.position.y = location;
	return textMesh;

}

