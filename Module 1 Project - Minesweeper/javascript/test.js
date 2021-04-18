squares.forEach((square, index) => {
    square.addEventListener("click", generateClickFunctions(square));

    ("click", () => {})


    console.log(square);

var generateClickFunctions = (square) => {

    const clickFunc = function() {
        console.log(square)
        // exit function. don't make things clickable
        if (gameStatus === "loser"){
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
                clickNumber(childNode);
            }

            else{
                // console.log(childNode);
                clickBlank(childNode, easy);
            }
        }   
    }

    return clickFunc
}

var take2inputs = (a,b, operator) => {
    var add = () => {
        a + b;
    }
    var minus = () => {
        a - b;
    }
    var factorial = () => {
        doFactorial(a,b)
    }


    if (operator === '+' ) return add
    else if operator === '-' return minus
    else if operator === 'factorial' return factorial

   
} 