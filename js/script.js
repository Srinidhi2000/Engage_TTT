var boardList;
var levelSelected='levelOne';
const player="O";
const computer="X";
var Currcell;
const toWinList=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[6,4,2]
];
var isSelected="Medium";
window.onload=function(){
    startGame();
}
$(function(){
    $('.column button').on('click',function (){
        levelSelected=$(this).attr('id');
        $(".row button").css({
            'background-color':'white'
        });
        $(this).css({
            'background-color':'red'
        });
        startGame();
       });
       
});
function startGame(){
    $(".endgame").css({
        display:'none',
    });
    boardList=Array.from(Array(9).keys());
    $(".cell").each(function(i){
        $(".cell")[i].innerHTML='';
         $(this).css({
            'background-color':'white',
        })
    $(".cell")[i].addEventListener('click',cellClick,false);    
    });   
}

function cellClick(cell){
   if(typeof boardList[cell.target.id]=='number'){
    Currcell=cell.target.id;
    gameTurn(cell.target.id,player);
    if(!checkDraw()){
        if($(".endgame").css('display')=='none'){
            gameTurn(bestMove(),computer);
        }
       
    }
   }  
}
function gameTurn(cellID,player){
    boardList[cellID]=player;
    $('#'+cellID).html(player);
    let gameWon=checkWin(boardList,player);
    if(gameWon) gameOver(gameWon)
}

function checkWin(board,player){
    let gameWon=null;
    for(var i in toWinList){
    if(boardList[toWinList[i][0]]==player&&boardList[toWinList[i][1]]==player&&boardList[toWinList[i][2]]==player){
        gameWon={player:player,winCells:toWinList[i]}
    }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(var i in gameWon.winCells){
        $('#'+gameWon.winCells[i]).css({
            'background-color':gameWon.player==player?"blue":"green"
        });   
    }
    $(".cell").each(function(i){
        $(".cell")[i].removeEventListener('click',cellClick,false);});
        var currWin=gameWon.player==player?"You win":"You Lost";
        displayWinner(currWin);
}

function bestMove(){
    if(levelSelected=="levelOne"){
       
        return getRandomCell();
    }
    else{
        return minimax();
    }
   
}

function getRandomCell(){
    var indexEmptyCells=[];
    for(var i=0;i<9;i++){
        if(i!=Currcell){
            if(boardList[i]!="X"&&boardList[i]!="O"){
                indexEmptyCells.push(i);
        }
        }
    }
    console.log(indexEmptyCells);
    var maxIndex=Math.max(...indexEmptyCells);
    var minIndex=Math.min(...indexEmptyCells);
  var randomCell=getRandomNum(maxIndex,minIndex,indexEmptyCells);
  console.log("final value="+randomCell);
    return randomCell;
}

function getRandomNum(max,min,indexEmptyCells){
    var cnt=0;
    var randomCell;
    var randomNum= Math.floor(
        Math.random() * (max+1 - min) + min
      );
      console.log("random="+randomNum);
    for(var m=0;m<indexEmptyCells.length;m++){
        if(randomNum==indexEmptyCells[m]){
           randomCell=randomNum;
           cnt=cnt+1;
           break;
        } 
    }    
    if(cnt==0){
        console.log('called again');
        randomCell=getRandomNum(max,min,indexEmptyCells);
    }   
      return randomCell;
}
function emptycells(){
    return boardList.filter(s=>typeof s=='number');
}

function checkDraw(){
    if(emptycells().length==0){
        $(".cell").each(function(i){
            $(this).css({
                'background-color':'yellow',
            });
            $(".cell")[i].removeEventListener('click',cellClick,false);});
                displayWinner('Tie');
                return true;
        }
            return false;
}

function displayWinner(winner){
    $('.endgame').css({
        display:'block'
    });
    $('.endgame .text').html(winner);
}

function minimax(){
   var val=1000;
   var x,temp;
   for(var i=0;i<boardList.length;i++){
       if(boardList[i]!="X"&&boardList[i]!="O"){
           temp=boardList[i];
           boardList[i]="X";
           var move=maxsearch(0);

           if(move<val){
               val=move;
               x=i;
           }
           boardList[i]=temp;
       }
   } 
  
   return x;
}
function maxsearch(depth){
var score;
var temp;
var emptycellList=emptycells(boardList);
     if(checkWin(boardList,player)){
        score=10;
        return score+depth;
     }
     else if(checkWin(boardList,computer)){
       score=-10;
        return score-depth;
     }else if(emptycellList.length==0){
         return score=0;
     }
     score=-1000;

     if(levelSelected=='levelTwo'&&depth<1||levelSelected=='levelThree'&&depth<2||levelSelected=='levelFour'){
    for(var i=0;i<boardList.length;i++){
        if(boardList[i]!="X"&&boardList[i]!="O"){
            temp=boardList[i];
            boardList[i]="O";
           score=Math.max(score,minsearch(depth+1));
         
           boardList[i]=temp;
        }
     }
}
     return score;
}
function minsearch(depth){
    var score;
var temp;
var emptycellList=emptycells(boardList);
     if(checkWin(boardList,player)){
        score=10;
        return score;
     }
     else if(checkWin(boardList,computer)){
       score=-10;
        return score;
     }else if(emptycellList.length==0){
         return score=0;
     }
     score=1000;
     for(var i=0;i<boardList.length;i++){
        if(boardList[i]!="X"&&boardList[i]!="O"){
         temp=boardList[i];
            boardList[i]="X";
           score=Math.min(score,maxsearch(depth+1));
           boardList[i]=temp;
        }
     }
   
     return score;
}

