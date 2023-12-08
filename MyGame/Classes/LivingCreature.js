module.exports = class LivingCreature {
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
