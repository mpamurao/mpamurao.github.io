// declare global vars
const grid = document.getElementById("main-grid");
grid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const mineContainer = document.getElementById("flag-container");
const refreshIcon = document.getElementById("refresh-icon");
const timerContainer = document.getElementById("timer-container");
const mainContainer = document.getElementById("main-container");
const mainGrid = document.getElementById("main-grid");


// load default easyMode grid
var loadEasyGrid = () => {
    // specify overflow effect on body
    document.body.style.overflow = "hidden";

    // manipulate size of #main-container
    mainContainer.style.width = "40%";
    mainContainer.style.height = "50%";
    
    // // reset grid template to empty. remove existing ".square" divs inside mainGrid
    emptyGrid();

    // manipulate grid columns+rows
     mainGrid.style.gridTemplate = "repeat(9, 1fr) / repeat(9, 1fr)";

    // add 80 cells inside #main-grid 9x9
    for (let counter = 0; counter < 81; counter++){
        grid.innerHTML += '<div class="square" id="square-'+counter+'"></div>';
        // console.log(grid)
    }

    // setGrid(10);
    
}

// set number of mines in mineCounter
// 
// for each cell, determine if it's empty, number, or mine

// if it's empty, expose all adjacentEmptyCells until it hits a number

// if it's a mine: 
// mineCounter - 1
// set adjacentMines++ for each adjacent cell
// (rowIndex - 1, rowIndex + 1, columnIndex +)

// var setGrid = (mines) => {
//     let mineCounter = mines;

//     for 
// }





























// mediumMode
var loadMediumGrid = () => {

    // add scroll effect on body
    document.body.style.overflow = "scroll";

    // manipulate size of #main-container
    mainContainer.style.width = "80%";
    mainContainer.style.height = "80%";
    
    
    // reset grid template. remove existing ".square" divs inside mainGrid
    emptyGrid();
    
    // manipulate grid columns+rows
    mainGrid.style.gridTemplate = "repeat(14, 1fr) / repeat(18, 1fr)";
    
    // add # of grid cells 14x18
    for (let counter = 0; counter < 252; counter++){
        grid.innerHTML += '<div class="square" id="square-'+counter+'"></div>';
    }
}

// hardMode
var loadHardGrid = () => {
    // add scroll effect on body
    document.body.style.overflow = "scroll";

    // manipulate size of #main-container
    mainContainer.style.width = "100%";
    mainContainer.style.height = "90%";
    console.log(mainGrid);

    // reset grid template. remove existing ".square" divs inside mainGrid
    emptyGrid();
    
    // manipulate grid columns+rows
    mainGrid.style.gridTemplate = "repeat(20, 1fr) / repeat(24, 1fr)";
    
    
    // add # of grid cells 24x20
    for (let counter = 0; counter < 480; counter++){
        grid.innerHTML += '<div class="square" id="square-'+counter+'"></div>';
    }
    
}


// empty mainGrid so it has no cells
var emptyGrid = () => {
    const removeSquare = document.querySelectorAll(".square");
    removeSquare.forEach((square) =>{
        // .parentNode is parent of current node (here, it's element)
        square.parentNode.removeChild(square);
    })
}

