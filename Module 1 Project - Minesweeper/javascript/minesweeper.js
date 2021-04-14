// declare global vars
const mainGrid = document.getElementById("main-grid");
// clear grid content
mainGrid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const gameTitles = document.querySelectorAll(".game-titles");
const mainContainer = document.getElementById("main-container");

// grid sizes for easy, medium, hard
const levels = {
    easy: {x: 9, y:9},
    medium: {x: 13, y: 15},
    hard: {x: 16, y: 30}
}

// load default easyMode grid
var loadEasyGrid = () => {

    // manipulate shape of game container
    mainContainer.style.width = "30%";
    mainContainer.style.height = "45%";
    
    mainGrid.style.height = "85%";
    gameHeading.style.height = "15%";

    // reset grid template to empty. remove existing ".square" divs inside mainGrid
    emptyGrid();

    // const gridDisplay = [];

    // for (rowIndex = 0; rowIndex < levels.easy.x; rowIndex++){
    //     const gridColumn = [];

    //     for (columnIndex = 0; columnIndex < levels.easy.y; columnIndex++){
    //         gridColumn.push('<div class="square" id=' + 
    //             rowIndex + '-' + columnIndex + '></div>');
    //     }

    //     gridDisplay.push(gridColumn);
    // }
    // console.log(gridDisplay.length, gridDisplay[0].length);


    // assign grid style of # x # board
    mainGrid.style.gridTemplate = 
        "repeat(" + levels.easy.x + ", 1fr) / repeat(" + levels.easy.y + ", 1fr)";

    // // add cells inside #main-grid
    for (rowIndex = 0; rowIndex < levels.easy.x; rowIndex++){
       for (columnIndex = 0; columnIndex < levels.easy.y; columnIndex++){
            mainGrid.innerHTML += '<div class="square" id=' + 
                rowIndex + '-' + columnIndex + '></div>';
        }
    }

    // place mines, blanks, and numbers
    setBombs(10, "easy");
    
}

var setBombs = (bombs, difficulty) => {
    // set number of bombs in mineCounter
    let bombCount = bombs;
    console.log("initial " + bombCount);
    const gridSquare = document.getElementsByClassName("square");
    // gridSquare.style.visibility = "hidden";
    
    
    // Math.random() returns number between 0 (inclusive) and 1 (exclusive)
    // Math.floor() returns largest integer <= number
    // (Math.random() * (max - min)) + min
    
    // determine bomb location based on x,y coordinates
    while (bombCount > 0){
        
        // gridRow & Column = 0 to [value]. find individual square to set bomb
        let bombLocation = Math.floor(Math.random() * (levels[difficulty].x * levels[difficulty].y));
        console.log(bombLocation);

        // check if bomb already exists in that square
        const squareBomb = document.getElementById('bomb-' + bombLocation);
        
        if (squareBomb){
            bombCount++;
        }

        // add bomb image to square
        gridSquare[bombLocation].innerHTML = 
            '<img src="./images/bomb.png" class="images" id="bomb-' + bombLocation +'">';
        bombCount--;
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
    mainContainer.style.width = "65%";
    mainContainer.style.height = "75%";

    mainGrid.style.height = "80%";
    gameHeading.style.height = "20%";
    
    // reset grid template. remove existing ".square" divs inside mainGrid
    emptyGrid();
    
    // assign grid style of # x # board
    mainGrid.style.gridTemplate = 
        "repeat(" + levels.medium.x + ", 1fr) / repeat(" + levels.medium.y + ", 1fr)";

    // add cells inside #main-grid
    for (rowIndex = 0; rowIndex < levels.medium.x; rowIndex++){
       for (columnIndex = 0; columnIndex < levels.medium.y; columnIndex++){
            mainGrid.innerHTML += '<div class="square" id=' + 
                rowIndex + '-' + columnIndex + '></div>';
        }
    }

    // place mines, blanks, and numbers
    setBombs(40, "medium");
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

    // add cells inside #main-grid
    for (rowIndex = 0; rowIndex < levels.hard.x; rowIndex++){
        for (columnIndex = 0; columnIndex < levels.hard.y; columnIndex++){
            mainGrid.innerHTML += '<div class="square" id=' + 
                rowIndex + '-' + columnIndex + '></div>';
        }
 }

    // place mines, blanks, and numbers
    setBombs(99, "hard");
    
}


// empty mainGrid so it has no cells
var emptyGrid = () => {
    const removeSquare = document.querySelectorAll(".square");
    removeSquare.forEach((square) =>{
        // .parentNode is parent of current node (here, it's element)
        square.parentNode.removeChild(square);
    });
}

