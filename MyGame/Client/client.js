
let side = 10;
let matrix = []

function main() {
    const socket = io();





    let btnCreate = document.getElementById("send_btn")









    function gotMatrix(data) {
        //console.log(data);
        matrix = data;
    }
    socket.on("matrix", gotMatrix)





    function sendeCreateCommand() {
        console.log("ich wurde geklickt")
        //Funktion schreiben, was geschehen soll wenn Butoon geklickt wird
    }



    btnCreate.onclick = sendeCreateCommand;
    console.log("Read Game of live anzuzeigen")





}

function setup() {
    createCanvas(500, 500)//richtige Länge
}


function draw() {
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

