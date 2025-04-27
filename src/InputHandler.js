class InputHandler {
    constructor(player) {
        // Listen for keydown events to handle player input
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") player.jump(); // Trigger jump on spacebar press
        });
    } // END : constructor
} // END : class

export default InputHandler;