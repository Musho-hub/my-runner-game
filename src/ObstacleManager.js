import * as THREE from "three"

import Obstacle from "./Obstacle"; // Represents individual obstacles

class ObstacleManager {
    constructor(world, settings = {}) {

        this.world = world; // References to the game world
        this.obstacles = []; // Array to store active obstacles
        this.spawnInterval = 150; // Interval for spawning obstacles
        this.timer = 0; // Timer to track when to spawn the next obstacle

        this.settings = settings;
        this.speed = settings.speed; // Speed of obstacle movement

    } // END : constructor

    update() {
        this.timer++;

        // Spawn a new obstacle at regular intervals
        if (this.timer >= this.spawnInterval) {
            this.obstacles.push(new Obstacle(this.world, 15, this.settings));
            this.timer = 0;
        }

        // Create a bounding box for the player
        const playerBox = new THREE.Box3().setFromObject(this.world.player.mesh);

        // Update each obstacle
        this.obstacles.forEach((obs, index) => {
            obs.update(this.speed);

            // Check if the player has passed the obstacle
            if (!obs.hasScored && obs.mesh.position.x + obs.width / 2 < this.world.player.mesh.position.x) {
                obs.hasScored = true; // Mark the obstacle as scored
                this.world.config.scoreManager.increment(); // Increment the score
                console.log("Score", this.world.config.scoreManager.getScore());
            }

            // Check for collision with the player
            if (obs.bottomBoundingBox.intersectsBox(playerBox)) {
                console.log("collision detected");
                this.world.config.endGame(); // End the game on collision
            }

            // Remove obstacles that move out of bounds
            if (obs.mesh.position.x < -30) {
                this.world.scene.remove(obs.mesh);
                this.obstacles.splice(index, 1);
            }
        });

    }
} // END : class

export default ObstacleManager;