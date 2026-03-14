const InputHandler = {
    init(onMove) {
        document.addEventListener("keyup", (e) => {
            let moved = false;

            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                moved = onMove("left");
            } else if (e.code === "ArrowRight" || e.code === "KeyD") {
                moved = onMove("right");
            } else if (e.code === "ArrowDown" || e.code === "KeyS") {
                moved = onMove("down");
            } else if (e.code === "ArrowUp" || e.code === "KeyW") {
                moved = onMove("up");
            }

            if (moved) {
                return true;
            }
        });
    }
};