

const Grass = require("./Classes/Grass.js");
const Grassfresser = require("./Classes/Grassfresser.js");
const Fleischfresser = require("./Classes/Fleischfresser.js");
const Jager = require("./Classes/Jager.js");
const Frezzer = require("./Classes/Frezzer.js");
const express = require("express");
const app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);

let clients = [];
let isGameRunning = false;
let interValID;

app.use(express.static("./Client"));

app.get("/", function (req, res) {
    res.redirect("index.html")
});

server.listen(3000, function () {
    console.log("server start auf Port 3000")
    // initGame();
    // setInterval(function(){
    //     updateGame();

    // },1000);
    io.on("connection", function (socket) {
        console.log("ws connection established");
        clients.push(socket.id);
        //socket.emit("matrix", matrix)
        if (clients.length == 1 && isGameRunning == false) {
            console.log("Spiel läuft");
            initGame();
            interValID = setInterval(updateGame, 500),
                isGamerunning = true;
        }
        // Verhalten wenn Clients verlassen
        socket.on('disconnect', function () {
            console.log('client left...');
            const foundIndex = clients.findIndex(id => id === socket.id);
            if (foundIndex >= 0) {
                clients.splice(foundIndex, 1);
            }
            if (clients.length === 0) {
                isGameRunning = false;
                clearInterval(interValID);
                console.log("Spiel gestoppt: keine Clients", clients.length);
            }
        });
    });
    //auch bei button click

});




//game logic on server





matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 4, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 2, 0],
    [1, 1, 1, 0, 3]
];

grassArr = [];
grassfresserArr = [];
fleischfresserArr = [];
jagerArr = [];
frezzerArr = [];

function getRandomMatrix(b, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        matrix.push([]);
        for (let x = 0; x < b; x++) {
            matrix[y][x] = Math.floor(Math.random() * 2);
        }
    }
    return matrix;
}




function createMoreCreatures() {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let m = 0; m < matrix[0].length; m++) {
            if (m === i) {
                count++;
                if (count > 2) {
                    matrix[i][m] = 2;
                    count = 0;
                }
            }

        }

    }
    for (let i = 0; i < matrix.length; i++) {
        for (let m = 0; m < matrix[0].length; m++) {
            if (m === i) {
                count++;
                if (count > 2) {
                    matrix[i][m + 1] = 3;
                    count = 0;
                }
            }

        }

    }
    for (let i = 0; i < matrix.length; i++) {
        for (let m = 0; m < matrix[0].length; m++) {
            if (m === i) {
                count++;
                if (count > 3) {
                    matrix[i][m + 1] = 4;
                    count = 0;
                }
            }

        }

    }

    matrix[13][11] = 4;
    matrix[1][1] = 4;
}






function initGame() {
    console.log("Init läuft")

    matrix = getRandomMatrix(30, 30);
    createMoreCreatures();


    //Grasobject
    // let grasObj = new Grass (0,0);
    // let emptyFields = grasObj.findFiels(0);
    // console.log(emptyFields)
    //für alle einsen in der matixs Grassobjecte erstellen
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                grassArr.push(new Grass(x, y))
            } else if (matrix[y][x] === 2) {
                grassfresserArr.push(new Grassfresser(x, y))
            } else if (matrix[y][x] === 3) {
                fleischfresserArr.push(new Fleischfresser(x, y))
            }
            else if (matrix[y][x] === 4) {
                jagerArr.push(new Jager(x, y))
            }
            else if (matrix[y][x] === 5) {
                frezzerArr.push(new Frezzer(x, y))
            }


        }
    }
    console.log("Sende matrix an alle")
    io.sockets.emit("matrix", matrix)
}


function updateGame() {
    console.log("update game...")
    for (let i = 0; i < grassArr.length; i++) {
        let grasObj = grassArr[i]
        grasObj.mul();


    }
    for (let i = 0; i < grassfresserArr.length; i++) {
        let grassfresserObj = grassfresserArr[i];
        grassfresserObj.mul();
        grassfresserObj.eat();

    }
    for (let i = 0; i < fleischfresserArr.length; i++) {
        let fleischfresserObj = fleischfresserArr[i];
        fleischfresserObj.mul();
        fleischfresserObj.eat();

    }
    for (let i = 0; i < jagerArr.length; i++) {
        let fleischfresserObj = jagerArr[i];
        // fleischfresserObj.eat();
        fleischfresserObj.eat();

    }
    for (let i = 0; i < frezzerArr.length; i++) {
        let fleischfresserObj = frezzerArr[i];
        // fleischfresserObj.eat();
        fleischfresserObj.eat();


    }
    console.log("Sende matrix an alle")
    io.sockets.emit("matrix", matrix)
}