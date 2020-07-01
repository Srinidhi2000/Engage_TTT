var board;
var ai = 'x';
const user = 'o';
var win_pattern = [[0,3,6],	[1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];

var squares=document.querySelectorAll(".cell");

function click(cellId, turn){
	board[cellId]=turn;
	document.getElementById(cellId).innerText = turn;
	let result = win(board,turn);
	if(result)
	over(result); 
}
function clickOn(cell)
{
	if(typeof board[cell.target.id] == 'number'){
	click(cell.target.id,user);
	if(!tie()&&!win(board,user))
		click(bestMove(),ai);
}
}
function restart(){
	output(" ");
	board = [0,1,2,3,4,5,6,7,8,9];
	for (var i=0; i<squares.length; i++)
	{
		squares[i].innerText='';
		squares[i].addEventListener('click',clickOn,false);
	}
}


restart();

function empty(){
	return board.filter(c => typeof c == 'number');
}

function win(newBoard, turn)
{
	let filled = newBoard.reduce((accumulater,element,index)=>(element===turn)?accumulater.concat(index):accumulater,[]);
	let result = null;
	for (let [i,outcome] of win_pattern.entries()) {
		if(outcome.every(e => filled.indexOf(e)> -1)){
			result = {i: i,turn: turn};
			break;
		}
	}
	return result;
}
function over(result){
	for(var i=0;i<squares.length;i++){
		squares[i].removeEventListener('click',clickOn,false);
	}
	output(result.turn == user ? "WON":"LOST");
}

function bestMove(){
	return minimax(board, ai).index;
}

function tie()
{
	if(empty().length === 0){
		for(var i=0;i<squares.length;i++)
			{squares[i].removeEventListener('click',clickOn,false);}
		output("TIE");
		return true;
	}
	return false;
}

function output(winner)
{
	document.querySelector(".WINNER").innerText = winner;
}

function minimax(newBoard, turn){
	var emptySpots = empty();
	if(win(newBoard, turn)){
		return {mark: -10};
	} else if (win(newBoard,ai)){
		return {mark: 10};
	} else if(emptySpots.length === 0 ) {
		return {mark: 0};
	}
	var plays = [];
	for(var i=0;i<emptySpots.length;i++){
		var play = {};
		play.index = newBoard[emptySpots[i]];
		newBoard[emptySpots[i]] = turn;

		if(turn === ai){
			var outcome = minimax(newBoard,user);
			play.mark = outcome.mark;
			newBoard[emptySpots[i]] = play.index;
			plays.push(play);
			if(play.mark===10)
				return play;
		}
		else{
			var outcome = minimax(newBoard,ai);
			play.mark = outcome.mark;
			newBoard[emptySpots[i]] = play.index;
			plays.push(play);
			if(play.mark===-10)
				return play;
		}
		
	}
	var bestSpot;
	if(turn === ai){
		var bestMark = -10000;
		for(var i=0;i<plays.length;i++){
			if(plays[i].mark>bestMark){
				bestMark = plays[i].mark;
				bestSpot = i;
			}
		}
	} else{
		var bestMark = 10000;
		for(var i=0;i<plays.length;i++){
			if(plays[i].mark<bestMark){
				bestMark = plays[i].mark;
				bestSpot = i;
			}
		}
	}
	return plays[bestSpot];
}
