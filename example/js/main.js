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

var currentPlaneName = "0_0";

var line;

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
    planes[0].position.z -= 10;
	//camera.position.x += 10;
	//camera.position.y += 10;
	
	camera.rotation.x -= 0.01;
	camera.updateProjectionMatrix();
	
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

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	//camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	camera.position.set( 0, -80, 500 );
	camera.lookAt(new THREE.Vector3(0,50,0));
	camera.updateProjectionMatrix();
	//camera.lookAt(new THREE.Vector3(0,0,0));
	var startingPointX = -50;
	var startingPointY = -50;
	scene = new THREE.Scene();
	
	
	
	for (var i2 = 0; i2 < 2; i2++) {
		for (var i = 0; i < 2; i++) {
			//var map5 = THREE.ImageUtils.loadDDSTexture( 'js/explosion_dxt5_mip.dds' );
			//map5.anisotropy = 4;
				
			//var tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial( { map: map5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } ));
			var texture = new THREE.Texture( generateTexture() );
				texture.needsUpdate = true;
				
			var tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial( { map: texture, transparent: true }  ));
			//var tempPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial({color: 'green'}));
			//tempPlane.rotation.x = 0.5
			tempPlane.position.z = -50;
			tempPlane.position.x = startingPointX + (i * 200);
			tempPlane.position.y = startingPointY + (i2 * 200);
			tempPlane.name = i2 + "_" + i;
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
			function generateTexture() {

				var canvas = document.createElement( 'canvas' );
				canvas.width = 256;
				canvas.height = 256;

				var context = canvas.getContext( '2d' );
				var image = context.getImageData( 0, 0, 256, 256 );

				var x = 0, y = 0;

				for ( var i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ ) {

					x = j % 256;
					y = x == 0 ? y + 1 : y;

					image.data[ i ] = 255;
					image.data[ i + 1 ] = 255;
					image.data[ i + 2 ] = 255;
					image.data[ i + 3 ] = Math.floor( x ^ y );

				}

				context.putImageData( image, 0, 0 );

				return canvas;

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
		sphere.position.x += accelerationIncludingGravity.y /3.5;
		sphere.rotation.y -= accelerationIncludingGravity.y /100;
		sphere.rotation.x -= accelerationIncludingGravity.x /100;
		sphere.position.y -= accelerationIncludingGravity.x /3.5;
		//sphere.rotation.y -= accelerationIncludingGravity.x /3.5;
		//sphere.position.x -= accelerationIncludingGravity.x /.5;
		//sphere.position.z += accelerationIncludingGravity.y /.5;
	}
	var raycaster = new THREE.Raycaster( sphere.position, new THREE.Vector3(0,0,-1));
	var intersects = raycaster.intersectObjects(planes, false);
	if (intersects.length > 0) {
		for (var i = 0; i < intersects.length; i++) {
			console.log(intersects[i].object.name);
			if (currentPlaneName != intersects[i].object.name) {
				intersects[i].object.material.color= new THREE.Color('red');
				currentPlaneName = intersects[i].object.name;
			}
		}
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

