
var boardList;
var levelSelected='levelOne';
var gameType;
const player="O";
var secondPlayer;
var currPlayer;
var isTwoMode;
var whoWon;
var isReplay;
var isnameEntered=false;
const player2="X";
const computer="X";
var Currcell;
var Player1Name;
var isCompete=false;
var Player2Name;
var displayBestTime;
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

$(function(){
    // Validation for the name fields
    $('#submitName').on('click',function(){
        if($('#Player1Name').val()!=""){
           
            if(gameType=="againstPlayer"){
                if($('#Player2Name').val()!=""){
                    Player1Name=$('#Player1Name').val();
                    Player2Name=$('#Player2Name').val();
                    isnameEntered=true;
                    Replay();
                    $('#submitName').css({
                        display:'none'
                    });
                   
                }else{
                    alert("Enter the name(s) to play!!");
                }
            }else{
                Player1Name=$('#Player1Name').val();
                isnameEntered=true;
                Replay();
                $('#submitName').css({
                    display:'none'
                });
            }
        }else{
            alert("Enter the name(s) to play!!");
        }
    });

    //On click event for Main menu options
$('.chooseType button').on('click',function(){
gameType=$(this).attr('id');
hideMainMenuOptions();
$('.options button').on('click',function(){
    if($(this).attr('id')=="restartGame"){
    restartGame();
    }else{
        displayMainMenuOptions();
    }
});

//if dual player mode selected
if(gameType=="againstPlayer"){
   $('.nameInput').css({
       display:'block'
   });
   $('#Player2Name').css({
    display:'inline-block'
});
$('#restartGame').css({
    display:'block',
});
    currPlayer=player;
   isTwoMode=true;
   secondPlayer=player2;
   restartGame();
}
// if Play against computer or Compete mode is selected 
else{
    $('.nameInput').css({
        display:'block'
    });
    $('#Player2Name').css({
        display:'none',
    });
    $(".row1").css({
        display:'block',
    });
    $('#restartGame').css({
        display:'block',
    });
    isTwoMode=false;
    currPlayer=player;
    secondPlayer=computer;
    restartGame();
}
});

//To display main menu options
function displayMainMenuOptions(){
    $(".chooseGame").css({
        display:'block',
    });
    $('.options').css({
        display:'none',
    });
    $(".row1").css({
        display:'none',
    });
    $("#TTT_Board").css({
        display:'none',
    });
    $(".endgame").css({
        display:'none',
    });
    $(".clock_container").css({
        display:'none',
    });
    $('.nameInput').css({
        display:'none'
    });    
}

//To hide main menu options when a particular mode is clicked
function hideMainMenuOptions(){
    $(".chooseGame").css({
        display:'none',
    });
    $('.options').css({
        display:'block',
    });
    $('#TTT_Board').css({
        display:'block',
    });
    $(".clock_container").css({
        display:'block',
    });
}

//To handle clicks of levels for AI mode and compete mode
    $('.column input').on('click',function (){
        levelSelected=$(this).attr('id');
        // $(".row1 input").css({
        //     'background-color':'white'
        // });
        // $(this).css({
        //     'background-color':'red'
        // });
        resetTimer();
        isReplay=false;
        checkNameEntered();
       });
});

//To replay with the same username
function Replay(){
    resetTimer();
    isReplay=true;
       checkNameEntered();
   }

//To restart the game in the same mode but with different username   
function restartGame(){
    resetTimer();
    $('#submitName').css({
        display:'inline-block'
    });
    $('#Player1Name').val('');
    $('#Player2Name').val('');
    Player1Name=null;
    Player2Name=null;
    isnameEntered=false;
    isReplay=false;
    levelSelected='levelOne';
    $(".row1 button").css({
        'background-color':'white'
    });
    $('#levelOne').css({
        'background-color':'black'
    });
    $(".cell").each(function(i){
        $(".cell")[i].removeEventListener('click',cellClick,false);});
    checkNameEntered();
}

