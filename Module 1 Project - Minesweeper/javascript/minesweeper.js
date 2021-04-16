// declare global vars
const mainGrid = document.getElementById("main-grid");
// clear grid content
mainGrid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const gameTitles = document.querySelectorAll(".game-titles");
const mainContainer = document.getElementById("main-container");

const gridSquare = document.getElementsByClassName(".square");
const gridBombs = document.getElementsByClassName("bomb-button");
const gridNumbers = document.getElementsByClassName("numbers");

// grid sizes for easy, medium, hard
const levels = {
    easy: {x: 9, y:9},
    medium: {x: 13, y: 15},
    hard: {x: 16, y: 30}
}

const easy = "easy";
const medium = "medium";
const hard = "hard";

// create 2x2 array for easier access in JS
let gridDisplay = [];

// load default easyMode grid
var loadEasyGrid = () => {
    // manipulate shape of game container
    mainContainer.style.width = "40%";
    mainContainer.style.height = "60%";
    
    mainGrid.style.height = "90%";
    gameHeading.style.height = "15%";

    // reset grid template to empty. remove existing ".square" divs inside mainGrid
    emptyGrid();

    // insert gridColumn into gridDisplay so it's  [[column], [column], ...]
    for (let rowIndex = 0; rowIndex < levels.easy.x; rowIndex++){
        const gridColumn = [];

        for (let columnIndex = 0; columnIndex < levels.easy.y; columnIndex++){
            // default to blank squares
            gridColumn[columnIndex] = " "
        }

        gridDisplay.push(gridColumn);
    }

    // place bombs and numbers into grid
    setBombs(10, easy);
    setNumbers(easy);

    // assign grid style of # x # board
    mainGrid.style.gridTemplate =
        "repeat(" + levels.easy.x + ", 1fr) / repeat(" + levels.easy.y + ", 1fr)";
    
    // assign gridDisplay into HTML #main-grid
    for (let rowIndex = 0; rowIndex < gridDisplay.length; rowIndex++){
            for (let columnIndex = 0; columnIndex < gridDisplay[0].length; columnIndex++){
                
                if (gridDisplay[rowIndex][columnIndex] != "blank"){
                    // if it's a bomb, add .square div and image of bomb
                    if (gridDisplay[rowIndex][columnIndex] === "bomb"){
                        mainGrid.innerHTML += '<button class="square" id=' + rowIndex + '-' +
                                                columnIndex + '>'+ '<div class="bomb-button">' +
                                                '<img src="./images/bomb.png" class="images bombs">'+
                                                '</div></button>';
                    }

                    // if it's a number, add .square div and number
                    else {
                        mainGrid.innerHTML += '<button class="square" id=' + rowIndex + '-' + 
                                                columnIndex + '>'+ '<div class="numbers" id="num' +
                                                gridDisplay[rowIndex][columnIndex] + '">' +
                                                gridDisplay[rowIndex][columnIndex] + '</div></button>';
                        // console.log(mainGrid.innerHTML);
                    }

                }

                 // if blank, add only the .square div and class blank
                 else if (gridDisplay[rowIndex][columnIndex] === " "){
                    mainGrid.innerHTML += '<button class="square " id=' + 
                                            rowIndex + '-' + columnIndex + '><div class="blank"></div></button>';
                }
            }
        }


    // console.log(square)
    // set default on images and numbers to visibility:hidden
    // // hide bombs
    for (counter = 0; counter < gridBombs.length; counter++){
        // gridBombs[counter].style.visibility = "hidden";
    };

    // hide and unhide numbers
    for (counter = 0; counter < gridNumbers.length; counter++){
        // gridNumbers[counter].style.visibility = "hidden";
        
    };

    const squares = document.querySelectorAll(".square");
    // const gridNumbers = document.getElementsByClassName("numbers");

    squares.forEach((square, index) => {
        square.addEventListener("click", function() {
        console.log('hello', index)
            if (square[index] = gridNumbers){

            gridNumbers[index].style.visibility = "hidden";
            }
        });
    });







    // const gridSquare = document.getElementsByClassName("square");

    // for (counter = 0; counter < gridSquare.length; counter++){
    //     console.log('hello')

    //     gridSquare[counter].addEventListener("click", function() {
    //         console.log('hello')
    //         this.style.visibility = "visible";
    //     });
    // }

}

var setBombs = (bombs, difficulty) => {
    // set number of bombs in bombCount
    let bombCount = bombs;
    // console.log("initial bombs " + bombCount);

    // determine bomb location based on x,y coordinates
    while (bombCount > 0){
        
        // gridRow & Column = 0 to [value]. find individual square to set bomb
        // Math.random() returns number between 0 (inclusive) and 1 (exclusive)
        // Math.floor() returns largest integer <= number
        // (Math.random() * (max - min)) + min
        const rowLength = levels[difficulty].x;
        const columnLength = levels[difficulty].y;
        const rowBomb = Math.floor(Math.random() * rowLength);
        const columnBomb = Math.floor(Math.random() * columnLength);

        const square = gridDisplay[rowBomb][columnBomb];

        // check if bomb already exists in that square
        if (square === "bomb"){
            bombCount++;
        }

        gridDisplay[rowBomb][columnBomb] = "bomb";
        bombCount--;
        // console.log("count " + bombCount);
    }
}


