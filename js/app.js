

// accessing all round squares to further change the colors
var roundSquares = document.querySelectorAll(".round");
// connecting to new game button
var newGameBtn = document.getElementById("newGameBtn");
// assinging hard mode button
var hardMode = document.getElementById("hardMode");
// assigning easy mode button
var easyMode = document.getElementById("easyMode");
// accessing the display to show correct or wrong
var displayResText = document.getElementById("displayResText");
// accessing header to change its background color
var headerDiv = document.getElementById("headerDiv");
// accessing the RGB color to be found by player
var rgbName = document.getElementById("rgbName");
// creating all the middle variables
var numSquares;
var colorsArray;
var mode;
var winColorCode;

// changing the name RGB to actual color code in header
rgbName.textContent = winColorCode;
// adding an event to the newGame button to create a new game
newGameBtn.addEventListener("click", newGame);
// adding easy mode new game to the easymode button
easyMode.addEventListener("click", easyModeFunc);
// adding hard mode new game to the hardmode button
hardMode.addEventListener("click", hardModeFunc);
// making a valid "rgb(123, 123, 123)" form to be able to assign colors
function randomColorGenerate() {
    var rgbList = [];
    for (i = 0; i < 3; i++) {
        var number = Math.floor(Math.random() * 256);
        rgbList.push(number);
    }
    return "rgb(" + rgbList[0] + ", " + rgbList[1] + ", " + rgbList[2] + ")";
}
// deciding on if the mode is hard or easy so either 6 or 3 colors to show
function modeDetect() {
    var numSquares;
    mode === "hard" ? numSquares = 6 : numSquares = 3;
    return numSquares;
}
// generating 3 or 6 colors array depending on the mode
function arrayGenerate() {
    var allColorsArray = [];
    for (j = 0; j < numSquares; j++) {
        var generatedColor = randomColorGenerate();
        allColorsArray.push(generatedColor);
    }
    return allColorsArray;
}
// choosing one of 6 or 3 generated colors array to be found by player
function winChoose() {
    var uniqNumber = Math.floor(Math.random() * colorsArray.length);
    return colorsArray[uniqNumber];
}
// Making all the squares invisible before assigning colors to them
function resetColorsToInvis() {
    for (i = 0; i < roundSquares.length; i++) {
        roundSquares[i].style.display = "none";
    }
}
// assigning randomly generated colors to the squares
function changingColors() {
    for (var i = 0; i < colorsArray.length; i++) {
        roundSquares[i].style.display = "inline-block";
        roundSquares[i].style.backgroundColor = colorsArray[i];
    }
    return roundSquares;
}
// creating a new game function
function newGame() {
    // set the color of display text to default
    displayResText.classList.remove("rightAnswer");
    // change the message in display to default
    displayResText.textContent = "GUESS?";
    // change the header color to default
    headerDiv.style.backgroundColor = "lightblue";
    // finding which mode we are playing easy or hard
    numSquares = modeDetect();
    // generating 6 or 3 random colors to pick from
    colorsArray = arrayGenerate();
    // resetting all the colors to the invisible color
    resetColorsToInvis();
    // changing all colors from invis to the previously generated array
    roundSquares = changingColors();
    // picking randomly one color from that array to be the correct color
    winColorCode = winChoose();
    // assigning the code of that correct color to the header RGB code
    rgbName.textContent = winColorCode;
    // making all squares clickable by player
    makeClickable();
}
// creating a new easy game with 3 colors to pick from
function easyModeFunc() {
    hardMode.classList.remove("selected");
    easyMode.classList.add("selected");
    mode = "easy";
    newGame();
}
// creating a new hard game with 6 colors to pick from
function hardModeFunc() {
    easyMode.classList.remove("selected");
    hardMode.classList.add("selected");
    mode = "hard";
    newGame();
}
// making all the squares clickable by player
function makeClickable() {
    for (i = 0; i < roundSquares.length; i++) {
        // adding a click event to each square
        roundSquares[i].addEventListener("click", clickSquares);
        // adding the scale and border on hover
        roundSquares[i].classList.add("hovered");
    }
}
// making all the squares unclickable by player
function makeUnclickable() {
    for (i = 0; i < roundSquares.length; i++) {
        // removing a click event from each square
        roundSquares[i].removeEventListener("click", clickSquares);
        // removing the scale and border on hover
        roundSquares[i].classList.remove("hovered");
    }
}
// changing all the squares to the color of the winning square when the player finds it
function changeAllToWin() {
    for (i = 0; i < colorsArray.length; i++) {
        roundSquares[i].style.backgroundColor = winColorCode;
    }
    // changing the header background to the winning color
    headerDiv.style.backgroundColor = winColorCode;
    // displaying the Correct message
    displayResText.textContent = "CORRECT!";
}
// making changes when the player clicks any square
function clickSquares() {
    var pickedColor = this.style.backgroundColor;
    if (pickedColor === winColorCode) {
        // making all squares have the winningcolor
        changeAllToWin();
        // making all squares unclickable when the player wins
        makeUnclickable();
        // set the display text to green as right
        displayResText.classList.add("rightAnswer");
    } else {
        // making a wrong square disappear when clicked
        this.style.backgroundColor = "transparent";
        // removing a hover effect from a wrong clicked square
        this.classList.remove("hovered");
        // not letting a player to keep clicking on the already clicked square
        this.removeEventListener("click", clickSquares);
        // showing the result of a wrong click to the display
        displayResText.textContent = "TRY AGAIN!";
        // set the display text to red as wrong
        displayResText.classList.add("wrongAnswer");
        setTimeout(function () {
            displayResText.classList.remove("wrongAnswer");
        }, 400);
    }
}
// assigning a hard mode to be the initial mode
hardModeFunc();
// creating a new game
newGame();
