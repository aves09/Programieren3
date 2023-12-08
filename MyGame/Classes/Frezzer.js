const LivingCreature = require("./LivingCreature.js")
const Fleischfresser = require("./Fleischfresser.js")
const Jager = require("./Jager.js")
module.exports = class Frezzer extends LivingCreature {
    constructor(x, y) {
        // this.x = x;
        // this.y = y;
        super(x,y)
        this.colorCode = 5;
        //zwei 
        this.eaten = 0;
        this.noteaten = 0;
        this.rounds = 0;
        // this.neighbors = [
        //     [this.x - 1, this.y - 1],
        //     [this.x, this.y - 1],
        //     [this.x + 1, this.y - 1],
        //     [this.x - 1, this.y],
        //     [this.x + 1, this.y],
        //     [this.x - 1, this.y + 1],
        //     [this.x, this.y + 1],
        //     [this.x + 1, this.y + 1]

        // ]
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
            let pos = emptyFields[randomIndex] // [x,y]
            let newX = pos[0];
            let newY = pos[1];
            //bewegen
            //alte position auf null setzen neue position auf 2
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            //eigene Position updaten
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.move();
        this.noteaten++;
        let grassfresserFields = this.findFields(2);
        //let grassFields = this.findFields(1);
        if (grassfresserFields.length > 0) {
            //essen
            for (let i = 0; i < grassfresserFields.length; i++) {
                let newX = grassfresserFields[i][0];
                let newY = grassfresserFields[i][1];
                matrix[newY][newX] = 0;



                //Grassobject löschen aus Lebewesen liste
                for (let i = 0; i < grassfresserArr.length; i++) {
                    let grassfresserObj = grassfresserArr[i];
                    if (grassfresserObj.x === newX && grassfresserObj.y === newY) {
                        //dieses Grassobjekt löschen
                        grassfresserArr.splice(i, 1);
                        break;
                    }

                }
            }
        }



        let grassFields = this.findFields(1);
        //let grassFields = this.findFields(1);
        if (grassFields.length > 0) {
            //essen
            for (let i = 0; i < grassFields.length; i++) {
                let newX = grassFields[i][0];
                let newY = grassFields[i][1];
                matrix[newY][newX] = 0;



                //Grassobject löschen aus Lebewesen liste
                for (let i = 0; i < grassArr.length; i++) {
                    let grassObj = grassArr[i];
                    if (grassObj.x === newX && grassObj.y === newY) {
                        //dieses Grassobjekt löschen
                        grassArr.splice(i, 1);
                        fleischfresserArr.push(new Fleischfresser(newX, newY))


                        break;
                    }

                }
            }
        }


        let jagerFields = this.findFields(4);
        //let grassFields = this.findFields(1);
        if (jagerFields.length > 0) {
            //essen
            for (let i = 0; i < jagerFields.length; i++) {
                let newX = jagerFields[i][0];
                let newY = jagerFields[i][1];
                matrix[newY][newX] = 0;



                //Grassobject löschen aus Lebewesen liste
                for (let i = 0; i < jagerArr.length; i++) {
                    let jagerObj = jagerArr[i];
                    if (jagerObj.x === newX && jagerObj.y === newY) {
                        //dieses Grassobjekt löschen
                        jagerArr.splice(i, 1);
                        break;
                    }

                }
            }
        }



        let fleischfresserFields = this.findFields(3);
        //let grassFields = this.findFields(1);
        if (fleischfresserFields.length > 0) {
            //essen
            for (let i = 0; i < fleischfresserFields.length; i++) {
                let newX = fleischfresserFields[i][0];
                let newY = fleischfresserFields[i][1];
                matrix[newY][newX] = 0;



                //Grassobject löschen aus Lebewesen liste
                for (let i = 0; i < fleischfresserArr.length; i++) {
                    let grassfresserObj = fleischfresserArr[i];
                    if (grassfresserObj.x === newX && grassfresserObj.y === newY) {
                        //dieses Grassobjekt löschen
                        fleischfresserArr.splice(i, 1);
                        if (Math.floor(Math.random()*2)) {
                            jagerArr.push(new Jager(newX, newY))
                        }
                        break;
                    }

                }
            }
        }



        if (this.noteaten >= 2) {
            this.die();
        }

    }


    die() {
        // matrix update
        matrix[this.y][this.x] = 0;
        //löschen aus der grassfresserliste
        for (let i = 0; i < frezzerArr.length; i++) {
            const fleischfresserObj = frezzerArr[i];
            if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                //dieses Grassobjekt löschen
                frezzerArr.splice(i, 1);
                break;
            }

        }
    }



}