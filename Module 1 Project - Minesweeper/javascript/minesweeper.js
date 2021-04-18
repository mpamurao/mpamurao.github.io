// declare global vars
const mainGrid = document.getElementById("main-grid");
// clear grid content
// mainGrid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const gameTitles = document.querySelectorAll(".game-titles");
const mainContainer = document.getElementById("main-container");

// .getElementsByClassName = obtain HTML Collection for live data that will 
// take into account changes in HTML,
// such as when using .innerHTML to add divs
const gridSquare = document.getElementsByClassName(".square");
// .querySelector = obtain NodeList which gives static data that exists when called
//  provides array-like list so can use .forEach function on .square class
let squares;

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

// state winner or loser
let gameStatus;

// load default easyMode grid
var loadEasyGrid = () => {
    // manipulate shape of game container
    mainContainer.style.width = "40%";
    mainContainer.style.height = "60%";
    
    mainGrid.style.height = "90%";
    gameHeading.style.height = "15%";

    // reset grid template to empty. remove existing ".square" divs inside mainGrid
    emptyGrid();

    // reset gameStatus to empty
    gameStatus = "";

    // insert gridColumn into gridDisplay so it's  [[column], [column], ...]
    for (let rowIndex = 0; rowIndex < levels.easy.x; rowIndex++){
        const gridColumn = [];

        for (let columnIndex = 0; columnIndex < levels.easy.y; columnIndex++){
            // default to blank squares

            let squareStatus = {
                bomb: false,
                number: false,
                checked: false,
                flag: false
            }
            gridColumn[columnIndex] = squareStatus;
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
                console.log(gridDisplay[rowIndex][columnIndex])

                // if it's a bomb, add .square div and image of bomb
                if (gridDisplay[rowIndex][columnIndex].bomb){
                    mainGrid.innerHTML += '<div class="square active bomb-button" id=' + rowIndex + '-' +
                                            columnIndex + '>'+
                                            '<img src="./images/bomb.png" class="images bombs">'+ '</div>';
                    
                                            console.log(document.getElementsByClassName("square").classList)
                }

                // if it's a number, add .square div and number
                else if (gridDisplay[rowIndex][columnIndex].number) {
                    mainGrid.innerHTML += '<div class="square active numbers num' +
                                            gridDisplay[rowIndex][columnIndex].number + 
                                            '" id=' + rowIndex + '-' + columnIndex + '>' +
                                            gridDisplay[rowIndex][columnIndex].number + '</div>';
                    // console.log(mainGrid.innerHTML);
                }

                 // if blank, add only the .square div and class blank
                 else {
                    mainGrid.innerHTML += '<div class="square active blank" id=' + 
                                            rowIndex + '-' + columnIndex + '></div>';
                }
            }
        }

    // set default on images and numbers to visibility:hidden
    // hide bombs
    for (counter = 0; counter < gridBombs.length; counter++){
        // gridBombs[counter].style.visibility = "hidden";
    };

    // hide numbers
    for (counter = 0; counter < gridNumbers.length; counter++){
        // gridNumbers[counter].style.visibility = "hidden";
        
    };

    // define squares to get updated NodeList after grid
    // is created and attached to HTML
    squares = document.querySelectorAll(".square");

    // unhide numbers and bombs - hidden elements cannot be directly clicked on
    // so have to start by clicking on square
    // loop through each square and when clicked, do function on hidden elements
    squares.forEach((square, index) => {
        console.log(squares[index].classList);
        square.addEventListener("click", function() {
            // exit function. don't make things clickable
            if (gameStatus === "loser"){
                return;
            }
            // childNodes are the elements inside <div class="square"> tag
    

            // if the element tag inside square is a bomb, call clickBomb()
            if (this.className.includes("bomb-button")){
                console.log(this)
                // pass in argument of <class=bomb-button> tag
                clickBomb(this);
            }
            
            else if (this.className.includes("numbers")){
                // console.log(this.childNodes[index])
                clickNumber(this);
            }

            else{
                // console.log(this.childNodes[index]);
                clickBlank(this, easy);
            }
       


        });
    });
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
        if (square.bomb){
            bombCount++;
        }

        gridDisplay[rowBomb][columnBomb].bomb = true;
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
            if (gridDisplay[rowIndex][columnIndex].bomb){
                continue column;
            }

            let counter = 0;

            // count bombs directly above
            if (!(rowIndex - 1 < 0) && gridDisplay[rowIndex - 1][columnIndex].bomb){
                counter++;
            }

            // below square
            if (!(rowIndex + 1 >= rowLength) && gridDisplay[rowIndex + 1][columnIndex].bomb){
                counter++;
            }

            // count bombs to the left
            if (!(columnIndex - 1 < 0) && gridDisplay[rowIndex][columnIndex - 1].bomb){
                counter++;
            }

            // right of square
            if (!(columnIndex + 1 >= columnLength) && gridDisplay[rowIndex][columnIndex + 1].bomb){
                counter++;
            }

            // count bombs in the top left
            if (!(rowIndex - 1 < 0) && !(columnIndex - 1 < 0) && 
                    gridDisplay[rowIndex - 1][columnIndex - 1] .bomb){
                counter++;
            }

            // top right
            if (!(rowIndex - 1 < 0) && !(columnIndex + 1 >= columnLength) && 
                    gridDisplay[rowIndex - 1][columnIndex + 1].bomb){
                counter++;
            }

            // count bombs in bottom left
            if (!(rowIndex + 1 >= rowLength) && !(columnIndex - 1 < 0) && 
                    gridDisplay[rowIndex + 1][columnIndex - 1].bomb){
                counter++;
            }

            // bottom right
            if (!(rowIndex + 1 >= rowLength) && !(columnIndex + 1 >= columnLength) && 
                    gridDisplay[rowIndex + 1][columnIndex + 1].bomb){
                counter++;
            }

            if (counter > 0){
                gridDisplay[rowIndex][columnIndex].number = counter;
                // console.log(counter);
            }
        }
    }

}


