// cache the canvas
const canvas = document.getElementById("canvas");
// initialize the context
let ctx = canvas.getContext("2d");
const CW = canvas.width;
const CH = canvas.height;
const halfCW = CW / 2;
const halfCH = CH / 2;

// Object function for drawing rectangles
function drawObj(objX, objY, objW, objH, objColor) {
    ctx.fillStyle = objColor;
    ctx.fillRect(objX, objY, objW, objH);
}

// Ship (player) properties
let shipX = halfCW;
let shipY = CH - 75;
let shipW = 45;
let shipH = 45;
let shipColor = "blue";

// Enemy properties
let enemyX = halfCW;
let enemyY = CH - 550;
let enemyW = 35;
let enemyH = 35;
let enemyRow = 5;
let enemySpeed = 2;
let enemyColor = "green";

// enemy laser if i ever figure it out lol
// let enemyLaserX = enemyX;
// let enemyLaserY = enemyY;
// let enemyLaserW = 10;
// let enemyLaserH = 10;
// let enemyLaserColor = "red";
// let enemyLaserSpeed = 3;

// Laser projectile properties using an array to hold multiple lasers
let laserShots = [];  // Each element will be an object { x, y }
const laserW = 10;
const laserH = 10;
const laserColor = "red";

// Frames and enemy movement
let frameCount = 0;
let enemyFrame = 0;

// Movement logic for the ship
let moveRight = false;
let moveLeft = false;
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        moveRight = true;
        console.log("it goes right");
    }
    if (event.key === "ArrowLeft") {
        moveLeft = true;
        console.log("it goes left");
    }
    if (event.key === "ArrowUp") {
        // Only allow a new laser if less than 2 are active
        if (laserShots.length < 2) {
            // Add a new laser shot, capturing the ship's current x-coordinate
            laserShots.push({ x: shipX, y: shipY });
            console.log("pew");
        }
    }
});
document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight") {
        moveRight = false;
    }
    if (event.key === "ArrowLeft") {
        moveLeft = false;
    }
});

function playGame() {
    ctx.clearRect(0, 0, CW, CH);
    document.getElementById("gameButton").onclick = "";

    // Move the ship left or right
    if (moveRight && shipX + shipW < CW) {
        shipX += 10;
    }
    if (moveLeft && shipX > 0) {
        shipX -= 10;
    }

    // Shake effect for the ship
    if (frameCount < 20) {
        shipX += 0.5;
    } else if (frameCount > 21) {
        shipX -= 0.5;
    }
    if (frameCount >= 40.5) {
        frameCount = 0;
    }
    if (frameCount < 20) {
        enemyFrame += 0.5;
    } else if (frameCount > 20.5) {
        enemyFrame -= 0.5;
    }
    frameCount++;

    // Draw the ship
    drawObj(shipX, shipY, shipW, shipH, shipColor);

    // Update and draw each laser shot
    for (let i = 0; i < laserShots.length; i++) {
        // Move the laser upward
        laserShots[i].y -= 5;
        drawObj(laserShots[i].x, laserShots[i].y, laserW, laserH, laserColor);
    }
    // Remove lasers that have gone off the top of the canvas
    laserShots = laserShots.filter(laser => laser.y + laserH > 0);

    // Enemy spawn: draw 5 rows of 11 enemies each with a slight horizontal oscillation
    for (let i = 1; i <= 11; i++) {
        drawObj(50 + i * 55 + enemyFrame - 80, enemyY, enemyW, enemyH, enemyColor);
        drawObj(50 + i * 55 + enemyFrame - 80, enemyY + 50, enemyW, enemyH, enemyColor);
        drawObj(50 + i * 55 + enemyFrame - 80, enemyY + 100, enemyW, enemyH, enemyColor);
        drawObj(50 + i * 55 + enemyFrame - 80, enemyY + 150, enemyW, enemyH, enemyColor);
        drawObj(50 + i * 55 + enemyFrame - 80, enemyY + 200, enemyW, enemyH, enemyColor);
    }

    requestAnimationFrame(playGame);
}

// playGame();
