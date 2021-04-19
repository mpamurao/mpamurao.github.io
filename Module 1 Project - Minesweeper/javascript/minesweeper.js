// declare global vars
const mainGrid = document.getElementById("main-grid");
// clear grid content
// mainGrid.innerHTML = '';

const gameHeading = document.getElementById("game-heading");
const gameTitles = document.querySelectorAll(".game-titles");
const smile = document.getElementById("refresh-icon");
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
    easy: {x: 9, y:9, bombs:10},
    medium: {x: 13, y: 15, bombs:40},
    hard: {x: 16, y: 30, bombs:99}
}

const easy = "easy";
const medium = "medium";
const hard = "hard";

let gameLevel;

// create 2x2 array for easier access in JS
let gridDisplay = [];

// state winner or loser if counter = all squares are clicked minus bombs
let gameOver;
let gameCounter = 0;

// declare global val of timer
let startTime;
let timer;




// load default easyMode grid
var loadEasyGrid = () => {

    let gameLevel = easy;


    // manipulate shape of game container
    mainContainer.style.width = "40%";
    mainContainer.style.height = "63%";
    
    // smile.innerHTML = '<button class="faces"><img src="./images/test.png" alt="smiley" id="smiley"></button>'
    smile.innerHTML = '<button class="faces">&#128516</button>'
    // smile.addEventListener("click", )
    console.log(smile)

    mainGrid.style.height = "90%";
    mainGrid.style.width = "100%";
    gameHeading.style.height = "15%";

    // reset grid template to empty. remove existing ".square" divs inside mainGrid
    emptyGrid();

    // reset gameOver to empty
    gameOver = "";
    gameCounter = 0;
    startTime = 0;

    // insert gridColumn into gridDisplay so it's  [[column], [column], ...]
    for (let rowIndex = 0; rowIndex < levels.easy.x; rowIndex++){
        const gridColumn = [];

        for (let columnIndex = 0; columnIndex < levels.easy.y; columnIndex++){
            // default to blank squares

            let squareStatus = {
                x: rowIndex,
                y: columnIndex,
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
            
                // if it's a bomb, add .square div and image of bomb
                if (gridDisplay[rowIndex][columnIndex].bomb){
                    mainGrid.innerHTML += `<div class="square active" id=${rowIndex}-${columnIndex}>` + 
                                                `<div class="bomb-button">`+
                                                `<img src="./images/bomb.png" alt="bomb" class="images bombs"></div></div>`;
                }

                // if it's a number, add .square div and number
                else if (gridDisplay[rowIndex][columnIndex].number) {
                    mainGrid.innerHTML += `<div class="square active" id=${rowIndex}-${columnIndex}>` + 
                                                `<div class="numbers num${gridDisplay[rowIndex][columnIndex].number}">` +
                                                gridDisplay[rowIndex][columnIndex].number + '</div></div>';
                    // console.log(mainGrid.innerHTML);
                }

                 // if blank, add only the .square div and class blank
                 else {

                    mainGrid.innerHTML += `<div class="square active" id=${rowIndex}-${columnIndex}>` +
                                                `<div class="blank"></div></div>`;
                    
                }
            }
        }

    // set default on images and numbers to visibility:hidden
    // hide bombs
    for (counter = 0; counter < gridBombs.length; counter++){
        gridBombs[counter].style.visibility = "hidden";
    };

    // hide numbers
    for (counter = 0; counter < gridNumbers.length; counter++){
        gridNumbers[counter].style.visibility = "hidden";
        
    };

    // define squares to get updated NodeList after 
    // grid is created and attached to HTML
    squares = document.querySelectorAll(".square");

    // unhide numbers and bombs - hidden elements cannot be directly clicked on
    // so have to start by clicking on square
    // loop through each square and when clicked, do function on hidden elements
    squares.forEach((square, index) => {

        // .addEventListener takes in an event called click, 
        // and also calls the function generateClickFunctions()
        // generateClickFunctions() acts as a container for all the function listeners 
        // one of the listeners will activate when "click" if it meets conditions
        square.addEventListener("click", generateClickFunctions(square));
        square.addEventListener("mousedown", worried(square));
        square.addEventListener("mouseup", smiling(square));
    });

    // click on smile icon to reload grid;
    smile.addEventListener("click", () => {
        if (gameLevel === easy){
            loadEasyGrid();
        }
    })

}


const worried = (square) => {
    const smileWorried = () => {
        if (gameOver !== "loser"){
           smile.innerHTML = '<button class="faces">&#128534</button>';
        }
    }

    return smileWorried;
}

const smiling = (square) => {
    const smileSmile = () => {
        if (gameOver !== "loser"){
           smile.innerHTML = '<button class="faces">&#128516</button>';
        }
    }

    return smileSmile;
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

// generateClickFunctions takes in a square
// when square is clicked, the function listener inside generateClickFunctions will be called 
var generateClickFunctions = (square) => () => {

    // if game over has a value, exit function. don't make things clickable
    if (gameOver === "winner" || gameOver === "loser"){
        return;
    }

    // childNodes are the elements inside <div class="square"> tag
    // loop through each childNode (only one per square so not really necessary)
    for (index = 0; index < square.childNodes.length; index++){
        // console.log(square.childNodes[index].classList)

        childNode = square.childNodes[index];

        // if the element tag inside square is a bomb, call clickBomb()
        if (childNode.className.includes("bomb-button")){

            // pass in argument of <class=bomb-button> tag
            clickBomb(childNode);
        }
        
        else if (childNode.className.includes("numbers")){
            // console.log(childNode);
            clickVisible(childNode, easy);
        }

        else{
            // console.log(childNode);
            clickBlank(childNode, easy);
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
        // there's only one element inside square, so can specify childNode[0]
        // without having to loop through list of nodes
        childNode = square.childNodes[0]
        
        // make bombs, blanks, and numbers visible. change background to dark gray
        childNode.style.visibility = "visible";
        childNode.style.backgroundColor = "rgb(160, 160, 160)";
        
        // remove box shadow
        square.style.boxShadow = "none";

        // remove active class to get rid of highlight mousedown effect
        square.classList.remove("active");
    });
    
    // make the clicked bomb red
    redBomb.style.backgroundColor = "red";


    // state game over
    gameOver = "loser";
    gameStatus(gameOver);
}


// expose the square
clickVisible = (number, difficulty) => {
    // console.log(number);
    // make the current square visible and remove formatting
    number.style.visibility = "visible";
    number.style.backgroundColor = "rgb(160, 160, 160)";
    number.parentNode.style.boxShadow = "none";
    number.parentNode.classList.remove("active");

    // get grid coordinates
    const squareId = number.parentNode.id.split("-");

    let rowIndex = parseInt(squareId[0]);
    let columnIndex = parseInt(squareId[1]);

    // make square checked true as it becomes visible
    if (!(gridDisplay[rowIndex][columnIndex].checked)){
        gridDisplay[rowIndex][columnIndex].checked = true;

        // start the timer for first click
        if (gameCounter === 0){
            startTimer(true);
        }

        gameCounter++;
        // console.log(gameCounter);

        // if gameCounter = # of blanks+numbers, winner
        if (gameCounter === levels[difficulty].x * levels[difficulty].y - levels[difficulty].bombs){
            gameOver = "winner";
            gameStatus(gameOver);
        }
    }

}

// if it's blank, expose everything until numbers are reached
var clickBlank = (blank, difficulty) => {
    // declare an array to store all the squares children and need to 
    // check their neighbors until neighbor is bomb or number
    const nodes = [blank];
    const rowLength = levels[difficulty].x;
    const columnLength = levels[difficulty].y;

    // continue loop until nodes array is empty
    while (nodes.length > 0){

         // focusedBlank = declare the square child that is being worked on (first array element)
        // remove it from the array
        let focusedChild = nodes.shift();

        // determine grid coordinates of clicked blank
        const squareId = focusedChild.parentNode.id.split("-");
        let rowIndex = parseInt(squareId[0]);
        let columnIndex = parseInt(squareId[1]);

        // if square is bomb, continue to next item in array. don't format
        if (focusedChild.className === "bomb-button"){
            continue;
        }
        
        // make current square visible and remove formatting
        clickVisible(focusedChild, difficulty);
 
        // if square is numbers, don't push its neighbors into nodes array
        if (focusedChild.className.includes("numbers")){
            continue;
        }

        // declare all neighbors inside gridDisplay
        const neighbors = {
            left: {x: rowIndex, y: columnIndex - 1},
            right: {x: rowIndex, y: columnIndex + 1},
            above: {x: rowIndex - 1, y: columnIndex},
            below: {x: rowIndex + 1, y: columnIndex},
            topLeft: {x: rowIndex - 1, y: columnIndex - 1},
            topRight: {x: rowIndex - 1, y: columnIndex + 1},
            bottomLeft: {x: rowIndex + 1, y: columnIndex - 1},
            bottomRight: {x: rowIndex + 1, y: columnIndex + 1}
        }

        // loop through length of array of keys in neighbors
        keys = Object.keys(neighbors);

        
        for (index = 0; index < keys.length; index++){
            let xIndex = neighbors[keys[index]].x;
            let yIndex = neighbors[keys[index]].y;

            // if the square doesn't exist, move to next neighbor
            if (xIndex < 0 || xIndex >= rowLength || yIndex < 0 || yIndex >= columnLength){
                continue;
            }

            // get square with the corresponding coordinates
            const neighborSquare = document.getElementById(`${xIndex}-${yIndex}`);
            
            // if checked is false, haven't modified it's CSS yet
            if (!(gridDisplay[xIndex][yIndex].checked)){

                // push square child into nodes array
                nodes.push(neighborSquare.childNodes[0]);
            }
            
        }
    }

}

var startTimer = (input) => {
    
    if (!(input)){
        return;
    }
    
    // get the initial time
    startTime = Date.now();
    
    // timer = ID for setInterval. use this ID to stop timer
    // every 1s, call updateTime
    
    timer = setInterval(updateTime, 1000);
}

var updateTime = () => {
    console.log(gameOver)
    if (gameOver === ""){
        currentTime = Date.now();
    }
    // time that has gone by in seconds
    console.log(startTime, currentTime);

    elapsedTime = parseInt((currentTime - startTime) / 1000);

    // show elapsed time
    if (elapsedTime < 10){
        document.getElementById("timer-container").innerHTML = "00" + elapsedTime;
    }
    
    else if (elapsedTime < 100){
        document.getElementById("timer-container").innerHTML = "0" + elapsedTime;
    }

    // max the time out at 999 seconds
    else if (elapsedTime > 999) {
        document.getElementById("timer-container").innerHTML = "999";
    }

    else{
        document.getElementById("timer-container").innerHTML = elapsedTime;
    }
}

var gameStatus = (input) => {
    squares = document.querySelectorAll(".square");

    // change hidden bombs to visible flag images
    if (input === "winner"){
        smile.innerHTML = '<button class="faces">&#128526</button>';

        squares.forEach((square) => {
            console.log(square)
    
            childNode = square.childNodes[0];
            if (childNode.className === "bomb-button"){
                childNode.innerHTML = '<img src="./images/flag.png" alt="flag" class="images flags"></div>'
                childNode.style.visibility = "visible";
                square.classList.remove("active");
            }
        })
    }

    if (input === "loser"){
        smile.innerHTML = '<button class="faces"><img  src="./images/dead.webp" alt="dead smiley" id="dead-smiley"></button>'
        
    }


    // turn off timer, stop repeating it
    startTimer(false);
    clearInterval(timer);
    return;
}




















// mediumMode
var loadMediumGrid = () => {

    let gameLevel = medium;

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

    let gameLevel = hard;

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