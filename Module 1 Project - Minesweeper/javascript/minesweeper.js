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

    // create 2x2 array for easier access in JS
    const gridDisplay = [];

    for (rowIndex = 0; rowIndex < levels.easy.x; rowIndex++){
        const gridColumn = [];

        for (columnIndex = 0; columnIndex < levels.easy.y; columnIndex++){
            // default to blank squares
            gridColumn[columnIndex] = "blank"
        }
        // insert gridColumn into gridDisplay so it's  [[column], [column], ...]
        gridDisplay.push(gridColumn);
    }

    // assign grid style of # x # board
    mainGrid.style.gridTemplate =
        "repeat(" + levels.easy.x + ", 1fr) / repeat(" + levels.easy.y + ", 1fr)";
    
    // assign gridDisplay into HTML
    for (rowIndex = 0; rowIndex < gridDisplay.length; rowIndex++){
            for (columnIndex = 0; columnIndex < gridDisplay[0].length; columnIndex++){
                // if blank, add only the .square div
                if (gridDisplay[rowIndex][columnIndex] === "blank"){
                    mainGrid.innerHTML += '<div class="square" id=' + 
                                            rowIndex + '-' + columnIndex + '></div>';
                }

                // if it's a bomb, add .square div and image of bomb
                else if (gridDisplay[rowIndex][columnIndex] === "x"){
                    mainGrid.innerHTML += '<div class="square" id=' + rowIndex + '-' + columnIndex + '>'+
                                            '<img src="./images/bomb.png" class="images bombs" id="bomb">'+
                                            '</div>';
                }
            }
        }

    // place mines, blanks, and numbers
    setBomb(10, "easy");
    
}

var setBomb = (difficulty) => {
    // set number of bombs in mineCounter
    let bombCount = 1;
    console.log("initial " + bombCount);

    const gridSquare = document.getElementsByClassName("square");
    gridSquare.style.visibility = "hidden";
    
    
    // Math.random() returns number between 0 (inclusive) and 1 (exclusive)
    // Math.floor() returns largest integer <= number
    // (Math.random() * (max - min)) + min
    
    // determine bomb location based on x,y coordinates

        
        // gridRow & Column = 0 to [value]. find individual square to set bomb
        let bombLocation = Math.floor(Math.random() * (levels[difficulty].x * levels[difficulty].y));

        // check if bomb already exists in that square
        const squareBomb = document.getElementById('bomb-' + bombLocation);
        
        if (squareBomb){
            bombCount++;
        }

        // // add bomb image to square
        // gridSquare[bombLocation].innerHTML = 
        //     '<img src="./images/bomb.png" class="images bombs" id="bomb-' + bombLocation +'">';

    setNumbers();
}


// set adjacentBombs++ counter for each adjacent cell
// (rowIndex - 1, rowIndex + 1, columnIndex +)
var setNumbers = () => {
    bombs = document.querySelectorAll(".bombs")

    bombsArray = []
    bombs.forEach((bomb) => {
        index = bomb.parentNode.innerHTML.split(/[^(0-9)]\s*/)
        index.forEach((element) => {
            word = element.split("\s,");
            console.log(word)
        })
        // console.log(index)

        bombsArray.push(index);
    })
    console.log(bombsArray)
}


// if it's empty, expose all adjacentEmptyCells until it hits a number



























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

 // // add cells inside #main-grid
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

