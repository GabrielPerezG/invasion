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
let enemyX = 105
let enemyY = CH - 550;
let enemyW = 35;
let enemyH = 35;
let enemyColor = "green";

// Laser projectile properties
let laserShots = [];
const laserW = 10;
const laserH = 10;
const laserColor = "red";

// Frames and enemy movement anims
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
        if (laserShots.length < 2) {
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

let enemies = [];

function createEnemies() {
    enemies = [];
    const rows = 5;
    const cols = 11;
    const xOffset = enemyX;     // starting x position for the grid
    const yOffset = enemyY;     // starting y position
    const gapX = 55;            // horizontal gap between enemies
    const gapY = 50;            // vertical gap between enemies

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            enemies.push({
                baseX: xOffset + col * gapX,
                x: xOffset + col * gapX,
                y: yOffset + row * gapY,
                w: enemyW,
                h: enemyH,
                color: enemyColor,
                hit: false,
            });
        }
    }
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + laserW > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + laserH > rect2.y
    );
}

createEnemies();

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

    // Update and draw each laser shot and checks for collisions with enemies
    for (let i = laserShots.length - 1; i >= 0; i--) {
        let laser = laserShots[i];
        // Move the laser upward
        laser.y -= 5;
        drawObj(laser.x, laser.y, laserW, laserH, laserColor);

        // Check collision with each enemy
        for (let j = enemies.length - 1; j >= 0; j--) {
            let enemy = enemies[j];
            if (checkCollision(laser, enemy)) {
                // Remove the enemy and laser if a collision is detected
                enemies.splice(j, 1);
                laserShots.splice(i, 1);
                break; // Exit inner loop after collision
            }
        }
    }
    // Remove lasers that have gone off the top of the canvas
    laserShots = laserShots.filter(laser => laser.y + laserH > 0);

    // Draw enemies with x positions
    for (let enemy of enemies) {
        enemy.x = enemy.baseX + enemyFrame - 80;
        drawObj(enemy.x, enemy.y, enemy.w, enemy.h, enemy.color);
    }

    requestAnimationFrame(playGame);
}

// playGame();
