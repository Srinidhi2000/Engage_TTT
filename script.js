//replace the displayLeaderboard function with this 

$(document).mouseup(function(e) 
{
    var container = $(".displayleaderBoard");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        $('.displayleaderboard').css({
            display:'none'
        }); 
        container.hide();
    }
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
        document.querySelector('.displayleaderboard').style.display='block';
        usersList.sort(compare);
        document.querySelector('.pos1 .name').innerHTML=usersList[0].Name;
        document.querySelector('.pos1 .score').innerHTML=usersList[0].score+usersList[0].points;
        document.querySelector('.pos2 .name').innerHTML=usersList[1].Name;
        document.querySelector('.pos2 .score').innerHTML=usersList[1].score;
        document.querySelector('.pos3 .name').innerHTML=usersList[2].Name;
        document.querySelector('.pos3 .score').innerHTML=usersList[2].score;
        document.querySelector('.pos4 .name').innerHTML=usersList[3].Name;
        document.querySelector('.pos4 .score').innerHTML=usersList[3].score;
        document.querySelector('.pos5 .name').innerHTML=usersList[4].Name;
        document.querySelector('.pos5 .score').innerHTML=usersList[4].score;
        // usersList.sort(comparep);
        // document.querySelector('.pos_1 .name').innerHTML=usersList[0].Name;
        // document.querySelector('.pos_1 .point').innerHTML=usersList[0].points;
        // document.querySelector('.pos_2 .name').innerHTML=usersList[1].Name;
        // document.querySelector('.pos_2 .point').innerHTML=usersList[1].points;
        // document.querySelector('.pos_3 .name').innerHTML=usersList[2].Name;
        // document.querySelector('.pos_3 .point').innerHTML=usersList[2].points;
    });
  }
