var camera, scene, renderer;
var mesh1, mesh2, mesh3, mesh4;
var mouse;
var cameraMoves;
var size;
var offset;
var cameraz;
var cameray;
var camerax;
var raycaster;
var mouse;
var polarAngle;

init();
animate();

//Inicializar Variables
function init() {
  //Set size of the cube
  if (window.innerWidth > window.innerHeight) {
    size = 120;
    sizeHeight = 180;
    offset = 120;
    offsetHeight = 60;
    cameraz = 500;
    cameray = 160;
    camerax = 200;
  }else{
    size = 80;
    sizeHeight = 120;
    offset = 80;
    offsetHeight = 40;
    cameraz = 420;
    cameray = 110;
    camerax = 130;
  }

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = cameraz;
  camera.position.y = cameray;
  camera.position.x = camerax;
  camera.rotation.x = 0.1;
  mouse = {x:0,y:0};
  cameraMoves = {x:0,y:0,z:-0.1,move:false,speed:0.2};
  scene = new THREE.Scene();

  var bgTexture = new THREE.TextureLoader().load( 'textures/background.jpg' );
  var backgroundMesh = new THREE.Mesh(new THREE.PlaneGeometry(2 , 2, 0),new THREE.MeshBasicMaterial({map: bgTexture}));

  backgroundMesh.material.depthTest = false;
	backgroundMesh.material.depthWrite = false;

	backgroundScene = new THREE.Scene();
	backgroundCamera = new THREE.Camera();
	backgroundScene.add( backgroundCamera );
	backgroundScene.add( backgroundMesh );

  //dice = new THREE.Mesh( new THREE.BoxGeometry( 562, 562, 562, 1, 1, 1 ), materials );

  var texture1 = new THREE.TextureLoader().load( 'textures/cubo512-1.gif' );
  var texture2 = new THREE.TextureLoader().load( 'textures/cubo512-2.gif' );
  var texture3 = new THREE.TextureLoader().load( 'textures/cubo512-3.gif' );
  var texture4 = new THREE.TextureLoader().load( 'textures/cubo512-4.gif' );
  var texture5 = new THREE.TextureLoader().load( 'textures/cubo512-5.gif' );
  var texture6 = new THREE.TextureLoader().load( 'textures/cubo512-6.gif' );
  var texture = new THREE.TextureLoader().load( 'textures/cubo-borde.gif' );

  var geometry1 = new THREE.BoxBufferGeometry( size, sizeHeight, size*3 );
  var geometry2 = new THREE.BoxBufferGeometry( size, sizeHeight, size*3 );
  var geometry3 = new THREE.BoxBufferGeometry( size, sizeHeight, size*3 );
  var geometry4 = new THREE.BoxBufferGeometry( size, sizeHeight, size*3 );
  var geometry5 = new THREE.BoxBufferGeometry( size, sizeHeight, size*3 );
  var geometry6 = new THREE.BoxBufferGeometry( size, sizeHeight, size*3 );

  //cubo1
  var materials1 = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture3 } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    ];

  //cubo2
  var materials2 = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture6 } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    ];

  //cubo3
  var materials3 = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture1 } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    ];

  //cubo4
  var materials4 = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture4 } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    ];

  //cubo5
  var materials5 = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture2 } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    ];

  //cubo6
  var materials6 = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture5 } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    ];

  mesh1 = new THREE.Mesh( geometry1, materials1 );
  mesh2 = new THREE.Mesh( geometry2, materials2 );
  mesh3 = new THREE.Mesh( geometry3, materials3 );
  mesh4 = new THREE.Mesh( geometry4, materials4 );
  mesh5 = new THREE.Mesh( geometry5, materials5 );
  mesh6 = new THREE.Mesh( geometry6, materials6 );

  mesh1.name = "cubo1";
  mesh2.name = "cubo2";
  mesh3.name = "cubo3";
  mesh4.name = "cubo4";
  mesh5.name = "cubo5";
  mesh6.name = "cubo6";

  mesh1.position.set(offset,offsetHeight,0);
  mesh3.position.set(-offset,offsetHeight,0);
  mesh5.position.set(0,offsetHeight,0);
  mesh2.position.set(offset,-offset,0);
  mesh4.position.set(-offset,-offset,0);
  mesh6.position.set(-0,-offset,0);

  mesh1.rotation.x = 0;
  mesh2.rotation.x = 0;
  mesh3.rotation.x = 0;
  mesh4.rotation.x = 0;
  mesh5.rotation.x = 0;
  mesh6.rotation.x = 0;

  scene.add( mesh1 );
  scene.add( mesh2 );
  scene.add( mesh3 );
  scene.add( mesh4 );
  scene.add( mesh5 );
  scene.add( mesh6 );

  renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  polarAngle = controls.getPolarAngle();
  controls.maxPolarAngle = polarAngle;
  controls.minPolarAngle = polarAngle;
	controls.addEventListener( 'change', render );
	controls.enableZoom = false;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  window.addEventListener("orientationchange", onDeviceOrientationChange, false);

  window.addEventListener( 'resize', onWindowResize, false );

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );

  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
}

//Funcion para centrar el cubo en la pantalla
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDeviceOrientationChange() {
    location.reload();
}

function animate() {
  requestAnimationFrame( animate );
  renderer.clear();
  render();

}

//Mover camara al mover el raton
function mouseMove(e){
  camera.position.x += Math.max(Math.min((e.clientX - mouse.x) * 0.02, cameraMoves.speed), -cameraMoves.speed);
  camera.position.y += Math.max(Math.min((mouse.y - e.clientY) * 0.01, cameraMoves.speed), -cameraMoves.speed);

      mouse.x = e.clientX;
      mouse.y = e.clientY;

  }

  window.addEventListener('mousemove', mouseMove);

  function render(){
    renderer.render( backgroundScene, backgroundCamera );
    renderer.render( scene, camera );
  }

  function onDocumentTouchStart( event ) {
    //event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    onDocumentMouseDown( event );
  }

  function onDocumentMouseDown( event ) {

    //event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children, true );
    if ( intersects.length > 0 ) {
      switch (intersects[0].object.name) {
        case "cubo1":
          intersects[0].object.position.z += 15;
          intersects[0].object.position.x += 15;
          intersects[0].object.position.y += 15;
          location.assign("http://elcubodelossecretos.com/es/#reservar");
          break;
        case "cubo2":
          location.assign("http://elcubodelossecretos.com/es/#dondeestamos");
          break;
        case "cubo3":
          location.assign("http://elcubodelossecretos.com/es/#empresas");
          break;
        case "cubo4":
          location.assign("http://elcubodelossecretos.com/es/#dondeestamos");
          break;
        case "cubo5":
          location.assign("http://elcubodelossecretos.com/es/#dondeestamos");
          break;
        case "cubo6":
          location.assign("http://elcubodelossecretos.com/es/#dondeestamos");
          break;
        default:
      }
    }
  }
