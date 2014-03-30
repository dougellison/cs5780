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


window.addEventListener('deviceorientation', function(event) {
  //console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
  //if (alpha != event.alpha || beta != event.beta || gamma != event.gamma)
//	rotateSize = defaultRotateSize;
	
	var roundedAlpha = Math.round(event.alpha);
	var roundedBeta = Math.round(event.beta);
	var roundedGamma = Math.round(event.gamma);
	
	if (roundedAlpha != alpha) {
		alpha = roundedAlpha
		if (alphaText) {
			scene.remove(alphaText);
		}
		alphaText = createText(roundedAlpha, 50);
		scene.add(alphaText);
	}
	
	if (roundedBeta != beta) {
		beta = roundedBeta;
		if (betaText) {
			scene.remove(betaText);
		}
		betaText = createText(roundedBeta, 125);
		scene.add(betaText);


	}
	
	if (roundedGamma != gamma) {
		gamma = roundedGamma;
		if (gammaText) {
			scene.remove(gammaText);
		}
		gammaText = createText(roundedGamma, 200);
		scene.add(gammaText);

	}
	
	
	
	
	
	
	

	
	
});

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 0, 150	, 800 );

	scene = new THREE.Scene();

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
	scene.add( line );

	
	var sphere, geometry, material;
	
	//textMesh = createText()
	//scene.add(textMesh);
	var geometry = new THREE.SphereGeometry( 50, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x33ccff, wireframe: true} );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );

	//particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	
	var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
	pointLight.position.set( 0, 100, 90 );
	pointLight.color.setHSL( Math.random(), 1, 0.5 );
	scene.add(pointLight);
	//scene.add( particleLight );

	// Lights

	scene.add( new THREE.AmbientLight( 0x111111 ) );

	//var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.125 );

	//directionalLight.position.x = Math.random() - 0.5;
	//directionalLight.position.y = Math.random() - 0.5;
	//directionalLight.position.z = Math.random() - 0.5;

	//directionalLight.position.normalize();

	//scene.add( directionalLight );

	//pointLight = new THREE.PointLight( 0xffffff, 1 );
	//scene.add( pointLight );

	//

	renderer = new THREE.WebGLRenderer();
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

}

function render() {

	var timer = 0.0001 * Date.now();

	camera.lookAt( scene.position );

	//for ( var i = 0, l = objects.length; i < l; i ++ ) {

		//var object = objects[ i ];

		//object.rotation.x += rotateSize;
//		object.rotation.y += 0.005;
	//}
	//if (rotateSize > 0)
	//	rotateSize -= 0.001;
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

