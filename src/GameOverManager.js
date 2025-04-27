class GameOverManager {
    constructor(scoreManager, uiText = {}) {

        this.scoreManager = scoreManager; // Reference to the ScoreManager instance
        this.uiText = uiText; // UI text for the game-over screen
        this.container = null; // Container for the game-over UI

    } // END : constuctor

    show() {
        // Display the game-over screen
        const finalScore = this.scoreManager.getScore();

        this.container = document.createElement("div");
        this.container.id = "gameOverContainer";
        document.body.appendChild(this.container);

        // Add the game-over title
        const title = document.createElement("div");
        title.id = "gameOverText"
        title.innerText = this.uiText.gameOverText || "Game Over";
        this.container.appendChild(title);

        // Add the final score
        const scoreText = document.createElement("div");
        scoreText.id = "finalScore"
        scoreText.innerText = `Score: ${finalScore}`;
        this.container.appendChild(scoreText);

        // Add a restart button
        const restartButton = document.createElement("button");
        restartButton.id = "restartButton";
        restartButton.innerText = this.uiText.restartButtonText || "Restart";
        restartButton.addEventListener("click", () => {
            location.reload(); // Reload the page to restart the game
        });
        this.container.appendChild(restartButton);
    }

    hide() {
        // Remove the game-over screen
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

} // END : class

export default GameOverManager;