let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 4, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 2, 0],
    [1, 1, 1, 0, 3]
];

let side = 30;
let fr = 5;
//lebewesenlisten
let grassArr = [];
let grassfresserArr = [];
let fleischfresserArr = [];
let jagerArr = [];
let frezzerArr = [];

 function getRandomMatrix(b, h) {
     let matrix = [];
     for (let y = 0; y < h; y++) {
         matrix.push([]);
         for (let x = 0; x < b; x++) {
             matrix[y][x] = Math.floor(random(0,2));
         }
     }
     return matrix;
 }
 function createMoreCreatures(){
     let count = 0;
     for (let i = 0; i < matrix.length; i++) {
         for (let m = 0; m < matrix[0].length; m++) {
             if(m === i){
             count++;
                 if(count > 2){
                 matrix[i][m] = 2;
                 count = 0;
                 }
            }
            
         }
        
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let m = 0; m < matrix[0].length; m++) {
            if(m === i){
            count++;
                if(count > 2){
                matrix[i][m+1] = 3;
                count = 0;
                }
           }
           
        }
       
   }
   for (let i = 0; i < matrix.length; i++) {
    for (let m = 0; m < matrix[0].length; m++) {
        if(m === i){
        count++;
            if(count > 3){
            matrix[i][m+1] = 4;
            count = 0;
            }
       }
       
    }
   
}

     matrix[13][11] = 4;
     matrix[1][1] = 4;
}

function setup() {
    matrix = getRandomMatrix(30, 30);
    createMoreCreatures();
    createCanvas(side * matrix[0].length + 1, side * matrix.length + 1);
    background('#acacac');
    frameRate(fr)

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
}
function draw() {

    //lebewesen update
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
