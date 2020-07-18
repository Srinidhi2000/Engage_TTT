var boardList;
var levelSelected='levelOne';
var gameType;
const player="O";
var secondPlayer;
var currPlayer;
var isTwoMode;
var whoWon;
var isReplay;
var isSpin=true;
var isnameEntered=false;
const player2="X";
const computer="X";
var Currcell;
var Player1Name;
var PlayerList=[];
var isCompete=false;
var Player2Name;
var hintNum=0;
var hintA=0;
var currWin;
var hintB=0;
var pointsScored=100;
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
    $('#spinButton').on('click',function(){
        $("#container").css({
            display:'none'
        });
      //  $("#spinWheel").load("spinningWheel.html"); 
      $('#SpinCircle').css({
          display:'flex'
      })
    });
   
  });
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
$('.options button').on('click',function(){
    if($(this).attr('id')=="restartGame"){
    restartGame();
    }else if($(this).attr('id')=="mainMenu"){
        displayMainMenuOptions();
    }else{
        //hint
        hintNum++;
        console.log("hint pressed");
        var currmove=(currPlayer=='X'?'O':'X');
        if(currPlayer=='X'){
            if(hintA<=1){
                hintA++;
                console.log("player"+currmove);
                var cellID=minimax(currPlayer);
                $('#'+cellID).html(currPlayer);
                    setTimeout(function(){  $('#'+cellID).html('');
                    }, 1000);
            }else{
                alert("You have already used the two hints");
            }
           
        }else if(currPlayer=='O'){
            if(hintB<=1){
                hintB++;
                console.log("player"+currmove);
                var cellID=minimax(currPlayer);
                $('#'+cellID).html(currPlayer);
                    setTimeout(function(){  $('#'+cellID).html('');
                    }, 1000);
            }else{
                alert("You have already used the two hints");
            }  
        }
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
    $('#hint').css({
        display:'none',
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
      
        isReplay=false;
        whoWon=player;
       
        checkNameEntered();
          resetTimer();
       });
});

//To replay with the same username
function Replay(){
   $('#mainMenu').css({
       display:'block'
   });
   $('.column').css({
display:'block'
   });
    isReplay=true;
    if(currWin=="You win"){
        storeWinner();
    }

    resetTimer();
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
    //isSpin=true;
    levelSelected='levelOne';
    $(".row1 button").css({
        'background-color':'white'
    });
    $('#levelOne').css({
        'background-color':'black'
    });
    $('#hint').css({
        display:'none'
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
isSpin=true;

pointsScored=-1;
    $(".endgame").css({
        display:'none',
    });
    $('#spinButton').css({
        display:'none'
    });
    isCompete=false;
    if(gameType=="compete"){
        isCompete=true;
       
        $('#restartGame').css({
            display:'none',
        });
    }
    hintNum=0;hintA=0;hintB=0;
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
    currWin=null;
    $(".cell").each(function(i){
        $(".cell")[i].addEventListener('click',cellClick,false);
    });
    if(gameType=='againstPlayer'){
        $('#hint').css({
            display:'block'
        });
   }

   if(gameType=="compete"){
    fetch(`/${Player1Name}`,{method : "get"}).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        for(var i=0;i<data.length;i++){
            PlayerList[i]=data[i];            
        }
    });
}
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
       
        if(isTwoMode){
            currWin=gameWon.player==player?Player1Name+" Wins":Player2Name+" Wins";
        }else{
            currWin=gameWon.player==player?"You win":"You Lost";  
            whoWon=gameWon.player==player?"Player":"Computer";       
        }
        displayWinner(currWin,gameWon);
}

//Store the data if compete mode
function storeWinner(){
    //winnerName,gameWn    
    var isBest=false;
        var currWinner;
        // if(gameWn.player==player){
        //     currWinner={
        //         Name:Player1Name,
        //         min:m,
        //         sec:s,
        //         millis:ms,
        //     };
        // }else{
        //      currWinner={
        //         Name:Player2Name,
        //         min:m,
        //         sec:s,
        //         millis:ms,
        //     };
        // }
       currWinner={
                Name:Player1Name,
                min:m,
                sec:s,
                millis:ms,
            };
       
        var isNameMatched=false;
            for(var i=0;i<PlayerList.length;i++){
               
                if(PlayerList[i].Name==currWinner.Name){
                    isNameMatched=true;
                    var time=PlayerList[i].Time
                    var totalspoints;
                    if(pointsScored!=-1){
                         totalspoints= (parseInt(PlayerList[i].points)+pointsScored).toString();
                    }else{
                         totalspoints=PlayerList[i].points;
                    }
                    var totalScore=(parseInt(PlayerList[i].score)+parseInt(setTotalScore())).toString();
                    var min,sec,milli;
                    if(checkBestTime(time,currWinner)){
                        isBest=true;
                         sec=currWinner.sec<10?"0"+currWinner.sec:currWinner.sec; 
                          min=currWinner.min<10?"0"+currWinner.min:currWinner.min; 
                          milli=currWinner.millis<10?"0"+currWinner.millis:currWinner.millis;
                        displayBestTime=min+":"+sec+":"+milli;   
                   }else{
                     sec=time.sec; 
                      min=time.min; 
                      milli=time.millis; 
                   displayBestTime=min+":"+sec+":"+milli;  
                   }
                   //update
                   fetch(`/${PlayerList[i]._id}`,{
                    method : "put",
                    headers : {
                        "Content-Type" : "application/json; charset=utf-8" 
                    },
                    body : JSON.stringify({"Time":{min:min,sec:sec,millis:milli},"score":totalScore,"points":totalspoints})
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    if(data.ok == 1){
                             
                    }else{
                        console.log("Error updating");
                    }
                });
               
                }
            }
                if(isNameMatched==false){
                    var sec=currWinner.sec<10?"0"+currWinner.sec:currWinner.sec; 
            var min=currWinner.min<10?"0"+currWinner.min:currWinner.min; 
            var milli=currWinner.millis<10?"0"+currWinner.millis:currWinner.millis; 
          displayBestTime=min+":"+sec+":"+milli;
          if(pointsScored!=-1){
            totalspoints= pointsScored.toString();
       }else{
            totalspoints=(-1).toString();
       }
       var currScore=setTotalScore();
          fetch('/',{
                method : 'post',
                body : JSON.stringify({"Name":currWinner.Name,"Time":{"min":min,"sec":sec,"millis":milli},"score":currScore,"points":totalspoints}),
                headers : {
                    "Content-Type" : "application/json; charset=utf-8"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(!data.error){
                    if(data.result.ok == 1 && data.result.n == 1){
                console.log("success");   
                } }
                else
                console.log("was not able to add data");      
            });
                }
    }
   
//To set the score based on the level
function setTotalScore(){
    var score;
if(levelSelected=="levelOne"){
score="1";
}else if(levelSelected=="levelTwo"){
    score="5";
}else if(levelSelected=="levelThree"){
    score="10"
}
return score;
}
//Check if it is the best time of the user
function checkBestTime(BestTime,currWinner){
    if(BestTime.min>=currWinner.min){
        if(BestTime.min>currWinner.min){
            return true;
        }else{
            if(BestTime.sec>=currWinner.sec){
                if(BestTime.sec>currWinner.sec){
                    return true;
                }else{
                    if(BestTime.millis>currWinner.millis){
                return true;
            }
                }   
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
        return minimax('X');
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

//Display the resultgameWon
function displayWinner(winner,gameWon){
    pauseTimer();
      if((winner!='Tie'&&winner!="You Lost")&&isCompete==true){
    var currWinner={
        Name:Player1Name,
        min:m,
        sec:s,
        millis:ms,
    };
    
    if(PlayerList.length!=0){
        if(PlayerList[0].Name==currWinner.Name){
        var time=PlayerList[0].Time
        if(checkBestTime(time,currWinner)){
        isBest=true;
         sec=currWinner.sec<10?"0"+currWinner.sec:currWinner.sec; 
          min=currWinner.min<10?"0"+currWinner.min:currWinner.min; 
          milli=currWinner.millis<10?"0"+currWinner.millis:currWinner.millis;
        displayBestTime=min+":"+sec+":"+milli;   
   }else{
      sec=time.sec; 
      min=time.min; 
      milli=time.millis; 
   displayBestTime=min+":"+sec+":"+milli;  
   }}}else{
     sec=currWinner.sec<10?"0"+currWinner.sec:currWinner.sec; 
     min=currWinner.min<10?"0"+currWinner.min:currWinner.min; 
     milli=currWinner.millis<10?"0"+currWinner.millis:currWinner.millis; 
  displayBestTime=min+":"+sec+":"+milli; 
   }}
    $('.endgame').css({
        display:'block'
    });
    $('#mainMenu').css({
        display:'none'
    });
    $('.column').css({
 display:'none'
    });
    $('.endgame button').css({
        display:'inline-block'
    });
    $('#spinButton').css({
        display:'none'
    });  
    if(displayBestTime!=null){
        $('.endgame .text').html(winner+ "<br> Best Time:"+displayBestTime);
    }
    else{
        $('.endgame .text').html(winner);   
    }
    $('#hint').css({
        display:'none'
    });
    if(gameType=="compete"){
        console.log("isspin"+isSpin);
        console.log("winner"+winner);
        if(isSpin&&winner=="You win"){
            $('#spinButton').css({display:'block'});
        }
          
     
    }
    }

//Function to obtain the computer move if levelselected=2,3,4 
function minimax(playerTile){
        var Secondplayer=playerTile=='X'?'O':'X';
        var val=1000;
        var x,temp;
        for(var i=0;i<boardList.length;i++){
            if(boardList[i]!="X"&&boardList[i]!="O"){
                temp=boardList[i];
                boardList[i]=playerTile;
                var move=maxsearch(0,playerTile,Secondplayer);
     
                if(move<val){
                    val=move;
                    x=i;
                }
                boardList[i]=temp;
            }
        } 
       
        return x;
     }
     function maxsearch(depth,playerTile,Secondplayer){
     var score;
     var temp;
     var emptycellList=emptycells(boardList);
          if(checkWin(boardList,Secondplayer)){
             score=10;
             return score+depth;
          }
          else if(checkWin(boardList,playerTile)){
            score=-10;
             return score-depth;
          }else if(emptycellList.length==0){
              return score=0;
          }
          score=-1000;
     
          if(levelSelected=='levelTwo'&&depth<1||levelSelected=='levelThree'&&depth<2||levelSelected=='levelFour'||hintNum!=0){
         for(var i=0;i<boardList.length;i++){
             if(boardList[i]!="X"&&boardList[i]!="O"){
                 temp=boardList[i];
                 boardList[i]=Secondplayer;
                score=Math.max(score,minsearch(depth+1,playerTile,Secondplayer));
                boardList[i]=temp;
             }
          }
     }
          return score;
     }
     function minsearch(depth,playerTile,Secondplayer){
         var score;
     var temp;
     var emptycellList=emptycells(boardList);
          if(checkWin(boardList,Secondplayer)){
             score=10;
             return score;
          }
          else if(checkWin(boardList,playerTile)){
            score=-10;
             return score;
          }else if(emptycellList.length==0){
              return score=0;
          }
          score=1000;
          for(var i=0;i<boardList.length;i++){
             if(boardList[i]!="X"&&boardList[i]!="O"){
              temp=boardList[i];
                 boardList[i]=playerTile;
                score=Math.min(score,maxsearch(depth+1,playerTile,Secondplayer));
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
    var sec=s<10?"0"+s:s; 
    var min=m<10?"0"+m:m; 
    var milli=ms<10?"0"+ms:ms; 
$('#seconds').html(sec);
$('#minutes').html(min);
$('#millis').html(milli);
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

//SpinWheel Code
var cnt=false;
var absDeg;
function handleSpin(){
if(!cnt){var x=1024;
    var y=9999;
    var deg=Math.floor(Math.random()*(x-y))+y;
    console.log(deg);
    cnt=true;
document.getElementById('box').style.transform="rotate("+deg+"deg)";
var element=document.getElementById('mainCircle');
element.classList.remove('animate');
setTimeout(function(){
element.classList.add('animate');
},5000);
 absDeg=deg-(Math.floor(deg/360)*360);
var spinTile;
if((absDeg>=0&&absDeg<22.5)||(absDeg>=337.5&&absDeg<=360)){
spinTile="150";
}else if(absDeg>=292.5){
spinTile="10";
}else if(absDeg>=247.5){
spinTile="250";
}else if(absDeg>=202.5){
spinTile="300";
}else if(absDeg>=157.5){
    spinTile="50";
}else if(absDeg>=112.5){
        spinTile="0";
}else if(absDeg>=67.5){
    spinTile="350";
}else if(absDeg>=22.5){
    spinTile="75";
}
pointsScored=parseInt(spinTile);
console.log(pointsScored);
setTimeout(function(){
    document.getElementById('goBack').style.display="block";
    document.getElementById('status').style.display="block";
    if(spinTile=="0"){
        document.getElementById('status').innerHTML="Oops!! Better Luck Next Time";
    }else{
        document.getElementById('status').innerHTML="Yayy!! You've earned "+spinTile+" points";
    }
},5000);
}
}
$(function(){
    $('#goBack').on('click',function(){
        
        absDeg=absDeg*-1;
        console.log("deg="+absDeg);
       
        $('#container').css({
           display:'block'
       });
       $('#SpinCircle').css({
           display:'none'
       });
    $('#spinButton').css({display:'none'});
       var deg=Math.floor(Math.random()*(360-0))+0;
       document.getElementById('box').style.transform="rotate("+deg+"deg)";
       var element=document.getElementById('mainCircle');
        element.classList.remove('animate');
        isSpin=false;
       document.getElementById('goBack').style.display="none";
       document.getElementById('status').style.display="none";
       cnt=false;
    });
  });

  //function for leaderboard
  function displayLeaderBoard(){
    var usersList=[];
    var display="display_leaderboard";
    fetch(`/${display}`,{method : "get"}).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        for(var i=0;i<data.length;i++){
            usersList[i]=data[i];            
        }
    });
  }