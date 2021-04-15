// declare global vars
const mainGrid = document.getElementById("main-grid");
// clear grid content
mainGrid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const gameTitles = document.querySelectorAll(".game-titles");
const mainContainer = document.getElementById("main-container");

const gridBombs = document.getElementsByClassName("bombs");
const gridNumbers = document.getElementsByClassName("numbers");

// grid sizes for easy, medium, hard
const levels = {
    easy: {x: 9, y:9},
    medium: {x: 13, y: 15},
    hard: {x: 16, y: 30}
}

// create 2x2 array for easier access in JS
let gridDisplay = [];

// load default easyMode grid
var loadEasyGrid = () => {

    // manipulate shape of game container
    mainContainer.style.width = "40%";
    mainContainer.style.height = "60%";
    
    mainGrid.style.height = "85%";
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
    setBombs(10, "easy");
    setNumbers("easy");

    // assign grid style of # x # board
    mainGrid.style.gridTemplate =
        "repeat(" + levels.easy.x + ", 1fr) / repeat(" + levels.easy.y + ", 1fr)";
    
    // assign gridDisplay into HTML #main-grid
    for (let rowIndex = 0; rowIndex < gridDisplay.length; rowIndex++){
            for (let columnIndex = 0; columnIndex < gridDisplay[0].length; columnIndex++){
                
                if (gridDisplay[rowIndex][columnIndex] != "blank"){
                    // if it's a bomb, add .square div and image of bomb
                    if (gridDisplay[rowIndex][columnIndex] === "bomb"){
                        mainGrid.innerHTML += '<div class="square" id=' + rowIndex + '-' +
                                                columnIndex + '>'+
                                                '<img src="./images/bomb.png" class="images bombs" onclick="clickBomb("easy")">'+
                                                '</div>';
                    }

                    // if it's a number, add .square div and number
                    else {
                        mainGrid.innerHTML += '<div class="square" id=' + rowIndex + '-' + 
                                                columnIndex + '>'+ '<div class="numbers" id="num' +
                                                gridDisplay[rowIndex][columnIndex] + '">' +
                                                gridDisplay[rowIndex][columnIndex] + '</div></div>';
                        // console.log(mainGrid.innerHTML);
                    }

                }

                 // if blank, add only the .square div and class blank
                 else if (gridDisplay[rowIndex][columnIndex] === " "){
                    mainGrid.innerHTML += '<div class="square " id=' + 
                                            rowIndex + '-' + columnIndex + '><div class="blank"></div></div>';
                }
            }
        }

    // set default on images and numbers to visibility:hidden
    // // hide bombs
    // for (counter = 0; counter < gridBombs.length; counter++){
    //     gridBombs[counter].style.visibility = "hidden";
    // };

    // // hide numbers
    // for (counter = 0; counter < gridNumbers.length; counter++){
    //     gridNumbers[counter].style.visibility = "hidden";
    // };

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
            console.log("initial " + rowIndex + " " + columnIndex + " " +
                gridDisplay[rowIndex][columnIndex])

            
            // if square is a bomb, move to next square
            if (gridDisplay[rowIndex][columnIndex] === "bomb"){
                // exit this run, and continue to next columnIndex
                continue column;
            }

            let counter = 0;

            // count bombs directly above
            if (!(rowIndex - 1 < 0) && gridDisplay[rowIndex - 1][columnIndex] === "bomb"){
                counter++;
            }

            // below square
            if (!(rowIndex + 1 >= rowLength) && gridDisplay[rowIndex + 1][columnIndex] === "bomb"){
                console.log("add row " + gridDisplay[rowIndex + 1][columnIndex])
                counter++;
            }

            // count bombs to the left
            if (!(columnIndex - 1 < 0) && gridDisplay[rowIndex][columnIndex - 1] === "bomb"){
                console.log("minus column " + gridDisplay[rowIndex][columnIndex - 1])
                counter++;
            }

            // right of square
            if (!(columnIndex + 1 >= columnLength) && gridDisplay[rowIndex][columnIndex + 1]
                    === "bomb"){
                        
                console.log("add column " + gridDisplay[rowIndex][columnIndex + 1])
                counter++;
            }

            // count bombs in the top left
            if (!(rowIndex - 1 < 0) && !(columnIndex - 1 < 0) && gridDisplay[rowIndex - 1][columnIndex - 1] 
                    === "bomb"){

                console.log("minus row, minus column " + gridDisplay[rowIndex - 1][columnIndex - 1])
                counter++;
            }

            // top right
            if (!(rowIndex - 1 < 0) && !(columnIndex + 1 >= columnLength) && 
                    gridDisplay[rowIndex - 1][columnIndex + 1] === "bomb"){

                console.log("minus row, add column " + gridDisplay[rowIndex - 1][columnIndex + 1])
                counter++;
            }

            // count bombs in bottom left
            if (!(rowIndex + 1 >= rowLength) && !(columnIndex - 1 < 0) && 
                    gridDisplay[rowIndex + 1][columnIndex - 1] === "bomb"){

                console.log("add row, minus column " + gridDisplay[rowIndex + 1][columnIndex - 1])
                counter++;
            }

            // bottom right
            if (!(rowIndex + 1 >= rowLength) && !(columnIndex + 1 >= columnLength) && 
                    gridDisplay[rowIndex + 1][columnIndex + 1] === "bomb"){

                console.log("add row, add column " + gridDisplay[rowIndex + 1][columnIndex + 1])
                counter++;
            }

            if (counter > 0){
                gridDisplay[rowIndex][columnIndex] = counter;
                console.log(counter);
            }
            console.log("final " + gridDisplay[rowIndex][columnIndex]);
        }
    }

}


// click on square
// if it's a number, only expose that number
// if it's blank, expose everything until numbers are reached
// if bomb, game over. change square color to red. expose the entire board.

var clickBomb = (difficulty) => {
    const rowLength = levels[difficulty].x;
    const columnLength = levels[difficulty].y;

    const gridSquare = document.querySelectorAll(".square");
    
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++){
        for (let columnIndex = 0; columnIndex < columnLength; columnIndex++){
            if (gridDisplay[rowIndex][columnIndex] === "bomb"){
                let squareID = document.getElementById(rowIndex + '-' + columnIndex);
                squareID.style.backgroundColor = "red";

            }
        }
    }
}



























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

