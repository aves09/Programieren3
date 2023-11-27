class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        //erstelle Gefunden Liste
        let found = [];
        //durch die nachbarfelder laufen
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i]; //x und y
            let posX = pos[0];
            let posY = pos[1];
            //checke in matricx ob wert null drin steht
            if (posX >= 0 && posY >= 0 && posY < matrix.length && posX < matrix[0].length)
                if (matrix[posY][posX] === symbol) {
                    found.push(pos)
                }
        }
        //wenn ja, dann speichere die nachbarposition in der gefundenen Liste
        //Gebe gefunden Liste aus
        return found;
    }

}




class Grass extends LivingCreature {
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
                let pos = random(emptyFields) // Feld
                let newX = pos[0];
                let newY = pos[1];
                grassArr.push(new Grass(newX, newY))
                matrix[newY][newX] = this.colorCode;
            }
        }
    }
}


class Grassfresser extends LivingCreature {
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
            let pos = random(emptyFields); // [x,y]
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
            let pos = random(grassFields); // [x, y]
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
                let pos = random(emptyFields)
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









class Fleischfresser extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.colorCode = 3;
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
        this.updateNeighbors()
        return super.findFields(symbol);
    }
    move() {
        //leere Felder finden in der nachbarschaft
        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {
            let pos = random(emptyFields); // [x,y]
            let newX = pos[0];
            let newY = pos[1];
            //bewegen
            //alte position auf null setzen neue position auf 2
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            //eigene Position updaten
            this.x = newX;
            this.y = newY;
        }

    }
    eat() {
        let fleischfresserFields = this.findFields(2);
        if (fleischfresserFields.length > 0) {
            //essen
            console.table(fleischfresserFields);
            let pos = random(fleischfresserFields); // [x, y]
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            //Grassobject löschen aus Lebewesen liste
            for (let i = 0; i < grassfresserArr.length; i++) {
                let grassfresserObj = grassfresserArr[i];
                if (grassfresserObj.x === this.x && grassfresserObj.y === this.y) {
                    //dieses Grassobjekt löschen
                    grassfresserArr.splice(i, 1);
                    break;
                }

            }
            this.eaten++;
            this.noteaten = 0;
        } else {
            this.noteaten++;
            this.eaten = 0;

            if (this.noteaten >= 8) {
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
        for (let i = 0; i < fleischfresserArr.length; i++) {
            const fleischfresserObj = fleischfresserArr[i];
            if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                //dieses Grassobjekt löschen
                fleischfresserArr.splice(i, 1);
                break;
            }

        }
    }

    mul() {
        if (this.eaten >= 2) {

            //vermehren
            // leeres nachbarfeld suchen 
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let pos = random(emptyFields)
                let newX = pos[0];
                let newY = pos[1];
                //neuen Grassfresser erstellen
                fleischfresserArr.push(new Fleischfresser(newX, newY));
                matrix[newY][newX] = this.colorCode;
            }
            //neuen Grassfresserobjekt erstellen
            //matrix updaten
            this.eaten = 0;
        }
    }
}


class Jager extends LivingCreature {
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
            let pos = random(fleischfresserFields); // [x, y]
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
        if (Math.floor(random(0, 2))) {
            frezzerArr.push(new Frezzer(newX, newY));
            matrix[newY][newX] = 5;
        } else {
            jagerArr.push(new Jager(newX, newY));
            matrix[newY][newX] = this.colorCode;
            this.eaten = 0;

        }
    }



}







class Frezzer extends LivingCreature {
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
            let pos = random(emptyFields); // [x,y]
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
                        if (Math.floor(random(0, 2))) {
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