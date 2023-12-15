const LivingCreature = require("./LivingCreature.js")
module.exports = class Jager extends LivingCreature {
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        super(x,y)
        this.colorCode = 4;
        //zwei 
        this.eaten = 0;
        this.noteaten = 0;
        this.rounds = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 1, this.y - 2],
            [this.x - 1, this.y + 2],

            [this.x, this.y - 2],
            [this.x, this.y + 2],

            [this.x + 1, this.y - 2],
            [this.x + 1, this.y + 2],

            [this.x + 2, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y - 2]



        ]
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
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 1, this.y - 2],
            [this.x - 1, this.y + 2],

            [this.x, this.y - 2],
            [this.x, this.y + 2],

            [this.x + 1, this.y - 2],
            [this.x + 1, this.y + 2],

            [this.x + 2, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y - 2]
        ]
    }
    findFields(symbol) {
        this.updateNeighbors();
        return super.findFields(symbol);
    }
    eat() {
        let fleischfresserFields = this.findFields(3);
        //console.table(fleischfresserFields);
        if (fleischfresserFields.length > 0) {
            //essen
            //console.table(fleischfresserFields);
            let randomIndex = Math.floor(Math.random()*fleischfresserFields.length)
            let pos = fleischfresserFields[randomIndex] // [x, y]
            let newX = pos[0];
            let newY = pos[1];
            //matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 0;
            //this.x = newX;
            //this.y = newY;
            //Grassobject löschen aus Lebewesen liste
            for (let i = 0; i < fleischfresserArr.length; i++) {
                let grassfresserObj = fleischfresserArr[i];
                if (grassfresserObj.x === newX && grassfresserObj.y === newY) {
                    //dieses Grassobjekt löschen
                    fleischfresserArr.splice(i, 1);
                    break;
                }

            }
            this.mul(newX, newY);
            this.eaten++;
            this.noteaten = 0;
        } else {
            this.noteaten++;
            this.eaten = 0;

            if (this.noteaten >= 48) {
                this.die();
            }
        }
    }



    die() {
        // matrix update
        matrix[this.y][this.x] = 0;
        //löschen aus der grassfresserliste
        for (let i = 0; i < jagerArr.length; i++) {
            const fleischfresserObj = jagerArr[i];
            if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                //dieses Grassobjekt löschen
                jagerArr.splice(i, 1);
                break;
            }

        }
    }
    mul(newX, newY) {

            jagerArr.push(new Jager(newX, newY));
            matrix[newY][newX] = this.colorCode;
            this.eaten = 0;

    }



}

