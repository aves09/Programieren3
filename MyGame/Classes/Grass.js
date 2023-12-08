const LivingCreature = require("./LivingCreature.js")
module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.colorCode = 1;
        this.rounds = 0;

    }
    mul() {
        this.rounds++;
        //console.log(this.rounds);
        if (this.rounds >= 6) {
            this.rounds = 0;
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                //zufällig ein Nachbarfeld - Pos auswählen
                let randomIndex = Math.floor(Math.random()*emptyFields.length)
                let pos = emptyFields[randomIndex] // Feld
                let newX = pos[0];
                let newY = pos[1];
                grassArr.push(new Grass(newX, newY))
                matrix[newY][newX] = this.colorCode;
            }
        }
    }
}