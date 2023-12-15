
let side = 3;
let matrix = []

function main() {
    const socket = io();
    console.log("Read Game of live anzuzeigen")

    function gotMatrix(data) {
        console.log(data);
        matrix = data;
    }
    socket.on("matrix", gotMatrix)
}

function setup(){
    createCanvas(500,500)//richtige Länge
}


function drawMatrix() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill('white')
            if (matrix[y][x] === 1) {
                fill('green')
            } else if (matrix[y][x] === 2) {
                fill('gold')
            } else if (matrix[y][x] === 3) {
                fill('red')
            }
            else if (matrix[y][x] === 4) {
                fill('pink')
            }
            else if (matrix[y][x] === 5) {
                fill('blue')
            }
            rect(x * side, y * side, side, side);
        }
    }
}




window.onload = main;

