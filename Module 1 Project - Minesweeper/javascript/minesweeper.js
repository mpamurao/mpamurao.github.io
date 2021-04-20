// declare global vars
const mainContainer = document.getElementById("main-container");
const gameHeading = document.getElementById("game-heading");
const flagContainer = document.getElementById("flag-container");
const refreshIcon = document.getElementById("refresh-icon");
const faces = document.getElementsByClassName("faces");
const timerContainer = document.getElementById("timer-container");

const mainGrid = document.getElementById("main-grid");


// .getElementsByClassName = obtain HTML Collection for live data that will 
// take into account changes in HTML,
// such as when using .innerHTML to add divs
const gridSquare = document.getElementsByClassName(".square");

// .querySelector = obtain NodeList which gives static data that exists when called
//  provides array-like list so can use .forEach function on .square class
let squares;
let flagCounter;

const gridBombs = document.getElementsByClassName("bomb-square");
const gridFlags = document.getElementsByClassName("flag-square");
const gridNumbers = document.getElementsByClassName("numbers");
const gridBlanks = document.getElementsByClassName("blank");

// grid sizes for easy, medium, hard
const levels = {
    easy: {x: 8, y:8, bombs:10},
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
let timer;
let gameStart;


// load default easyMode grid
const loadEasyGrid = () => {

    gameLevel = easy;
    flagCounter = levels.easy.bombs;

    // reset game grid to initial state
    resetGrid();

    // create array grid and link to HTML
    createGrid(easy);

    // manipulate shape of game container
    
    // outer container for grid+game heading
    mainContainer.style.width = "25%";
    mainContainer.style.height = "50%";


    // container for flag-container+smile+timer
    gameHeading.style.width = "100%";
    gameHeading.style.height = "15%";
    gameHeading.style.padding = "2% 4% 1% 4%";

    flagContainer.style.padding = "1.5%";
    flagContainer.style.fontSize = "2vw";
    
    timerContainer.style.padding = "1.5%";
    timerContainer.style.fontSize = "2vw";

    refreshIcon.style.width = "50%";
    refreshIcon.style.height = "100%";

    // smileyface images
    console.log(faces);
    for (i = 0; i < faces.length; i++){
        console.log(faces[i])
        faces[i].style.fontSize= "1.8vw";
        faces[i].style.width = "100%";
        faces[i].style.height = "100%";

        // hide worried and dead face
        faces[1].style.display = "none";
        faces[2].style.display = "none";

    }
    

    // container for squares
    mainGrid.style.width = "100%";
    mainGrid.style.height = "100%";
    mainGrid.style.padding = "3%";
    
    // individual squares
    // for (i = 0; i < gridSquare.length; i++){
    //     gridSquare[i].style.width = "100%";
    //     gridSquare[i].style.height = "100%";
    // }
    
    // containers for bombs, flags, and numbers
    for (i = 0; i < gridBombs.length; i++){
        gridBombs[i].style.width = "90%";
        gridBombs[i].style.height = "90%";
    }

    for (i = 0; i < gridFlags.length; i++){
        gridFlags[i].style.width = "100%";
        gridFlags[i].style.height = "100%";
    }

    for (i = 0; i < gridNumbers.length; i++){
        gridNumbers[i].style.fontSize = "1.5vw";
        gridNumbers[i].style.padding = "10%";
    }








    // make numbers, bombs, and flags display:none
    hideSquares();

    // add eventListeners to squares
    squareEvents();

    // click on smile icon to reload grid;
    refreshIcon.addEventListener("click", () => {
        if (gameLevel === easy){
            loadEasyGrid();
        }
    });
}



// mediumMode


// hardMode



// reset mainGrid so it has no cells
const resetGrid = () => {

    // reset flag count, smile and timer
    flagContainer.innerHTML = flagCounter;
    timerContainer.innerHTML = "000";

    // hide worried and dead face
    console.log(faces)
    for (i = 0; i < faces.length; i++){
        faces[0].style.display = "block";
        faces[1].style.display = "none";
        faces[2].style.display = "none";
    }

    // reset game statuses
    gameOver = "";
    gameCounter = 0;
    gameStart = false;
    clearInterval(timer);

    // reset grid to empty
    gridDisplay = [];

    const removeSquare = document.querySelectorAll(".square");
    removeSquare.forEach((square) =>{
        // .parentNode is parent of current node (here, it's element)
        square.parentNode.removeChild(square);
    });
}

const createGrid = (difficulty) => {

    // set smileys - happy, worried, dead
    refreshIcon.innerHTML = '<button class="faces">&#128516</button>'+
                                '<button class="faces">&#128534</button>' +
                                '<button class="faces">&#128128</button>'
                                

    let bombs = levels[difficulty].bombs;

    // insert gridColumn into gridDisplay so it's  [[column], [column], ...]
    for (let rowIndex = 0; rowIndex < levels[difficulty].x; rowIndex++){
        const gridColumn = [];

        for (let columnIndex = 0; columnIndex < levels[difficulty].y; columnIndex++){
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
    setBombs(bombs, easy);
    setNumbers(easy);

    // assign grid style of # x # board
    mainGrid.style.gridTemplate =
    "repeat(" + levels[difficulty].x + ", 1fr) / repeat(" + levels[difficulty].y + ", 1fr)";

    // assign gridDisplay into HTML #main-grid
    for (let rowIndex = 0; rowIndex < gridDisplay.length; rowIndex++){
        for (let columnIndex = 0; columnIndex < gridDisplay[0].length; columnIndex++){
        
            // if it's a bomb, add .square div and image of bomb
            if (gridDisplay[rowIndex][columnIndex].bomb){
                mainGrid.innerHTML += `<div class="square active" id=${rowIndex}-${columnIndex}>` + 
                                            `<div class="bomb-square">`+
                                                `<img src="./images/bomb.png" alt="bomb" class="bombs"></div>` +
                                            `<div class="flag-square">` +
                                                `<img src="./images/flag.png" alt="flag" class="flags"></div>` +
                                        `</div>`;
            }

            // if it's a number, add .square div and number
            else if (gridDisplay[rowIndex][columnIndex].number) {
                mainGrid.innerHTML += `<div class="square active" id=${rowIndex}-${columnIndex}>` + 
                                            `<div class="numbers num${gridDisplay[rowIndex][columnIndex].number}">` +
                                                gridDisplay[rowIndex][columnIndex].number + `</div>` +
                                            `<div class="flag-square">` +
                                                `<img src="./images/flag.png" alt="flag" class="flags"></div>` +
                                        `</div>`;
                // console.log(mainGrid.innerHTML);
            }

            // if blank, add only the .square div and class blank
            else {
                mainGrid.innerHTML += `<div class="square active" id=${rowIndex}-${columnIndex}>` +
                                            `<div class="blank"></div>` +
                                            `<div class="flag-square">` +
                                                `<img src="./images/flag.png" alt="flag" class="flags"></div>` +
                                        `</div>`;
            }
        }
    }
}


// set default on images and numbers to display:none
const hideSquares = () => {

    // hide bombs
    for (counter = 0; counter < gridBombs.length; counter++){
        gridBombs[counter].style.display = "none";
    }

     // hide flags
     for (counter = 0; counter < gridFlags.length; counter++){
        gridFlags[counter].style.display = "none"; 
    }

    // hide numbers
    for (counter = 0; counter < gridNumbers.length; counter++){
        gridNumbers[counter].style.display = "none";
    }

    // hide blanks
    for (counter = 0; counter < gridBlanks.length; counter++){
        gridBlanks[counter].style.display = "none";
    }
}

const squareEvents = () => {

    // define squares to get updated NodeList after 
    // grid is created and attached to HTML
    squares = document.querySelectorAll(".square");

    // unhide numbers and bombs - hidden elements cannot be directly clicked on
    // so have to start by clicking on square
    // loop through each square and when clicked, do function on hidden elements
    squares.forEach((square, index) => {

        square.addEventListener("mousedown", worried(square));
        square.addEventListener("mouseup", smiling(square));
        
        // .addEventListener takes in an event called click, 
        // and also calls the function generateClickFunctions()
        // generateClickFunctions() acts as a container for all the function listeners 
        // one of the listeners will activate when "click" if it meets conditions
        square.addEventListener("click", generateClickFunctions(square));
        
        square.addEventListener("contextmenu", rightClickFlag(square));

    });
}

// when clicking on smiling icon listener functions
const worried = (square) => {

    const smileWorried = () => {
        // if game over has a value, exit function. don't make things clickable
        if (gameOver === "winner" || gameOver === "loser"){
            return;
        }
        
        for (i = 0; i < faces.length; i++){
            faces[0].style.display = "none";
            faces[1].style.display = "block";
            faces[2].style.display = "none";
        };
    }

    return smileWorried;
}


const smiling = (square) => {

    const smileSmile = () => {
        // if game over has a value, exit function. don't make things clickable
        if (gameOver === "winner" || gameOver === "loser"){
            return;
        }
                
        for (i = 0; i < faces.length; i++){
            faces[0].style.display = "block";
            faces[1].style.display = "none";
            faces[2].style.display = "none";
        }
    }

    return smileSmile;
}



// places bombs in grid
const setBombs = (bombs, difficulty) => {

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


// place numbers in grid
const setNumbers = (difficulty) => {
  
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




// listener to right click squares and show flag
const rightClickFlag = (square) => {

    const showFlag = (e) => {

        // dont show context menu pop up
        e.preventDefault();

        let flagNode = square.childNodes[1];
        let childNode = square.childNodes[0];
        console.log(childNode)

        // show flag and add class .showing
        if (!(flagNode.className.includes("showing"))){

            // if no flags available or if square is already visible, don't show more flags
            if (flagCounter === 0 || childNode.style.display === "flex" || childNode.style.display === "block"){
                return;
            }


            flagNode.style.display = "flex";
            flagNode.classList.add("showing");
            flagCounter--;
            flagContainer.innerHTML = flagCounter;
        }

        // hide flag and remove class .showing
        else {
            flagNode.style.display = "none";
            flagCounter++;
            flagNode.classList.remove("showing");
            flagContainer.innerHTML = flagCounter;
        } 

        if (!(gameStart)){
            startTimer();
            gameStart = true;
        }
    }

    return showFlag;
}


// generateClickFunctions takes in a square
// when square is clicked, the function listener inside generateClickFunctions will be called 
const generateClickFunctions = (square) => () => {

    // if game over has a value, exit function. don't make things clickable
    if (gameOver === "winner" || gameOver === "loser"){
        return;
    }

    childNode = square.childNodes[0];

    // if the element tag inside square is a bomb, call clickBomb()
    if (childNode.className.includes("bomb-square")){

        // pass in argument of <class=bomb-square> tag
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


// if bomb, game over. change square color to red. expose the entire board.
const clickBomb = (redBomb) => {

    // redBomb is square.childNode[index]

    // if flag is already visible, don't click to view bomb
    if (redBomb.parentNode.childNodes[1].style.display === "flex"){
        return;
    }
    
    // make all squares visible
    squares.forEach((square) => {
        // specify childNode[0] for the bomb div
        // without having to loop through list of nodes
        childNode0 = square.childNodes[0];
        childNode1 = square.childNodes[1];

        // make bombs, blanks, and numbers visible. change background to dark gray
        childNode0.style.display = "flex";
        childNode0.parentNode.style.backgroundColor = "rgb(160, 160, 160)";

        // hide flags
        childNode1.style.display = "none";
        
        // remove box shadow
        square.style.boxShadow = "none";

        // remove active class to get rid of highlight mousedown effect
        square.classList.remove("active");
    });
    
    // make the clicked bomb red
    redBomb.parentNode.style.backgroundColor = "red";

    // state game over
    gameOver = "loser";
    gameStatus(gameOver);
}


// display squares as they're focused
const clickVisible = (number, difficulty) => {

    // if flag is already visible, don't click to view bomb
    if (number.parentNode.childNodes[1].style.display === "flex"){
        return;
    }

    // console.log(number);
    // make the current square visible and remove formatting
    number.style.display = "block";
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
        if (!(gameStart)){
            startTimer();
            gameStart = true;
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


// if it's blank, expose square by calling clickVisible. expose blanks and numbers. don't reveal bombs
const clickBlank = (blank, difficulty) => {

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
        if (focusedChild.className === "bomb-square"){
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


// timer functions
const startTimer = () => {
    
    // if timer is false, don't run
    // get the initial time
    startTime = Date.now();

    // timer = ID for setInterval. use this ID to stop timer
    // every 1s, call updateTime
    timer = setInterval(updateTime, 1000);
}


const updateTime = () => {

    currentTime = Date.now();

    // console.log(startTime, currentTime);
    
    // time that has gone by in seconds
    elapsedTime = parseInt((currentTime - startTime) / 1000);
        
        // show elapsed time
    if (elapsedTime < 10){
        timerContainer.innerHTML = "00" + elapsedTime;
    }
    
    else if (elapsedTime < 100){
        timerContainer.innerHTML = "0" + elapsedTime;
    }

    // max the time out at 999 seconds
    else if (elapsedTime > 999) {
        timerContainer.innerHTML = "999";
    }

    else{
        timerContainer.innerHTML = elapsedTime;
    }
}


// once game is over, set the board to final display
const gameStatus = (input) => {

    squares = document.querySelectorAll(".square");

    // change hidden bombs to visible flag images
    if (input === "winner"){
        refreshIcon.innerHTML = '<button class="faces">&#128526</button>';

        squares.forEach((square) => {
            
            childNode0 = square.childNodes[0];
            childNode1 = square.childNodes[1];
            console.log(childNode0, childNode1)

            if (childNode0.className === "bomb-square"){
                childNode1.style.display = "block";
                childNode0.style.display = "none";
            }

            else {
                childNode0.style.display = "block";
            }
                
            square.classList.remove("active");
        });
    }

    if (input === "loser"){
        // show dead smiley
        for (i = 0; i < faces.length; i++){
            faces[0].style.display = "none";
            faces[1].style.display = "none";
            faces[2].style.display = "block";
        }
    }

    // turn off timer, stop repeating it
    clearInterval(timer);
    return;
}