// click on square
// right click to make a flag

// if bomb, game over. change square color to red. expose the entire board.
var clickBomb = (redBomb) => {
    // redBomb = square.childNode[index]
    
    // make all squares visible
    squares.forEach((square) => {
        
        // make bombs, blanks, and numbers visible. change background to dark gray
        square.style.visibility = "visible";
        square.style.backgroundColor = "rgb(160, 160, 160)";
        
        // remove box shadow
        square.style.boxShadow = "none";

        // remove active class to get rid of highlight mousedown effect
        square.classList.remove("active");
    });
    
    // make the clicked bomb red
    redBomb.style.backgroundColor = "red";


    // state game over
    gameStatus = "loser";

}


// if it's a number, only expose that number
clickNumber = (number) => {
    console.log(number);
    // make the current square visible and remove formatting
    number.style.visibility = "visible";
    number.style.backgroundColor = "rgb(160, 160, 160)";
    number.style.boxShadow = "none";
    number.classList.remove("active");

}

// if it's blank, expose everything until numbers are reached
var clickBlank = (blank, difficulty) => {
    // make background darker when clicked
    blank.style.backgroundColor = "rgb(160, 160, 160)";
    // obtain the .square div tag
    let clickedSquare = blank.parentNode;
    clickedSquare.style.boxShadow = "none";

    const index = clickedSquare.id.split("-");
    const rowIndex = index[0];
    const columnIndex = index[1];
    const gridSquare = gridDisplay[rowIndex][columnIndex];
    
    // gridSquare is now checked and visible
    gridSquare.checked = true;

    // declare an array to store all the squares that need to check 
    // their neighbors until neighbor is bomb or number
    const nodes = [];

    let checkNode = nodes[0];
    
    left = rowIndex + "-" + (columnIndex - 1)
    console.log(left)
        
    // check left
    if (!(gridDisplay[rowIndex][columnIndex - 1].checked)){

        gridDisplay[rowIndex][columnIndex - 1].checked = true;
    
        squareLeft = document.getElementById(left);
        nodes.push(squareLeft);
        
        // format the square via clickNumber function
        clickNumber(squareLeft);
    
    }


     








        




            // left, right, above, below, top left, top right, bottom left, bottom right
        //     squareNeighbors = [squares[index - 1].childNodes[0], squares[index + 1].childNodes[0],
        //                         squares[index - 8].childNodes[0], squares[index + 8].childNodes[0],
        //                         squares[index - 9].childNodes[0], squares[index - 7].childNodes[0],
        //                         squares[index + 7].childNodes[0], squares[index + 9].childNodes[0]]

        //     console.log(squareNeighbors);
        //     for (neighbor = 0; neighbor < squareNeighbors.length; neighbor++){
        //         if (!(squares[index + 1] >= squares.length) && squareNeighbors[neighbor] !== "bomb"){
        //             squareNeighbors[neighbor].style.backgroundColor = "rgb(160, 160, 160)";
        //             squareNeighbors[neighbor].style.visibility = "visible";
        //             squareNeighbors[neighbor].parentNode.style.boxShadow = "none";

        //         }
        //     }            
        // }


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