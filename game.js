var board;
var ai = 'x';
const user = 'o';
var win_pattern = [[0,3,6],	[1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];

var squares=document.querySelectorAll(".cell");
function restart(){
	board = [0,1,2,3,4,5,6,7,8,9];
	for (var i=0; i<squares.length; i++)
	{
		squares[i].innerText='';
		squares[i].addEventListener('click',clickOn,false);
	}
}

function click(cellId, turn){
	board[cellId]=turn;
	document.getElementById(cellId).innerText = turn;
	let result = winCheck(board,turn);
	if(result)
	over(result); 
}
function clickOn(cell)
{
	click(cell.target.id,user);
}
restart();

function winCheck(newBoard, turn)
{
	let filled = newBoard.reduce((accumulater,element,index)=>(element===turn))?accumulater.concat(index):accumulater,[])
	let result = null;
	for (let [i,outcome] of win_pattern.entries()) {
		if(win.every())
	}
}