//To check if the player has enterd the name before starting the game
function checkNameEntered(){
    startGame();
    if(isnameEntered){
        beginPlaying();
    }
}

//Re-initialise everything
function startGame(){
displayBestTime=null;
    $(".endgame").css({
        display:'none',
    });
    isCompete=false;
    if(gameType=="compete"){
        isCompete=true;
        $('#restartGame').css({
            display:'none',
        });
    }
    boardList=Array.from(Array(9).keys());
    $(".cell").each(function(i){
        $(".cell")[i].innerHTML='';
         $(this).css({
            'background-color':'white',
        });
    });   
   
   
}

// Start playing
function beginPlaying(){
    $(".cell").each(function(i){
        $(".cell")[i].addEventListener('click',cellClick,false);
    });
    if(whoWon=="Computer"&&isTwoMode==false&&isReplay==true){
        startTimer();
        gameTurn(bestMove(),computer);   
}   
}

//When a particula cell in the TTT board is clicked
function cellClick(cell){
   if(typeof boardList[cell.target.id]=='number'){
    Currcell=cell.target.id;
    if(emptycells().length==9){
        startTimer();
    }
    gameTurn(cell.target.id,currPlayer);
   if(($(".endgame").css('display')=='none')){
    if(!checkDraw()){
        if($(".endgame").css('display')=='none'){
            if(isTwoMode){
                if(currPlayer==player){
                    currPlayer=secondPlayer;
                }else{
                    currPlayer=player;
                } 
            }else{
                gameTurn(bestMove(),computer);
                if(emptycells().length==0&&($(".endgame").css('display')=='none')){
                    checkDraw();
                }
                
            }  
        }
    }
   } 
   }  
}

//Place the cell token
function gameTurn(cellID,player){
    boardList[cellID]=player;
    $('#'+cellID).html(player);
    let gameWon=checkWin(boardList,player);
    if(gameWon) gameOver(gameWon)
}

//Check if the player has won
function checkWin(board,player){
    let gameWon=null;
    for(var i in toWinList){
    if(boardList[toWinList[i][0]]==player&&boardList[toWinList[i][1]]==player&&boardList[toWinList[i][2]]==player){
        gameWon={player:player,winCells:toWinList[i]}
    }
    }
    return gameWon;
}

//Check if game is over
function gameOver(gameWon){
    for(var i in gameWon.winCells){
        $('#'+gameWon.winCells[i]).css({
            'background-color':gameWon.player==player?"black":"black"
        });   
    }
    $(".cell").each(function(i){
        $(".cell")[i].removeEventListener('click',cellClick,false);});
        var currWin;
        if(isTwoMode){
            currWin=gameWon.player==player?Player1Name+"Wins":Player2Name+" Wins";
        }else{
            currWin=gameWon.player==player?"You win":"You Lost";  
            whoWon=gameWon.player==player?"Player":"Computer";       
        }
        displayWinner(currWin,gameWon);
}

