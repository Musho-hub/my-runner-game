import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";

class World {
  constructor(settings) {
    console.log(settings);

    // Sets up the 3D scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.config = null; // Reference to the Config instance
    this.player = null; // Reference to the Player instance

    // Add optional helpers (grid, axes)
    const axesHelper = new THREE.AxesHelper(5);
    settings.showAxes && this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(20, 20);
    settings.showGrid && this.scene.add(gridHelper);

    // Add ambient light
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    settings.ambientLight && this.scene.add(al);

    // Set up the camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    this.camera.position.set(...(settings.setCameraPos || [0, 0, 5]));
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);

    // Set up the renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Add interaction manager for handling user interactions
    this.InteractionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );

    // Add orbit controls (optional)
    if (settings.orbitControl) {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    if (settings.showCameraPos && settings.orbitControl) {
        this.controls.addEventListener("change", () => {
            console.log(
                `Camera position: x: ${this.camera.position.x.toFixed(1)},
                y: ${this.camera.position.y.toFixed(1)},
                z: ${this.camera.position.z.toFixed(1)}`
            );
        });
    }

    // Add a floor to the scene
    const geometryFloor = new THREE.PlaneGeometry(100, 10);
    const materialFloor = new THREE.MeshPhongMaterial({
      color: 0x76c000,
      side: THREE.DoubleSide,
    });
    const floor = new THREE.Mesh(geometryFloor, materialFloor);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2;
    settings.showFloor && this.scene.add(floor);

    // Handle window resizing
    window.addEventListener("resize", () => this.onWindowResized());
  } // END : constructor

  onWindowResized() {
    // Update camera and renderer on window resize
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
} // END : class

export default World;
