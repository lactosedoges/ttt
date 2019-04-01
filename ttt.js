var origBoard;
var huPlayer='O';
var aiPlayer='X';
var turnNum=0;
var winCombos=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];


const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	origBoard = Array.from(Array(9).keys());
	for (var i=0; i<cells.length; i++) {
		cells[i].innerText=' ';
		cells[i].addEventListener('click', turnClick, false);
		document.getElementById(i).style.backgroundColor =	"white";
		declareWinner(" ");
	}
}

function turnClick(sq) {
	console.log(sq.target.id);
	if(turnNum%2===0){
		turn(sq.target.id, huPlayer);
	}else{
		turn(sq.target.id, aiPlayer);
	}
	turnNum++;
}

function turn(sqId, player) {
	origBoard[sqId] = player;
	document.getElementById(sqId).innerText = player;
	cells[sqId].removeEventListener('click', turnClick, false);
	let gameWon = checkWin(origBoard, player);
	if (gameWon){
		gameOver(gameWon);
	}
}

// Passing different version of the board
function checkWin(board, player) {
  // Go through every element of the board that's already played in
  // Reduce goes through all and do something
  // a - accumulator empty array e - element i - index
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    console.log(plays);

    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
    // Has the player played in every spot that counts as a win
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            console.log(gameWon);
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "O wins!" : "X wins!");
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}