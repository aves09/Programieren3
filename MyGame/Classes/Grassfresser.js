const LivingCreature = require("./LivingCreature.js")
module.exports = class Grassfresser extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.colorCode = 2;
        //zwei 
        this.eaten = 0;
        this.noteaten = 0;
        this.rounds = 0;
    }
    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    findFields(symbol) {
        this.updateNeighbors();
        return super.findFields(symbol);
    }

    move() {

        //leere Felder finden in der nachbarschaft
        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {
            let randomIndex = Math.floor(Math.random()*emptyFields.length)
            let pos = emptyFields[randomIndex]; // [x,y]
            let newX = pos[0];
            let newY = pos[1];
            //bewegen
            //alte position auf null setzen neue position auf 2
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            //eigene Position updaten
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        let grassFields = this.findFields(1);
        if (grassFields.length > 0) {
            //essen
            let randomIndex = Math.floor(Math.random()*grassFields.length)
            let pos = grassFields[randomIndex]; // [x, y]
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
            //Grassobject löschen aus Lebewesen liste
            for (let i = 0; i < grassArr.length; i++) {
                let grassObj = grassArr[i];
                if (grassObj.x === this.x && grassObj.y === this.y) {
                    //dieses Grassobjekt löschen
                    grassArr.splice(i, 1);
                    break;
                }

            }
            this.eaten++;
            this.noteaten = 0;
        } else {
            this.noteaten++;
            this.eaten = 0;

            if (this.noteaten >= 5) {
                this.die();
            } else {
                this.move();
            }
        }
    }
    die() {
        // matrix update
        matrix[this.y][this.x] = 0;
        //löschen aus der grassfresserliste
        for (let i = 0; i < grassfresserArr.length; i++) {
            const grassfresserObj = grassfresserArr[i];
            if (grassfresserObj.x === this.x && grassfresserObj.y === this.y) {
                //dieses Grassobjekt löschen
                grassfresserArr.splice(i, 1);
                break;
            }

        }
    }
    mul() {
        if (this.eaten >= 5) {

            //vermehren
            // leeres nachbarfeld suchen 
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let randomIndex = Math.floor(Math.random()*emptyFields.length)
                let pos = emptyFields[randomIndex]
                let newX = pos[0];
                let newY = pos[1];
                //neuen Grassfresser erstellen
                grassfresserArr.push(new Grassfresser(newX, newY));
                matrix[newY][newX] = this.colorCode;
            }
            //neuen Grassfresserobjekt erstellen
            //matrix updaten
            this.eaten = 0;
        }
    }
}
