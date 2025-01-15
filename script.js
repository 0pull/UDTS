let symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let grid = [];
let cols, rows;
let cellSize = 20;
let time = 0;

// Частицы дыма
let smokeParticles = [];

// Градирня (ASCII-арт)
let coolingTower = [
    "  ________  ",
    " /        \\ ",
    "/          \\",
    "|          |",
    "|          |",
    "|          |",
    "\\__________/"
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = symbols.charAt(floor(random(symbols.length)));
        }
    }
    textSize(cellSize);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);
    time += 0.05;

    // Анимация символов
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * cellSize;
            let y = j * cellSize;
            let angle = (i + j + time) * 0.1;
            let size = map(sin(angle), -1, 1, 10, 20);
            let r = map(sin(angle), -1, 1, 0, 255);
            let g = map(sin(angle + PI / 3), -1, 1, 0, 255);
            let b = map(sin(angle + 2 * PI / 3), -1, 1, 0, 255);
            fill(r, g, b);
            textSize(size);
            text(grid[i][j], x + cellSize / 2, y + cellSize / 2);
        }
    }

    // Рисуем градирню
    drawCoolingTower();

    // Анимация дыма
    drawSmoke();

    // Проверка ввода кода
    let codeInput = document.getElementById('code-input').value;
    if (codeInput === 'pull1420') {
        window.location.href = 'indox.html';
    }
}

function drawCoolingTower() {
    let towerX = width / 2;
    let towerY = height / 2 + 50;

    // Рисуем градирню
    fill(255);
    textSize(20);
    textStyle(BOLD);
    for (let i = 0; i < coolingTower.length; i++) {
        text(coolingTower[i], towerX, towerY + i * 20);
    }
}

function drawSmoke() {
    // Добавляем новую частицу дыма
    if (frameCount % 3 === 0) { // Увеличиваем частоту появления частиц для густого дыма
        smokeParticles.push(new SmokeParticle());
    }

    // Отображаем и обновляем частицы дыма
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        smokeParticles[i].update();
        smokeParticles[i].display();
        if (smokeParticles[i].isFinished()) {
            smokeParticles.splice(i, 1); // Удаляем частицу, если она "исчезла"
        }
    }
}

// Класс для частиц дыма
class SmokeParticle {
    constructor() {
        this.x = width / 2 + random(-20, 20); // Центр градирни с небольшим смещением
        this.y = height / 2 - 50; // Верх градирни
        this.size = 20; // Начальный размер символа
        this.alpha = 255; // Начальная прозрачность
        this.velocity = createVector(random(-1, 1), random(-3, -1)); // Движение вверх
        this.char = symbols.charAt(floor(random(symbols.length))); // Случайный символ
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.size += 0.2; // Символ немного увеличивается
        this.alpha -= 1.5; // Символ постепенно исчезает
    }

    display() {
        fill(200, 200, 200, this.alpha); // Серый цвет с прозрачностью
        textSize(this.size);
        text(this.char, this.x, this.y);
    }

    isFinished() {
        return this.alpha < 0; // Частица исчезла
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);
    grid = [];
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = symbols.charAt(floor(random(symbols.length)));
        }
    }
}