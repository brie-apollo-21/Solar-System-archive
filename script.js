import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// ===================== PLANETARY DATA ==================

// semi_major for planets is in kilometres * 10^6, for satellites its in kilometres
// inclination and tilt is in degrees
// inclination is in reference to the sun's equator
// radius is in kilometres

// forgot to add spin speed

const mercury = {
    name: "Mercury",
    semi_major: 57909050,
    eccentric: 0.205630,
    inclination: 3.38,
    radius: 2440.5,
    tilt: 0.034,
    satellites: []
}

const venus = {
    name: "Venus",
    semi_major: 108.210,
    eccentric: 0.0068,
    inclination: 3.86,
    radius: 6051.8,
    tilt: 2.64,
    satellites: []
}

const earth = {
    name: "Earth",
    semi_major: 149.598,
    eccentric: 0.0167,
    inclination: 7.155,
    radius: 6378.137,
    tilt: 23.44,
    satellites: [{
        name: "The Moon",
        semi_major: 0.3844,
        eccentric: 0.0549,
        inclination: 23.43,
        radius: 1738.1,
        tilt: 6.68,
    }]
}

const mars = {
    name: "Mars",
    semi_major: 227.956,
    eccentric: 0.0935,
    inclination: 5.65,
    radius: 3396.2,
    tilt: 25.19,
    satellites: [
        {
        name: "Phobos",
        semi_major: 9376,
        eccentric: 0.0151,
        inclination: 1.093,
        radius: 11.2667,
        tilt: 0,
        },
        {
        name: "Deimos",
        semi_major: 23463.2,
        eccentric: 0.00033,
        inclination: 0.93,
        radius: 6.29,
        tilt: 0,
        }
    ]
}

// ===================== ORBIT GENERATOR =================

function generateOrbit(a, e, i) {
    // a is the semi-major axis
    // e is the eccentricity
    // i is the inclination
    const b = a*Math.sqrt(1-e^2);
}

// ======================= 3D LOGIC =======================

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("graphics")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(cam, renderer.domElement);

cam.position.setZ(90);

const gridHelper = new THREE.GridHelper(100,10);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(50);
scene.add( axesHelper );

const jupiter = new THREE.Mesh(new THREE.SphereGeometry(15,64,32), new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(
    "textures/jupiter.jpg"
) }));
jupiter.rotation.z = 0.05462881;
scene.add(jupiter);

const light0 = new THREE.AmbientLight("#fff",0.5);
light0.position.set(-25,15,15);
scene.add(light0);

const light1 = new THREE.PointLight("#fff",1);
light1.position.set(25,25,15);
const light1helper = new THREE.PointLightHelper(light1, 1);
scene.add(light1);
scene.add(light1helper);

const light2 = new THREE.PointLight("#fff",1.5);
light2.position.set(-15,-25,0);
const light2helper = new THREE.PointLightHelper(light2, 1);
scene.add(light2);
scene.add(light2helper);


function animate() {
	requestAnimationFrame( animate );

    jupiter.rotation.y += 6.28;

    controls.update();
	renderer.render( scene, cam );
}
animate();