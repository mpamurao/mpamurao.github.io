# mpamurao.github.io
Per Scholas Bootcamp Projects

Project 1 - Minesweeper

A README.md file with a link to the live site, explanations of the technologies used, the approach taken,, installation instructions, unsolved problems, etc.

Github Pages: https://mpamurao.github.io/

Created HTML, CSS, and Javascript files to build the Minesweeper game.

HTML:
1. created divs for the top-heading-container which includes the title "MINESWEEPER" and divs that can be clicked on to load the easy, 		medium, or hard grids
	
2. created a main-body div which holds the main-container. the main-container shows the Minesweeper board using JS

CSS:
created CSS attributes for all the divs that are initialized in the HTML and the ones that are dynamically created in JS

JavaScript Layout:
1. declared all the global variables that obtain elements from the HTML, an object called "levels" for the different difficulties, and variables used to know when the game has started and time it
2. declared level of difficulties in an object called "levels"
3. default grid to be loaded is loadEasyGrid. this will call various functions to reset the grid so there are no bombs/blanks/numbers yet, generate a new grid using an array and linking it to the HTML, and format the grid to hide the bombs/blanks/numbers and add event listeners

4. squareEvents contains .addEventListeners for:
mousedown - if click down with mouse, the smiley face will change to worried
mouseup - after letting go of mouse click down, the smiley face will revert back to happy
contextmenu - right click on a square to show/hide a flag on the square

click events - click on a square, and depending on if it's a bomb/blank/number, then it will do a function. following click functions are:

1. clickBomb - if bomb is clicked, game is over and board is exposed. click on the smiley face or a difficulty button to start a new game

2. clickVisible - make the square visible. this will happen immediately if it's a number. for a blank, it will be called inside the clickBlank function

3. clickBlank - stores squares inside an array. the array starts with the focused square, which is shifted out of the array and made visible. for this index, the neighboring squares will be looked at and added to the array if it meets conditions. this is in a while loop, so the next element will become the focused index, and its neighbors will be added to the array. once the array no longer has squares, the loop ends.

timer starts on the first click. once the game is over, clearInterval is called. once a bomb is clicked (loser) or the board is cleared minus the bombs (winner), the game is over. the final display of the board is setup using the function gameStatus().


Unsolved problems:

for the larger grids (Medium and Hard), it takes longer to load the game and could freeze the browser temporarily. this is probably due to inefficiencies in the code. 

the more times the game is reset using the smiley icon, the longer it takes to load.