//Store the data if compete mode
function storeWinner(winnerName,gameWn){
        var isBest=false;
        var currWinner;
        if(gameWn.player==player){
            currWinner={
                Name:Player1Name,
                min:m,
                sec:s,
                millis:ms,
            };;
        }else{
             currWinner={
                Name:Player2Name,
                min:m,
                sec:s,
                millis:ms,
            };
        }
       
        var winnersList=[];
        
        if(JSON.parse(localStorage.getItem("Winner"))){
            winnersList = JSON.parse(localStorage.getItem("Winner"));
        }
       
  
      for(var i=0;i<winnersList.length;i++){
        if(winnersList[i].Name==currWinner.Name){
            var time=winnersList[i];  
            if(checkBestTime(time,currWinner)){        
                  isBest=true;
                    var sec=currWinner.sec<10?"0"+currWinner.sec:currWinner.sec; 
                    var min=currWinner.min<10?"0"+currWinner.min:currWinner.min; 
                    var milli=currWinner.millis<10?"0"+currWinner.millis:currWinner.millis; 
                  displayBestTime=min+":"+sec+":"+milli;
                  winnersList[i]=currWinner;
              }else{
                var sec=time.sec<10?"0"+time.sec:time.sec; 
                var min=time.min<10?"0"+time.min:time.min; 
                var milli=time.millis<10?"0"+time.millis:time.millis; 
              displayBestTime=min+":"+sec+":"+milli;
              }
          }
          console.log("[" + i + "]: " + winnersList[i].Name);
      }
      if(!isBest){
        var sec=currWinner.sec<10?"0"+currWinner.sec:currWinner.sec; 
        var min=currWinner.min<10?"0"+currWinner.min:currWinner.min; 
        var milli=currWinner.millis<10?"0"+currWinner.millis:currWinner.millis; 
      displayBestTime=min+":"+sec+":"+milli;
          if(winnersList.length!=0){
            winnersList[winnersList.length]=currWinner;
          }else{
              winnersList[0]=currWinner;
            
          }
          
      }
      localStorage.setItem("Winner", JSON.stringify(winnersList));
     
}

//Check if it is the best time of the user
function checkBestTime(BestTime,currWinner){
if(BestTime.min>=currWinner.min){
    if(BestTime.sec>=currWinner.sec){
        if(BestTime.millis>currWinner.millis){
            return true;
        }
    }
}
return false;
}

//Function to decide the move of the computer
function bestMove(){
    if(levelSelected=="levelOne"){
       
        return getRandomCell();
    }
    else{
        return minimax();
    }
   
}

//Function to obtain possible cell if levelone
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

//Get a random cell for level one
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

//Check if the game is draw
function checkDraw(){
    console.log("checkdraw called");
    if(emptycells().length==0){
        $(".cell").each(function(i){
            $(this).css({
                'background-color':'black',
            });
            $(".cell")[i].removeEventListener('click',cellClick,false);});
                displayWinner('Tie');
                return true;
        }
            return false;
}

//Display the result
function displayWinner(winner,gameWon){
    pauseTimer();
    if((winner!='Tie'&&winner!="You Lost")&&isCompete==true){
        storeWinner(winner,gameWon);
    }
    $('.endgame').css({
        display:'block'
    });
    $('.endgame button').css({
        display:'inline-block'
    });
    
  
    if(displayBestTime!=null){
        $('.endgame .text').html(winner+ "<br> Best Time:"+displayBestTime);
    }
    else{
        $('.endgame .text').html(winner);   
    }
    if(gameType=="compete"){
        $('.endgame button').css({
            display:'none'
        });
        
        setTimeout(function(){  location.reload();
        }, 5000);
    }
    }

//Function to obtain the computer move if levelselected=2,3,4     
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

//timer
var s=0,m=0,ms=0;
var timer;
function startTimer(){
if(!timer){
    timer=setInterval(run,10);
} 
}
function run(){   
    var sec=s<10?"0"+s:s; 
    var min=m<10?"0"+m:m; 
    var milli=ms<10?"0"+ms:ms; 
$('#seconds').html(sec);
$('#minutes').html(min);
$('#millis').html(milli);
ms++;
if(ms==100){
    ms=0;
    s++;
}
if(s==60){
    s=0;
    m++;
}
if(m>60){
    alert("Time Over!!");
    Replay();
}
}

function pauseTimer(){
    clearInterval(timer);
    timer=false;
}

function resetTimer(){
    clearInterval(timer);
    timer=false;
    m=0;ms=0;s=0;
    var sec=s<10?"0"+s:s; 
    var min=m<10?"0"+m:m; 
    var milli=ms<10?"0"+ms:ms; 
$('#seconds').html(sec);
$('#minutes').html(min);
$('#millis').html(milli);
}

