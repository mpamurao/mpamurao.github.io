// declare global vars
const grid = document.getElementById("main-grid");
// clear grid content
grid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const gameTitles = document.querySelectorAll(".game-titles");
const mainContainer = document.getElementById("main-container");
const mainGrid = document.getElementById("main-grid");

// declare grid sizes for easy, medium, hard
gridRow = [9, 13, 16]
gridColumn = [9, 15, 30]


// load default easyMode grid
var loadEasyGrid = () => {

    // manipulate shape of game container
    mainContainer.style.width = "30%";
    mainContainer.style.height = "45%";
    
    mainGrid.style.height = "85%";
    gameHeading.style.height = "15%";

    // // reset grid template to empty. remove existing ".square" divs inside mainGrid
    emptyGrid();

    // manipulate grid columns+rows
     mainGrid.style.gridTemplate = "repeat(" + gridRow[0] + ", 1fr) / repeat(" + gridColumn[0] + ", 1fr)";

    // add cells inside #main-grid
    for (let counter = 0; counter < gridRow[0]*gridColumn[0]; counter++){
        grid.innerHTML += '<div class="square" id="square-' + counter + '"></div>';
        // console.log(grid)
    }
    // place mines, blanks, and numbers
    setBombs(81);
    
}

var setBombs = (bombs) => {
    // set number of bombs in mineCounter
    let bombCounter = bombs;
    const gridSquare = document.getElementsByClassName("square");
    // gridSquare.style.visibility = "hidden";
        
    // Math.random() returns number between 0 (inclusive) and 1 (exclusive)
    // Math.floor() returns integer
    // (Math.random() * (max - min)) + min

    // determine bomb location based on x,y coordinates

    while (bombCounter >= 0){
        // gridRow = 0 to [value] -> add 1 to get make random() to include [value]
        let bombLocation = Math.floor(Math.random() * (gridRow[0] * gridColumn[0]));

        console.log(bombLocation);

        gridSquare[bombLocation].innerHTML = '<img src="./images/bomb.png" class="images" id="bomb-' + bombLocation + '">';
        console.log(gridSquare[bombLocation]);
        
        bombCounter--;
        console.log(bombCounter);
    }


}


// if it's empty, expose all adjacentEmptyCells until it hits a number

// if it's a mine: 
// mineCounter - 1
// set adjacentBombs++ counter for each adjacent cell
// (rowIndex - 1, rowIndex + 1, columnIndex +)





























// mediumMode
var loadMediumGrid = () => {

    // manipulate size of #main-container
    mainContainer.style.width = "60%";
    mainContainer.style.height = "70%";

    mainGrid.style.height = "85%";
    gameHeading.style.height = "15%";
    
    // reset grid template. remove existing ".square" divs inside mainGrid
    emptyGrid();
    
    // manipulate grid columns+rows
     mainGrid.style.gridTemplate = "repeat(" + gridRow[1] + ", 1fr) / repeat(" + gridColumn[1] + ", 1fr)";
    
    // add # of grid cells
    for (let counter = 0; counter < gridRow[1] * gridColumn[1]; counter++){
        grid.innerHTML += '<div class="square" id="square-' + counter + '"></div>';
    }

    // place mines, blanks, and numbers
    setBombs(40);
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
    
    // manipulate grid columns+rows
    mainGrid.style.gridTemplate = "repeat(" + gridRow[2] + ", 1fr) / repeat(" + gridColumn[2] + ", 1fr)";
    
    
    // add # of grid cells 24x20
    for (let counter = 0; counter < gridRow[2] * gridColumn[2]; counter++){
        grid.innerHTML += '<div class="square" id="square-' + counter + '"></div>';
    }

    // place mines, blanks, and numbers
    setBombs(99);
    
}


// empty mainGrid so it has no cells
var emptyGrid = () => {
    const removeSquare = document.querySelectorAll(".square");
    removeSquare.forEach((square) =>{
        // .parentNode is parent of current node (here, it's element)
        square.parentNode.removeChild(square);
    })
}

