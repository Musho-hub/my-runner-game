class ScoreManager {
    constructor() {

        this.score = 0; // Initialize the score to 0

        // Create a DOM element to display the score
        this.scoreElement = document.createElement("div");
        this.scoreElement.id = "score";
        this.scoreElement.innerText = `Score: ${this.score}`;
        document.body.appendChild(this.scoreElement);

    } // END : constuctor

    increment() {
        // Increment the score and update the display
        this.score++;
        this.updateDisplay();
    }

    updateDisplay() {
        // Update the DOM element with the current score
        this.scoreElement.innerText = `Score: ${this.score}`;
    }

    reset() {
        // Reset the score to 0 and update the display
        this.score = 0;
        this.updateDisplay();
    }

    getScore() {
        // Return the current score
        return this.score;
    }

} // END : class

export default ScoreManager;