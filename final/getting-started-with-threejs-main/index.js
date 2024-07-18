import * as THREE from "three";
import { OrbitControls} from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";


const w =window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true
let raycaster;
let INTERSECTED;
let theta = 0;
const pointer = new THREE.Vector2();
const radius = 5;
renderer.setSize(w,h);
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.set(14,15,11);
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
//controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 30;
controls.autoRotate = false;
controls.maxPolarAngle = 1.5;
controls.target = new THREE.Vector3(0,5,0);
controls.update();




const geo = new THREE.IcosahedronGeometry(1.0,2);
const mat = new THREE.MeshStandardMaterial({
    color:0xccff,
    flatShading:true
})
const mesh = new THREE.Mesh(geo,mat);
mesh.position.set(-1.2,5,3.4);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);



const fill = new THREE.AmbientLight( 0x404040 , 60); // soft white light
scene.add( fill );

const light = new THREE.DirectionalLight( 0xffffff, 3 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );

const grid = new THREE.GridHelper(600, 60, 0xeecccc, 0xeeeeee);
scene.add(grid);

var material = new THREE.MeshBasicMaterial({color:0xffffff});
material.opacity = 0.5;


const SHADOWSPACE = new THREE.BoxGeometry( 100, .1, 100 );
const SHADOW = new THREE.Mesh( SHADOWSPACE, material );
SHADOW.receiveShadow = true;
SHADOW.position.y=-.1;
scene.add( SHADOW );

const catcher = new THREE.PlaneGeometry( 2000, 2000 );
catcher.rotateX( - Math.PI / 2 );

const newshadowmat = new THREE.ShadowMaterial();
newshadowmat.opacity = 0.2;

const plane = new THREE.Mesh( catcher, newshadowmat );
plane.position.y = -200;
plane.receiveShadow = true;
scene.add( plane );




const geometry = new THREE.IcosahedronGeometry(1.0,2);
for ( let i = 0; i < 300; i ++ ) {

    const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: (Math.random() * 0xffffff) } ) );

    object.position.x = Math.random() * 40 - 20;
    object.position.y = Math.random() * 40 - 20;
    object.position.z = Math.random() * 40 - 20;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
 const scaler = Math.random()/10;
    object.scale.x = scaler;
    object.scale.y = scaler;
    object.scale.z = scaler;
    // enable transparency
object.material.transparent = true;
// set opacity to 50%
object.material.opacity = 0.2; 
    object.castShadow = true;
object.material.shading = THREE.SmoothShading;
    scene.add( object );

}

raycaster = new THREE.Raycaster();











let mixer;
const loader = new GLTFLoader().setPath('../public/tes/');
loader.load('thingy5.gltf', (gltf) => {
    const model = gltf.scene;
    // model.position.set(0, 1.05, -1);
   


    scene.add(model);
    model.traverse(function(node){
        if(node.isMesh)
            node.castShadow=true;


    });
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });

})
const clock = new THREE.Clock();
function animate(t=0){


    if(mixer)
        mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
    mesh.rotation.y = t*0.0004;

    if(camera.position.y < 0.3){
    camera.position.y = 0;
}



    
    renderer.render(scene, camera);
    controls.update();
   
}

animate();

function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize, false);
  document.addEventListener( 'mousemove', onPointerMove );

  function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}