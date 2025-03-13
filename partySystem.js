// Character Constuctor
class Character {
    constructor(name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }
}
// Turn order
let currentPartyTurn = 0;
const party = [new Character("Warrior", 35, 3, 2), new Character("Thief", 25, 5, 1), new Character("Wizard", 20, 7, 0), new Character("Cleric", 25, 2, 1)];

function nextTurn() {
    currentPartyTurn = (currentPartyTurn + 1) % party.length; // Cycle through party members
    // Display current player's turn
    console.log(`It's ${party[currentPartyTurn].name}'s turn! What will ${party[currentPartyOrder].name} do?`);
}

function enemyTurn() {

}

// Progress

function dungeonFloor() {

}