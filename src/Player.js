import * as THREE from "three"
import { gsap } from "gsap"

class Player {
    constructor(world, settings = {}) {

        this.world = world;

        // Player settings
        this.color = settings.color || 0xff5555; // Default player color
        this.jumpForce = settings.jumpStrength || 0.5; // Jump strength
        this.gravity = settings.gravity || -0.02; // Gravity affecting the player

        // Create the player mesh and add it to the scene
        this.mesh = this.createMesh();
        this.setupPhysics();
        this.addToScene();

        // Create a bounding box for collision detection
        this.boundingBox = new THREE.Box3().setFromObject(this.mesh);

    } // END : constuctor

    createMesh() {
        // Create a cube-shaped player mesh
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: this.color,
            shininess: 100
        });
        return new THREE.Mesh(geometry, material);
    }

    setupPhysics() {
        // Initialize player position, velocity, and grounded state
        this.position = { x: 0, y: 5, z: 0};
        this.velocity = { x: 0, y: 0, z: 0};
        this.isGrounded = true;
    }

    addToScene() {
        // Add the player mesh to the game world
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.world.scene.add(this.mesh);
    }

    jump() {
        // Handle player jump logic
        if (this.isGrounded) {
            this.velocity.y = this.jumpForce; // Apply jump force
            this.isGrounded = false;

            // Animate the player mesh during the jump
            gsap.to(this.mesh.scale, {
                y: 1.5,
                x: 0.9,
                z: 0.9,
                duration: 0.1,
                ease: "power2.out",
            });
            gsap.to(this.mesh.scale, {
                y: 1,
                x: 1,
                z: 1,
                duration: 0.2,
                delay: 0.25,
            });

            console.log("Jump activated! current velocity:", this.velocity.y);
            return true;
        }
        console.warn("cant jump - not grounded");
        return false;
    }

    update() {
        // Apply gravity and update player position
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;

        const groundLevel = 0;
        const playerHalfHeight = 0.5;

        const wasGrounded = this.isGrounded;
        
        // Check if the player is grounded
        if (this.position.y <= groundLevel + playerHalfHeight) {
            this.position.y = groundLevel + playerHalfHeight;
            this.velocity.y = 0;
            this.isGrounded = true;

            // Animate the player mesh when landing
            if (!wasGrounded) {
                gsap.to(this.mesh.scale, {
                    y: 0.7,
                    x: 1.5,
                    z: 1.5,
                    duration: 0.1,
                    ease: "power2.out"
                });
                gsap.to(this.mesh.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.2,
                    delay: 0.25,
                    ease: "power1.in"
                })
            }

        } else {
            this.isGrounded = false;
        }

        // Update the player's position and bounding box
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.boundingBox.setFromObject(this.mesh);
    }

} // END : class

export default Player;