import World from "./World"; // Handles the 3D scene, camera, and rendering
import Player from "./Player"; // Represents the player character
import InputHandler from "./InputHandler"; // Handles player input (e.g., jumping)
import ObstacleManager from "./ObstacleManager"; // Manages obstacles in the game
import ScoreManager from "./ScoreManager"; // Tracks and displays the player's score
import GameOverManager from "./GameOverManager"; // Handles the game-over screen and rest.

class Config {
    constructor(settings) {

        // Initialize the game world (3D scene, camera, renderer, etc.)
        const world = new World({

            showCamera: true,
            showCameraPos: false,
            setCameraPos: [0, 5, 15], // x, y, z
            showGrid: false,
            showAxes: false,
            ambientLight: true,
            orbitControl: false,
            showFloor: true,

        });

        this.world = world;
        this.world.config = this; // Reference to the Config instance for global access

        this.settings = settings;

        // Initialize the player and attach it to the world
        this.player = new Player(world, settings.player);
        this.world.player = this.player;

        // Initialize input handler for player controls (e.g., jumping)
        this.input = new InputHandler(this.player);

        // Initialize obstacle manager to handle obstacle spawning and updates
        this.obstacleManager = new ObstacleManager(world, settings.obstacle);

        // Initialize score manager to track and display the score
        this.scoreManager = new ScoreManager();

        // Initialize game-over manager to handle the game-over screen
        this.gameOverManager = new GameOverManager(this.scoreManager, settings.ui);

        this.gameOver = false; // Flag to track if the game is over

        // For debugging (accessible via the browser console)
        window.game = this;
        window.player = this.player;

        // Start the game loop
        this.gameLoop();

    } // END : constructor

    gameLoop() {
        if (this.gameOver) return; // Stop the loop if the game is over

        // Update player and obstacles
        this.player.update();
        this.obstacleManager.update(this.player);

        // Render the scene
        this.world.renderer.render(this.world.scene, this.world.camera);

        // Continue the loop
        requestAnimationFrame(() => this.gameLoop());
    }

    endGame() {
        // Set the game-over flag and show the game-over UI
        this.gameOver = true;
        this.gameOverManager.show();
    }

} // END : class

export default Config;