// set adjacentBombs++ counter for each adjacent cell
// (rowIndex - 1, rowIndex + 1, columnIndex +)
var setNumbers = (difficulty) => {
  
    const rowLength = levels[difficulty].x;
    const columnLength = levels[difficulty].y;

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++){
        column:
        for (let columnIndex = 0; columnIndex < columnLength; columnIndex++){

            // if square is a bomb, move to next square
            if (gridDisplay[rowIndex][columnIndex] === "bomb"){
                continue column;
            }

            let counter = 0;

            // count bombs directly above
            if (!(rowIndex - 1 < 0) && gridDisplay[rowIndex - 1][columnIndex] === "bomb"){
                counter++;
            }

            // below square
            if (!(rowIndex + 1 >= rowLength) && gridDisplay[rowIndex + 1][columnIndex] === "bomb"){
                counter++;
            }

            // count bombs to the left
            if (!(columnIndex - 1 < 0) && gridDisplay[rowIndex][columnIndex - 1] === "bomb"){
                counter++;
            }

            // right of square
            if (!(columnIndex + 1 >= columnLength) && gridDisplay[rowIndex][columnIndex + 1]
                    === "bomb"){
                counter++;
            }

            // count bombs in the top left
            if (!(rowIndex - 1 < 0) && !(columnIndex - 1 < 0) && gridDisplay[rowIndex - 1][columnIndex - 1] 
                    === "bomb"){
                counter++;
            }

            // top right
            if (!(rowIndex - 1 < 0) && !(columnIndex + 1 >= columnLength) && 
                    gridDisplay[rowIndex - 1][columnIndex + 1] === "bomb"){
                counter++;
            }

            // count bombs in bottom left
            if (!(rowIndex + 1 >= rowLength) && !(columnIndex - 1 < 0) && 
                    gridDisplay[rowIndex + 1][columnIndex - 1] === "bomb"){
                counter++;
            }

            // bottom right
            if (!(rowIndex + 1 >= rowLength) && !(columnIndex + 1 >= columnLength) && 
                    gridDisplay[rowIndex + 1][columnIndex + 1] === "bomb"){
                counter++;
            }

            if (counter > 0){
                gridDisplay[rowIndex][columnIndex] = counter;
                // console.log(counter);
            }
        }
    }

}


// click on square
// if it's a number, only expose that number
// if it's blank, expose everything until numbers are reached
// if bomb, game over. change square color to red. expose the entire board.

// console.log(gridBombs)
for (counter = 0; counter < gridBombs.length; counter++){
    // gridBombs[counter].addEventListener("click",
    // parentNode.style.backgroundColor = "red")
}

// var clickBomb = () => {
    // const rowLength = levels.easy.x;
    // const columnLength = levels.easy.y;
    // for (let rowIndex = 0; rowIndex < rowLength; rowIndex++){
    //     for (let columnIndex = 0; columnIndex < columnLength; columnIndex++){
    //         if (gridDisplay[rowIndex][columnIndex] === "bomb"){
                // let squareID = document.getElementById(rowIndex + '-' + columnIndex);
                // redBomb.parentNode.style.backgroundColor = "red";
                // console.log(redBomb);

            // }
        // }
    // }
// }

// const gridSquare = document.getElementsByClassName("square");

// for (counter = 0; counter < gridSquare.length; counter++){
//     console.log('hello')
//     gridSquare[counter].addEventListener("click", function() {
//         console.log('hello')
//         this.style.visibility = "hidden";
//     });
// }

// var clickNumber = (input) => {
//     input.style.visiblity = "visible";
// }



























// mediumMode
var loadMediumGrid = () => {

    // manipulate size of #main-container
    mainContainer.style.width = "80%";
    mainContainer.style.height = "75%";

    mainGrid.style.height = "85%";
    gameHeading.style.height = "15%";
    
    // reset grid template. remove existing ".square" divs inside mainGrid
    emptyGrid();
    
    // assign grid style of # x # board
    mainGrid.style.gridTemplate = 
        "repeat(" + levels.medium.x + ", 1fr) / repeat(" + levels.medium.y + ", 1fr)";

    // // add cells inside #main-grid
    for (rowIndex = 0; rowIndex < levels.medium.x; rowIndex++){
       for (columnIndex = 0; columnIndex < levels.medium.y; columnIndex++){
            mainGrid.innerHTML += '<div class="square" id=' + 
                rowIndex + '-' + columnIndex + '></div>';
        }
    }

    // place mines, blanks, and numbers
    setBomb(40, "medium");
}

// hardMode
var loadHardGrid = () => {

    // manipulate size of #main-container
    mainContainer.style.width = "100%";
    mainContainer.style.height = "80%";

    mainGrid.style.height = "95%";
    gameHeading.style.height = "18%";

    // reset grid template. remove existing ".square" divs inside mainGrid
    emptyGrid();
    
     // assign grid style of # x # board
     mainGrid.style.gridTemplate = 
     "repeat(" + levels.hard.x + ", 1fr) / repeat(" + levels.hard.y + ", 1fr)";

 // // add cells inside #main-grid
 for (rowIndex = 0; rowIndex < levels.hard.x; rowIndex++){
    for (columnIndex = 0; columnIndex < levels.hard.y; columnIndex++){
         mainGrid.innerHTML += '<div class="square" id=' + 
             rowIndex + '-' + columnIndex + '></div>';
     }
 }

    // place mines, blanks, and numbers
    setBomb(99, "hard");
    
}


// empty mainGrid so it has no cells
var emptyGrid = () => {
    // reset grid to empty
    gridDisplay = [];

    const removeSquare = document.querySelectorAll(".square");
    removeSquare.forEach((square) =>{
        // .parentNode is parent of current node (here, it's element)
        square.parentNode.removeChild(square);
    });
}

