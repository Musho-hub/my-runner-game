import * as THREE from "three";

class Obstacle {
    constructor(world, xPosition, settings = {}) {

        this.world = world;

        // Obstacle settings
        this.width = settings.width || 1; // Default obstacle width
        this.height = settings.height || 3; // Default obstacle height
        this.color = settings.color || 0xff0000; // Default obstacle color

        // Create the obstacle and add it to the scene
        this.createObstacle(xPosition);

        // Create a bounding box for collision detection
        this.bottomBoundingBox = new THREE.Box3().setFromObject(this.bottom);
        this.hasScored = false; // Flag to track if the player has this obstacle

    } // END : constuctor

    createObstacle(xPosition) {
        // Create a group to hold the obstacle components
        const group = new THREE.Group();

        // Create the bottom part of the obstacle
        this.bottom = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, 1),
            new THREE.MeshPhongMaterial({ color: this.color })
        );

        const groundLevel = 0;
        const yPos = groundLevel + this.height / 2;

        // Position the obstacle
        this.bottom.position.set(xPosition, yPos, 0);

        group.add(this.bottom);
        this.mesh = group;
        this.world.scene.add(group);
    }

    update(speed) {
        // Move the obstacle to the left
        this.mesh.position.x -= speed;

        // Update the bounding box for collision detection
        this.bottomBoundingBox.setFromObject(this.bottom);
    }

} // END : class

export default Obstacle;